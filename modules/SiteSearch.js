'use strict';
const jsdom = require('jsdom');
const {
    JSDOM,
    VirtualConsole
} = jsdom;
const os = require('os');
const proxyOptions = null;
const resources = new jsdom.ResourceLoader();

module.exports = class SiteSearch {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.selector = "Selector not set yet.";
        this.results = [];
        this.doNotEncode = {};
    }

    async searchResults() {
        const that = this;
        if (that.baseUrl) {
            const url = that.createUrl(that.baseUrl);
            await that.getData(url, that.selector, 20000).then(result => {
                that.results = result;
            });
            that.results.forEach(r => console.log(r));
        }
    }

    async getData(url, selector, timeout) {
        const that = this;
        const virtualConsole = new jsdom.VirtualConsole();
        virtualConsole.sendTo(console, {
            omitJSDOMErrors: true
        });

        const dom = await JSDOM.fromURL(url, {
            runScripts: "dangerously",
            resources,
            virtualConsole
        });

        const data = await new Promise((res, rej) => {
            const started = (new Date()).getTime();

            const timer = setInterval(() => {
                const element = dom.window.document.querySelector(selector);

                if (element && element.textContent) {
                    const diff = ((new Date()).getTime() - started) / 1000;
                    const elements = dom.window.document.querySelectorAll(selector);

                    console.log("Time to load " + elements.length + " element(s): " + diff + "s");

                    let results = [];
                    for (let i = 0; i < elements.length; i++)
                        results.push(that.getProductTitle(elements[i]));

                    res(results);
                    clearInterval(timer);
                } else if (Date.now() - started > timeout) {
                    rej(["Timed out"]);
                    clearInterval(timer);
                }
            }, 100);
        });

        dom.window.close();
        return data;
    }

    createUrl() { // paramGroups
        throw new Error('You have to implement the method getUrl!');
    }

    queryString(params) {
        const that = this;
        const esc = encodeURIComponent;
        return Object.keys(params)
            .map(k => esc(k) + '=' + (that.doNotEncode[k] ? params[k] : esc(params[k])))
            .join('&');
    }

    getProductTitle(docElement) {
        return docElement.textContent;
    }
}
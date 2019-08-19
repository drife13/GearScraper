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
    constructor() {
        this.selectors = {
            "https://www.guitarcenter.com/search": ".productTitle > a",
            "https://www.musicgoround.com/products": ".card-title",
            "https://reverb.com/marketplace": ".grid-card__title"
        }
    }

    GetSelector(url) {
        for (var baseUrl in this.selectors) {
            if (url.includes(baseUrl)) {
                return this.selectors[baseUrl];
            }
        }
        return "Selector not set.";
    }

    // async PerformSearch(url) {
    //     const that = this;
    //     const results = await that.GetSearchResults(url, , 100000).then(() => {
    //         console.log("Finished " + url);
    //     }).catch(() => console.log("Failed " + url));
    //     return results;
    // }

    async GetSearchResults(url, timeout) {
        const selector = this.GetSelector(url);

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
            const started = Date.now();

            const timer = setInterval(() => {
                const element = dom.window.document.querySelector(selector);
                //console.log(Date.now() - started);

                if (element && element.textContent) {
                    const diff = (Date.now() - started) / 1000;
                    const elements = dom.window.document.querySelectorAll(selector);

                    console.log("Time to load " + elements.length + " element(s): " + diff + "s");

                    let results = [];
                    for (let i = 0; i < elements.length; i++)
                        results.push(elements[i].textContent.trim());

                    res(results);
                    clearInterval(timer);
                } else if (Date.now() - started < 0) { // > timeout
                    rej(["Timed out"]);
                    clearInterval(timer);
                }
            }, 100);
        }).catch(() => console.log("Timed out"));

        dom.window.close();
        return data;
    }

    // createUrl() { // paramGroups
    //     throw new Error('You have to implement the method getUrl!');
    // }

    // queryString(params) {
    //     const that = this;
    //     const esc = encodeURIComponent;
    //     return Object.keys(params)
    //         .map(k => esc(k) + '=' + (that.doNotEncode[k] ? params[k] : esc(params[k])))
    //         .join('&');
    // }
}
'use strict';
const SiteSearch = require('./SiteSearch');

// https://www.guitarcenter.com/search?N=18353&Ntt=traynor&typeAheadRedirect=true&typeAheadSuggestion=true#pageName=search&N=18353&Ntt=traynor&Nao=0&recsPerPage=30&&Ns=cD&postalCode=63101&radius=100&profileCountryCode=US&profileCurrencyCode=USD

module.exports = class GCSearch extends SiteSearch {
    constructor(paramGroups) {
        super("https://www.guitarcenter.com/search");
        this.paramGroups = paramGroups;
        this.selector = ".productTitle";
    }

    createUrl(baseUrl) { // paramGroups
        const params1 = this.paramGroups[1];
        const params2 = this.paramGroups[2];

        const gcUrl = baseUrl + "?" +
            this.queryString(params1) +
            "#pageName=search&" +
            this.queryString({
                ...params1,
                ...params2
            })

        console.log("Guitar Center URL: " + gcUrl);
        return gcUrl;
    }

    getProductTitle(element) {
        return element.querySelector('a').textContent;
    }
}
'use strict';
const SiteSearch = require('./SiteSearch');

// 

module.exports = class MGRSearch extends SiteSearch {
    constructor(paramGroups) {
        super("https://www.musicgoround.com/products");
        this.paramGroups = paramGroups;
        this.selector = ".card-title";
    }

    createUrl(baseUrl) {
        const params = this.paramGroups[1];
        const doNotEncode = this.paramGroups.doNotEncode;

        const mgrUrl = baseUrl + "?" + this.queryString(params, doNotEncode);

        console.log("Music Go Round URL: " + mgrUrl);
        return mgrUrl;
    }
}
'use strict';
const SiteSearch = require('./SiteSearch');

// https://reverb.com/marketplace/amps?query=traynor%20yba-1&decades=197&make=traynor&price_min=200&price_max=500

module.exports = class ReverbSearch extends SiteSearch {
    constructor(paramGroups) {
        super("https://reverb.com/marketplace/");
        this.paramGroups = paramGroups;
        this.selector = ".grid-card__title";
    }

    createUrl(baseUrl) {
        const params1 = this.paramGroups[1];
        const params2 = this.paramGroups[2];

        const rvbUrl = baseUrl + params1['category'] +
            "?" + this.queryString(params2);

        console.log("Reverb URL: " + rvbUrl);
        return rvbUrl;
    }
}
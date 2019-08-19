// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// const jq = require('jquery');
// const curl = require('curl');
// const os = require('os');
// const proxyOptions = os.hostname() == "ONEABIWKS0F3761" ?
//     {
//         proxy: "http://104.129.194.41:10128",
//         strictSSL: false
// 	} : null;

console.log("---> Running");
const GCSearch = require('./modules/GCSearch');
const ReverbSearch = require('./modules/ReverbSearch');
const MGRSearch = require('./modules/MGRSearch');
const delay = ms => new Promise(res => setTimeout(res, ms));

function main2() {

}

async function main() {
	// var gcParamGroups = {
	// 	1: {
	//         N: 18353, // category # + brand # etc
	//         Ntt: "traynor yba-1"
	//     },

	//     2: {
	//         Nao: 0,
	//         recsPerPage: 90,
	//         postalCode: 63109,
	//         radius: 100,
	//         profileCountryCode: "US",
	//         profileCurrencyCode: "USD"
	//     }
	// };

	// var gcs = new GCSearch(gcParamGroups);
	// var gcRes = await gcs.searchResults();

	// var rvbParamGroups = {
	// 	1: {
	//         category: "amps"
	//     },

	//     2: {
	// 		query: "traynor yba-1",
	// 		decades: 197,
	// 		make: "traynor",
	// 		price_min: 200,
	// 		price_max: 500
	//     }
	// };

	// var rvb = new ReverbSearch(rvbParamGroups);
	// var rvbRes = await rvb.searchResults();

	var mgrParamGroups = {
		1: {
			search: "used",
			"Device Type": "Head|Combos",
			page: 1,
			Brand: "Musicman|Music Man",
			sortBy: "!xp.AvailableDate"
		},
	};

	var mgr = new MGRSearch(mgrParamGroups);
	var resolved = await mgr.searchResults();
}

main();


// https://stackoverflow.com/questions/29686011/how-do-i-convert-web-application-into-desktop-executable

// sites...
// Music Go Round
// Craigslist
// Music Go Round
// FB Marketplace

// search
// query (escaped), filters, sites, desired price, etc
// found item
// item url, query, item name, price, shipping, description, location, photos, desired price, for sale
// scheduled/full search
// return all match results
// run hourly
// send me an email of new matches
// single search
// return results
// filter for matches
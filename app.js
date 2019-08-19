console.log("---> Running");
const SiteSearch = require('./modules/SiteSearch');
const Async = require('async');
const delay = ms => new Promise(res => setTimeout(res, ms));
const logEach = (arr) => {
	arr.forEach(e => console.log(e))
};

async function main() {
	var searchUrls = [
		// "https://www.musicgoround.com/products?zip=63109&radius=50&page=1&sortBy=!xp.AvailableDate&supplierID=41106%7C41116",
		// "https://www.musicgoround.com/products?search=traynor&sortBy=!xp.AvailableDate&page=1",
		// "https://www.musicgoround.com/products/GUBA/bass-guitars?search=precision&sortBy=!xp.AvailableDate&page=1&maxPrice=500",
		// "https://www.musicgoround.com/products?search=fury&Brand=peavey&page=1&sortBy=!xp.AvailableDate",
		"https://www.guitarcenter.com/search?N=18174&Ntt=peavey+fury&typeAheadRedirect=true&typeAheadSuggestion=true#pageName=search&N=18174&Ntt=peavey%20fury&Nao=0&recsPerPage=30&&Ns=cD&postalCode=63126&radius=100&profileCountryCode=US&profileCurrencyCode=USD",
		"https://reverb.com/marketplace/amps?query=traynor%20yba-1&decades=197&make=traynor&price_min=200&price_max=500"
	];

	
	var promises = searchUrls.map(url => (new SiteSearch()).GetSearchResults(url, 100000));
	Promise.all(promises).then( (searchResults) => {
		var allResults = [].concat.apply([], searchResults);
		logEach(allResults);
	});

	// Async.each(searchUrls, function (url, callback) {
	// 	(new SiteSearch()).GetSearchResults(url, 100000);
		
	// }, function (err) {
	// 	console.log("Hello");
	// 	if (err) {
	// 		console.log("Error grabbing data");
	// 	} else {
	// 		console.log("Finished processing all data");
	// 	}
	// });
}

main();

// https://stackoverflow.com/questions/29686011/how-do-i-convert-web-application-into-desktop-executable

// sites...
// Craigslist
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
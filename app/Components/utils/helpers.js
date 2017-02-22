//1st. we have to creae the axios package for performing HTTP requests 
import axios from "axios";

//nyt API
const nytAPI = "0b258de4c13e4b7e8d3889691453d8fc";

//Helper functions that will be used by the Results, SAved , and Search js files
const helpers ={
	getArticles: (keyWord, beginDate, endDate) => {
		const queryURL = "https://developer.nytimes.com/article_search_v2.json?q="
		+ keyWord + "&begin_date=" + beginDate + "&end_date=" + endDate + "&api_key=" + nytAPI;

		return axios.get(queryURL).then((response) => {
			//this will filter all the articles that dont have snippets or articles that have null or empty snippets
			var articles = response.data.response.docs.filter( article =>(article.hasOwnProperty("snippet") && typeof article["snippet"] === "string" && article ["snippet"].length) );
			return article;
		});

	},
	saveArticle: (title, url) => {
		const queryURL = "/api/saved";

		return axios.post(queryURL, {
			title: title,
			url: url
		}).then(( res) =>{
			return res.data;
		});
	},

	deleteArticle: (articleId) => {
		const queryURL = "/api/saved";
		return axios ({
			method: "delete",
			url: queryURL,
			data: {articleId: articleId},
			params: {}
		}).then((res) => {
			return res;
		});
	}
};

//Export helps 
export default helpers;


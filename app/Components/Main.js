import React from "react";
import update from "react-addons-update";

//Import sub-components
import Saved from "./Saved/Saved";
import Search from "./Search/Search";
import Results from "./Results/Results";

//Helper function
import Helpers from "./utils/helpers"

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			seachTerm: {},
			savedArticles: [],
			results : []
		};
		this.setTerm = this.setTerm.bind(this);
		this.addArticle = this.addArticle.bind(this);
		this.deleteArticle = this.deleteArticle.bind(this);
		this.updateDisabledResults = this.updateDisabledResults.bind(this);
	}

	componentDidUpdate(prevProps, prevState) {
		//if the topic or beingDate or endDate are updated 
		if(prevState.searchTerm.topic !== this.state.searchTerm.topic || prevState.searchTerm.beginDate !== this.state.searchTerm.beginDate || prevState.searchTerm.endDate !== this.state.searchTerm.endDate) {
			//get articles from the NY times
			helpers.getArticles(this.state.searchTerm.topic,this.state.searchTerm.beginDate,this.state.searchTerm.endDate).then((data) => {
				let newData = data.map((article) => {
					//this will check if at the least one saved article
					//with the same url that the article retrivied from the the ny times
					let btnDisabled = this.state.savedArticles.some(function(savedArticles) {
						return savedArticle["url"] === article["web_url"];
					});
					//now if the article is already stored in the database set button disabled 
					article["btnDisabled"] = btnDisabled;
					return article;
				});
				this.setState({ results: newData});
			});
		}
	}

	//here it will update the state searchTerm
	setTerm(term) {
		this.setState({
			searchTerm: term
		});
	}

	//now it will update the state results by disabling the article saved
	updateDisabledResults(index) {
		let updatedResults = this.state.results;
		updatedResults[parseInt(index)]["btnDisabled"] = true;
		//this updates the state results
		this.setState({results:updatedResults});
	}

	//update the state savedArticles by adding a new article 
	addArticle(article) {
		this.setState({
			savedArticles: this.state.savedArticles.concat(article)
		});
	}

	//update the state savedArticles by removing an article 
	deleteArticle(articleIndex) {
		let updatedSavedArticles = update(this.state.savedArticles, {
			$splice: [[articleIndex, 1]]
		});
	}

	//before the first render, get all the savedArticles from the db and update the state savedArtice
	componentWillMount(prevProps, prevState) {
		//get all the savedArticles from the db
		helpers.getSavedArticles().then((data)=> {
			//update the state savedArticles
			this.setState({ savedArticles: data});
		});
	}

	render() {
		return (
			<div className="container">
				<Search setTerm={this.setTerm} />
				<Results results={this.state.results} addArticle={this.addArticle} updateDisabledResults={this.updateDisabledResults} />
				<Saved savedArticles={this.state.savedArticles} deleteArticle = {this.deleteArticle} />
			</div>
			);
	}

}
//this will export the component back for use in other files
export default Main
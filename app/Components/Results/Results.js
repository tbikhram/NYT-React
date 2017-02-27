//Here we Include React
var React= require ("react");
import helpers from "./../utils/helpers";

class Results extends React.Component {
	constructor(props) {
		super(props);
		this.saveArticle = this.saveArticle.bind(this);
	}

//save article into the database 
	saveArticle(event) {
		event.preventDefault();
		let index = parseInt(event.target.value);
		//get the article from the array of articles using the index stored in the value of the button
		let articleData = this.props.results[index];
		//get the title of the article
		let title = articleData["snippet"];
		//get the url of the article 
		let url = articleData["web_url"];
		//make a post request to save the articles
		helpers.saveArticle(title, url).then((data)=>{
			//this will update the savedArticles that was saved
			this.props.addArticle(data);
			//and also disable the button of the article that was saved 
			this.props.updateDisabledResults(index);
		});
	}

	render() {
		return (
			<div id="resultsSection" className="row">
				<div className= "page-header">
					<h2>Results</h2>
				</div>
				<div className="black">
					<div className="black">
						<h3 className="panel-title">List of articles</h3>
						</div>
						<div className= "panel-body">
						 <ul id="news" className="list-group">
						 {
						 	this.props.results.map(( article,articleIndex) => <li className="title list-group-item row" key={article._id}>
						 			<div className="col-md-8"><a href={article.web_url}>{article.lead_paragraph}</a></div>
						 			<div className="col-md-4 text-center"><button type="button" className="btn btn-success pull-right" onClick={this.saveArticle} value={articleIndex} disabled = {article.btnDisabled}>Save</button></div>
						 		</li>

						 )
					  }
				  </ul>
			   </div>
			</div>
		  </div>
		);
	}

}



export default Results;



module.exports = {

	//this is the entry point or start of our react application
	entry: "./app/app.js",

	//the plan compiled javascript will be output into this file
	output: {
		filename: "public/bundle.js"
	},

	//this section desribes the transformation we will perform
	module: {
		loaders: [
			{
				//Only working with files that are in a .js or .jsx extension
				test: /\.jsx?$/,
				//webpack will only process files in our app folder .  this avoids processing
				//node modules and server files unnecessarily
				include: /app/,
				loader: "babel",
				query: {
					//these are the specific transformation we will be using
					presents: ["react", "es2015"]
				}
			}

		]
	},
	//this lets us debug our react code in chrome dev tools. errors will have lines and fill names 
	//without this the console says all errors are coming from just coming from bundle.js
	devtool: "eval-source-map"




};
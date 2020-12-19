const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const forecast = require("./utils/forecast");

const port = process.env.PORT || 3000;
const app = express();

// Define path fo Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location(views==templates)
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath, (error) => {});

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
	res.render("index", {
		title: "Weather",
		name: "Nitzan Maizel",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About",
		name: "Nitzan Maizel",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help",
		name: "Nitzan Maizel",
		massage: "What can i do for you?",
	});
});

app.get("/weather", (req, res) => {
	const address = req.query.address;
	if (!address) {
		return res.send({
			error: `You must provide an address..`,
		});
	}

	geoCode(address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error });
		}
		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({ error });
			}
			res.send({
				forecast: forecastData,
				location,
				address,
			});
		});
	});
});

app.get("/products", (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: `You must provide a search term`,
		});
	}
	console.log(req.query.search);
	res.send({
		product: [],
	});
});

app.get("/help/*", (req, res) => {
	res.render("404", {
		title: "404",
		name: "Nitzan Maizel",
		errorMassage: "Help article not found...",
	});
});

app.get("/*", (req, res) => {
	res.render("404", {
		title: "404",
		name: "Nitzan Maizel",
		errorMassage: "Page not found...",
	});
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

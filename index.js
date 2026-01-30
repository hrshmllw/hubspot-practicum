require("dotenv").config();
const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;
const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;
const CUSTOM_OBJECT_NAME = process.env.CUSTOM_OBJECT_NAME;

// Configure Pug as view engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Setup static folder
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic GET / route
app.get("/", async (req, res) => {
	try {
		const response = await axios.get(
			`https://api.hubapi.com/crm/v3/objects/${CUSTOM_OBJECT_NAME}`,
			{
				headers: {
					Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
				},
				params: {
					properties: "name,price,description",
				},
			},
		);

		const records = response.data.results || [];

		res.render("homepage", {
			title: "Custom Object Table",
			records: records,
		});
	} catch (error) {
		console.error("Error fetching custom objects:", error.message);
		res.status(500).render("homepage", {
			title: "Custom Object Table",
			records: [],
			error: "Failed to fetch data from HubSpot",
		});
	}
});

// GET /update-cobj route
app.get("/update-cobj", (req, res) => {
	res.render("updates", {
		title: "Update Custom Object Form | Integrating With HubSpot I Practicum",
	});
});

// POST /update-cobj route
app.post("/update-cobj", async (req, res) => {
	try {
		const { name, price, description } = req.body;

		await axios.post(
			`https://api.hubapi.com/crm/v3/objects/${CUSTOM_OBJECT_NAME}`,
			{
				properties: {
					name: name,
					price: price,
					description: description,
				},
			},
			{
				headers: {
					Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
					"Content-Type": "application/json",
				},
			},
		);

		res.redirect("/");
	} catch (error) {
		console.error("Error creating custom object:", error.message);
		res.status(500).render("updates", {
			title: "Update Custom Object Form | Integrating With HubSpot I Practicum",
			error: "Failed to create custom object in HubSpot",
		});
	}
});

// 404 handler
app.use((req, res, next) => {
	res.status(404).send("404 - Page Not Found");
});

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("500 - Something went wrong!");
});

// Start server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});


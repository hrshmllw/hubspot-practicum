require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Configure Pug as view engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Setup static folder
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic GET / route
app.get("/", (req, res) => {
	res.send("Server running");
});

// GET /update-cobj route
app.get("/update-cobj", (req, res) => {
	res.render("updates", {
		title: "Update Custom Object Form | Integrating With HubSpot I Practicum",
	});
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


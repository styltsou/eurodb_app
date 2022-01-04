const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");

const app = express();

app.use(express.json());
app.use(helmet());
app.use(xss());

// Add rate limit middleware
app.get("/", (req, res) => {
	res.send(<h1>Hello from Express!</h1>);
});

module.exports = app;

const express = require("express");
const router = express.Router();

const api = require("../utils/api");

router.get("/", async (req, res) => {
	try {
		const allApiEpisodes = await api.getAllEpisodes();
		return res.status(200).send(allApiEpisodes);
	} catch (e) {
		return res.status(500).send(e);
	}
});

module.exports = router;

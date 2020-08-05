const express = require("express");
const router = express.Router();
const Episode = require("../models/episode");

// Not all routes implemented in the frontend, but all routes here do work.s

const convertToHumanReadbableTime = (collection) => {
	return collection.map((document) => {
		const timeAsString = document.dateOfEntry.toString();
		const timeRemoveGMT = timeAsString.substring(
			0,
			timeAsString.indexOf("GMT")
		);
		return { ...document._doc, dateOfEntry: timeRemoveGMT };
	});
};
router
	.get("/", async (req, res) => {
		try {
			const allEpisodes = await Episode.find().sort({ date: -1 });
			const humanReadableResults = convertToHumanReadbableTime(allEpisodes);
			return res.status(200).send(humanReadableResults);
		} catch (e) {
			return res.status(500).send(e);
		}
	})
	.post("/", async ({ body } = req, res) => {
		if (!body) return res.status(400).send("Bad Request, no body");
		try {
			const newEpisode = new Episode(body);
			await newEpisode.save();
			return res.status(201).send();
		} catch (e) {
			return res.status(500).send(e);
		}
	});

router
	.get("/:id", async (req, res) => {
		const { id } = req.params;
		try {
			const episode = await Episode.findById(id);
			return res.status(200).send(episode);
		} catch (e) {
			return res.status(500).send(e);
		}
	})

	.put("/:id", async (req, res) => {
		const { body } = req;
		const { id } = req.params;
		try {
			const result = await Episode.replaceOne({ _id: id }, body);
			return res.status(200).send(result);
		} catch (e) {
			return res.status(500).send(e);
		}
	})
	.delete("/:id", async (req, res) => {
		const { id } = req.params;
		try {
			await Episode.deleteOne({ _id: id });
			return res.status(202).send();
		} catch (e) {
			return res.status(500).send(e);
		}
	});

module.exports = router;

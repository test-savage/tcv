const axios = require("axios");

const API_URL = "https://www.breakingbadapi.com/api/episodes";

const getAllEpisodes = async () => {
	try {
		const { data } = await axios.get(API_URL);
		return data;
	} catch (e) {
		return e;
	}
};

module.exports = { getAllEpisodes };

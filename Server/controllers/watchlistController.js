const Watchlist = require("../models/watchlist");

const addWatchlist = async (req, res) => {
    try {
        const { movieId, title, poster, overview, rating, genre } = req.body;
        const user = req.user?.id || req.user?._id;
        if (!user) {
            return res.status(401).json({ message: "Not authorized. Please login." });
        }

        const existingMovie = await Watchlist.findOne({ user, movieId });

        if (existingMovie) {
            return res.status(400).json({ message: "Movie already exists in watchlist" });
        }

        const watchlist = await Watchlist.create({
            user, movieId, title, poster, overview, rating, genre,
        });

        res.json(watchlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getWatchlist = async (req, res) => {
    try {
        const userId = req.user?.id || req.user?._id;
        const watchlists = await Watchlist.find({ user: userId });
        res.json(watchlists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeWatchlist = async (req, res) => {
    try {
        await Watchlist.findByIdAndDelete(req.params.id);
        res.json({ message: "Watchlist removed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addWatchlist, getWatchlist, removeWatchlist };

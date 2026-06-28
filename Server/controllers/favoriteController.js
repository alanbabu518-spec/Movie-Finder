const Favorite = require("../models/favorites");

const addFavorite = async (req, res) => {
    try {
        const { movieId, title, poster } = req.body;
        const user = req.user?.id || req.user?._id;
        if (!user) {
            return res.status(401).json({ message: "Not authorized. Please login." });
        }

        const existingMovie = await Favorite.findOne({ user, movieId });

        if (existingMovie) {
            return res.status(400).json({ message: "Movie already exists in favorites" });
        }

        const favorite = await Favorite.create({ user, movieId, title, poster });
        res.json(favorite);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const getFavorite = async (req, res) => {
    try {
        const userId = req.user?.id || req.user?._id;
        const favorites = await Favorite.find({ user: userId });
        res.json(favorites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeFavorite = async (req, res) => {
    try {
        await Favorite.findByIdAndDelete(req.params.id);
        res.json({ message: "Favorite removed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addFavorite, getFavorite, removeFavorite };

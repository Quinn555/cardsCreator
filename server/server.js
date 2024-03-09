const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3001;
const dataBaseLink = process.env.MONGO_URI || 'mongodb+srv://blueyezebra:hAtta9-nuwxym-tymgor@qcluster.ufztmnp.mongodb.net/';

const Schema = mongoose.Schema;

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/dist")));

// Set up for schema
const newCardSchema = new Schema({
    cardName: String
});

const UserDB = mongoose.model("cards", newCardSchema);

app.use(express.json()); // Middleware to parse JSON body

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

// Submitting User info to Data Base
app.post("/api/submit", async (req, res) => {
    const { cardName } = req.body;

    try {
        const newCard = new UserDB({ cardName });
        await newCard.save();
        res.status(200).json({ message: "Card created successfully" });
    } catch (error) {
        if (error.code === 11000) {
            // Handle duplicate key error (cardName already exists)
            res.status(400).json({ errorMessage: "Card name is already in use" });
        } else {
            // Handle other errors
            console.error("Error saving card:", error);
            res.status(500).json({ errorMessage: "Error saving card" });
        }
    }
});

// Connect to MongoDB
mongoose.connect(dataBaseLink, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB is connected");
        // Start server after MongoDB connection is established
        app.listen(PORT, () => {
            console.log(`Server listening on ${PORT}`);
        });
    })
    .catch(error => {
        console.error("Error connecting to MongoDB:", error);
    });

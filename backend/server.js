
import mongoose from "mongoose";
import dotenv from "dotenv";
import express from 'express';
import cors from 'cors';
dotenv.config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI;
// Connect to MongoDB Atlas
// const mongoURI = "mongodb+srv://veenaramadugu25_db_user:S7LXp1hqUeJRMfVP@cluster0.8kwr31w.mongodb.net/incidentDB?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoURI).then(() => {
    console.log("MongoDB connected");
}).catch(err => {
    console.error("MongoDB connection error:", err);
});

// Incident Schema
const incidentSchema = new mongoose.Schema({
    number: String,
    caller: String,
    alternativeContact: String,
    location: String,
    category: String,
    subcategory: String,
    configurationItem: String,
    impact: String,
    urgency: String,
    priority: String,
    shortDescription: String,
    description: String,
    channel: String,
    assignmentGroup: String,
    assignedTo: String,
    workNotes: String,
    additionalComments: String,
    status: String,
    opened: Date
});

const Incident = mongoose.model('Incident', incidentSchema);

// POST route to save incident
app.post('/api/incidents', async (req, res) => {
    try {
        const incident = new Incident(req.body);
        await incident.save();
        res.status(201).json(incident);
    } catch (error) {
        console.error("Error saving incident:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

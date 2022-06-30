const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();//explanation?

const internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
        trim: true
    },
    collegeId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College',
        required: true,
        trim: true
    },
    isDeleted:
    {
        type: Boolean,
        default: false
    }


}, { timestamps: true });



module.exports = mongoose.model('Intern', internSchema)
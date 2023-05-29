const mongoose = require('mongoose');
const Cube = require('./Cube');

const accessorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    imageUrl: { type: String, required: true, validate: /^https?/ },
    description: { type: String, required: true, maxlength: 50 },

});


const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;
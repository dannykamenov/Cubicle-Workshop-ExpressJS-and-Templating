const Cube = require("../models/Cube");

exports.getOne = (id) => {
    const cube = Cube.findById(id);
    return cube;
};
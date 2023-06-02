const Cube = require("../models/Cube");

exports.getOne = (id) => {
    const cube = Cube.findById(id);
    return cube;
};

exports.updateOne = async (id, data) => Cube.findByIdAndUpdate(id, data, {runValidators: true});

exports.deleteOne = async (id) => Cube.findByIdAndDelete(id);
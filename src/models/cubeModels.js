const Cube = require('../models/Cube');
let cubes = [];

exports.getAll = async (search, from, to) => {
    let result = await Cube.find();

    if (search) {
        result = result.filter(cube => cube.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (from) {
        result = result.filter(cube => cube.difficultyLevel >= Number(from));
    }

    if (to) {
        result = result.filter(cube => cube.difficultyLevel <= Number(to));
    }

    return result;
};

exports.create = async (cubeData) => {
    const newCube = new Cube(cubeData);

    await newCube.save();

    return newCube;
};
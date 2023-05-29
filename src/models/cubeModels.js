const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');

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

exports.attachAccessory = async (req,res) => {
    const cube = await Cube.findById(req.params.cubeId);
    const accessories = await Accessory.find({_id: {$nin: cube.accessories}});

    res.render('cube/attach', { cube, accessories });
};

exports.postAttachAccessory = async (req, res) => {
    const cube = await Cube.findById(req.params.cubeId);
    const accessoryId = req.body.accessory; 
    cube.accessories.push(accessoryId);

    await cube.save();

    res.redirect(`/cubes/${req.params.cubeId}/details`);
}    
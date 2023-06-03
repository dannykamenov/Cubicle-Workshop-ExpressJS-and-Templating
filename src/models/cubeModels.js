const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');
const cubeService = require('../services/cubeService');

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
    const isCreator = cube.owner == req.user._id;
    if(!isCreator){
        return res.redirect('/404');
    }

    res.render('cube/attach', { cube, accessories });
};

exports.postAttachAccessory = async (req, res) => {
    const cube = await Cube.findById(req.params.cubeId);
    const accessoryId = req.body.accessory; 
    cube.accessories.push(accessoryId);

    await cube.save();

    res.redirect(`/cubes/${req.params.cubeId}/details`);
}  

exports.getEditCube = async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId);
    const difficultyLevels = [
        {level: 1, label: 'Very Easy',selected: 1 === cube.difficultyLevel},
        {level: 2, label: 'Easy',selected: 2 === cube.difficultyLevel},
        {level: 3, label: 'Medium (Standard 3x3)',selected: 3 === cube.difficultyLevel},
        {level: 4, label: 'Intermediate',selected: 4 === cube.difficultyLevel},
        {level: 5, label: 'Expert',selected: 5 === cube.difficultyLevel},
        {level: 6, label: 'Hardcore',selected: 6 === cube.difficultyLevel},
    ]
    const isCreator = cube.owner == req.user._id;
    if(!isCreator){
        throw new Error('You are not the creator of this cube!');
    }
    res.render('cube/edit', {cube, difficultyLevels});
};

exports.getDeleteCube = async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId);
    const difficultyLevels = [
        {level: 1, label: 'Very Easy',selected: 1 === cube.difficultyLevel},
        {level: 2, label: 'Easy',selected: 2 === cube.difficultyLevel},
        {level: 3, label: 'Medium (Standard 3x3)',selected: 3 === cube.difficultyLevel},
        {level: 4, label: 'Intermediate',selected: 4 === cube.difficultyLevel},
        {level: 5, label: 'Expert',selected: 5 === cube.difficultyLevel},
        {level: 6, label: 'Hardcore',selected: 6 === cube.difficultyLevel},
    ]
    const isCreator = cube.owner == req.user._id;
    if(!isCreator){
        return res.redirect('/404');
    }
    res.render('cube/delete', {cube, difficultyLevels});
};

exports.postEditCube = async (req, res) => {
    const {name, description, imageUrl, difficultyLevel} = req.body;
    await cubeService.updateOne(req.params.cubeId, {name, description, imageUrl, difficultyLevel});
    res.redirect(`/cubes/${req.params.cubeId}/details`);
};

exports.postDeleteCube = async (req, res) => {
    await cubeService.deleteOne(req.params.cubeId);
    res.redirect('/');
};
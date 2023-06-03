const router = require("express").Router();
const Cube = require("../models/Cube");
const cubeModels = require("../models/cubeModels");
const { handleRequest } = require('../utils/request');

// Path = /cubes/create
router.get("/create", (req, res) => {
  res.render("create");
});

router.post("/create", async (req, res) => {

  const { name, description, imageUrl, difficultyLevel, } = req.body;

  try {
    await cubeModels.create({ name, description, imageUrl, difficultyLevel: Number(difficultyLevel), owner: req.user._id});
  } catch (err){
    console.log(err.message);
    return res.redirect("/404");
  }
  res.redirect("/");
});

router.get('/:cubeId/details', async (req, res) => {
  const cube = await Cube.findById(req.params.cubeId).populate('accessories');

    if (!cube) {
        return res.redirect('/404');
    }

    if(!req.user){
      return res.render('details', {cube});
    }

    const isCreator = cube.owner == req.user._id;
    res.render('details', {cube, isCreator});
});

router.get('/:cubeId/attach',handleRequest(cubeModels.attachAccessory));
router.post('/:cubeId/attach',handleRequest(cubeModels.postAttachAccessory));

router.get('/:cubeId/edit',handleRequest(cubeModels.getEditCube));
router.get('/:cubeId/delete',handleRequest(cubeModels.getDeleteCube));
router.post('/:cubeId/edit',handleRequest(cubeModels.postEditCube));
router.post('/:cubeId/delete',handleRequest(cubeModels.postDeleteCube));

module.exports = router;

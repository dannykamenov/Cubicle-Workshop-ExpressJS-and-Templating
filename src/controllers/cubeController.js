const router = require("express").Router();
const Cube = require("../models/Cube");
const cubeModels = require("../models/cubeModels");

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

router.get('/:cubeId/attach', cubeModels.attachAccessory);
router.post('/:cubeId/attach', cubeModels.postAttachAccessory);

router.get('/:cubeId/edit', cubeModels.getEditCube);
router.get('/:cubeId/delete', cubeModels.getDeleteCube);
router.post('/:cubeId/edit', cubeModels.postEditCube);
router.post('/:cubeId/delete', cubeModels.postDeleteCube);

module.exports = router;

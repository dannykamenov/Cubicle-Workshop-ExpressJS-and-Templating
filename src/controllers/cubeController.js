const router = require("express").Router();
const e = require("express");
const Cube = require("../models/Cube");
const cubeModels = require("../models/cubeModels");

// Path = /cubes/create
router.get("/create", (req, res) => {
  res.render("create");
});

router.post("/create", async (req, res) => {
  const { name, description, imageUrl, difficultyLevel, } = req.body;

  try {
    await cubeModels.create({ name, description, imageUrl, difficultyLevel: Number(difficultyLevel), });
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
    
    res.render('details', { cube });
});

router.get('/:cubeId/attach', cubeModels.attachAccessory);
router.post('/:cubeId/attach', cubeModels.postAttachAccessory);

module.exports = router;

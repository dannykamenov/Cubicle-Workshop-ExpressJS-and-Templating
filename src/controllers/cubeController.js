const router = require("express").Router();
const Cube = require("../models/Cube");
const cubeModels = require("../models/cubeModels");

// Path = /cubes/create
router.get("/create", (req, res) => {
  res.render("create");
});

router.post("/create", (req, res) => {
  const { name, description, imageUrl, difficultyLevel, } = req.body;
  cubeModels.create({ name, description, imageUrl, difficultyLevel: Number(difficultyLevel), });
  res.redirect("/");
});

router.get('/:cubeId/details', async (req, res) => {
  const cube = await Cube.findById(req.params.cubeId);

    if (!cube) {
        return res.redirect('/404');
    }
    
    res.render('details', { cube });
});

router.get('/:cubeId/attach', cubeModels.attachAccessory);

module.exports = router;

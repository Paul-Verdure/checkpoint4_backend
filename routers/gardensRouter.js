const gardensRouter = require("express").Router();
const Joi = require("joi");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const gardenValidation = Joi.object({
  gardenName: Joi.string().max(100).required(),
  img: Joi.string().max(100),
  numberOfSpots: Joi.number().required(),
});

const gardenSpotValidation = Joi.object({
  sowingDate: Joi.date().required(),
  harvestDate: Joi.date().required(),
  plantId: Joi.number().required(),
});

gardensRouter.get("/", async (req, res) => {
  const { userId } = req.query;
  const id = parseInt(userId)
  const allGardensByUser = await prisma.gardens.findMany({
    where: {
      userId: {
        equals: id,
      },
    },
  });
  res.json(allGardensByUser); 
});

gardensRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const gardenId = parseInt(id);
  const oneGarden = await prisma.gardens.findUnique({
    where: {
      id: gardenId,
    },
  });
  return res.json(oneGarden);
});

gardensRouter.post("/", async (req, res) => {
  const { userId } = req.query; 
  const id = parseInt(userId);

  const { value, error } = gardenValidation.validate(req.body);

  if (error) {
    return res.status(400).json(error);
  }

  const createdGarden = await prisma.gardens.create({
    
    data: {
      gardenName: value.gardenName,
      img: value.img,
      numberOfSpots: value.numberOfSpots,
      userId: id,
    },
  });
  return res.json(createdGarden);
});

gardensRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const gardenId = parseInt(id);

  const { value: validGarden, error } = gardenValidation.validate(req.body);

  if (error) {
    return res.status(422).json({ message: "Invalid data", error });
  }

  try {
    const updateGarden = await prisma.gardens.update({
      where: {
        id: gardenId,
      },
      data: {
        ...validGarden,
      },
    });
    return res.status(201).json({ id, ...validGarden });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error updating this garden" });
  }
});

gardensRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const gardenId = parseInt(id);

  try {
    const deleteGarden = await prisma.gardens.delete({
      where: {
        id: gardenId,
      },
    })

    return res.status(200).json({ message: `🎉 Garden ${id} deleted!` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Error deleting garden ${id}` });
  }
});

gardensRouter.post("/:id", async (req, res) => {
  const { id } = req.params;
  const gardenId = parseInt(id);

  const { value, error } = gardenSpotValidation.validate(req.body);

  if (error) {
    return res.status(400).json(error);
  }

  const createdGardenSpot = await prisma.gardenSpots.create({
    data: {
      sowingDate: value.sowingDate,
      harvestDate: value.harvestDate,
      plantId: value.plantId,
      gardenId: gardenId,
    },
  });
  return res.json(createdGardenSpot);
});


module.exports = gardensRouter;

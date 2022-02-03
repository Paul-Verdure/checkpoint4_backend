const gardenSpotsRouter = require("express").Router();
const Joi = require("joi");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const gardenSpotValidation = Joi.object({
  sowingDate: Joi.date().required(),
  harvestDate: Joi.date().required(),
  plantId: Joi.number().required(),
});

const gardenSpotUpdate = Joi.object({
  harvestDate: Joi.date(),

});

gardenSpotsRouter.get("/", async (req, res) => {
  const { gardenId } = req.query;
  const id = parseInt(gardenId)
  const allSpotsByGarden = await prisma.gardenSpots.findMany({
    where: {
      gardenId: {
        equals: id,
      },
    },
  });
  res.json(allSpotsByGarden);
});

gardenSpotsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const spotId = parseInt(id)
  const oneGardenSpot = await prisma.gardenSpots.findUnique({
    where: {
      id: spotId,
    },
  });
  return res.json(oneGardenSpot);
});



gardenSpotsRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const spotId = parseInt(id);

  const { value: validSpot, error } = gardenSpotUpdate.validate(req.body);

  if (error) {
    return res.status(422).json({ message: "Invalid data", error });
  }

  try {
    const updateSpot = await prisma.gardenSpots.update({
      where: {
        id: spotId,
      },
      data: {
        ...validSpot,
      },
    });
    return res.status(201).json({ id, ...validSpot });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error updating this spot" });
  }
});

gardenSpotsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const spotId = parseInt(id);

  try {
    const deleteSpot = await prisma.gardenSpots.delete({
      where: {
        id: spotId,
      },
    })

    return res.status(200).json({ message: `🎉 Spot ${id} deleted!` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Error deleting spot ${id}` });
  }
});

module.exports = gardenSpotsRouter;

const plantsRouter = require("express").Router();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

plantsRouter.get("/", async (req, res) => {
  const allPlants = await prisma.plants.findMany();
  res.json(allPlants);
});

plantsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const onePlant = await prisma.plants.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return res.json(onePlant);
});

module.exports = plantsRouter;

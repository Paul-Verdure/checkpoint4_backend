const usersRouter = require("express").Router();
const Joi = require("joi");
const argon2 = require("argon2");
const { generateJwt } = require('../utils/auth');

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const userValidation = Joi.object({
  userName: Joi.string().max(350).required(),
  email: Joi.string().max(200).required(),
  password: Joi.string().max(255).required(),
});

const loginValidation = Joi.object({
  email: Joi.string().max(200).required(),
  password: Joi.string().max(255).required(),
});


usersRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const oneUser = await prisma.users.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return res.json(oneUser);
});

usersRouter.post("/", async (req, res) => {
  const { value, error } = userValidation.validate(req.body);

  if (error) {
    return res.status(400).json(error);
  }

  const existingUser = await prisma.users.findFirst({
    where: {
      email: value.email,
    },
  })

  if (existingUser) {
    return res.status(409).json({
      message: 'User already exists',
    });
  }

  const hashedPassword = await argon2.hash(value.password);

  // insert user in database
  const createdUser = await prisma.users.create({
    data: {
      userName: value.userName,
      email: value.email,
      password: hashedPassword,
      isAdmin: false,
    },
  });

  return res.json(createdUser);
});

usersRouter.post('/login', async (req, res) => {
  const { value, error } = loginValidation.validate(req.body);

  if (error) {
    return res.status(400).json(error);
  }

  const existingUser = await prisma.users.findFirst({
    where: {
      email: value.email,
    },
  })

  if (!existingUser) {
    return res.status(403).json({
      message: 'Wrong user or password',
    });
  }

  const verified = await argon2.verify(existingUser.password, value.password);

  if (!verified) {
    console.log('argon2 verified fail');
    return res.status(403).json({
      message: 'Wrong user or password',
    });
  }

  const jwtKey = generateJwt(
    existingUser.email,
    existingUser.isAdmin,
  );

  return res.json({
    credential: jwtKey,
    id: existingUser.id,
    isAdmin: existingUser.isAdmin,
  });
});

module.exports = usersRouter;

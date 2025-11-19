import { Router } from "express";
import { PrismaClient } from "../../../generated/prisma/client.ts";
import bcrypt from 'bcrypt'

const userAPI = Router();

userAPI.post("/create", async (req, res) => {
  try {
    const prisma = new PrismaClient();
    const { username, email, password } = req.body;
    if (!username || !email || !password ) {
      res.status(400).json({error: "username, email, and password required"});
      return;
    }
    await prisma.user.create({
      data:{
        username,
        email,
        password: await bcrypt.hash(password, 10)
      }
    })
    res.sendStatus(201);
  }
  catch (error) {
    console.log(error.message)
    if (error.code === "P2002"){
      res.status(409).json({error: "user already exists"});
    }
    else {
      res.sendStatus(500);
    }
  }
})

export default userAPI
import { Router } from "express";
import * as db from '../database/index.js'
import venuesAPI from "./venues.js";

const tagAPI = Router();

tagAPI.post('/create', async (req, res) => {
  const {name} = req.body;
  try {
    const dbTag = await db.findOneBy('tag', {name});
    if (dbTag){
      res.sendStatus(409);
      return;
    }
    const created = await db.insertOne('tag', {name, color: `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, "0")}`, venueIDs: []});
    res.status(201).send({id: created.id});
  }
    catch(e){
    console.log(e.message);
    res.sendStatus(500);
  }
})

export default tagAPI;
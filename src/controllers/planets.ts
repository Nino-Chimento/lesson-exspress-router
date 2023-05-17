import { Request, Response } from "express";
import { db } from '../db.js';


  const getAllPlanets = async (req:Request,res:Response) => {
    const planets = await db.many(`SELECT * FROM planets;`)
  res.status(200).json(planets);
  };

  const getPlanetById = async (req:Request,res:Response) => {
    const {id} = req.params;
    const planet = await db.oneOrNone(`SELECT * FROM planets WHERE id=$1;`,Number(id))
    res.status(200).json(planet);
  };

 const createPlanet = async (req:Request,res:Response) => {
    const {name} = req.body;
    const planet = await db.oneOrNone(`INSERT INTO planets (name) VALUES ($1) RETURNING *;`,name)
    res.status(201).json(planet);
 }

  const updatePlanetById = async (req:Request,res:Response) => {
    const {id,name} = req.body;
    const planet = await db.oneOrNone(`UPDATE planets SET name=$1 WHERE id=$2 RETURNING *;`,[name,Number(id)])
    res.status(200).json(planet);
  }

  const deletePlanetById = async (req:Request,res:Response) => {
    const { id } = req.body;
    const planet = await db.oneOrNone(`DELETE FROM planets WHERE id=$1 RETURNING *;`,Number(id))
    res.status(200).json(planet);
  }

  export { 
    getAllPlanets,
    getPlanetById,
    updatePlanetById,
    createPlanet,
    deletePlanetById  
  }
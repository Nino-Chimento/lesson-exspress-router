import { Request, Response } from "express";
import { db } from '../db.js';
import { pathnameSchema } from "../validation.js";


  const getAllPlanets = async (req:Request,res:Response) => {
    const planets = await db.many(`SELECT * FROM planets;`)
    res.status(200).json(planets);
  };

  const getPlanetById = async (req:Request,res:Response) => {
    const {id} = req.params;
   /*  try {
      const planet = await db.one(`SELECT * FROM planets WHERE id=$1;`,Number(id))
      res.status(200).json(planet);
    } catch (error) {
      res.status(200).json({msg:"Planet not found id is not correct"});
    } */
   
    const planet = await db.oneOrNone(`SELECT * FROM planets WHERE id=$1;`,Number(id))
    res.status(200).json(planet);
  };

 const createPlanet = async (req:Request,res:Response) => {
    const {name} = req.body;
    if(!name) return res.status(404).json({msg:"Name is required"})
    
    const planet = await db.oneOrNone(`INSERT INTO planets (name) VALUES ($1) RETURNING *;`,name)
    res.status(201).json(planet);
 }

  const updatePlanetById = async (req:Request,res:Response) => {
    const {id,name,image} = req.body;

    
    const planet = await db.oneOrNone(`UPDATE planets SET name=$1,image=$3  WHERE id=$2 RETURNING *;`,[name,Number(id),image])
    res.status(200).json(planet);
  }

  const deletePlanetById = async (req:Request,res:Response) => {
    const { id } = req.body;
    const planet = await db.oneOrNone(`DELETE FROM planets WHERE id=$1 RETURNING *;`,Number(id))
    res.status(200).json(planet);
  }

  const createImage = async (req:Request, res:Response) => {
   
    const { id } = req.params;
    const filePath = req.file?.path;
    const validation = pathnameSchema.validate({ pathname: filePath });
    
    if(validation.error){
      return res.status(404).json({ msg: 'The image was not saved', validation });
    }
    db.none('UPDATE planets SET image = $1 WHERE id = $2', [filePath, id]);
    const planets = await db.oneOrNone('SELECT * FROM planets WHERE id = $1', [id]);
   
    
    res.status(201).json({ msg: 'The image was saved' });
  }

  export { 
    getAllPlanets,
    getPlanetById,
    updatePlanetById,
    createPlanet,
    deletePlanetById,
    createImage
  }
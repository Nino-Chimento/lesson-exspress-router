import { Request, Response } from "express";
import { planetSchema } from "../validation.js";
import { log } from "console";

let planets = [
    { id: 1, name: 'Mercury' },
    { id: 2, name: 'Venus' },
  ];

  const getAllPlanets = (req:Request, res:Response) => {
    res.status(200).json(planets);
  }

  const getPlanetsById = (req:Request, res:Response) => {
    const { id } = req.params;
    const planet = planets.find((planet) => planet.id === Number(id));
   res.status(200).json(planet);
  }

  const deletePlanetById = (req:Request, res:Response) => {
    const { id } = req.body;
  planets = planets.filter((planet) => planet.id !== Number(id));
  res.status(200).json({ msg: 'The planet was deleted', planets });
  }

  const createPlanet = (req:Request, res:Response) => {
    const { id, name } = req.body;
  const newPlanets = { id, name };
  const validateNewPlanets = planetSchema.validate(newPlanets);

  
  if(validateNewPlanets.error){
    return res.status(404).json({ msg: 'The planet was not created', validateNewPlanets });
  }
  
  planets = [...planets, newPlanets];
  res.status(201).json({ msg: 'The planet was created', planets });
  }

  const modifyPlanetById = (req:Request, res:Response) => {
    const {id, name } = req.body;
  planets = planets.map((planet) =>
    planet.id === Number(id) ? { ...planet, name } : planet
  );
  res.status(200).json({ msg: 'The planet was updated', planets });
  }


  export  { getAllPlanets,getPlanetsById,deletePlanetById,createPlanet,modifyPlanetById }
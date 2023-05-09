import express from 'express';
import morgan from 'morgan';
import Joi from "joi";

import { getAllPlanets } from './controllers/planets.js';
import { db,setupDb } from './db.js';


setupDb()

 const planetSchema = Joi.object({
    id:Joi.number().integer().required(),
    name: Joi.string().required(),
});

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.json());

let planets = [
  { id: 1, name: 'Mercury' },
  { id: 2, name: 'Venus' },
];

app.use(morgan('dev'));


app.get('/', (req, res) => {
  
  res.status(200).json({ message: 'Hello World!' });
});

app.get('/api/planets', async (req, res) => {
  const planets = await db.many(`SELECT * FROM planets;`)
  res.status(200).json(planets);
});

app.get('/api/planets/:id', async (req, res) => {
  const {id} = req.params;
  const planet = await db.oneOrNone(`SELECT * FROM planets WHERE id=$1;`,Number(id))
  res.status(200).json(planet);
});

app.post('/api/planets', (req, res) => {
  
  const { id, name } = req.body;
  const newPlanets = { id, name };
  const validateNewPlanets = planetSchema.validate(newPlanets);
  if(validateNewPlanets.error){
    return res.status(404).json({ msg: 'The planet was not created', validateNewPlanets });
  }
  
  planets = [...planets, newPlanets];
  res.status(201).json({ msg: 'The planet was created', planets });
});

app.put('/api/planets/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  planets = planets.map((planet) =>
    planet.id === Number(id) ? { ...planet, name } : planet
  );
  res.status(200).json({ msg: 'The planet was updated', planets });
});

app.delete('/api/planets/:id', (req, res) => {
  const { id } = req.params;
  planets = planets.filter((planet) => planet.id !== Number(id));
  res.status(200).json({ msg: 'The planet was deleted', planets });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

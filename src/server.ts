import express from 'express';
import morgan from 'morgan';

import { setupDb } from './db.js';
import { planetSchema } from './validation.js';
import {createPlanet, deletePlanetById, getAllPlanets, getPlanetsById, modifyPlanetById} from './controllers/planetsMock.js';

setupDb();

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.json());


app.use(morgan('dev'));

app.get('/', (req, res) => {  
  res.status(200).json({ message: 'Hello World!' });
});

app.get('/api/planets',  getAllPlanets);

app.get('/api/planets/:id', getPlanetsById);

app.post('/api/planets', createPlanet);

app.put('/api/planets', modifyPlanetById);

app.delete('/api/planets/', deletePlanetById);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});



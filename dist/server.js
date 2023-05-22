import express from 'express';
import morgan from 'morgan';
import { setupDb } from './db.js';
import { createPlanet, deletePlanetById, getAllPlanets, getPlanetById, updatePlanetById } from './controllers/planets.js';
import { upload } from './uploadImage.js';
import { createImage } from './controllers/planets.js';
setupDb();
const app = express();
const port = 3000;
app.use("/uploads", express.static('uploads'));
app.use("/static/", express.static('static'));
app.use(morgan('dev'));
app.use(express.json());
app.use(morgan('dev'));
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World!' });
});
app.get('/api/planets', getAllPlanets);
app.get('/api/planets/:id', getPlanetById);
app.post('/api/planets', createPlanet);
app.put('/api/planets', updatePlanetById);
app.delete('/api/planets/', deletePlanetById);
app.post('/api/planets/:id/image', upload.single("image"), createImage);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

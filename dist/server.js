import express from 'express';
import morgan from 'morgan';
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
app.get('/api/planets', (req, res) => {
    res.status(200).json(planets);
});
app.get('/api/planets:id', (req, res) => {
    res.status(200).json({ message: 'Hello World!' });
});
app.post('/api/planets', (req, res) => {
    const { id, name } = req.body;
    const newPlanets = { id, name };
    planets = [...planets, newPlanets];
    res.status(201).json({ msg: 'The planet was created', planets });
});
app.put('/api/planets/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    planets = planets.map((planet) => planet.id === Number(id) ? Object.assign(Object.assign({}, planet), { name }) : planet);
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

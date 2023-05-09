let planets = [
    { id: 1, name: 'Mercury' },
    { id: 2, name: 'Venus' },
];
const getAllPlanets = (req, res) => {
    res.status(200).json(planets);
};
export { getAllPlanets };

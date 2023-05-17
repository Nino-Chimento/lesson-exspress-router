var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { db } from '../db.js';
const getAllPlanets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const planets = yield db.many(`SELECT * FROM planets;`);
    res.status(200).json(planets);
});
const getPlanetById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const planet = yield db.oneOrNone(`SELECT * FROM planets WHERE id=$1;`, Number(id));
    res.status(200).json(planet);
});
const createPlanet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const planet = yield db.oneOrNone(`INSERT INTO planets (name) VALUES ($1) RETURNING *;`, name);
    res.status(201).json(planet);
});
const updatePlanetById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name } = req.body;
    const planet = yield db.oneOrNone(`UPDATE planets SET name=$1 WHERE id=$2 RETURNING *;`, [name, Number(id)]);
    res.status(200).json(planet);
});
const deletePlanetById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const planet = yield db.oneOrNone(`DELETE FROM planets WHERE id=$1 RETURNING *;`, Number(id));
    res.status(200).json(planet);
});
export { getAllPlanets, getPlanetById, updatePlanetById, createPlanet, deletePlanetById };

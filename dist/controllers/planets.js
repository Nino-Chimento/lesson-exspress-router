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
import { pathnameSchema } from "../validation.js";
const getAllPlanets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const planets = yield db.many(`SELECT * FROM planets;`);
    res.status(200).json(planets);
});
const getPlanetById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    /*  try {
       const planet = await db.one(`SELECT * FROM planets WHERE id=$1;`,Number(id))
       res.status(200).json(planet);
     } catch (error) {
       res.status(200).json({msg:"Planet not found id is not correct"});
     } */
    const planet = yield db.oneOrNone(`SELECT * FROM planets WHERE id=$1;`, Number(id));
    res.status(200).json(planet);
});
const createPlanet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    if (!name)
        return res.status(404).json({ msg: "Name is required" });
    const planet = yield db.oneOrNone(`INSERT INTO planets (name) VALUES ($1) RETURNING *;`, name);
    res.status(201).json(planet);
});
const updatePlanetById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, image } = req.body;
    console.log(image);
    const planet = yield db.oneOrNone(`UPDATE planets SET name=$1,image=$3  WHERE id=$2 RETURNING *;`, [name, Number(id), image]);
    res.status(200).json(planet);
});
const deletePlanetById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const planet = yield db.oneOrNone(`DELETE FROM planets WHERE id=$1 RETURNING *;`, Number(id));
    res.status(200).json(planet);
});
const createImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(req.file);
    const { id } = req.params;
    const filePath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    const validation = pathnameSchema.validate({ pathname: filePath });
    if (validation.error) {
        return res.status(404).json({ msg: 'The image was not saved', validation });
    }
    db.none('UPDATE planets SET image = $1 WHERE id = $2', [filePath, id]);
    const planets = yield db.oneOrNone('SELECT * FROM planets WHERE id = $1', [id]);
    console.log(planets);
    res.status(201).json({ msg: 'The image was saved' });
});
export { getAllPlanets, getPlanetById, updatePlanetById, createPlanet, deletePlanetById, createImage };

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
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield db.one('SELECT * FROM users WHERE username = $1', [username]);
        if (user && user.password === password) {
            const payload = { id: user.id, username: user.username };
            const token = jwt.sign(payload, process.env.SECRET);
            const userUpdate = yield db.one(`UPDATE users SET token = $1 WHERE id = $2 RETURNING *`, [token, user.id]);
            return res.status(200).json(userUpdate);
        }
        return res.status(403).json({ message: "username or password incorrect" });
    }
    catch (error) {
        res.status(401).json({ message: "User not found" });
    }
});
const userCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);
    if (user) {
        return res.status(409).json({ message: "Error data" });
    }
    const userCreate = yield db.one(`INSERT INTO users (username,password) VALUES ($1,$2) RETURNING *`, [username, password]);
    const payload = { id: userCreate.id, username: userCreate.username, role: "admin" };
    const token = jwt.sign(payload, process.env.SECRET);
    yield db.one(`UPDATE users SET token = $1 WHERE id = $2 RETURNING *`, [token, userCreate.id]);
    return res.status(201).json(token);
});
const userLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    try {
        yield db.one(`UPDATE users SET token = null WHERE id = $1 RETURNING id`, [user === null || user === void 0 ? void 0 : user.id]);
        res.status(200).json({ message: "User logged out" });
    }
    catch (error) {
        res.status(401).json({ message: "User not found" });
    }
});
export { userLogin, userCreate, userLogout };

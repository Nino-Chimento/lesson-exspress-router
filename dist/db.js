var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import pgPromise from "pg-promise";
import dotenv from "dotenv";
dotenv.config();
export const db = pgPromise()({
    host: "127.0.0.1",
    port: 5432,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
});
export const setupDb = () => __awaiter(void 0, void 0, void 0, function* () {
    yield db.none(`
        DROP TABLE IF EXISTS planets;

        CREATE TABLE IF NOT EXISTS  planets(   
        id SERIAL NOT NULL PRIMARY KEY,
        name TEXT NOT NULL
        );`);
    yield db.none(`INSERT INTO planets (name) VALUES ('Mercury');`);
    yield db.none(`INSERT INTO planets (name) VALUES ('Earth');`);
    const planets = yield db.many(`SELECT * FROM planets;`);
    console.log(planets);
});

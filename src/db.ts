import pgPromise from "pg-promise"
import dotenv from "dotenv"


dotenv.config();
export const db = pgPromise()({
    host: "127.0.0.1",
    port: 5432,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
});


export const setupDb = async () => {
   await db.none(`
        DROP TABLE IF EXISTS planets;

        CREATE TABLE IF NOT EXISTS  planets(   
        id SERIAL NOT NULL PRIMARY KEY,
        name TEXT NOT NULL
        );`
    )
    await db.none(`INSERT INTO planets (name) VALUES ('Mercury');`)
    await db.none(`INSERT INTO planets (name) VALUES ('Earth');`)

    const planets = await db.many(`SELECT * FROM planets;`)
    console.log(planets);
            
};
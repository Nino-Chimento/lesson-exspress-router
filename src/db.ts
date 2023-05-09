import pgPromise from "pg-promise";

export const db = pgPromise()({
    host: "127.0.0.1",
    port: 5432,
    database: "testdb",
    user: "pgadmin",
    password: "secure_password",
});


export const setupDb = async () => {
   await db.none(`
        DROP TABLE IF EXISTS planets;

        CREATE TABLE planets(   
        id SERIAL NOT NULL PRIMARY KEY,
        name TEXT NOT NULL
        );`
    )
    await db.none(`INSERT INTO planets (name) VALUES ('Mercury');`)
    await db.none(`INSERT INTO planets (name) VALUES ('Earth');`)

    const planets = await db.many(`SELECT * FROM planets;`)
    console.log(planets);
            
};
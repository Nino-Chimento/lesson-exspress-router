import { log } from "console";
import express from "express";

const app = express()

app.use((req, res, next) => {
    console.log("call middleware");
    res.setHeader("x-custom-header", "foobar");
    console.log(req.headers);
    next();
    
});

app.use((req, res, next) => {
    console.log("call middleware 2");
    res.json({message: "Hello World!"});
    next();
    
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
});
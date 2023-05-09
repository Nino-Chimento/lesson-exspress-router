
import { createReadStream } from "fs";

const file = createReadStream("file-1.txt",{encoding:"utf-8"});

file.on("data", (chunk) => {
    console.log("chunk",chunk.toString("utf8"));
});

file.on("error", (error) => {
    console.log("error",error);
}  );

file.on("end", () => {
    console.log("end");
});
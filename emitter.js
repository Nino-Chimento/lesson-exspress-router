import { EventEmitter } from "events";

const emitter = new EventEmitter();
emitter.on("data", (data) => {
    console.log(data);
});

setInterval(() => {
    emitter.emit("data", "Hello, World!");
}, 1000);
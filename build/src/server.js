"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable prettier/prettier */
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
let app = undefined;
const PORT = 3001;
app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
const index_html_1 = require("./index.html");
app.get('/', (_req, res) => {
    res.send(index_html_1.html);
});
app.get('/test', (_req, res) => {
    res.status(200).json({
        "Foo": "Bar",
        "Time": new Date().toISOString()
    });
});
app.post('/quotes', (_req, res) => {
    console.log('Hellooooooooooooooooo!');
    res.status(200).json({ "Success": "Quote Post" });
});
app.post('/login', (req, res) => {
    const success = req.body.username === "foo"
        && req.body.password === "bar";
    res.status(200).json({ "Success": success });
});
app.get('/article/:id', (req, res) => {
    const id = req.query.id;
    // Fetch from database here and return article        
    res.status(200).json({ ID: id });
});
app.put('/article/:id', (req, res) => {
    console.log(`Updating article ${req.query.id}`);
    console.log(`setting name to ${req.body.name}`);
    res.status(200).json({ Success: true });
});
// Add 404 handler
app.use((_req, res) => {
    res.status(404).send("Not found");
});
http_1.default.createServer(app).listen(PORT, () => console.log(`Webserver running at http://localhost:${PORT}/`));
//# sourceMappingURL=server.js.map
/* eslint-disable prettier/prettier */
import Express from 'express';
import http from 'http';
import { Send, Query } from 'express-serve-static-core';

const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://admin:admin123@localhost:27017/test?retryWrites=true&w=majority'


let app: Express.Application | undefined = undefined;
const PORT = 3001;

/*Todo 
- Automatically Convert TypeScript Types to Runtime Validators
- Resolve security issue of bad payloads { username: undefined, password: ["Hello", "World"] } - validate the incoming payload
*/

// Simpliy and import types from express-serve-static-core not exposed by Express
export interface TypedRequestQuery<T extends Query> extends Express.Request {
    query: T
}
export interface TypedRequestBody<T> extends Express.Request {
    body: T
}

export interface TypedRequest<T extends Query, U> extends Express.Request {
    body: U,
    query: T
}

app = Express();
app.use(Express.urlencoded({ extended: true }));

import { html } from './index.html'
app.get('/', (_req: Express.Request, res: Express.Response) => {
    res.send(html)
    });

app.get('/test', (_req: Express.Request, res: Express.Response) => {
    res.status(200).json({
        "Foo": "Bar",
        "Time": new Date().toISOString()
    });
});

app.post('/quotes', (req: Express.Request, res: Express.Response) => {
    res.status(200).json({ "Success": req.body });
});

app.post('/login', (req: TypedRequestBody<{ username: string, password: string }>, res: Express.Response) => {
    const success = req.body.username === "foo"
        && req.body.password === "bar";
    res.status(200).json({ "Success": success });
});

app.get('/article/:id', (req: TypedRequestQuery<{ id: string }>, res: Express.Response) => {
    const id = req.query.id;
    // Fetch from database here and return article        
    res.status(200).json({ ID: id });
});

app.put('/article/:id', (req: TypedRequest<{ id: string }, { name: string }>, res: Express.Response) => {
    console.log(`Updating article ${req.query.id}`);
    console.log(`setting name to ${req.body.name}`);
    res.status(200).json({ Success: true });
});

// Add 404 handler
app.use((_req: Express.Request, res: Express.Response) => {
    res.status(404).send("Not found");
});


http.createServer(app).listen(PORT, () => console.log(`Webserver running at http://localhost:${PORT}/`));
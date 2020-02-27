import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import adminRouter from './src/routes/adminRoutes';
import monumentsRouter from './src/routes/monumentsRoutes';
import MongoManager from "./src/classes/MongoManager";


const morgan = require('morgan');
const debug = require('debug')('app');

const port = process.env.PORT || 3000;
const app = express();

app.use(morgan('tiny'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/public/')));

app.get('/', (req: any, res: any) => {
    res.send('hello world');
});

const dbManager = new MongoManager();

app.use("/admin", adminRouter(dbManager));
app.use("/monuments", monumentsRouter(dbManager));

app.listen(port, () => {
    debug('Express server listening on port ' + port);
});

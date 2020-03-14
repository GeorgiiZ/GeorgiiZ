import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import adminRouter from './src/routes/adminRoutes';
import monumentsRouter from './src/routes/monumentsRoutes';
import authRouter from './src/routes/authRoutes';
import MongoManager from "./src/classes/MongoManager";
import { passportConfig } from './src/passport/passport';
const morgan = require('morgan');
const debug = require('debug')('app');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const sessionMiddleware = session({
    secret: 'library',
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 10 * 60 * 1000,
        httpOnly: false,
    },
});

const port = process.env.PORT || 3000;
const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sessionMiddleware);

app.use(express.static(path.join(__dirname, '/public/')));

app.get('/', (req: any, res: any) => {
    res.send('hello world');
});

const dbManager = new MongoManager();

passportConfig(app, dbManager);

app.use("/admin", adminRouter(dbManager));
app.use("/monuments", monumentsRouter(dbManager));
app.use("/auth", authRouter(dbManager));

app.listen(port, () => {
    debug('Express server listening on port ' + port);
});

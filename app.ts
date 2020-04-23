import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import monumentsRouter from './src/routes/monumentsRoutes';
import authRouter from './src/routes/authRoutes';
import MongoManager from "./src/services/MongoManager";
import { passportConfig } from './src/passport/passport';
const morgan = require('morgan');
const debug = require('debug')('app');
const cookieParser = require('cookie-parser');
const redis = require('redis')
const session = require('express-session');

let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient()

redisClient.on('connect', function() {
    console.log('Redis client connected');
});


redisClient.on('error', function (err: any) {
    console.log('Something went wrong ' + err);
});

const sessionMiddleware = session({
    store: new RedisStore({ client: redisClient }),
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

app.use("/monuments", monumentsRouter(dbManager, redisClient));
app.use("/auth", authRouter(dbManager));

app.listen(port, () => {
    debug('Express server listening on port ' + port);
});

import express from 'express';
import bodyParser from 'body-parser';
const morgan = require('morgan');
const debug = require('debug')('app');

const port = process.env.PORT || 3000;
const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req: any, res: any) => {
    res.send('hello world');
});

// import { adminRouter: } from './src/routes/adminRoutes';

// app.use("/admin", adminRouter);

app.listen(port, () => {
    debug('Express server listening on port ' + port);
});

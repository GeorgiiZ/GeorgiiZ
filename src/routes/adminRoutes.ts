const express = require('express');

const adminRouter = express.Router();

function router() {
    adminRouter.route('/')
        .get((req: any, res: any) => {
            res.send('hello admin');
        })
}

export { router };

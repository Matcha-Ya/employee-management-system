import express = require('express');
import * as bodyParser from "body-parser";
import * as path from 'path';
import { BunyanHelper } from './helpers/BunyanHelper';
import { AccountsRoutes } from './routes/AccountsRoutes';
import * as cors from "cors";
import { CompanyRoutes } from './routes/CompanyRoutes';
import { StockHistoryRoutes } from './routes/StockHistoryRoutes';

export class App {

    public app: express.Application = express();

    constructor() {
        this.appConfig();
        this.app.use('/accounts', new AccountsRoutes(express).router);
        this.app.use('/company', new CompanyRoutes(express).router);
        this.app.use('/stock', new StockHistoryRoutes(express).router);
    }

    private appConfig(): void {

        this.app.enable('trust proxy');
        // this.app.use(new helmet());
        // this.app.set('port', 1111);
        // create a rotating write streambun
        // this.app.use(morgan.default("combined", {
        //     stream: requestLogStream
        // }));
        this.app.use((request, response, next) => {
            BunyanHelper.requestLogger.warn({ req: request, res: response }, "Request Response");
            next();
        })
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        // Ran on all routes
        this.app.use((req, res, next) => {
            res.setHeader('Cache-Control', 'no-cache, no-store');
            res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
            next();
        });

        this.app.use(cors.default())
        this.app.options('*', cors.default())

        // serving static files 
        // this.app.use(express.static('public'));
    }

}

// export default new App().app;

/*

// import express = require('express');
// import colors = require('colors');
// import bodyParser = require('body-parser');
// import helmet = require('helmet');

// require the routes
const accountsRoute = require('./routes/accounts');


let app = express();


        this.app.enable('trust proxy');
        this.app.use(helmet());
        this.app.set('port', 1111);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));



// setup the routes
// app.use('/', accountsRoute);




// // catch 404 and forward to error handler
// app.use((req, res, next) => {
//     res.status(404);
//     res.send('No API Found');
//     // const err = new Error('Not Found');
//     // err.status = 404;
//     // next(err);
// });

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'develop
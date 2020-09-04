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
 
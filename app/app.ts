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
        this.a
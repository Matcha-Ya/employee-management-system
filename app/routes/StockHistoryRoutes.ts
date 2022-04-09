import { Request, Response } from 'express';
import { GlobalHelper } from '../helpers/GlobalHelper';
import { CustomResponse } from '../models/GeneralModels';
import { StockHistoryController } from '../controllers/StockHistoryController';
import { ScrapStockHistory } from '../models/StockHistoryModels';
/**
 * Routes for Account Controller
 */
export class StockHistoryRoutes {
    publ
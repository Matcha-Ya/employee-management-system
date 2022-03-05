import { Request, Response } from 'express';
import { AccountsController } from '../controllers/AccountsController';
import { SignUpRequestModel } from '../models/AccountsModels';
import { GlobalHelper } from '../helpers/GlobalHelper';
import { CustomResponse } from '../models/GeneralModels';
/**
 * Routes for Account Controller
 */
export class AccountsRoutes {
    public router: any;
    private accountsController: AccountsController = new AccountsController();
    private globalHelper: GlobalHelper;
    constructor(express: any) {
        this.router = express.Router();
        this.globalHelper = new GlobalHelper();
        this.assignRoutes();
    }

    p
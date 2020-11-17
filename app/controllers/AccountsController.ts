import { CustomResponse } from '../models/GeneralModels';
import { SignUpRequestModel } from '../models/AccountsModels';
import { AccountsDbHelper } from '../helpers/DbHelpers/AccountsDbHelper';
import { BunyanHelper } from '../helpers/BunyanHelper';
import { GlobalHelper } from '../helpers/GlobalHelper';
import * as path from 'path';
import e = require('express');
import { ProceduresDbHelper } from '../helpers/DbHelpers/ProceduresDbHelper';

export class AccountsController {
    private globalHelper: GlobalHelper;
    private accountDbHelper: AccountsDbHelper;
    private procedureDbHelper: ProceduresDbHelper;
    private globalConfig: any;

    constructor() {
        this.globalHelper = new GlobalHelper();
        this.accountDbHelper = new AccountsDbHelper();
        this.procedureDbHelper = new ProceduresDbHelper();
        this.globalConfig = this.globalHelper.getConfig("global");
    }

    public async signUpUser(req: SignUpRequestModel): Promise<CustomResponse> {
        var customRes
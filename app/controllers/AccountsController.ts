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
    private proce
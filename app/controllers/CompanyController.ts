
import { CustomResponse } from '../models/GeneralModels';
import { SignUpRequestModel } from '../models/AccountsModels';
import { AccountsDbHelper } from '../helpers/DbHelpers/AccountsDbHelper';
import { BunyanHelper } from '../helpers/BunyanHelper';
import { GlobalHelper } from '../helpers/GlobalHelper';
import * as path from 'path';
import e = require('express');
import { request as urllibRequest, RequestOptions, HttpClientResponse } from "urllib";
import { ProceduresDbHelper } from '../helpers/DbHelpers/ProceduresDbHelper';
import { CompaniesDbHelper, CompaniesSingleRow } from '../helpers/DbHelpers/CompaniesDbHelper';
import { ScrapCompanyDetails } from '../models/CompanyModels';

export class CompanyController {
    private globalHelper: GlobalHelper;
    private companiesDbHelper: CompaniesDbHelper;
    private globalConfig: any;

    constructor() {
        this.globalHelper = new GlobalHelper();
        this.companiesDbHelper = new CompaniesDbHelper();
        this.globalConfig = this.globalHelper.getConfig("global");
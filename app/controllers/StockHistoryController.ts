import { CustomResponse } from '../models/GeneralModels';
import { BunyanHelper } from '../helpers/BunyanHelper';
import { GlobalHelper } from '../helpers/GlobalHelper';
import * as path from 'path';
import e = require('express');
import { request as urllibRequest, RequestOptions, HttpClientResponse } from "urllib";
import { CompaniesDbHelper, CompaniesSingleRow, CompaniesOtherDataJson } from '../helpers/DbHelpers/CompaniesDbHelper';
import { ScrapStockHistory } from '../models/StockHistoryModels';
import { StocksHistorySingleRow, StockHistoryDbHelper } from '../helpers/DbHelpers/StockHistoryDbHelper';

export class StockHistoryController {
    private globalHelper: GlobalHelper;
    private companiesDbHelper: CompaniesDbHelper;
    private stockHistoryDbHelper: StockHistoryDbHelper;
    private globalConfig: any;

    constructor() {
        this.globalHelper = new GlobalHelper();
        this.companiesDbHelper = new CompaniesDbHelper();
        this.stockHistoryDbHelper = new StockHistoryDbHelper();
        this.globalConfig = this.globalHelper.getConfig("global");
    }

    public async scrapStockHistory(req: ScrapStockHistory): Promise<CustomResponse> {
        var customResponse = new CustomResponse();
        try {

            if (req.symbol_code != null) {

                let companyDetails = await this.companiesDbHelper.getCompanyBy("company_symbol_code", req.symbol_code, 0);

                if (companyDetails.isError) {
                    customResponse.error_code = 404;
                    customResponse.error_messages = 'No such company found, please try scraping company details first';
                    customResponse.result = null;
                } else {

                    let companyDetailsRow = companyDetails.result[0][0] as Compa
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

                    let companyDetailsRow = companyDetails.result[0][0] as CompaniesSingleRow;

                    const companyId = companyDetailsRow.id;
                    const companySymbolCode = companyDetailsRow.company_symbol_code;
                    const indMoneyCompanyCode = companyDetailsRow.other_data?.indmoney_company_code;

                    const currentDate = new Date();
                    let onDateValueString = ((currentDate.getFullYear()) + "-" + (currentDate.getMonth() + 1) + "-" + (currentDate.getDate())).toString();
                    const urlToRequest: string = "https://indiawealth.in/api/v1/explore/stocksHistory/" + (indMoneyCompanyCode?.toString()) + "/?format=json&start_date=1971-01-01&end_date=" + onDateValueString;

                    var requestHeaders = {
                        headers: {
                            "accept": "application/json, text/plain, */*",
                            "accept-language": "en-US,en;q=0.9",
                            "sec-fetch-dest": "empty",
                            "sec-fetch-mode": "cors",
                            "sec-fetch-site": "cross-site",
                        },
                        method: "GET",
                        timeout: 50000
                    } as RequestOptions;

                    await urllibRequest(urlToRequest, requestHeaders)
                        .then(
                            async (value: HttpClientResponse<any>) => {
                                var responseBody = JSON.parse(value.data.toString());

                                if (companyId != null && companySymbolCode != null) {
                                    let companyStockHistory = await this.stockHistoryDbHelper.getStockHistory(companyId, "desc", 1)

                                    let lastOnDate = new Date("1971-01-01");
                                    if (companyStockHistory.isError) {
                                        // Means its already not their
                                    } else {
                                        let lastOnDateInstant = (companyStockHistory.result[0][0] as StocksHistorySingleRow).on_date;
                                        if (lastOnDateInstant != undefined) {
                                            lastOnDate = lastOnDateInstant;
                                        }
                                    }

                                    for (let index = 0; index < responseBody["data"]["stockGraph"].length; index++) {
                                        const responseSingleStocksHistory = responseBody["data"]["stockGraph"][index];

                                        const onDate = new Date(responseSingleStocksHistory["date"] + " 00:00:00");
                                        const closePrice = responseSingleStocksHistory["value"];
                                        const highPrice = responseSingleStocksHistory["highPrice"];
                                        const lowPrice = responseSingleStocksHistory["lowPrice"];
                                        const volume = responseSingleStocksHistory["volume"];
                                        const openPrice = responseSingleStocksHistory["openPrice"];
                                        const per = responseSingleStocksHistory["per"];

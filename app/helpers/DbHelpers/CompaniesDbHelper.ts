
import { MySQLHelper } from '../MySQLHelper';
import { GlobalHelper } from '../GlobalHelper';
import { BunyanHelper } from "../BunyanHelper";
import { DbHelperReturn } from '../../models/GeneralModels';

export class CompaniesDbHelper {
    private globalHelper: GlobalHelper;
    private globalConfig: any;

    constructor() {
        this.globalHelper = new GlobalHelper();
        this.globalConfig = this.globalHelper.getConfig("global");
    }

    public async insertCompany(
        companySingleRow: CompaniesSingleRow
    ): Promise<DbHelperReturn> {

        var insertCompanyReturn = new DbHelperReturn();

        try {

            let sqlQuery = ""
                + "INSERT INTO `companies`"
                + "("
                + "`company_symbol_code`,"
                + "`market_exchange`,"
                + "`company_name`,"
                + "`company_sector`,"
                + "`isin`,"
                + "`company_mf_sector`,"
                + "`other_data`,"
                + "`dead`"
                + ")"
                + "VALUES"
                + "("
                + "?,"
                + "?,"
                + "?,"
                + "?,"
                + "?,"
                + "?,"
                + "?,"
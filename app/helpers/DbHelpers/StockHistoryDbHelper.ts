
import { MySQLHelper } from '../MySQLHelper';
import { GlobalHelper } from '../GlobalHelper';
import { BunyanHelper } from "../BunyanHelper";
import { DbHelperReturn } from '../../models/GeneralModels';

export class StockHistoryDbHelper {
    private globalHelper: GlobalHelper;
    private globalConfig: any;

    constructor() {
        this.globalHelper = new GlobalHelper();
        this.globalConfig = this.globalHelper.getConfig("global");
    }

    public async insertStockHistory(
        stockHistorySingleRow: StocksHistorySingleRow
    ): Promise<DbHelperReturn> {

        var insertStockHistoryReturn = new DbHelperReturn();

        try {

            let sqlQuery = ""
                + "INSERT INTO `stocks_history`"
                + "("
                + "`company_id`,"
                + "`on_date`,"
                + "`open_price`,"
                + "`high_price`,"
                + "`low_price`,"
                + "`close_price`,"
                + "`per`,"
                + "`volume`,"
                + "`dead`"
                + ")"
                + "VALUES"
                + "("
                + "?,"
                + "(SELECT STR_TO_DATE(?,'%Y-%m-%d')),"
                + "?,"
                + "?,"
                + "?,"
                + "?,"
                + "?,"
                + "?,"
                + "? "
                + ")";

            if (this.globalConfig["settings"]["log_verbose"]) {
                BunyanHelper.activityLogger.info(sqlQuery);
            }

            let onDateValueString = "";
            if (stockHistorySingleRow.on_date != null) {
                onDateValueString = ((stockHistorySingleRow.on_date.getFullYear()) + "-" + (stockHistorySingleRow.on_date.getMonth() + 1) + "-" + (stockHistorySingleRow.on_date.getDate())).toString();
            } else {
                BunyanHelper.activityLogger.error("on_date is null");
            }

            let results = await MySQLHelper.executeQuery(sqlQuery, [
                stockHistorySingleRow.company_id,
                onDateValueString,
                stockHistorySingleRow.open_price,
                stockHistorySingleRow.high_price,
                stockHistorySingleRow.low_price,
                stockHistorySingleRow.close_price,
                stockHistorySingleRow.per,
                stockHistorySingleRow.volume,
                stockHistorySingleRow.dead == null ? 0 : stockHistorySingleRow.dead
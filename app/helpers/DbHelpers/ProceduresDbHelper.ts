import { MySQLHelper } from '../MySQLHelper';
import { GlobalHelper } from '../GlobalHelper';
import { } from "promise";
import { BunyanHelper } from "../BunyanHelper";
import { DbHelperReturn, DatatableRequestModel } from '../../models/GeneralModels';

/**
 * Every procedure of our database should be called from here.
 * So that any parameter changes and procedure response changes can be done directly inside here rather than look to into each and every database helper.
 *  ## Why single procedure db  helper? 
 *  - Its because in MySQL Procedures are also all in one folder, they are not like individual tables related like Triggers.
 */
export class ProceduresDbHelper {
    private globalHelper: GlobalHelper;
    private globalConfig: any;

    constructor() {
        this.globalHelper = new GlobalHelper();
        this.globalConfig = this.globalHelper.getConfig("global");
    }

    /**
     * returns all users
     */
    public async getUsers(dataTableRequestParams: DatatableRequestModel): Promise<DbHelperReturn> {
        var usersReturn = new DbHelperReturn();
        try {
            // var sqlQuery = "SELECT * FROM `users`";
            var sqlQuery = "CALL get_users(?, ?, ?, ?, ?, ?, @num_rows); select @num_rows as num_rows;";
            BunyanHelper.activityLogger.info(sqlQuery);

            var args = new Array();
            args.push(
                '',
                dataTableRe
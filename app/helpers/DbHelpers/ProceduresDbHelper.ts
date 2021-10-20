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
    public async getUsers(dataTableR
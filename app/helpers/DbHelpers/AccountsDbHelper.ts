import { MySQLHelper } from '../MySQLHelper';
import { GlobalHelper } from '../GlobalHelper';
import { BunyanHelper } from "../BunyanHelper";
import { DbHelperReturn } from '../../models/GeneralModels';

export class AccountsDbHelper {
    private globalHelper: GlobalHelper;
    private globalConfig: any;

    constructor() {
        this.glo
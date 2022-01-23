
import * as mysql from 'mysql2';
import { BunyanHelper } from './BunyanHelper';
import { GlobalHelper } from './GlobalHelper';
export class MySQLHelper {

    private static globalConfig = new GlobalHelper().getConfig("global")["database"];

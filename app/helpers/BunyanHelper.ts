import * as bunyan from 'bunyan';
import * as fs from 'fs';
import * as path from 'path';
import { GlobalHelper } from './GlobalHelper';
export class BunyanHelper {

    public static date = new Date().toJSON().slice(0, 10);
    // public static logsDirWithDate = path.resolve(__dirname, "..", "..", "logs", BunyanHelper.date);
    public static logDir = new GlobalHelper().getConfig("global")["settings"]["log_dir"];
    public static logsDirWithDate = path.resolve(BunyanHelper.logDir, "logs"
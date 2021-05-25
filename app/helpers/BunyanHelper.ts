import * as bunyan from 'bunyan';
import * as fs from 'fs';
import * as path from 'path';
import { GlobalHelper } from './GlobalHelper';
export class BunyanHelper {

    public static date = new Date().toJSON().slice(0, 10);
    // public static logsDirWithDate = path.resolve(__dirname, "..", "..", "logs", BunyanHelper.date);
    public static logDir = new GlobalHelper().getConfig("global")["settings"]["log_dir"];
    public static logsDirWithDate = path.resolve(BunyanHelper.logDir, "logs", BunyanHelper.date);

    /**
     * creates folder for logs if not available
     */
    public static createLogsDirectory(): fs.PathLike {
        if (!fs.existsSync(BunyanHelper.logsDirWithDate)) {
            fs.mkdirSync(BunyanHelper.logsDirWithDate, { recursive: true, mode: 0o777 } as fs.MakeDirectoryOptions);
        }
        return BunyanHelper.logsDirWithDate;
    };

    /**
     * writes activity logs
     */
    public static activityLogger = bunyan.createLogger({
        name: 'ACTIVITY',
        level: "info",
        src: true,
        streams: [
            {
                path: path.resolve(BunyanHelper.createLogsDirectory().toString(), "Activity.log.json")
                // `type: 'file'` is implied
            },
            {
                stream: process.stdout
            }
        ],
        serializers: {
            req: bunyan.stdSerializers.req,
            res: bunyan.stdSerializers.res,
            err: bunyan.stdSerializers.err
        }
    });

    /**
     * writes error logs
     */
    public static errorLo
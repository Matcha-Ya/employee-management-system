import { readFileSync } from "fs";
import { join } from "path";
import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt';



export class GlobalHelper {

    constructor() {

    }

    public getConfig(fileName: "global" | "payment"): any {
        let configJson = JSON.parse(readFileSync(join(__dirname, '../configs', fileName + ".json"), 'utf8'));
        return configJson;
    }

    public getNewUUID(): string {
        return uuid.v4();
    }

    /**
     * Hashing of string using bcrypt.
     * salt is inside static passed, if the value of salt is changed then it will make each and every password expire.
     * @param str string hash
     */
    public hashString(str: string): string {
        return bcrypt.hashSync(str, 10);
    }

    public verifyHash(hashString: string, rawStr: string): boolean {
        if (bcrypt.compareSync(rawStr, hashString)) {
            return true;
        } else {
            return false;
        }
    }


    public escapeRegExp(str: string) {
        return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    }

    public replaceAll(str: string, find: string, replace: string) {
        return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
    }

    /**
     * @return Dat in MySQL TIMESTAMP Format
     * @param inputDate date in typescript date datatype
     */
    public getMySQLDateFormat(inputDate: Date) {

        if (inputDate == null) {
            inputDate = new Date();
        }

        const result = inputDate.getFullYear() + '-' +
            ('00' + (inputDate.getMonth() + 1)).slice(-2) + '-' +
            ('00' + inputDate.getDate()).slice(-2) + ' ' +
            ('00' + inputDate.getHours()).slice(-2) + ':
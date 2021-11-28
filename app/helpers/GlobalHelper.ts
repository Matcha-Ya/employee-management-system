import { readFileSync } from "fs";
import { join } from "path";
import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt';



export class GlobalHelper {

    constructor() {

    }

    public getConfig(fileName: "global" | "payment"): any {
        let configJson = JSON.parse(readFileSync(joi
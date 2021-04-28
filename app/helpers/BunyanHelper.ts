import * as bunyan from 'bunyan';
import * as fs from 'fs';
import * as path from 'path';
import { GlobalHelper } from './GlobalHelper';
export class BunyanHelper {

    public static date = new Date().toJSON().slice(0, 10);
    // public stat
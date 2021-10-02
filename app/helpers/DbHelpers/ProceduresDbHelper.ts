import { MySQLHelper } from '../MySQLHelper';
import { GlobalHelper } from '../GlobalHelper';
import { } from "promise";
import { BunyanHelper } from "../BunyanHelper";
import { DbHelperReturn, DatatableRequestModel } from '../../models/GeneralModels';

/**
 * Every procedure of our database should be called from here.
 * So that any parameter changes and procedure response changes can be don
import { Request, Response } from 'express';
import { AccountsController } from '../controllers/AccountsController';
import { SignUpRequestModel } from '../models/AccountsModels';
import { GlobalHelper } from '../helpers/GlobalHelper';
import { CustomResponse } from '../models/GeneralModels';
/**
 * Routes for Account Controller
 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var path_1 = require("path");
var ENV = process.env.NODE_ENV || 'development';
dotenv_1.default.config({ path: path_1.default.join(import.meta.dirname, '.env') });
console.log(process.env);

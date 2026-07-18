"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = exports.loginSchema = void 0;
var login_validator_1 = require("./login.validator");
Object.defineProperty(exports, "loginSchema", { enumerable: true, get: function () { return login_validator_1.loginSchema; } });
var register_validator_1 = require("./register.validator");
Object.defineProperty(exports, "registerSchema", { enumerable: true, get: function () { return register_validator_1.registerSchema; } });

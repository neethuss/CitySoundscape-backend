"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwtUtils_1 = require("../Utils/jwtUtils");
const authenticationMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        //extract token from authorization header
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        if (!token) {
            return res.status(401).send({ error: 'Authentication failed. Token missing.' });
        }
        //verify token and extract payload
        const decoded = (0, jwtUtils_1.verifyAccessToken)(token);
        //attach the decoded user data to the request object
        req.user = decoded.username;
        req.token = token;
        next();
    }
    catch (error) {
        console.error('❌ Authentication error:', error);
        // if token expired
        if (error instanceof Error && error.message.includes('expired')) {
            return res.status(401).send({ error: 'Token expired. Please refresh your token.' });
        }
        return res.status(401).send({ error: 'Authentication failed. Invalid token.' });
    }
});
exports.default = authenticationMiddleware;

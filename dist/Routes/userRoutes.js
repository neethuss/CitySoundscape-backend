"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController = require('../Controllers/userController');
const router = (0, express_1.Router)();
router.post('/signup', UserController.postSignup);
router.post('/login', UserController.postLogin);
exports.default = router;

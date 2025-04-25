"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const dbConfig_1 = __importDefault(require("./Configs/dbConfig"));
const userRoutes_1 = __importDefault(require("./Routes/userRoutes"));
const soundScapeRoutes_1 = __importDefault(require("./Routes/soundScapeRoutes"));
//load env from .env
dotenv_1.default.config();
const app = (0, express_1.default)();
//connect to database
(0, dbConfig_1.default)();
const port = process.env.PORT || 3000;
//middleware to handle cors
app.use((0, cors_1.default)({
    origin: ["https://city-soundscape-frontend.vercel.app/", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/user/', userRoutes_1.default);
app.use('/soundscape/', soundScapeRoutes_1.default);
app.get('/', (req, res) => {
    res.send('API is running!');
});
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err.stack || err);
    res.status(500).json({ message: 'Internal Server Error' });
});
app.listen(port, () => {
    console.log(`Backend server conneted at port ${port}`);
});

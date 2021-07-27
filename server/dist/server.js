"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var morgan_1 = __importDefault(require("morgan"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var restaurant_1 = __importDefault(require("./routes/restaurant"));
dotenv_1.default.config();
var app = express_1.default();
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use('/api/restaurants', restaurant_1.default);
var PORT = process.env.PORT || 3005;
app.listen(PORT, function () { return console.log("server is listening on http://localhost:" + PORT); });
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var routes_1 = __importDefault(require("./routes"));
var App = /** @class */ (function () {
    function App() {
        this.server = express_1.default();
        this.middlewares();
        this.routes();
    }
    App.prototype.routes = function () {
        this.server.use(routes_1.default);
    };
    App.prototype.middlewares = function () {
        this.server.use(morgan_1.default('tiny'));
        this.server.use(cors_1.default());
        this.server.use(express_1.default.json());
    };
    return App;
}());
var app = new App();
exports.default = app;

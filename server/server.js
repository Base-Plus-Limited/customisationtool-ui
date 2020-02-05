"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var dotenv_1 = __importDefault(require("dotenv"));
var request = __importStar(require("superagent"));
var path_1 = require("path");
var mongoose_1 = __importDefault(require("mongoose"));
dotenv_1["default"].config();
var array_prototype_flatmap_1 = __importDefault(require("array.prototype.flatmap"));
var App = /** @class */ (function () {
    // private completedQuizModel = this.createCompletedQuizModel();
    function App() {
        var _this = this;
        this.returnUniqueCategories = function (categories) {
            return categories.filter(function (value, index, categories) { return categories.findIndex(function (cat) { return (cat.id === value.id); }) === index; });
        };
        this.returnCategorisedIngredients = function (categories, ingredients) {
            return categories.map(function (category, index) {
                var categorisedIngredients = array_prototype_flatmap_1["default"](ingredients, function (ingredient) {
                    var x = ingredient;
                    x.selected = false;
                    x.recentlySelected = false;
                    return x.tags.map(function (tag) {
                        if (category.id === tag.id)
                            return x;
                    });
                }).filter(function (product) { return product !== undefined; });
                return {
                    category: _this.capitaliseFirstLetter(category.name),
                    id: category.id,
                    ingredients: categorisedIngredients,
                    count: categorisedIngredients.length,
                    selected: index === 0 ? true : false
                };
            });
        };
        this.capitaliseFirstLetter = function (category) {
            return category[0].toUpperCase() + category.substr(1);
        };
        this.express = express_1["default"]();
        this.connectToDb();
        this.config();
        this.mountRoutes();
    }
    App.prototype.config = function () {
        this.express.use(express_1["default"].static(path_1.resolve(__dirname, '../react-ui/build')));
        this.express.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    };
    App.prototype.mountRoutes = function () {
        var _this = this;
        var router = express_1["default"].Router();
        /*************************
         *  REDIRECT URL
         *************************/
        if (process.env.NODE_ENV === 'production') {
            this.express.get('/', function (req, res) {
                res.sendFile(path_1.resolve(__dirname, '../react-ui/build'));
            });
        }
        /*************************
         *  SERVE ROUTES
         *************************/
        this.express.use('/api', body_parser_1["default"].json(), router);
        /*************************
         *  HEALTHCHECK
         *************************/
        router.get('/healthcheck', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                res.json({ message: "working" });
                return [2 /*return*/];
            });
        }); });
        /*************************
         *  GET ALL INGREDIENTS
         *************************/
        router.get('/ingredients', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.get(process.env.BASE_API_URL + "/wc/v3/products?consumer_key=" + process.env.WP_CONSUMER_KEY + "&consumer_secret=" + process.env.WP_CONSUMER_SECRET + "&category=35&type=simple&per_page=30")
                            .then(function (res) { return res.body; })
                            .then(function (ingredients) { return ingredients.map(function (ingredient) {
                            ingredient.price_html = "";
                            ingredient.description = ingredient.description.replace(/<[^>]*>?/gm, '');
                            ingredient.short_description = ingredient.short_description.replace(/<[^>]*>?/gm, '');
                            return ingredient;
                        }); })
                            .then(function (ingredients) {
                            var categories = _this.returnUniqueCategories(array_prototype_flatmap_1["default"](ingredients, function (ingredient) { return ingredient.tags.map(function (tag) { return ({
                                name: tag.name,
                                id: tag.id
                            }); }); }));
                            var baseProduct = ingredients.filter(function (ingredient) { return ingredient.id === 1474; });
                            var products = _this.returnCategorisedIngredients(categories, ingredients);
                            products.push({
                                category: "Base Product",
                                id: baseProduct[0].id,
                                selected: false,
                                count: baseProduct.length,
                                ingredients: baseProduct
                            });
                            return products;
                        })
                            .then(function (categorisedIngredients) { return res.send(categorisedIngredients); })["catch"](function (error) {
                            var _a = _this.handleError(error), code = _a.code, message = _a.message;
                            console.error("Error " + code + ", " + message);
                            res.status(error.status).send(_this.handleError(error));
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        /*************************
         *  WILDCARD
         *************************/
        router.get('*', function (req, res) {
            res.sendFile(path_1.join(__dirname, '../react-ui/build', 'index.html'));
        });
    };
    App.prototype.connectToDb = function () {
        mongoose_1["default"].connect("" + process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
            if (err)
                return console.error(err.code + ", " + err.message);
            console.log("DB connection successful");
        });
    };
    App.prototype.handleError = function (error) {
        var response = JSON.parse(error.response.text);
        return {
            code: response.data.status,
            wordpressCode: response.code,
            message: response.message,
            error: true
        };
    };
    return App;
}());
exports["default"] = App;

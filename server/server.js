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
var App = /** @class */ (function () {
    // private completedQuizModel = this.createCompletedQuizModel();
    function App() {
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
         *  CREATE NEW PRODUCT
         *************************/
        router.post('/new-product', body_parser_1["default"].json(), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.post("https://baseplus.co.uk/wp-json/wc/v3/products?consumer_key=" + process.env.WP_CONSUMER_KEY + "&consumer_secret=" + process.env.WP_CONSUMER_SECRET)
                            .send(req.body)
                            .then(function (productResponse) { return productResponse.body; })
                            .then(function (product) { return res.send(product); })["catch"](function (error) {
                            console.error("Error " + _this.handleError(error).code + ", " + _this.handleError(error).message);
                            res.status(error.status).send(_this.handleError(error));
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        /*************************
         *  GET COMPLETED QUIZ ANSWERS
         *************************/
        // router.get('/completed-quiz', async (req, res) => {
        //   this.completedQuizModel.find({ 'completedQuiz.quizData': { $size: 8 } })
        //     .then(dbResponse => {
        //       res.send(dbResponse);
        //       this.writeDbDataTOCSV(dbResponse);
        //     })
        //     .catch(error => {
        //       console.error(error);
        //       res.send(error);
        //     })
        // });
        /*************************
         *  SAVE QUIZ ANSWERS TO DB
         *************************/
        // router.post('/save-quiz', bodyParser.json(), async (req, res) => {
        //   const quizData: IQuizData[] = req.body;
        //   const completedQuiz = new this.completedQuizModel({
        //     completedQuiz: {
        //       quizData
        //     }
        //   });
        //   completedQuiz.save()
        //     .then(dbResponse => {
        //       console.log(`Saved quiz data with id ${dbResponse.id}`);
        //       res.json(dbResponse)
        //     })
        //     .catch(error => {
        //       console.error(error);
        //       res.send(error);
        //     })
        // });
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
                            .then(function (ingredients) { return res.send(ingredients); })["catch"](function (error) {
                            console.error("Error " + _this.handleError(error).code + ", " + _this.handleError(error).message);
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
    // private writeDbDataTOCSV = (dbData: (ICompletedQuizDBModel & mongoose.Document)[]) => {
    //   if(dbData.length > 0) {
    //     const filename = join(__dirname, '../react-ui/src/Assets/', 'completedQuizData.csv');
    //     const output: string[] = [];
    //     const dataHeadings = ["date", ...Object.keys(dbData[0].toObject().completedQuiz.quizData[0]).slice(1)];
    //     output.push(dataHeadings.join());
    //     dbData.forEach((field) => {
    //       const quizObject: ICompletedQuiz = field.toObject();
    //       quizObject.completedQuiz.quizData.forEach(x => {
    //         const row = [];
    //         row.push(new Date(quizObject.completedQuiz.date).toLocaleString().split(",")[0]);
    //         row.push(x.questionId);
    //         row.push(x.question.replace(",", "-"));
    //         row.push(x.answer);
    //         output.push(row.join());
    //       })
    //     });
    //     fs.writeFileSync(filename, output.join(os.EOL));
    //   }
    // }
    App.prototype.connectToDb = function () {
        mongoose_1["default"].connect("" + process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
            if (err)
                return console.error(err.code + ", " + err.message);
            console.log("DB connection successful");
        });
    };
    // private createCompletedQuizModel() {
    //   const CompletedQuizSchema = new Schema({
    //     completedQuiz: {
    //       id: {
    //         type: String,
    //         required: false,
    //         default: mongoose.Types.ObjectId
    //       },
    //       date: {
    //         type: Date,
    //         required: false,
    //         default: Date.now
    //       },
    //       quizData: [{
    //         questionId: {
    //           type: Number,
    //           required: true
    //         },
    //         answer: {
    //           type: String,
    //           required: true
    //         },
    //         question: {
    //           type: String,
    //           required: true
    //         }
    //       }]
    //     }
    //   })
    //   return model<ICompletedQuizDBModel & Document>('CompletedQuiz', CompletedQuizSchema);
    // }
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

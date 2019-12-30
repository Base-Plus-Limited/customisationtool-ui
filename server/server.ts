import express, { Application } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import WordpressProduct from './../react-ui/src/Interfaces/WordpressProduct';
import * as request from 'superagent';
import { resolve, join } from 'path';
import fs from 'fs';
import os from 'os';
import mongoose, { Document, Schema, model } from 'mongoose';
import { MongoError } from 'mongodb';
dotenv.config();

class App {
  public express: Application;
  // private completedQuizModel = this.createCompletedQuizModel();

  constructor () {
    this.express = express();
    this.connectToDb();
    this.config(); 
    this.mountRoutes(); 
  }

  private config () {
    this.express.use(express.static(resolve(__dirname, '../react-ui/build')));
    this.express.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
  }

  private mountRoutes (): void {
    const router = express.Router();

    /*************************
     *  REDIRECT URL
     *************************/
    if (process.env.NODE_ENV === 'production') {
      this.express.get('/', (req, res) => {
        res.sendFile(resolve(__dirname, '../react-ui/build')); 
      });
    }
    
    /*************************
     *  SERVE ROUTES
     *************************/
    this.express.use('/api', bodyParser.json(), router);

    /*************************
     *  HEALTHCHECK
     *************************/
    router.get('/healthcheck', async (req, res) => {
      res.json({ message: "working" })
    });

    /*************************
     *  CREATE NEW PRODUCT
     *************************/
    router.post('/new-product', bodyParser.json(), async (req, res) => {
      await request.post(`https://baseplus.co.uk/wp-json/wc/v3/products?consumer_key=${process.env.WP_CONSUMER_KEY}&consumer_secret=${process.env.WP_CONSUMER_SECRET}`)
        .send(req.body)
        .then(productResponse => productResponse.body)
        .then((product: WordpressProduct) => res.send(product))
        .catch((error) => {
          console.error(`Error ${this.handleError(error).code}, ${this.handleError(error).message}`);
          res.status(error.status).send(this.handleError(error));
        }) 
    });

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
    router.get('/ingredients', async (req, res) => {
      await request.get(`${process.env.BASE_API_URL}/wc/v3/products?consumer_key=${process.env.WP_CONSUMER_KEY}&consumer_secret=${process.env.WP_CONSUMER_SECRET}&category=35&type=simple&per_page=30`)
        .then(res => res.body)
        .then((ingredients: WordpressProduct[]) => ingredients.map(ingredient => {
          ingredient.price_html = "";
          ingredient.description = ingredient.description.replace(/<[^>]*>?/gm, '');
          ingredient.short_description = ingredient.short_description.replace(/<[^>]*>?/gm, '');
          return ingredient;
        }))
        .then((ingredients: WordpressProduct[]) => res.send(ingredients))
        .catch((error) => {
          console.error(`Error ${this.handleError(error).code}, ${this.handleError(error).message}`);
          res.status(error.status).send(this.handleError(error));
        }) 
    });

    /*************************
     *  WILDCARD
     *************************/
    router.get('*', function (req, res) {
      res.sendFile(join(__dirname, '../react-ui/build', 'index.html'));
    });
  }

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

  private connectToDb() {
    mongoose.connect(`${process.env.DB_CONNECTION_STRING}`, { useNewUrlParser: true, useUnifiedTopology: true },  (err: MongoError) => {
      if(err)
        return console.error(`${err.code}, ${err.message}`);
      console.log("DB connection successful");
    });
  }

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

  private handleError(error: any) {
    const response = JSON.parse(error.response.text);
    return {
      code: response.data.status,
      wordpressCode: response.code,
      message: response.message,
      error: true
    }
  }
  
}

export default App;


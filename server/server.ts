import express, { Application } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import ICategorisedIngredient from './../react-ui/src/Interfaces/CategorisedIngredient';
import IWordpressProduct, { ISelectableProduct } from './../react-ui/src/Interfaces/WordpressProduct';
import { IWordpressTag, ICategory } from './../react-ui/src/Interfaces/Tag';
import * as request from 'superagent';
import { resolve, join } from 'path';
import fs from 'fs';
import os from 'os';
import mongoose, { Document, Schema, model } from 'mongoose';
import { MongoError } from 'mongodb';
dotenv.config();
import flatMap from 'array.prototype.flatmap';
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
     *  GET ALL INGREDIENTS
     *************************/
    router.get('/ingredients', async (req, res) => {
      await request.get(`${process.env.BASE_API_URL}/wc/v3/products?consumer_key=${process.env.WP_CONSUMER_KEY}&consumer_secret=${process.env.WP_CONSUMER_SECRET}&category=35&type=simple&per_page=30`)
        .then(res => res.body)
        .then((ingredients: IWordpressProduct[]) => ingredients.map(ingredient => {
          ingredient.price_html = "";
          ingredient.description = ingredient.description.replace(/<[^>]*>?/gm, '');
          ingredient.short_description = ingredient.short_description.replace(/<[^>]*>?/gm, '');
          return ingredient;
        }))
        .then((ingredients: IWordpressProduct[]) => {
          const categories = this.returnUniqueCategories(flatMap(ingredients, ingredient => ingredient.tags.map(tag => (
            {
              name: tag.name,
              id: tag.id
            }
            ))));

          const baseProduct = ingredients.filter(ingredient => ingredient.id === 1474);
          const products = this.returnCategorisedIngredients(categories, ingredients);
          products.push({
            category: "Base Product",
            id: baseProduct[0].id,
            selected: false,
            count: baseProduct.length,
            ingredients: (baseProduct as ISelectableProduct[])
          });
          return products;
        })
        .then((categorisedIngredients: ICategorisedIngredient[]) => res.send(categorisedIngredients))
        .catch((error) => {
          const { code, message } = this.handleError(error);
          console.error(`Error ${code}, ${message}`);
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

  private returnUniqueCategories = (categories: ICategory[]) => {
    return categories.filter((value, index, categories) => categories.findIndex(cat => (cat.id === value.id)) === index);
  }

  private returnCategorisedIngredients = (categories: ICategory[], ingredients: IWordpressProduct[]): ICategorisedIngredient[] => {
    return categories.map((category, index) => {
      const categorisedIngredients = flatMap(ingredients, ingredient => {
        const x = ingredient as ISelectableProduct;
        x.selected = false;
        x.recentlySelected = false;
        return x.tags.map(tag => {
          if(category.id === tag.id)
            return x;
        })
      }).filter(product => product !== undefined) as ISelectableProduct[];
      return {
        category: this.capitaliseFirstLetter(category.name),
        id: category.id,
        ingredients: categorisedIngredients,
        count: categorisedIngredients.length,
        selected: index === 0 ? true : false
      }
    });
  }

  private capitaliseFirstLetter = (category: string) => {
    return category[0].toUpperCase() + category.substr(1);
  }

  private connectToDb() {
    mongoose.connect(`${process.env.DB_CONNECTION_STRING}`, { useNewUrlParser: true, useUnifiedTopology: true },  (err: MongoError) => {
      if(err)
        return console.error(`${err.code}, ${err.message}`);
      console.log("DB connection successful");
    });
  }

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


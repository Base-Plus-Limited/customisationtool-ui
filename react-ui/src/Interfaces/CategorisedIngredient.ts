import IWordpressProduct from "./WordpressProduct";

export default interface ICategorisedIngredient {
  category: string;
  id: number;
  count: number;
  ingredients: IWordpressProduct[]
}

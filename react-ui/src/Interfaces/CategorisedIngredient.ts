import IWordpressProduct from "./WordpressProduct";

export default interface ICategorisedIngredient {
  category: string;
  id: number;
  selected: boolean;
  count: number;
  ingredients: IWordpressProduct[]
}

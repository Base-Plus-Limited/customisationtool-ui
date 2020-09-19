export default interface ICustomProductDBModel {
  ingredients: IIngredient[];
  amended: boolean;
  productId: number;
  isFragranceFree: boolean;
}

interface IIngredient {
  id: number;
  name: string;
}


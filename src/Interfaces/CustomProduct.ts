export default interface ICustomProductDBModel {
  newVariation: IIngredient[] | string;
  recommendedVariation: IIngredient[] | string;
  amended: boolean;
  productId: number;
}

export interface IIngredient {
  id: number;
  name: string;
}

export default interface ICustomProductDBModel {
  products: IIngredient[];
  amended: boolean;
}

interface IIngredient {
  id: number;
  name: string;
}


export default interface ICustomProductDBModel {
  date: Date;
  products: IIngredient[];
  amended: boolean;
}

interface IIngredient {
  id: number;
  name: string;
}


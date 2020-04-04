import { ISelectableProduct } from '../Interfaces/WordpressProduct';

export const getUniqueIngredients = (ingredients: ISelectableProduct[]) => {
  return ingredients.filter((value, index, arr) => arr.findIndex(item => (item.id === value.id)) === index)
}
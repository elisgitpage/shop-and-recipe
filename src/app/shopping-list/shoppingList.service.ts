import { Subject } from 'rxjs';
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
  onIngredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];


  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[ index ];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.onIngredientsChanged.next(this.ingredients.slice());
  }

  addIngredientList(newIngredients: Ingredient[]) {
    newIngredients.forEach((ing) => { this.ingredients.push(ing) });
    this.onIngredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[ index ] = newIngredient;
    this.onIngredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.onIngredientsChanged.next(this.ingredients.slice());
  }

}
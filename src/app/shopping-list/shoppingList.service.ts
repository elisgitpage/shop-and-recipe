import { Subject } from 'rxjs';
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
  onAddedIngredient = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.onAddedIngredient.next(this.ingredients.slice());
  }

  addIngredientList(newIngredients: Ingredient[]) {
    newIngredients.forEach((ing) => { this.ingredients.push(ing) });
    this.onAddedIngredient.next(this.ingredients.slice());
  }

}
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";

export class RecipeService {
  // recipeSelected = new Subject<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Banana bread',
      'The most deliciously moist banana bread there is',
      'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/55ac7efd43d74a6ead6576b4bfb28d7e/FB_Syphus_BananaBread_v3.jpg',
      [
        new Ingredient('Banana', 3),
        new Ingredient('Vanilla Extract', 1)
      ]),
    new Recipe(
      'Steak tartar',
      'It\'s raw beef. What more do you need to know.',
      'https://live.staticflickr.com/54/119562483_b5a713ac9d_c.jpg',
      [
        new Ingredient('Ground Beef', 2),
        new Ingredient('Lemon', 1)
      ])
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[ id ];
  }
}
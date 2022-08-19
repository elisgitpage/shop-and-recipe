// import { Store } from "@ngrx/store";
// import { Subject } from "rxjs";
// import { Ingredient } from "../shared/ingredient.model";
// import { Recipe } from "./recipe.model";
// import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions'
// import { Injectable } from "@angular/core";
// import * as fromApp from '../store/app.reducer'

// @Injectable()
// export class RecipeService {
//   recipesChanged = new Subject<Recipe[]>();

//   constructor(private store: Store<fromApp.AppState>) { }

//   // private recipes: Recipe[] = [
//   //   new Recipe(
//   //     'Banana bread',
//   //     'The most deliciously moist banana bread there is',
//   //     'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/55ac7efd43d74a6ead6576b4bfb28d7e/FB_Syphus_BananaBread_v3.jpg',
//   //     [
//   //       new Ingredient('Banana', 3),
//   //       new Ingredient('Vanilla Extract', 1)
//   //     ]),
//   //   new Recipe(
//   //     'Steak tartar',
//   //     'It\'s raw beef. What more do you need to know.',
//   //     'https://live.staticflickr.com/54/119562483_b5a713ac9d_c.jpg',
//   //     [
//   //       new Ingredient('Ground Beef', 2),
//   //       new Ingredient('Lemon', 1)
//   //     ])
//   // ];

//   private recipes: Recipe[] = [];

//   setRecipes(recipes: Recipe[]) {
//     this.recipes = recipes;
//     this.recipesChanged.next(this.recipes.slice());
//   }

//   getRecipes() {
//     return this.recipes.slice();
//   }

//   getRecipe(id: number) {
//     return this.recipes[ id ];
//   }

//   addRecipe(recipe: Recipe) {
//     this.recipes.push(recipe);
//     this.recipesChanged.next(this.recipes.slice());
//   }

//   addIngredientsToShoppingList(ingredients: Ingredient[]) {
//     this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
//   }

//   updateRecipe(index: number, newRecipe: Recipe) {
//     this.recipes[ index ] = newRecipe;
//     this.recipesChanged.next(this.recipes.slice());
//   }

//   deleteRecipe(index: number) {
//     this.recipes.splice(index, 1);
//     this.recipesChanged.next(this.recipes.slice());
//   }
// }
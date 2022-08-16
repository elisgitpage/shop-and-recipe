import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../shopping-list/shoppingList.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: [ './recipes.component.css' ]
})
export class RecipesComponent implements OnInit {
  // recipeSelection: Recipe;
  constructor() { }

  ngOnInit(): void {
    // this.recipeService.recipeSelected
    //   .subscribe(
    //     (recipe: Recipe) => {
    //       this.recipeSelection = recipe;
    //     }
    //   )
  }

}

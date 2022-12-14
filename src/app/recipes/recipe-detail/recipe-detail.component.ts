import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
// import { ShoppingListService } from 'src/app/shopping-list/shoppingList.service';
import { Recipe } from '../recipe.model';
// import { RecipeService } from '../recipe.service';
import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipe.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: [ './recipe-detail.component.css' ]
})
export class RecipeDetailComponent implements OnInit, OnChanges {
  @Input() recipe: Recipe;
  id: number;

  constructor(
    // private recipeService: RecipeService,
    private route: ActivatedRoute, private router: Router,
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.route.params.pipe(map(params => {
      return +params[ 'id' ];
    }), switchMap(id => {
      this.id = id;
      return this.store.select('recipes')
    }),
      map(recipesState => {
        return recipesState.recipes.find((recipe, index) => {
          return index === this.id;
        });
      }))
      .subscribe(recipe => {
        this.recipe = recipe;
      });
    //           }))
    // .subscribe(
    //   (params: Params) => {
    //     this.id = +params[ 'id' ];
    //     // this.recipe = this.recipeService.getRecipe(this.id);
    //     this.store.select('recipes')
    //       .pipe(
    //         map(recipesState =>
    //           recipesState.recipes.find((recipe, index) => {
    //             return index === this.id;
    //           }))
    //       )
    //       .subscribe(recipe => {
    //         this.recipe = recipe;
    //       })
    //   }
    // )
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges called');
    console.log(changes);
  }

  toShoppingList() {
    // this.slService.addIngredientList(this.recipe.ingredients);
    // this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe() {
    //this.router.navigate([ 'edit' ], { relativeTo: this.route });
    this.router.navigate([ '../', this.id, 'edit' ], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    // this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
    this.router.navigate([ '../' ], { relativeTo: this.route });
  }
}

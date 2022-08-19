import { HttpBackend, HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { map, tap, take, exhaustMap } from "rxjs";
import { AuthService } from "../auth/auth.service";

import { Recipe } from "../recipes/recipe.model";
// import { RecipeService } from "../recipes/recipe.service";
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from "../recipes/store/recipe.actions";
@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient,
    //  private recipeService: RecipeService,
    private authService: AuthService, private store: Store<fromApp.AppState>) { }

  storeRecipes() {
    // const recipes = this.recipeService.getRecipes();
    // this.http.put('https://ng-course-recipe-book-f82a3-default-rtdb.firebaseio.com/recipes.json', recipes)
    //   .subscribe(response => {
    //     console.log(response);
    //   })
  }

  fetchRecipes() {
    //return this.authService.user.pipe(
    return this.store.select('auth').pipe(
      take(1),
      map(authState => authState.user),
      exhaustMap(user => {
        console.log('fetch recipe');
        console.log(user);
        return this.http.get<Recipe[]>('https://ng-course-recipe-book-f82a3-default-rtdb.firebaseio.com/recipes.json'
        );
      }),
      map(recipes => {
        console.log('recipes returned from backend');
        console.log(recipes);
        return recipes.map(recipe => {
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
        });
      }),
      tap(recipes => {
        // this.recipeService.setRecipes(recipes);
        this.store.dispatch(new RecipesActions.SetRecipes(recipes));
      })
    );
  }
}
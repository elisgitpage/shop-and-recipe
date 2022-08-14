import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shoppingList.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: [ './recipe-detail.component.css' ]
})
export class RecipeDetailComponent implements OnInit, OnChanges {
  @Input() recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService, private slService: ShoppingListService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params[ 'id' ];
          this.recipe = this.recipeService.getRecipe(this.id);
        }
      )
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges called');
    console.log(changes);
  }

  toShoppingList() {
    this.slService.addIngredientList(this.recipe.ingredients);
  }

  onEditRecipe() {
    //this.router.navigate([ 'edit' ], { relativeTo: this.route });
    this.router.navigate([ '../', this.id, 'edit' ], { relativeTo: this.route });
  }
}

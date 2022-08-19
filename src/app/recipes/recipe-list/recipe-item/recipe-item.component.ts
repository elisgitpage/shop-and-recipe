import { Component, ElementRef, Input, OnInit, Renderer2 } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Recipe } from "../../recipe.model";
// import { RecipeService } from "../../recipe.service";

@Component({
  selector: "app-recipe-item",
  templateUrl: "recipe-item.component.html",
  styleUrls: [ "recipe-item.component.css" ]
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;
  @Input() index: number;

  constructor(
    // private recipeService: RecipeService, 
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private elemRef: ElementRef) { }

  // ngOnInit(): void {
  //   this.route.params
  //     .subscribe((params: Params) => {
  //       if (params[ 'id' ] === this.index) {
  //         this.renderer.addClass(this.elemRef.nativeElement, 'active');
  //       } else {
  //         this.renderer.removeClass(this.elemRef.nativeElement, 'active');
  //       }
  //     })
  // }


  onSelected() {
    //this.recipeService.recipeSelected.emit(this.recipe);
    this.router.navigate([ this.index ], { relativeTo: this.route })
  }
}
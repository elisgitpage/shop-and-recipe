import { formatCurrency } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
// import { ShoppingListService } from 'src/app/shopping-list/shoppingList.service';
import * as ShoppingListActions from 'src/app/shopping-list/store/shopping-list.actions'
import * as fromApp from 'src/app/store/app.reducer';
@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: [ './shopping-list-edit.component.css' ]
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  //editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      } else {
        this.editMode = false;
      }
    })
    // this.subscription = this.shoppingListService.startedEditing
    //   .subscribe(
    //     (index: number) => {
    //       this.editMode = true;
    //       this.editedItemIndex = index;
    //       this.editedItem = this.shoppingListService.getIngredient(index);

    //     }
    //   );
  }

  onItemSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      // this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient));
    } else {
      //this.shoppingListService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false
    // form.setValue({
    //   name: null,
    //   amount: null
    // })
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete() {
    // this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }


}

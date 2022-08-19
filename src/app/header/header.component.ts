import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipesActions from '../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.css' ]
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  isAuthenticated = false;
  private userSub: Subscription;
  // @Output() onSectionClick = new EventEmitter<string>();

  constructor(private router: Router, private dataStorageService: DataStorageService, private authService: AuthService, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {

    //this.userSub = this.authService.user.subscribe(user => {
    //this.isAuthenticated = !user ? false : true;
    this.store.select('auth').pipe(
      map(authState => authState.user))
      .subscribe(user => {
        this.isAuthenticated = !!user;
        console.log(!user);
        console.log(!!user);
      });
  }

  onClick(section: string) {
    console.log(section);
    //this.onSectionClick.emit(section);
    this.router.navigate([ '/', section ]);
  }

  onSaveData() {
    // this.dataStorageService.storeRecipes();
    this.store.dispatch(new RecipesActions.StoreRecipes());
  }

  onFetchData() {
    // this.dataStorageService.fetchRecipes().subscribe();
    this.store.dispatch(new RecipesActions.FetchRecipes());
  }

  onLogout() {
    // this.authService.logout();
    this.store.dispatch(new AuthActions.Logout())
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}

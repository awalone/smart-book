import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { firebaseConfig } from '../environments/firebase.config';
import { AngularFireModule } from 'angularfire2';
import {MaterialModule} from "@angular/material"
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RecipeListComponent } from './container/recipe-list/recipe-list.component';
import {RecipeService} from "./shared/services/smart-service";
import { ChefListComponent } from './container/chef-list/chef-list.component';
import {RecipeFormComponent} from './components/form/recipe-form/recipe-form.component';
import { NewRecipeComponent } from './container/new-recipe/new-recipe.component';
import { ChefDetailsComponent } from './container/chef-details/chef-details.component';
import {chefsRouting} from "./routing";
import { ChefFormComponent } from './components/form/chef-form/chef-form.component';
import { NewChefComponent } from './container/new-chef/new-chef.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {EffectsModule} from "@ngrx/effects";
import {RecipeEffects} from './effects/recipe-effects';
import {ChefEffects} from './effects/chef-effects';
import {reducer} from './reducer/index';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RecipeListComponent,
    ChefListComponent,
    RecipeFormComponent,
    NewRecipeComponent,
    ChefDetailsComponent,
    ChefFormComponent,
    NewChefComponent,
    RecipeDetailsComponent,
  ],
  imports: [
    chefsRouting,
    AngularFireModule.initializeApp(firebaseConfig),
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    StoreModule.provideStore(reducer),
    EffectsModule.runAfterBootstrap(ChefEffects),
    EffectsModule.runAfterBootstrap(RecipeEffects),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [RecipeService],
  entryComponents: [
    ChefFormComponent,
    RecipeFormComponent
],
  bootstrap: [AppComponent]
})
export class AppModule { }

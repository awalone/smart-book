"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var RecipeListComponent = (function () {
    function RecipeListComponent(recipeServices) {
        this.recipeServices = recipeServices;
        this.showLoader = true;
    }
    RecipeListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.recipeServices.findAllRecipes()
            .subscribe(function (recipes) {
            _this.allRecipes = recipes;
            _this.showLoader = false;
        });
    };
    RecipeListComponent = __decorate([
        core_1.Component({
            selector: 'sb-recipe-list',
            templateUrl: './recipe-list.component.html'
        })
    ], RecipeListComponent);
    return RecipeListComponent;
}());
exports.RecipeListComponent = RecipeListComponent;

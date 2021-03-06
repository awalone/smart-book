"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var angularfire2_1 = require("angularfire2");
var rxjs_1 = require("rxjs");
var RecipeService = (function () {
    function RecipeService(af, fb) {
        this.af = af;
        this.subject = new rxjs_1.Subject();
        this.recipes$ = this.af.database.list('recipes');
        this.chefs$ = this.af.database.list('chefs');
        this.rootDb = fb.database().ref(); // To get the root firebase ref
    }
    RecipeService.prototype.getDb = function () {
        this.db = this.af.database;
        return this.db;
    };
    RecipeService.prototype.findAllRecipes = function () {
        return this.recipes$;
    };
    RecipeService.prototype.findAllChefs = function () {
        return this.chefs$;
    };
    RecipeService.prototype.createNewRecipe = function (chefId, recipe) {
        var _this = this;
        var recipeToSave = Object.assign({}, recipe, { chefId: chefId });
        // Generate a new key under 'recipes' collection, db won't change currently
        var newRecipeKey = this.rootDb.child('recipes').push().key;
        var dataToSave = {};
        dataToSave[("recipes/" + newRecipeKey)] = recipeToSave;
        dataToSave[("recipesPerChef/" + chefId + "/" + newRecipeKey)] = true;
        this.rootDb.update(dataToSave)
            .then(function (val) {
            _this.subject.next(val);
            _this.subject.complete();
        }, function (err) {
            _this.subject.error(err);
            _this.subject.complete();
        });
        return this.subject.asObservable();
    };
    RecipeService.prototype.findChefByName = function (chefName) {
        return this.getDb().list('chefs', {
            query: {
                orderByChild: 'name',
                equalTo: chefName
            }
        })
            .map(function (chef) { return chef[0]; }); // get chef document which name = chefName
    };
    RecipeService.prototype.findRecipesKeyPreChefName = function (chefName) {
        var _this = this;
        return this.findChefByName(chefName)
            .filter(function (chef) { return !!chef; })
            .map(function (chef) { return chef.$key; })
            .switchMap(function (chefKey) { return _this.getDb().list("recipesPerChef/" + chefKey, {
            query: {
                limitToFirst: 3,
                orderByKey: true
            }
        }); });
    };
    RecipeService.prototype.findAllChefRecipes = function (chefName) {
        var _this = this;
        return this.findRecipesKeyPreChefName(chefName)
            .map(function (recipeKeys) { return recipeKeys
            .map(function (recipeKey) {
            return _this.db.object("recipes/" + recipeKey.$key);
        }); })
            .flatMap(function (res) {
            return rxjs_1.Observable.combineLatest(res);
        });
    };
    RecipeService.prototype.addChef = function (chef) {
        var _this = this;
        this.chefs$.push(chef)
            .then(function (val) {
            _this.subject.next(val);
            _this.subject.complete();
        }, function (err) {
            _this.subject.error(err);
            _this.subject.complete();
        });
        return this.subject.asObservable();
    };
    RecipeService = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Inject(angularfire2_1.FirebaseRef))
    ], RecipeService);
    return RecipeService;
}());
exports.RecipeService = RecipeService;

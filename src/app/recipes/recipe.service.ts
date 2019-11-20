import { Output, EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';


@Injectable()
export class RecipeService {
recipesChanged: Subject<Recipe[]> = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            'Parantha'
            , 'Paneer Parantha'
            , `https://www.archanaskitchen.com/images/archanaskitchen/0-Archanas-Kitchen-Recipes/2018/jan-10
            /Palak_and_Paneer_Stuffed_Paratha_Recipe-1022.jpg`
            , [
                new Ingredient('paneer', 250),
                new Ingredient('aata', 1)
            ]),
        new Recipe(
            'Dosa'
            , 'Crispy Dosa'
            , 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Dosa_and_ghee.jpg/330px-Dosa_and_ghee.jpg'
            , [
                new Ingredient('ghee', 250),
                new Ingredient('chawal ka aata', 1)
            ])
      ];
constructor(private slService: ShoppingListService) {}
      public getRecipes() {
          return this.recipes.slice();
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]) {
          this.slService.addIngredients(ingredients);
      }

      public getRecipeById(index: number): Recipe {
          return this.recipes[index];
      }

      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, updatedRecipe: Recipe) {
        this.recipes[index] = updatedRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
      }
}

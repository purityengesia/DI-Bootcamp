import { v4 as uuidv4 } from 'uuid';

// Interface defining the shape of a Recipe
export interface IRecipeItem {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  isFavorite: boolean;
}

export class RecipeItem implements IRecipeItem {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  isFavorite: boolean;

  constructor(title: string, ingredients: string, instructions: string) {
    this.id = uuidv4();
    this.title = title;
    
    // Process ingredients: split by newline and clean up
    this.ingredients = ingredients
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
      
    this.instructions = instructions;
    this.isFavorite = false;
  }
}
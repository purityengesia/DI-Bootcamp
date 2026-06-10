import { RecipeItem } from './RecipeItem';
import type { IRecipeItem } from './RecipeItem';
export class RecipeCollection {
  private recipes: RecipeItem[];
  private readonly storageKey: string = 'recipe-book-data';

  constructor() {
    this.recipes = [];
    this.load();
  }

  // Add a new recipe
  addRecipe(title: string, ingredients: string, instructions: string): RecipeItem {
    const newRecipe = new RecipeItem(title, ingredients, instructions);
    this.recipes.push(newRecipe);
    this.save();
    return newRecipe;
  }

  // Remove a recipe by ID
  deleteRecipe(id: string): boolean {
    const initialLength = this.recipes.length;
    this.recipes = this.recipes.filter(recipe => recipe.id !== id);
    
    if (this.recipes.length !== initialLength) {
      this.save();
      return true;
    }
    return false;
  }

  // Toggle favorite status
  toggleFavorite(id: string): boolean | null {
    const recipe = this.recipes.find(r => r.id === id);
    if (recipe) {
      recipe.isFavorite = !recipe.isFavorite;
      this.save();
      return recipe.isFavorite;
    }
    return null;
  }

  // Clear all recipes
  clearAll(): void {
    this.recipes = [];
    this.save();
  }

  // Get all recipes
  getAll(): RecipeItem[] {
    return this.recipes;
  }

  // Save to LocalStorage
  private save(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.recipes));
  }

  // Load from LocalStorage
  private load(): void {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        // Rehydrate RecipeItem instances to ensure they match the class
        this.recipes = parsedData.map((item: IRecipeItem) => {
          const r = new RecipeItem(item.title, item.ingredients.join('\n'), item.instructions);
          r.id = item.id;
          r.isFavorite = item.isFavorite;
          return r;
        });
      } catch (e) {
        console.error("Failed to load recipes", e);
        this.recipes = [];
      }
    }
  }
}
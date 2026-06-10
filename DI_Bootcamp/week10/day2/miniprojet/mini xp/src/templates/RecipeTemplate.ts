import { RecipeItem } from '../model/RecipeItem';

export class RecipeTemplate {
  private container: HTMLElement;

  constructor() {
    // We use the non-null assertion (!) because we know this element exists in index.html
    this.container = document.getElementById('recipeContainer')!;
  }

  render(recipes: RecipeItem[]): void {
    this.container.innerHTML = '';

    if (recipes.length === 0) {
      this.container.innerHTML = `
        <div class="empty-state">
          <h3>No recipes yet</h3>
          <p>Add your first recipe using the form!</p>
        </div>
      `;
      return;
    }

    recipes.forEach(recipe => {
      const card = this.createRecipeCard(recipe);
      this.container.appendChild(card);
    });
  }

  private createRecipeCard(recipe: RecipeItem): HTMLElement {
    const article = document.createElement('article');
    article.className = 'recipe-card';
    article.dataset.id = recipe.id;

    const heartClass = recipe.isFavorite ? 'active' : '';
    
    // SVG Icons
    const heartIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="${recipe.isFavorite ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
    const trashIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`;

    article.innerHTML = `
      <div class="card-header">
        <h3 class="card-title">${this.escapeHtml(recipe.title)}</h3>
        <div class="card-actions">
          <button class="icon-btn favorite ${heartClass}" title="Toggle Favorite">
            ${heartIcon}
          </button>
          <button class="icon-btn delete" title="Delete Recipe">
            ${trashIcon}
          </button>
        </div>
      </div>
      <div class="card-body">
        <div class="section-title">Ingredients</div>
        <ul class="ingredients-list">
          ${recipe.ingredients.map(ing => `<li>${this.escapeHtml(ing)}</li>`).join('')}
        </ul>
        
        <div class="section-title">Instructions</div>
        <p class="instructions-text">${this.escapeHtml(recipe.instructions)}</p>
      </div>
    `;

    return article;
  }

  // Helper to prevent XSS attacks
  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}
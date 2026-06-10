import './style.css';
import { RecipeCollection } from './model/RecipeCollection';
import { RecipeTemplate } from './templates/RecipeTemplate';

// Initialize Logic and UI
const collection = new RecipeCollection();
const template = new RecipeTemplate();

// DOM Elements
const form = document.getElementById('recipeEntryForm') as HTMLFormElement;
const clearBtn = document.getElementById('clearRecipesButton') as HTMLButtonElement;
const container = document.getElementById('recipeContainer')!;

// Initial Render
template.render(collection.getAll());

// 1. Handle Add Recipe
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const titleInput = document.getElementById('recipeTitle') as HTMLInputElement;
  const ingredientsInput = document.getElementById('ingredients') as HTMLTextAreaElement;
  const instructionsInput = document.getElementById('instructions') as HTMLTextAreaElement;

  collection.addRecipe(
    titleInput.value,
    ingredientsInput.value,
    instructionsInput.value
  );

  // Reset and Refresh
  form.reset();
  template.render(collection.getAll());
  showToast('Recipe added successfully!');
});

// 2. Handle Card Actions (Delete & Favorite) using Event Delegation
container.addEventListener('click', (e) => {
  const card = (e.target as HTMLElement).closest('.recipe-card') as HTMLElement;
  if (!card) return;

  const id = card.dataset.id;
  if (!id) return;

  const target = e.target as HTMLElement;
  const isFavBtn = target.closest('.favorite');
  const isDelBtn = target.closest('.delete');

  if (isFavBtn) {
    collection.toggleFavorite(id);
    template.render(collection.getAll());
    showToast('Favorite status updated');
  }

  if (isDelBtn) {
    if (confirm('Are you sure you want to delete this recipe?')) {
      collection.deleteRecipe(id);
      template.render(collection.getAll());
      showToast('Recipe deleted');
    }
  }
});

// 3. Handle Clear All
clearBtn.addEventListener('click', () => {
  if (collection.getAll().length === 0) {
    showToast('No recipes to clear.');
    return;
  }
  if (confirm('Delete ALL recipes? This cannot be undone.')) {
    collection.clearAll();
    template.render(collection.getAll());
    showToast('All recipes cleared.');
  }
});

// Simple Toast Notification Logic
function showToast(message: string) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
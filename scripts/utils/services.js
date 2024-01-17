export const getIngredients = (recipes) => {
  let ingredients = [];

  for (const recipe of recipes) {
    for (const item of recipe.ingredients) {
      const ingredient = item.ingredient.toLowerCase();

      if (!ingredients.includes(ingredient)) {
        ingredients.push(ingredient);
      }
    }
  }

  return ingredients;
};
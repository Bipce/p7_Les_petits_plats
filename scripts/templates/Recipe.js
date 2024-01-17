export class Recipe {
  constructor(data) {
    this.id = data.id;
    this.image = data.image;
    this.name = data.name;
    this.servings = data.servings;
    this.ingredients = data.ingredients;
    this.description = data.description;
    this.time = data.time;
    this.appliance = data.appliance;
    this.utensils = data.utensils;
  }

  getRecipesDOMPage() {
    return (`
      <article class="recipes__article">
        <img src="assets/images_recettes/${this.image}" alt="${this.name}" class="recipes__article__img">
      
        <p class="recipes__article__time">${this.time}min</p>

        <div class="recipes__article__content">
          <h2 class="recipes__article__content__name">${this.name}</h2>
          <div>
            <h3 class="title">recette</h3>
            <p class="recipes__article__content__description">${this.description}</p>
          </div>
          
          <div class="recipes__article__content__ingredients">
          <h3 class="title">ingrédients</h3>
          
          <div class="recipes__article__content__ingredients__box"></div>
        </div> 
        </div>
      </article>
    `);
  }
}
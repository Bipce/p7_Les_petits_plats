export class Ingredient {
  constructor(data) {
    this.ingredient = data.ingredient;
    this.quantity = data.quantity;
    this.unit = data.unit;
  }

  getIngredientsDOMPage() {
    let data = "";

    if (this.quantity) {
      data += `<p>${this.quantity}</p>`;
    }

    if (this.unit) {
      data += `<p>${this.unit}</p>`;
    }

    if (!this.quantity && !this.unit) {
      data += `<p>-</p>`;
    }

    return (`
      <div class="recipes__article__content__ingredients__box__ingredient">
        <p class="recipes__article__content__ingredients__box__ingredient__name">${this.ingredient}</p>
        <div class="recipes__article__content__ingredients__box__ingredient__details">${data}</div>
      </div>
    `);
  }
}
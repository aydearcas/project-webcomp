import { LitElement, html, css } from "lit-element";

class PokeCard extends LitElement {
  constructor() {
    super();
    this.getPokemon();
  }

  static get properties() {
    return {
      order: Number,
      name: String,
      type: Array,
      weight: Number,
      height: Number,
      moves: Array,
      index: Number
    };
  }

  static get styles() {
    return css`:host {
      width: 200px;
      height: 200px;
      background-color: gray;
    }
`;
  }

  getPokemon() {
    const request = fetch(`https://pokeapi.co/api/v2/pokemon/${this.index}`)
      .then((response) => response.json())
      .then((data) => {
        this.order = data.order;
        this.name = data.name;
        this.image = data.sprites.front_default;
        this.types = data.types;
        this.weight = data.weight;
        this.height = data.height;
        this.moves = data.moves;
      });
  }

  getAllMoves() {
    return this.moves.map(move => move.move.name).join(", ");
  }

  getAllTypes() {
    return this.types.map((type) => type.type.name).join(", ");
  }

  render() {
    return html`
    <div class = "container">
      <h3>${this.order}.${this.name}</h3>
      <img src="${this.image}" alt="${this.name}" srcset="">
      <span class = "pokemon-type">${this.getAllTypes()}</span>
      <span class = "pokemon-weight">${this.weight}</span>
      <span class = "pokemon-height">${this.height}</span>
      <span class = "pokemon-moves">${this.getAllMoves()}</span>
</div>
            `;
  }
}
customElements.define("poke-card", PokeCard);

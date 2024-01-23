class StApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 1rem;
          border: 1px solid #ccc;
        }
      </style>
      <h1>SpaceTraders!</h1>
      <p>Start a new game, or continue one that's in progress.</p>
    `;
  }
}

customElements.define('st-app', StApp);
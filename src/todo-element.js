import { LitElement, html } from 'lit-element';

class TodoElement extends LitElement {

    static get properties() {
        return {
            nombreItem: { type: String },
            activa: Boolean
        };
    }

    constructor() {
        super()
        this.nombreItem = 'muestra';
        this.activa = false;
    }
    render() {
        return html `<label>
            <input type="checkbox" ?checked=${this.activa}> ${this.nombreItem}
            </label>`;
    }
}
customElements.define('todo-element', TodoElement);
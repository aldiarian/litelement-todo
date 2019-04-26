import { LitElement, html } from 'lit-element';

class TodoElement extends LitElement {

    static get properties() {
        return {
            nombreItem: { type: String }
        };
    }

    constructor() {
        super()
        this.nombreItem = 'muestra';
    }
    render() {
        return html `<p>${this.nombreItem}</p>`;
    }
}
customElements.define('todo-element', TodoElement);
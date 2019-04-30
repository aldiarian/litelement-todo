import { LitElement, html, css } from 'lit-element';

class TodoElement extends LitElement {

    static get properties() {
        return {
            nombreItem: { type: String },
            activa: { type: Boolean },
            newId: { type: String }
        };
    }
    constructor() {
        super();
        this.nombreItem = 'muestra';
        this.activa = false;
    }
    static get styles() {
        return css `
        :host{
           font-size:1rem;
           font-family: var(--font-primary);
        }
        .td-elemento{
            cursor: pointer;
        }
        `;
    }

    render() {
        return html `
        <div class="td-elemento" id="${this.newId}" @click=${this.isCheked}>
            <todo-check ?activa=${this.activa}></todo-check> <span>${this.nombreItem}</span>
        </div>
        `;
    }

    isCheked() {
        this.activa = !this.activa;
        console.log('han hecho click');
        this.dispatchEvent(new CustomEvent('inputChecked'));
    }
}
customElements.define('todo-element', TodoElement);
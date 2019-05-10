import { LitElement, html, css } from 'lit-element';

class TodoList extends LitElement {

    static get properties() {
        return {
            listAll: { type: Number },
            listPending: { type: Number },
            listDone: { type: Number }
        };
    }
    constructor() {
        super();
        this.listAll  = 0,
        this.listPending = 0,
        this.listDone = 0
    }


    static get styles() {
        return css`
        :host{
            display:flex;
            justify-content: space-between;
            font-family: var(--font-primary);
            font-size: 0.7rem;
            margin-top:1rem;
        }
       
        `;
    } 

    render() {
        return html`
        <div class="td-listas">
            <span class="td-listas--small">${this.listAll}</span>Ver todas</div>
        <div class="td-listas">
            <span class="td-listas--small">${this.listPending}</span>Pendientes</div>
        <div class="td-listas">
            <span class="td-listas--small">${this.listDone}</span>Terminadas</div>
        `;
    }
    
}
customElements.define('todo-list', TodoList);
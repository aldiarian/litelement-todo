import { LitElement, html, css } from 'lit-element';

class TodoList extends LitElement {

    static get properties() {
        return {
            listAll: { type: Number },
            listPending: { type: Number },
            listDone: { type: Number },
            elId: { type: Number }
        };
    }
    constructor() {
        super();
        this.listAll = 0,
            this.listPending = 0,
            this.listDone = 0
    }

    static get styles() {
        return css `
        :host{
            display:flex;
            justify-content: space-between;
            font-family: var(--font-primary);
            font-size: 0.7rem;
            margin-top:1rem;
        }
        .td-listas{
            background-color: #e2e2e2;
            text-align:center;
            padding:0.5rem;
            border-radius: 3px;
            width:25%;
            cursor:pointer;
        }
        .td-listas:hover{
            background-color: #c9c9c9;
        }
        .td-listas--small{
            font-size:0.7rem;
            margin-right: 6px;
            color:#797979;
        }
        `;
    }

    render() {
        return html `
        <div class="td-listas" id="verTodas"  @click=${this.verFiltradas}>
            <span  class="td-listas--small">${this.listAll}</span>Ver todas</div>
        <div class="td-listas" id="verPending" @click=${this.verFiltradas}>
            <span   class="td-listas--small">${this.listPending}</span>Pendientes</div>
        <div class="td-listas" id="verDone"  @click=${this.verFiltradas}>
            <span  class="td-listas--small">${this.listDone}</span>Terminadas</div>
        `;
    }

    verFiltradas(evento) {
        console.log('verfiltradas', evento.target.id);
        this.elId = evento.target.id;
        this.dispatchEvent(new CustomEvent('filtrarLista', {
            bubbles: true,
            composed: true,
            detail: this.elId
        }));
    }

}
customElements.define('todo-list', TodoList);
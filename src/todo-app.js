import { LitElement, html, css } from 'lit-element';

class TodoApp extends LitElement {
    static get styles() {
        return css `
        :host{
            display:block;
            width:400px;
            margin:0 auto;
            box-sizing:border-box;
            padding:1rem;
            border:1px solid black;
        }
        .td-input{
            display:block;
            width:90%;
            margin:0 auto;
            background-color: #ededed;
            padding:1rem;
            border: 0;
            font-size:1.5rem;
        }
        .td-input::placeholder{
            opacity:0.3;
        }
        `;
    }
    static get properties() {
        return {
            lista: { type: Array },
            listaEntrada: { type: String },
            valor: { type: String }
        };
    }

    constructor() {
        super();
        this.listaEntrada = '';
        this.lista = [];
    }

    render() {
            return html `
                <input id="td-input" value="intro" @keypress="${this.entradaItem}" class="td-input" type="text" placeholder="Introduce Item" >

                ${this.lista.length > 0 ? html`
                <ul >
                ${ this.lista.map (elemento => html`<li> <todo-element nombreItem=${elemento}></todo-element> </li>`) }
                </ul>`
                : null }
            `;
    }
    entradaItem(evnt) {
        let keycode = evnt.keyCode;
        if (keycode == 13) {
            this.listaEntrada = evnt.path[0].value;
            this.lista.push(this.listaEntrada);
            evnt.path[0].value = '';
        }

    }
}
customElements.define('todo-app', TodoApp);
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

    render() {
        return html `
        <input class="td-input" type="text" placeholder="Introduce Item" >
        <ul>
            <li>
            <todo-element nombreItem="Primer Elemento"></todo-element>
            </li>
        </ul>
        `;
    }
}
customElements.define('todo-app', TodoApp);
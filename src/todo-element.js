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
        this.clicado = false;
    }
    static get styles() {
        return css `
        :host{
           font-size:1rem;
           font-family: var(--font-primary);
           padding: 5px;
        }
        :host(:hover) {
            background-color: #eeeeee;
        }
        :host(:hover) .td-edit{
            display: flex;
        }
        .td-edit__element{
            width: 20px;
            height: 20px;
        }
        .td-edit{
            display: none;
            align-self: flex-end;
        }
        .td-edit__nombre{
            flex-grow:2;
            padding-left:1rem;
        }
        svg{
            pointer-events:none;
        }
        `;
    }

    render() {
        return html `
            <todo-check ?activa=${this.activa} @click=${this.isCheked}></todo-check>
            <span class="td-edit__nombre">${this.nombreItem}</span> 
            <!-- <div class="td-edit">
                <div class="td-edit__element" id="td-edit-change" @click=${this.editElement}>
                    <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                </div>
                <div class="td-edit__element" @click=${this.editElement}>
                    <svg id="td-edit-delete" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                </div>
            </div> -->
        `;
    }

    isCheked() {
        this.activa = !this.activa;
        this.dispatchEvent(new CustomEvent('inputChecked'));
    }

    // editElement(event) {
    //     if (event.target.id == "td-edit-change") {
    //         console.log('han hecho click chage');
    //     } else {
    //         console.log('han hecho click delete');
    //         this.dispatchEvent(new CustomEvent('delete-element', {
    //             bubbles: true,
    //             composed: true,
    //         }));
    //     }
    // }
}
customElements.define('todo-element', TodoElement);
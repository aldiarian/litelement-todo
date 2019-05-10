import { LitElement, html, css } from 'lit-element';

class TodoApp extends LitElement {
    static get styles() {
        return css `
        :host{
            display:block;
            max-width:400px;
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
        ul{
            list-style:none;
            padding:0;
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
        .td-elemento{
            cursor: pointer;
            display: flex;
        }
        .td-edit__icon{
            width:20px;
            height:20px;
            display: inline-block;
        }
        .td-edit__icon svg{
            width:100%;
            height:100%;
        }
        `;
    }
    static get properties() {
        return {
            lista: { type: Array },
            listaEntrada: { type: String },
            activa: { type: Boolean },
            valor: { type: String },
            newId: { type: Date },
            listAll: { type: Number },
            listPending: { type: Number },
            listDone: { type: Number }
        };
    }

    constructor() {
        super();
        this.activa = false;
        this.listaEntrada = '';
        this.lista = [];
        this.crearId();
        this.cargarStorage();
        this.listAll  = this.lista.length,
        this.listPending = 0,
        this.listDone = 0
    }

    render() {
            return html `
                <input id="td-input" 
                    @keypress="${this.entradaItem}"
                    class="td-input" 
                    type="text"
                    placeholder="Introduce Item" >

                ${this.lista.length > 0 ? html`
                    <ul >
                    ${ this.lista.map (elemento => html`
                        <li>
                            <todo-element
                                @inputChecked="${this.cambiarCheked}"
                                ?activa=${elemento.activa}
                                .newId=${elemento.id}
                                .nombreItem=${elemento.nombre}>
                            </todo-element>
                            <div class="td-edit">
                                <span class="td-edit__icon">
                                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                                </span>
                                <span class="td-edit__icon">
                                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                                </span>
                            </div>
                        </li>`
                        )
                    }
                    </ul>`
                : null }

                <todo-list
                    listAll=${this.listAll}
                    listPending=${this.listPending}
                    listDone=${this.listDone} >
                </todo-list>
            `;
    }
    entradaItem(evnt) {
        let keycode = evnt.keyCode;
        
        if (keycode == 13) {
            this.listaEntrada = evnt.target.value;
            this.agregarLista();
            evnt.target.value = '';
        }

    }
    agregarLista(){
        if (this.listaEntrada.length > 0 ){
            this.lista.push({nombre : this.listaEntrada, activa: this.activa, id: this.crearId() } ) ;
        }
        this.listAll = this.lista.length;
        this.grabarStorage();

    }
    cambiarCheked(evnt){
        const valorActiva = this.lista.filter( element => {
            return element.id  == evnt.target.newId;
        });
        valorActiva[0].activa = !valorActiva[0].activa;
        this.grabarStorage();
    }
    crearId(){
        this.newId = new Date();
        return this.newId.getTime() ;
    }

    grabarStorage(){
        localStorage.setItem('data', JSON.stringify(this.lista));
    }
    cargarStorage(){
        if( localStorage.getItem('data')){
            this.lista = JSON.parse( localStorage.getItem('data'));
            this.listAll = this.lista.length;
            console.log(  this.listAll )
        }
    }
}
customElements.define('todo-app', TodoApp);
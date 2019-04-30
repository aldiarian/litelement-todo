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
                                newId=${elemento.id}
                                nombreItem=${elemento.nombre}>
                            </todo-element>
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
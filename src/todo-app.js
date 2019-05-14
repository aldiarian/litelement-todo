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
            todo-element{
                cursor: pointer;
                display: flex;
                flex-direction: row;
                align-items: center;
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
            listDone: { type: Number },
            listStorage: { type: Array }
        };
    }

    constructor() {
        super();
        this.activa = false;
        this.listaEntrada = '';
        this.lista = [];
        this.crearId();
        this.listStorage = []
        this.listPending = 0;
        this.listDone = 0;
        this.cargarStorage();
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
                                    <todo-element id=${elemento.id}
                                        @delete-element="${this.borrarElement}"
                                        @inputChecked="${this.cambiarCheked}"
                                        ?activa=${elemento.activa}
                                        .newId=${elemento.id}
                                        .nombreItem=${elemento.nombre}>
                                    </todo-element>
                                </li>`
                                )
                            }
                        </ul>`
                        : null }
    
                    <todo-list
                        @filtrarLista=${this.filtrarLista}
                        .listAll=${this.listAll}
                        .listPending=${this.listPending}
                        .listDone=${this.listDone} >
                    </todo-list>
                `;
        }
        entradaItem(evnt) {
            let keycode = evnt.keyCode;
            
            if (keycode == 13) {
                this.listaEntrada = evnt.target.value;
                this.agregarLista();
                evnt.target.value = '';
                this.cargarStorage();
            }
    
        }
        agregarLista(){
            if (this.listaEntrada.length > 0 ){
                // this.lista.push({nombre : this.listaEntrada, activa: this.activa, id: this.crearId() } ) ;
                this.lista = [
                    ...this.lista,
                    {   
                        nombre : this.listaEntrada,
                        activa: this.activa,
                        id: this.crearId()
                    } 
                ]
            }
            this.updateLists()
            this.grabarStorage();
    
        }
        cambiarCheked(evnt){
            const valorActiva = this.lista.filter( element => {
                return element.id  == evnt.target.newId;
            });
            valorActiva[0].activa = !valorActiva[0].activa;
            this.grabarStorage();
            this.cargarStorage();
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
                this.updateLists();
            }
        }
    
        
        updateLists(){
            this.listDone = 0;
            this.listPending = 0;
            this.listAll = this.lista.length;
            this.lista.forEach(element => {
                element.activa ? this.listDone ++ : null;
            });
            this.listPending = this.listAll - this.listDone;
        }

        borrarElement(evnt){
            console.log('borro element', evnt.target.id);
            this.lista = this.lista.filter( element => {
                return element.id != evnt.target.id;
            });
            this.grabarStorage();
            this.updateLists();
        }

        filtrarLista( evnt ){
            if( evnt.detail == "verPending") {
                console.log('verpendin');
            }
            
        }

    }
    customElements.define('todo-app', TodoApp);
<template>
    <div id="Insert">
        <div class="containerInsert">
            <h2>Registrar Prueba Covid</h2>
            <form v-on:submit.prevent="processPrueba">

                <div class="form-group">
                    <p>Fecha de realizacion de la prueba</p>
                    <input type="datetime-local" v-model="prueba.fecha">   
                </div>

                <div class="form-group">
                  <p class="p-form">Persona</p>
                  <select type="select" v-model="prueba.persona">
                    <option disabled selected value>Selecciona persona</option>
                    <option v-for="persona in personas" :key="persona.id" :value="persona.id"> {{persona.numero_documento}} {{persona.nombre}} {{persona.apellidos}} </option>
                  </select>  
                </div>

                <div class="form-group">
                  <p class="p-form">Pais</p>
                  <select v-model="prueba.pais">
                    <option disabled selected value>Selecciona pais</option>
                    <option  v-for="pais in paises" :key="pais.id" :value="pais.id" > {{pais.nombre}} </option>
                  </select>  
                </div>

                <div class="form-group">
                  <p class="p-form">Tipo</p>
                  <select v-model="prueba.tipo">
                    <option disabled selected value>Selecciona tipo de prueba</option>
                    <option>ARN</option>
                    <option>Antigeno</option>
                    <option>Anticuerpo</option>
                    <option>Rapido de antigenos</option>
                    <option>Rapido de anticuerpos</option>
                  </select>  
                </div>

                <div class="form-group">
                    <p>Resultado</p>
                    <label>
                    <input type="radio" v-model="prueba.resultado" class="input-radio" v-bind:value="true"/>
                      Positivo.
                    </label>
                    <label>
                    <input type="radio" v-model="prueba.resultado" class="input-radio" v-bind:value="false"/>
                      Negativo.
                    </label> 
                </div>

                <button type="submit">Registrar Prueba</button>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "Insert",

        data: function(){
            return {
                prueba: {
                    persona   : "",
                    pais      : "",
                    tipo      : "",
                    resultado : "",
                    fecha     : ""
                },
                paises: [],
                personas: []
            }
        },
        
        methods: {
            processPrueba: async function(){
                console.log(this.prueba);
                await this.verifyToken();
                let token  = localStorage.getItem("tokenAccess");

                axios.post(
                    "https://gpc-a.herokuapp.com/prueba/create/",
                    this.prueba,
                    {headers: {'Authorization': `Bearer ${token}`}}
                )
                .then((result) => {
                    alert("se registro de manera correcta");
                    console.log("then");
                    this.$emit("completedPrueba")
                })
                .catch((error) => {
                    console.log(error)
                    alert("ERROR: Fallo en el registro.");
                });
            },
            verifyToken: async function(){
                return axios.post(
                        'https://gpc-a.herokuapp.com/refresh/',
                        {refresh: localStorage.getItem("tokenRefresh")},
                        {headers:{}}
                    )
                    .then((result) => {
                        console.log("New access token");
                        localStorage.setItem("tokenAccess", result.data.access);
                    })
                    .catch((error) => {
                        this.$emit("logOut");
                    })
            },
            getPaisList: async function(){
                if(localStorage.getItem("tokenRefresh") === null || localStorage.getItem("tokenAccess") === null) {
                    this.$emit("logOut");
                    return;
                }

                await this.verifyToken();
                let token  = localStorage.getItem("tokenAccess");  
                
                axios.get(
                    `https://gpc-a.herokuapp.com/pais/view/`,
                    {headers: {'Authorization': `Bearer ${token}`}}
                )
                .then((result) => {
                    this.paises = newFunction();

                  function newFunction() {
                    return result.data;
                  }
                })
                .catch((error) => {
                    if(error.response.status == "401") {
                        alert("Usted no está autorizado para realizar esta operación.");
                    }
                    else if(error.response.status == "500"){
                        alert("La plataforma está presentando problemas.\nIntente de nuevo más tarde.");
                    }
                })
            },
            getPersonaList: async function(){
                if(localStorage.getItem("tokenRefresh") === null || localStorage.getItem("tokenAccess") === null) {
                    this.$emit("logOut");
                    return;
                }

                await this.verifyToken();
                let token  = localStorage.getItem("tokenAccess");  
                
                axios.get(
                    `https://gpc-a.herokuapp.com/persona/view/`,
                    {headers: {'Authorization': `Bearer ${token}`}}
                )
                .then((result) => {
                    this.personas = newFunction();

                  function newFunction() {
                    return result.data;
                  }
                })
                .catch((error) => {
                    if(error.response.status == "401") {
                        alert("Usted no está autorizado para realizar esta operación.");
                    }
                    else if(error.response.status == "500"){
                        alert("La plataforma está presentando problemas.\nIntente de nuevo más tarde.");
                    }
                })
            }
        },
        
        created: async function(){
            this.getPaisList();
            this.getPersonaList();
        }
    }
    
    
</script>

<style>
    #Insert {
        display: flex;
        background-image: url('../assets/gradient.jpg');
        background-position-y: -850px;
        background-size: cover;
        justify-content: center;
        height: 721px;
    }

    .containerInsert {
        margin-top: 60px;
        padding: 20px;
        width: 60%;
        display: flex;
        flex-direction: column;
        align-content: center;
        align-items: center;
        background-color: #98478291;
        border-radius: 19px;
        backdrop-filter: blur(6px);
        height: 585px;
    }

    .containerInsert h2 {
        color: white;
        font-size: 30px;
        font-weight: 100;
        margin-bottom: 13px;
    }

    .containerInsert form {
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .form-group{
        width:75%;
    }

    .form-group input{
        width: 100%;
        font-size: 18px;
        border: none;
        border-radius: 12px;
        padding: 11px;
        padding-left: 15px;
    }

    .form-group input:focus{
        border-color: rgba(98,58,162,0.2);
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba(98,58,162,0.2);
    }

    .containerInsert form button{
        border: none;
        padding: 15px 27px;
        border-radius: 8px;
        background-color: #d43a479c;
        color: white;
        font-size: 18px;
        margin-top: 12px;
    }

    .form-group p {
        margin: 8px;
        color: white;
        font-size: 21px;
    }

    .input-radio {
        width: auto !important;
        margin-right: 0.625rem;
        min-height: 1.25rem;
        min-width: 1.25rem;
        cursor:pointer;
    }

    .form-group label{
        display: block;
        width: 100%;
        font-size:20px;
        color: white;
    }

</style>
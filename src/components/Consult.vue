<template>
    <div id="consult">
        <div class="containerConsult">
            <h2>Consultar Eliminar Modificar Datos</h2>
            <form v-on:submit.prevent="getPruebasList">
                <div class="form-group-consult">
                    <p>Consultar por id de prueba</p>
                    <input type="text" id="userId">   
                    <div class="buttons-div">
                        <button class="consult_button" type="submit">Realizar consulta</button>
                    </div>
                </div>
                <table id="table-consult">
                <thead>
                    <tr>
                        <td>Nombre</td>
                        <td>Apellido</td>
                        <td>N° Documento</td>
                        <td>Edad</td>
                        <td>Sexo</td>
                        <td>País</td>
                        <td>Fecha</td>
                        <td>Tipo</td>
                        <td>Resultado</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td id="nombre">    </td>
                        <td id="apellidos"> </td>
                        <td id="documento"> </td>
                        <td id="edad">      </td>
                        <td id="sexo">      </td>
                        <td id="pais">      </td>
                        <td id="fecha">     </td>
                        <td id="tipo">      </td>
                        <td id="resultado"> </td>
                    </tr>
                </tbody>
            </table>
            </form>
            <form v-on:submit.prevent="deletePruebaList">
                <div class="form-group-consult">
                    <p>Eliminar por id de prueba</p>
                    <input type="text" id="userId-delete">   
                    <div class="buttons-div">
                        <button class="consult_button" type="submit">Eliminar</button>
                    </div>
                </div>
            </form>
            <h2>Actualizar Registro covid</h2>
            <form v-on:submit.prevent="updatePrueba">
                <div class="form-group">
                    <p>Actualizar registro por id de prueba :</p>
                    <input type="text" id="userId-update" placeholder="Inserte el id a actualizar">  
                </div>

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

                <button type="submit">Actualizar prueba</button>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default{
        name: "Consult",
        
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
                personas: [],
            }
        },
        methods: {
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
            getPruebasList: async function(){
                if(localStorage.getItem("tokenRefresh") === null || localStorage.getItem("tokenAccess") === null) {
                    this.$emit("logOut");
                    return;
                }

                await this.verifyToken();
                let token  = localStorage.getItem("tokenAccess");
                let userId = document.getElementById("userId").value; 
                
                axios.get(
                    `https://gpc-a.herokuapp.com/prueba/views/${userId}/`,
                    {headers: {'Authorization': `Bearer ${token}`}}
                )
                .then((result) => {
                    this.prueba = result.data;
                    console.log(result.data)
                    document.getElementById("nombre").innerHTML =     this.prueba.persona.nombre;
                    document.getElementById("apellidos").innerHTML =  this.prueba.persona.apellidos;
                    document.getElementById("documento").innerHTML =  this.prueba.persona.numero_documento;
                    document.getElementById("edad").innerHTML =       this.prueba.persona.edad;
                    document.getElementById("sexo").innerHTML =       this.prueba.persona.sexo;
                    document.getElementById("pais").innerHTML =       this.prueba.pais.nombre;
                    document.getElementById("fecha").innerHTML =      this.prueba.fecha;
                    document.getElementById("tipo").innerHTML =       this.prueba.tipo;
                    document.getElementById("resultado").innerHTML =  this.prueba.resultado;
                })
                .catch((error) => {
                    if(error.response.status == "401") {
                        alert("Usted no está autorizado para realizar esta operación.");
                    }
                    else if(error.response.status == "404"){
                        document.getElementById("nombre").innerHTML =     "";
                        document.getElementById("apellidos").innerHTML =  "";
                        document.getElementById("documento").innerHTML =  "";
                        document.getElementById("edad").innerHTML =       "";
                        document.getElementById("sexo").innerHTML =       "";
                        document.getElementById("pais").innerHTML =       "";
                        document.getElementById("fecha").innerHTML =      "";
                        document.getElementById("tipo").innerHTML =       "";
                        document.getElementById("resultado").innerHTML =  "";
                        alert("registro no encontrado");
                    }
                    else if(error.response.status == "500"){
                        alert("La plataforma está presentando problemas.\nIntente de nuevo más tarde.");
                    }
                })
            },
            deletePruebaList: async function(){
                if(localStorage.getItem("tokenRefresh") === null || localStorage.getItem("tokenAccess") === null) {
                    this.$emit("logOut");
                    return;
                }

                await this.verifyToken();
                let token  = localStorage.getItem("tokenAccess");
                let userIdDelete = document.getElementById("userId-delete").value; 
                
                axios.delete(
                    `https://gpc-a.herokuapp.com/prueba/delete/${userIdDelete}/`,
                    {headers: {'Authorization': `Bearer ${token}`}}
                )
                .then((result) => {
                    alert(`ha borrado el registro con id ${userIdDelete}`);
                    this.prueba = result.data;
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
            },
            updatePrueba: async function(){
                console.log(this.prueba);
                await this.verifyToken();
                let token    = localStorage.getItem("tokenAccess");
                let idUpdate = document.getElementById("userId-update").value;

                axios.patch(
                    `https://gpc-a.herokuapp.com/prueba/update/${idUpdate}/`,
                    this.prueba,
                    {headers: {'Authorization': `Bearer ${token}`}}
                )
                .then((result) => {
                    alert(`actualizo registro usuario id : ${idUpdate}`);
                    console.log("then");
                    this.$emit("completedPrueba")
                })
                .catch((error) => {
                    console.log(error)
                    alert("ERROR: Fallo en el registro.");
                });
            }
        },
        
        created: async function(){
            this.getPaisList();
            this.getPersonaList();
        }
    }

</script>

<style>
    .consult_button{
        margin-bottom: 20px;
    }

    #consult {
        display: flex;
        background-image: url('../assets/gradient.jpg');
        background-position-y: -850px;
        background-size: cover;
        justify-content: center;
        height: 1321px;
    }

    .containerConsult {
        margin-top: 60px;
        padding: 20px;
        width: 90%;
        display: flex;
        flex-direction: column;
        align-content: center;
        align-items: center;
        background-color: #98478291;
        border-radius: 19px;
        backdrop-filter: blur(6px);
        height: 1199px;
    }

    .containerConsult h2 {
        color: white;
        font-size: 30px;
        font-weight: 100;
        margin-bottom: 13px;
    }
    #table-consult {
        border: 1px solid #b23f52;
        margin: auto;
        width: 112%;
        font-size: 18px;
        border-collapse: collapse;
        font-size: 16px;
        margin-left:    -59px;
        margin-top:     20px;
        margin-bottom:  20px;
    }
    #table-consult thead{
        background: linear-gradient(126deg, #b83e48, #92488c);
        padding: 9px;
        color: white;
    }
    .table-container{
        margin-top: 47px;
        width: 100%;
    }
    #table-consult td {
        padding: 13.5px;
    }
    #table-consult tbody td{
        background-color: whitesmoke;
    }
    .containerConsult form {
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .form-group-consult{
        width:75%;
    }
    .form-group-consult input{
        width: 100%;
        font-size: 18px;
        border: none;
        border-radius: 12px;
        padding: 11px;
        padding-left: 15px;
    }

    .form-group-consult input:focus{
        border-color: rgba(98,58,162,0.2);
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba(98,58,162,0.2);
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

    .containerConsult form button{
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
    .form-group-consult p {
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

    .buttons-div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;  
    }
</style>
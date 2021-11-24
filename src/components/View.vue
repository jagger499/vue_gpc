<template>
    <div class="view">
        <div class="table-container">
            <table id="table">
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
                    <tr v-for="prueba in pruebas_" :key="prueba.id">
                        <td> {{prueba.persona.nombre}}           </td>
                        <td> {{prueba.persona.apellidos}}        </td>
                        <td> {{prueba.persona.numero_documento}} </td>
                        <td> {{prueba.persona.edad}}             </td>
                        <td> {{prueba.persona.sexo}}             </td>
                        <td> {{prueba.pais.nombre}}              </td>
                        <td> {{prueba.fecha}}                    </td>
                        <td> {{prueba.tipo}}                     </td>
                        <td> {{prueba.resultado}}                </td>
                    </tr>
                </tbody>
            </table>    
        </div>
    </div>
</template>


<script>
    import axios from 'axios';
    export default{
        name: "View",
        data: function(){
            return {
                pruebas_: [],
                paises: [],
                personas: [] 
            }
        },
        methods : {
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
                
                axios.get(
                    `https://gpc-a.herokuapp.com/prueba/view/`,
                    {headers: {'Authorization': `Bearer ${token}`}}
                )
                .then((result) => {
                    this.pruebas_ = newFunction();

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
            this.getPruebasList();
            this.getPaisList();
            this.getPersonaList();
        }
    }
</script>
<style>
    .consulta-container {
        width: 75%;
        display: flex;
        align-items: center;
    }
    .p-form{
        color: black;
    }
    .view{
        display: flex;
        height: 85vh;
        flex-wrap: wrap;
        justify-content: center;   
    }
    .dropdown{
        width:40%;
        margin: auto;
        padding:9px;
        border-radius:12px;
    }
    #table {
        border: 1px solid #b23f52;
        margin: auto;
        width: 90%;
        font-size: 18px;
        border-collapse: collapse;
    }
    #table thead{
        background: linear-gradient(126deg, #b83e48, #92488c);
        padding: 9px;
        color: white;
    }
    .table-container{
        margin-top: 47px;
        width: 100%;
    }
    #table td {
        padding: 13.5px;
    }
</style>
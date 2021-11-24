<template>
    <div id="Insert">
        <div class="containerInsert">
            <h2>Registrar persona</h2>
            <form v-on:submit.prevent="processPersona">
                <div class="form-group">
                    <p>Numero de documento</p>
                    <input type="text" v-model="persona.numero_documento">   
                </div>
                <div class="form-group">
                    <p>Nombres</p>
                    <input type="text" v-model="persona.nombre">   
                </div>
                <div class="form-group">
                    <p>Apellidos</p>
                    <input type="text" v-model="persona.apellidos">   
                </div>
                <div class="form-group">
                    <p>Edad</p>
                    <input type="text" v-model="persona.edad">   
                </div>
                <div class="form-group">
                    <p>Sexo</p>
                    <label>
                    <input type="radio" v-model="persona.sexo" value="Masculino" class="input-radio"/>
                      Masculino.
                    </label>
                    <label>
                    <input type="radio" v-model="persona.sexo" value="Femenino" class="input-radio"/>
                      Femenino.
                    </label> 
                </div>
                <button type="submit">Registrar Persona</button>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "InsertPersona",
        
        data: function(){
            return {
                persona: {
                    numero_documento :"",
                    nombre           :"",
                    apellidos        :"",
                    edad             :"",
                    sexo             :""
                }
            }
        },
        
        methods: {
            processPersona: async function(){
                console.log(this.persona);
                await this.verifyToken();
                let token  = localStorage.getItem("tokenAccess");

                axios.post(
                    "https://gpc-a.herokuapp.com/persona/create/",
                    this.persona,
                    {headers: {'Authorization': `Bearer ${token}`}}
                )
                .then((result) => {
                    alert("se registro correctamentr");
                    console.log("then");
                    this.$emit("completedPersona");
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
            }
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
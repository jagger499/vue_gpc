<template>
    <div id="loginUser">
        <div class="containerLoginUser">
            <h2>Iniciar sesión</h2>
            <form v-on:submit.prevent="processLogInUser" method="POST">
                <input type="text" v-model="user.username" placeholder="Username">
                <br>
                <input type="password" v-model="user.password" placeholder="Password">
                <br>
                <button type="submit">Iniciar Sesion</button>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "LogIn",
        
        data: function(){
            return {
                user: {
                    username:"",
                    password:""
                }
            }
        },
        methods: {
            processLogInUser: function(){
                axios.post(
                    "https://gpc-a.herokuapp.com/login/",
                    this.user,
                    {headers: {}}
                )
                .then((result) => {
                    let dataLogIn = {
                        username     : this.user.username,
                        tokenAccess  : result.data.access,
                        tokenRefresh : result.data.refresh,
                    }
                    this.$emit('completedLogIn', dataLogIn)
                })
                .catch((error) => {
                    if (error.response.status == "401")
                        alert("ERROR 401: Credenciales Incorrectas.");
                });
            }
        }
    }
</script>


<style>
    #loginUser {
        background-image: url('../assets/fondo-login.jpg');
        background-position-y: -145px;
        background-size: cover;
        display: flex;
        justify-content: center;
        height: 83vh;
    }
    .containerLoginUser {
        margin-top: 98px;
        padding: 20px;
        width: 400px;
        display: flex;
        flex-direction: column;
        align-content: center;
        align-items: center;
        background-color: #98478291;
        border-radius: 19px;
        backdrop-filter: blur(6px);
        height: 265px;
    }
    .containerLoginUser h2{
        color: white;
        font-size: 30px;
        font-weight: 100;
    }
    .containerLoginUser form {
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .containerLoginUser form input{
        width: 76%;
        font-size: 18px;
        border: none;
        border-radius: 12px;
        padding: 11px;
        padding-left: 15px;
    }
    .containerLoginUser form input:focus{
        border-color: rgba(98,58,162,0.2);
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba(98,58,162,0.2);
    }
    .containerLoginUser form button{
        margin-top: 10px;
        border: none;
        padding: 11px 27px;
        border-radius: 8px;
        background-color: #d43a479c;
        color: white;
        font-size: 18px;
    }
</style>
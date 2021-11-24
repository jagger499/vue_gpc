<template>
    <div id="signUpUser">
        <div class="containerSignUpUser">
            <h2>Registrarse</h2>
            <form v-on:submit.prevent="processSignUp" >
                <input type="text" v-model="user.username" placeholder="Username">
                <br>
                <input type="password" v-model="user.password" placeholder="Password">
                <br>
                <input type="text" v-model="user.name" placeholder="Name">
                <br>
                <input type="email" v-model="user.email" placeholder="Email">

                <button type="submit">Registrarse</button>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "SignUp",

        data: function(){
            return {
                user: {
                    username: "",
                    password: "",
                    name: "",
                    email: "",
                    account: {
                        lastChangeDate: (new Date()).toJSON().toString(),
                        isActive      : true
                    }
                }
            }
        },

        methods: {
            processSignUp: function(){
                console.log(this.user);
                axios.post(
                    "https://gpc-a.herokuapp.com/user/",
                    this.user,
                    {headers: {}}
                )
                .then((result) => {
                    let dataSignUp = {
                        username      : this.user.username,
                        tokenAccess   : result.data.access,
                        tokenRefresh  : result.data.refresh,
                    }
                    this.$emit('completedSignUp', dataSignUp)
                })
                .catch((error) => {
                    console.log(error)
                    alert("ERROR: Fallo en el registro.");
                });
            }
        }
    }
</script>

<style>
    #signUpUser {
        background-image: url('../assets/fondo-login.jpg');
        background-position-y: -145px;
        background-size: cover;
        display: flex;
        justify-content: center;
        height: 83vh;
    }
    .containerSignUpUser {
        margin-top: 60px;
        padding: 20px;
        width: 400px;
        display: flex;
        flex-direction: column;
        align-content: center;
        align-items: center;
        background-color: #98478291;
        border-radius: 19px;
        backdrop-filter: blur(6px);
        height: 375px;
    }
    .containerSignUpUser h2 {
        color: white;
        font-size: 30px;
        font-weight: 100;
        margin-bottom: 13px;
    }
    .containerSignUpUser form {
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .containerSignUpUser form input{
        width: 76%;
        font-size: 18px;
        border: none;
        border-radius: 12px;
        padding: 11px;
        padding-left: 15px;
    }
    .containerSignUpUser form input:focus{
        border-color: rgba(98,58,162,0.2);
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba(98,58,162,0.2);
    }
    .containerSignUpUser form button{
        border: none;
        padding: 11px 27px;
        border-radius: 8px;
        background-color: #d43a479c;
        color: white;
        font-size: 18px;
        margin-top: 20px;
    }
</style>


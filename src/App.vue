<template>
  <div id="app" class="app">
    <div class="header">
      <img id="brand" src="./assets/logo_gpc.png">
      <nav>
        <button v-if="isAuth"  v-on:click="loadHome" class="button-nav-1">          Inicio </button>
        <button v-if="isAuth"  v-on:click="loadInsertPersona" class="button-nav-1"> Nueva persona </button>
        <button v-if="isAuth"  v-on:click="loadInsert" class="button-nav-1">        Nueva prueba </button>
        <button v-if="isAuth"  v-on:click="loadConsult" class="button-nav-1">       Consultas </button>
        <button v-if="isAuth"  v-on:click="loadView" class="button-nav-1">          Ver Datos </button>
        <button v-if="isAuth"  v-on:click="logOut" class="button-nav">              Log out </button>

        <button v-if="!isAuth" v-on:click="loadLogIn"  class="button-nav unauthbutton"> Iniciar Sesión </button>
        <button v-if="!isAuth" v-on:click="loadSignUp" class="button-nav"> Registrarse </button>
      </nav>
    </div>

    <div class="main-component">
      <router-view
        v-on:completedLogIn="completedLogIn"
        v-on:completedSignUp="completedSignUp"
        v-on:logOut="logOut"
        v-on:loadView ="loadView"
        v-on:loadInsert ="loadInsert"
        v-on:loadConsult ="loadConsult"
        v-on:loadInsertPersona ="loadInsertPersona"
      >
      </router-view>
    </div>
  </div>
</template>


<script>
  export default{
    name: 'App',

    data: function(){
      return {
        isAuth: false
      }
    },

    components:{
    },

    methods:{
      verifyAuth: function(){
        this.isAuth = localStorage.getItem("isAuth") || false;
        if(this.isAuth == false){
          this.$router.push({name: "login"})
        }
        else{
          this.$router.push({name: "home"});
        }
      },
      
      loadHome: function(){
        this.$router.push({name: "home"});
      },

      loadAccount: function(){
        this.$router.push({name: "account"});
      },

      logOut: function(){
        localStorage.clear();
        alert("logout correcto");
        this.verifyAuth();
      },

      loadLogIn: function(){
        this.$router.push({name: "login"})
      },

      loadSignUp: function(){
        this.$router.push({name: "signUp"})
      },

      loadView: function(){
        this.$router.push({name: "View"})
      },

      loadInsert: function(){
        this.$router.push({name: "Insert"})
      },

      loadConsult: function(){
        this.$router.push({name: "Consult"})
      },

      loadInsertPersona: function(){
        this.$router.push({name: "InsertPersona"})
      },

      completedLogIn: function(data){
        localStorage.setItem('username', data.username);
        localStorage.setItem('tokenRefresh', data.tokenRefresh);
        localStorage.setItem('tokenAccess', data.tokenAccess);
        localStorage.setItem('isAuth', true);
        alert("llog in correcto");
        this.verifyAuth();
      },

      completedPersona: function(data){
        alert("Persona registrados ways");
        this.processPersona(data);
      },

      completedSignUp: function(data){
        alert("Datos registrados ways");
        this.completedLogIn(data);
      },
    },

    created: function(){
      this.verifyAuth();
    }
  }
</script>

<style>
  body {
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }
  button {
    font-family: 'Poppins', sans-serif;
  }
  
  select {
    width: 105%;
    padding: 11px;
    font-size: 18px;
    border-radius: 15px;
    border: none;
    padding-left: 15px;
  }

  .header{
    background: linear-gradient(126deg, #b83e48, #92488c);
    position: fixed;
    width: 100%;
    min-height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    top: 0;
    left: 0;
    z-index: 2;
  }

  #brand {
    height: 105px;
    padding: 10px;
  }

  .header nav {
    height: 100%;
    width: 51%;
    display: flex;
    justify-content: space-around;
    margin-right: 23px;
  }

  .button-nav{
    color: #ffffff;
    background: #d43a4861;
    border: none;
    border-radius: 15px;
    padding: 16px 35px;
    font-size: 18px;
  }
  .button-nav-1{
    color: #ffffff;
    background: transparent;
    border: none;
    border-radius: 15px;
    font-size: 18px;
  }
  .main-component{
    margin-top: 110px;
    height: 100%;
  }

  .footer{
    display: flex;
    width: 100%;
    min-height: 80px;
    background: linear-gradient(126deg, #b83e48, #92488c);
    color: #E5E7E9;
    align-items: center;
  }

  .footer h2{
    margin: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .unauthbutton{
    margin-left: 322px;
  }
</style>

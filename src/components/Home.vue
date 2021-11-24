<template>
    <div class="home-container">
        <div class="home">  
         <div id="welcome-seccion">
             <div>
                 <img id="brand-a" src="../assets/logo_amplio_gpc.png">
             </div>
             <div class="texto-bienvenida">
                <h1>Bienvenido {{ username }}</h1>
                <p>
                    Este es un crud para la gestión de datos relacionados
                    con pruebas de covid en este podremos introducir 
                    actualizar y eliminar pruebas realizadas a personas
                    de distintas nacionalidades.    
                </p>
             </div>
         </div>
         <div id="welcome-img">
             <img id="ilustracion" src="../assets/ilustracion.jpg">
         </div>
        </div>
        <div class="home">
         <div class="src-img">
             <img id="ilustracion" class="img-src" src="../assets/registro_persona.jpg">
         </div>  
         <div id="welcome-seccion">
             <div>
                 <img id="brand-a" src="../assets/logo_amplio_gpc.png">
             </div>
             <div class="texto-bienvenida">
                <h1>Como agregar una nueva persona</h1>
                <p>
                    En esta seccion podras añadir nuevas personas las cuales
                    desees tener en la base de datos para posteriores registros
                    con un formulario
                    de pruebas de covid de diferentes tipos
                </p>
             </div>
         </div>
        </div>
        <div class="home"> 
         <div id="welcome-seccion">
             <div>
                 <img id="brand-a" src="../assets/logo_amplio_gpc.png">
             </div>
             <div class="texto-bienvenida">
                <h1>Como agregar una nueva prueba</h1>
                <p>
                    En esta seccion podras añadir nuevas pruebas y asignarlas a las
                    personas previamente registradas y para los paises disponibles 
                    tan solo llenando el formulario.

                </p>
             </div>
         </div>
         <div class="src-img">
             <img id="ilustracion" class="img-src" src="../assets/nueva_prueba.jpg">
         </div> 
        </div>
        <div class="home">
         <div class="src-img">
             <img id="ilustracion" class="img-src" src="../assets/nueva_consulta.jpg">
         </div>  
         <div id="welcome-seccion">
             <div>
                 <img id="brand-a" src="../assets/logo_amplio_gpc.png">
             </div>
             <div class="texto-bienvenida">
                <h1>Consultar Eliminar actualizar datos</h1>
                <p>
                    En esta seccion podras consultar datos sobre las pruebas
                    ya existentes con su id ademas de eliminar y actualizar 
                    las mismas.

                </p>
             </div>
         </div>
        </div>
        <div class="home">  
         <div id="welcome-seccion">
             <div>
                 <img id="brand-a" src="../assets/logo_amplio_gpc.png">
             </div>
             <div class="texto-bienvenida">
                <h1>Como visualizo mis datos</h1>
                <p>
                    En esta seccion podras visualizar de forma tabulada los
                    datos para las diferentes pruebas.
                    
                </p>
             </div>
         </div>
         <div class="src-img">
             <img id="ilustracion" class="img-src" src="../assets/ver_datos.jpg">
         </div>
        </div>
    </div>    
</template>


<script>
    export default{
        name: "Home",
        data: function(){
            return {
                username: localStorage.getItem("username") || "none"
            }
        }
    }
</script>


<style>
    .img-src {
        padding: 50px !important;
        margin: 50px 0px;
        background-color: lavenderblush;
        border-radius: 72px;
    }
    .home {
        background-size: cover;
        margin         : 0;
        padding        : 0%;
        height         : 562px;
        width          : 100%;
        display        : flex;
    }

    h1 {
        font-size: 33px;
        color: #ffffff;
        padding: 10px 50px;
    }

    #welcome-seccion{
        background: linear-gradient(126deg, #b83e48, #92488c);
        margin: 30px 23px;
        border-radius: 37px;
        max-width: 48%;
    }

    #brand-a {
        height: 113px;
        padding: 34px 0px;
        margin-left: -5px;
    }

    .texto-bienvenida p{
        color: white;
        font-size: 21px;
        padding: 0 50px;
        font-weight: 100;
    }
    .texto-bienvenida{
        padding: 20px 0px;
        margin: 20px;
        margin-top: -25px;
        border-radius: 19px;
    }

    #ilustracion {
        width: 600px;
    }
    #welcome-img {
        padding: 55px;
    }
    .texto-bienvenida button{
        border: none;
        padding: 11px 27px;
        border-radius: 8px;
        background-color: #d43a479c;
        color: white;
        font-size: 18px;
        margin-left:47px;
    }
</style>
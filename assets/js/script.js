$(document).ready(function() {  /* chargement du DOM */

/* Chargement de la BDD 
******************************************************/
function fonctionAccesBDD(){
    fetch('assets/bdd/bdd.json')
        .then(response => response.json())
        .then(data => {
            $BDDOrks = data;
            $Nbunites = $BDDOrks.orks.length;
            console.log($BDDOrks);
            console.log($Nbunites);
        })
        .catch(error => console.error('Erreur lors du chargement du fichier BDDpictos.JSON :', error));
}

$BDDorks="";
$Nbunites="";
fonctionAccesBDD();

setTimeout(() =>{   //Ajout d'un timer pour attendre le chargement de l'appel BDD


    /* Gestion du popup renforts
    ******************************************************/
    function fonctionAffichageRenforts(){
        for ($i=0; $i<$Nbunites; $i++){
            $nom=$BDDOrks.orks[$i].nom;
            $ZoneAffichageRenforts.append('<div class="unite"><div class="carte colonne">  <img class="carteImage" src="assets/images/units/ork_'+$nom+'_R.png">   <p class="carteTitre">'+$nom+'</p>   </div></div>');
        }
    }
    $PopupRenforts=($(".PopupRenforts"));
    $ZoneAffichageRenforts=($(".ZoneAffichageRenforts"));

    fonctionAffichageRenforts();

    // Numéros d'unités
    $numero=1;

    // Ouverture du popup
    $(".BoutonRenforts").on("click", function(){
        $PopupRenforts.addClass('visible');
    })

    // Fermeture du popup
    $(".BoutonFermerRenforts").on("click", function(){
        $PopupRenforts.removeClass('visible');
    })
    
    // Ajout d'unités sur l'écran principal
    $(".unite").on("click", function(){
        $ContenuCarte=this.innerHTML;
        $(".AffichageUnites").append($ContenuCarte);
        $(".AffichageUnites").children().last().addClass("ork");
        $(".AffichageUnites").children().last().addClass("numero"+$numero);
        $(".AffichageUnites").children().last().append('<p class="carteNumero policeOrk">'+$numero+'</p>');
        $numero++;

        /*for ($i=1; $i<13; $i++){
            console.log($i);
            if ($(".numero"+$i)===null){
                $(".AffichageUnites").children().last().addClass('numero'+$i);
                $(".AffichageUnites").children().last().append('<p class="carteNumero policeOrk">'+$i+'</p>');
                $i=99;
            }
        } */
    })


    /* Supprimer des unités éliminées depuis l'écran principal
    *************************************************************/
    $PopupUnite=$(".PopupUnite");
    $ZoneAffichageUnite=$(".ZoneAffichageUnite");

    $(".ork").on("click", function(){
        console.log("clic");
        $PopupUnite.addClass('visible');
        $ZoneAffichageUnite.append(this.innerHTML);
    });


},500)
});
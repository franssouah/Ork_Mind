$(document).ready(function() {  /* chargement du DOM */

    /* Chargement de la config enregistrée
    *************************************************************/
        $sessionConfig = JSON.parse(localStorage.getItem("Config"));

        // réglage Options
        $NbTours=$sessionConfig.options.NbTours;
        console.log($NbTours);
 
        // initiative
        $initiative="mar";
        $("#jetonActivation").append('<img id="jetonActivationM" src="assets/images/interface/jeton_mar.png" class="icone jetonActivation">');

    /* BDD évènements
    **************************************************************/
    $BDDevenements=[
        "aucun",
        "rien",
        "nada",
        "aucun",
        "En avant ! <br><br> <strong>Mouvement +1</strong>",
        "En avant ! <br><br> <strong>Mouvement +1</strong>",
        "GO, GO, GO ! <br><br> <strong>Mouvement +2</strong>",
        "CONCENTRATION <br><br> <strong>Attaque +1</strong> (Tir et/ou Assaut)",
        "CONCENTRATION <br><br> <strong>Attaque +1</strong> (Tir et/ou Assaut)",
        "WAAAAAAGh !! <br><br> L'unité <strong>joue 2 actions</strong> de la liste."];

    /* BDD actions
    **************************************************************/
    $BDDactions=[
        "Assaut sur ennemi",
        "Tir sur ennemi",
        "Assaut sur officier",
        "Assaut sur véhicule",
        "Tir sur officier",
        "Mouvement / Assaut vers ennemi",
        "Assaut sur ennemi blessé",
        "Tir sur ennemi blessé",
        "Mouvement / Assaut vers ennemi blessé",
        "Mouvement vers objectif",
        "Mouvement vers couvert",
        "Repli vers zone de départ", 
        "Mouvement vers un allié"];
    
    $BDDactionsAssaut=[
        "Assaut sur ennemi",
        "Assaut sur officier",
        "Assaut sur véhicule",
        "Mouvement / Assaut vers ennemi",
        "Assaut sur ennemi blessé",
        "Mouvement / Assaut vers ennemi blessé",
        "Mouvement vers objectif",
        "Mouvement vers couvert", 
        "Mouvement vers un allié"];

    $BDDactionsTir=[
        "Tir sur ennemi",
        "Tir sur officier",
        "Tir sur véhicule léger",
        "Mouvement / Assaut vers ennemi",
        "Tir sur ennemi blessé",
        "Mouvement vers objectif",
        "Mouvement vers couvert",
        "Repli vers zone de départ", 
        "Mouvement vers un allié",
        "Assaut sur ennemi"];
    
    $BDDactionsTirLourd=[
        "Tir sur ennemi",
        "Tir sur officier",
        "Tir sur véhicule",
        "Mouvement / Assaut vers ennemi",
        "Tir sur ennemi blessé",
        "Mouvement vers objectif",
        "Mouvement vers couvert",
        "Repli vers zone de départ", 
        "Mouvement vers un allié",
        "Assaut sur ennemi"];

    /* BDD fin tour
    **************************************************************/
    $BDDfin=[
        "Mouvement vers ennemi",
        "Mouvement vers ennemi blessé",
        "Mouvement vers objectif",
        "Mouvement vers couvert",
        "Repli vers zone de départ", 
        "Mouvement vers allié",
        "Sieste (rien, quoi!)"];


    /* Gestion des Tours
    **************************************************************/
        //numéro du tour en cours
        $numeroTour=1;
        $AffichageNumeroTour=$("#AffichageNumeroTour");
        $AffichageNumeroTour.html($numeroTour);

        // Nb Tours de la partie
        $AffichageNbTours=$("#AffichageNbTours");
        $AffichageNbTours.html($NbTours);

        // Tour suivant
        $(".BoutonFinTour").on("click", function(){
            // zone affichage messages
            $ZoneMessageFinTour=$(".ZoneAffichageMessageFin");
            $ZoneMessageFinTour.html('');

            // Ouverture popup
            $(".PopupFinTour").addClass('visible');

            // vérif activations
            if($numeroActivation<$NbActivations){
                $ZoneMessageFinTour.append('<p class="policeOrk policeTaille2">Pas si vite ! Il reste des Orks à activer !</p>')
            }else{
                // vérif nb tours
                if ($numeroTour == $NbTours){
                    alert ("Partie terminée !");
                }else{
                    // affichage déplacements de fin de tour
                    $ZoneMessageFinTour.append('<p class="policeOrk">Mouvement des unités non activées (numéros PAIRS) :</p><p class="police3">'+$BDDfin[Math.floor(Math.random()*($BDDfin.length))]+'</p><br><br>');
                    $ZoneMessageFinTour.append('<p class="policeOrk">Mouvement des unités non activées (numéros IMPAIRS) :</p><p class="police3">'+$BDDfin[Math.floor(Math.random()*($BDDfin.length))]+'</p>');

                    /*alert("Mouvement des unités non activées (numéros PAIRS) : \n\n"+$BDDfin[Math.floor(Math.random()*($BDDfin.length))]);
                    alert("Mouvement des unités non activées (numéros IMPAIRS) : \n\n"+$BDDfin[Math.floor(Math.random()*($BDDfin.length))]);*/

                    // changement n° tour
                    $numeroTour++;
                    $AffichageNumeroTour.html($numeroTour);
                    if ($numeroTour == $NbTours){
                        $(".AffichageTour").css("color","red");
                    }
                    //changement d'initiative
                    $("#jetonActivation").html('');
                    switch($initiative){
                        case 'ork':
                            $("#jetonActivation").append('<img id="jetonActivationM" src="assets/images/interface/jeton_mar.png" class="icone jetonActivation">');
                            $initiative="mar";
                            break;
                        case 'mar':
                            $("#jetonActivation").append('<img id="jetonActivationO" src="assets/images/interface/jeton_ork.png" class="icone jetonActivation">');
                            $initiative="ork";
                            break;
                    }
                    

                    //réinitialisation des activations
                    $numeroActivation=0;
                    $(".activee").removeClass('activee');
                }
            }

            // Fermeture popup
            $(".BoutonFermerFinTour").on("click", function(){
                $(".PopupFinTour").removeClass('visible');
            });

        })


    /* Affichage des Unités
    **************************************************************/
        $affichageUnites=$(".AffichageUnites");
        $numeroOrk=1;

        $BossMob=$sessionConfig.options.BossMob;
        $Sluggas=$sessionConfig.options.Sluggas;
        $Shootas=$sessionConfig.options.Shootas;

        $Bigshoota=$sessionConfig.options.BigShoota;
        $RokkitLauncha=$sessionConfig.options.RokkitLauncha;
        $KillaKan=$sessionConfig.options.KillaKan;
        $DeffDread=$sessionConfig.options.DeffDread;

        // classes de rôles:
            // assaut
            // tir
            // tirlourd : tir VS véhic lourd

        // Boss Mob
        for ($i=0; $i<($BossMob); $i++){
            $nom="bossmob";
            $affichageUnites.append('<div class="unite assaut"><div class="carte colonne">  <img class="carteImage" src="assets/images/units/ork_'+$nom+'_R.png">   <p class="carteTitre">'+$nom+'</p>   </div></div>');
            $affichageUnites.children().last().addClass("ork");
            $affichageUnites.children().last().attr('id','ork'+$numeroOrk);
            $affichageUnites.children().last().append('<p class="carteNumero policeOrk">'+$numeroOrk+'</p>');
            $numeroOrk++;
        }

        // Sluggas
        for ($i=0; $i<($Sluggas); $i++){
            $nom="sluggas";
            $affichageUnites.append('<div class="unite assaut"><div class="carte colonne">  <img class="carteImage" src="assets/images/units/ork_'+$nom+'_R.png">   <p class="carteTitre">'+$nom+'</p>   </div></div>');
            $affichageUnites.children().last().addClass("ork");
            $affichageUnites.children().last().attr('id','ork'+$numeroOrk);
            $affichageUnites.children().last().append('<p class="carteNumero policeOrk">'+$numeroOrk+'</p>');
            $numeroOrk++;
        }

        // Shootas
        for ($i=0; $i<($Shootas); $i++){
            $nom="shootas";
            $affichageUnites.append('<div class="unite tir"><div class="carte colonne">  <img class="carteImage" src="assets/images/units/ork_'+$nom+'_R.png">   <p class="carteTitre">'+$nom+'</p>   </div></div>');
            $affichageUnites.children().last().addClass("ork");
            $affichageUnites.children().last().attr('id','ork'+$numeroOrk);
            $affichageUnites.children().last().append('<p class="carteNumero policeOrk">'+$numeroOrk+'</p>');
            $numeroOrk++;
        }

        // Bigshoota
        for ($i=0; $i<($Bigshoota); $i++){
            $nom="bigshoota";
            $affichageUnites.append('<div class="unite tir"><div class="carte colonne">  <img class="carteImage" src="assets/images/units/ork_'+$nom+'_R.png">   <p class="carteTitre">'+$nom+'</p>   </div></div>');
            $affichageUnites.children().last().addClass("ork");
            $affichageUnites.children().last().attr('id','ork'+$numeroOrk);
            $affichageUnites.children().last().append('<p class="carteNumero policeOrk">'+$numeroOrk+'</p>');
            $numeroOrk++;
        }

        // RokkitLauncha
        for ($i=0; $i<($RokkitLauncha); $i++){
            $nom="rokkitlauncha";
            $affichageUnites.append('<div class="unite  tirlourd"><div class="carte colonne">  <img class="carteImage" src="assets/images/units/ork_'+$nom+'_R.png">   <p class="carteTitreS">'+$nom+'</p>   </div></div>');
            $affichageUnites.children().last().addClass("ork");
            $affichageUnites.children().last().attr('id','ork'+$numeroOrk);
            $affichageUnites.children().last().append('<p class="carteNumero policeOrk">'+$numeroOrk+'</p>');
            $numeroOrk++;
        }

        // KillaKan
        for ($i=0; $i<($KillaKan); $i++){
            $nom="killakan";
            $affichageUnites.append('<div class="unite tirlourd"><div class="carte colonne">  <img class="carteImage" src="assets/images/units/ork_'+$nom+'_R.png">   <p class="carteTitre">'+$nom+'</p>   </div></div>');
            $affichageUnites.children().last().addClass("ork");
            $affichageUnites.children().last().attr('id','ork'+$numeroOrk);
            $affichageUnites.children().last().append('<p class="carteNumero policeOrk">'+$numeroOrk+'</p>');
            $numeroOrk++;
        }

        // KillaKan
        for ($i=0; $i<($DeffDread); $i++){
            $nom="deffdread";
            $affichageUnites.append('<div class="unite tirlourd"><div class="carte colonne">  <img class="carteImage" src="assets/images/units/ork_'+$nom+'_R.png">   <p class="carteTitre">'+$nom+'</p>   </div></div>');
            $affichageUnites.children().last().addClass("ork");
            $affichageUnites.children().last().attr('id','ork'+$numeroOrk);
            $affichageUnites.children().last().append('<p class="carteNumero policeOrk">'+$numeroOrk+'</p>');
            $numeroOrk++;
        }

   
    /* Gestion des unités éliminées depuis l'écran principal
    *************************************************************/
        $PopupUnite=$(".PopupUnite");
        $ZoneAffichageUnite=$(".ZoneAffichageUnite");

        $IDclic="";

        // ouverture et remplissage du popup
        $(".ork").on("click", function(){
            $IDclic=this.getAttribute('id');
            console.log("clic");
            $PopupUnite.addClass('visible');
            $ZoneAffichageUnite.append(this.innerHTML);
        });

        // suppression de l'unité + nettoyage et fermeture popup
        $(".BoutonEliminerUnite").on("click", function(){
            // probabilité de sauver l'unité
            $randomSvg=Math.floor(Math.random()*10);
            if ($randomSvg == 0){
                $(".ZoneMessagePopupUnite").append('<p class="policeOrk padding2">RÉSISTANTS : <br><br> Cette unité reste en jeu ; elle reçoit un marquer Suppression. </p>');
            }
            // probabilité de perte d'une activation
            if ($randomSvg == 1){
                $(".ZoneMessagePopupUnite").append('<p class="policeOrk padding2">Les Orks perdent une activation pour ce tour. </p>');
                $numeroActivation++
                setTimeout(() =>{
                    $("#"+$IDclic).remove();
                    $ZoneAffichageUnite.html('');
                    $PopupUnite.removeClass('visible');
                },3000)
            }
            else{
                $("#"+$IDclic).remove();
                $ZoneAffichageUnite.html('');
                $PopupUnite.removeClass('visible');
            }
        })

        // nettoyage et fermeture du popup
        $(".BoutonFermerUnite").on("click", function(){
            $ZoneAffichageUnite.html('');
            $(".ZoneMessagePopupUnite").html('');
            $PopupUnite.removeClass('visible');
        })

    
    /* Gestion des ACTIVATIONS
    *************************************************************/
    $OrkMind=$("#OrkMind");

    $PopupActivation=$(".PopupActivation");

    $NbActivations=$sessionConfig.options.NbActivations;
    $('.NbActivations').html($NbActivations);
    $numeroActivation=0;

    // ajout / retrait d'activations
    $(".NbActivMoins").on("click", function(){
        $NbActivations=$NbActivations-1;
        $('.NbActivations').html($NbActivations);
    })
    $(".NbActivPlus").on("click", function(){
        $NbActivations++;
        $('.NbActivations').html($NbActivations);
    })


    function fonctionActivation(){
        if($numeroActivation<$NbActivations){
            // tirage au sort d'une unité encore en jeu
                // création de la liste des unités activables
                $listeUnites=[];
                for ($i=0;$i<20;$i++){
                    if($("#ork"+$i).length == 0){
                    }else{
                        if($("#ork"+$i).hasClass('activee')){

                        }else{
                            $listeUnites.push('ork'+$i);
                        }
                    }
                }
                console.log($listeUnites);

                // tirage au sort
                $random=Math.floor(Math.random()*($listeUnites.length));
                $UniteActive=$("#"+$listeUnites[$random]);
                console.log($UniteActive);
                $ContenuCarteUniteActive=$UniteActive.html();

            //Ouverture du popup
                // affichage de l'unité
                $(".ZoneAffichageActivation").html($ContenuCarteUniteActive);

                // affichage de l'évènement
                $(".EvenementAffiche").html($BDDevenements[Math.floor(Math.random()*($BDDevenements.length))]);

                // affichage des actions
                    // type d'unité
                    if ($UniteActive.hasClass('assaut')){
                        $actionsDispo=$BDDactionsAssaut;
                    }
                    if ($UniteActive.hasClass('tir')){
                        $actionsDispo=$BDDactionsTir;
                    }
                    if ($UniteActive.hasClass('tirlourd')){
                        $actionsDispo=$BDDactionsTirLourd;
                    }
                    
                    //tirage au sort
                    //$actionsDispo=$BDDactions;
                    for ($i=0; $i<10; $i++){
                        //tirage d'une action
                        $action=$actionsDispo[Math.floor(Math.random()*($actionsDispo.length))];
                        // ajout dans le html
                        $(".ActionAffiche"+$i).html($action);
                        //suppression de cette action pour éviter double tirage
                        $actionsDispo=jQuery.grep($actionsDispo, function(value){
                            return value != $action;
                        });
                    }


                // affichage du popup
                $PopupActivation.addClass('visible');

                //ajout classe activee
                $UniteActive.addClass('activee');

            // incrémentation numéro activation
            $numeroActivation++;

        }else{
            // à remplacer par Popup !
            alert("Plus d'activations pour ce tour !");
        }
    }

    $OrkMind.on("click", function(){
        fonctionActivation();
    })

    $(".BoutonFermerActivation").on("click", function(){
        $PopupActivation.removeClass('visible');
    })


});
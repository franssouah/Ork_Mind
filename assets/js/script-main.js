$(document).ready(function() {  /* chargement du DOM */

    /* Chargement de la config enregistrée
    *************************************************************/
        $sessionConfig = JSON.parse(localStorage.getItem("Config"));

        // réglage Options
        $NbTours=$sessionConfig.options.NbTours;
        console.log($NbTours);

        $("#jetonActivationM").addClass('visible');

    /* BDD évènements
    **************************************************************/
    $BDDevenements=[
        "aucun",
        "GO, GO, GO ! <br><br> L'unité gagne : Mouvement +2",
        "CONCENTRATION <br><br> L'unité gagne +1 à l'attaque (Tir et/ou Assaut)"];

    /* BDD actions
    **************************************************************/
    $BDDactions=[
        "Assaut sur l'ennemi",
        "Tir sur l'ennemi",
        "Mouvement vers l'ennemi",
        "Assaut sur ennemi blessé",
        "Tir sur ennemi blessé",
        "Mouvement vers ennemi blessé",
        "Mouvement vers l'objectif",
        "Mouvement vers le couvert",
        "Repli : mouvement vers la zone de départ"];
    
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
            // vérif activations
            if($numeroActivation<$NbActivations){
                alert ("Il reste des Orks à activer !");
            }else{
                // vérif nb tours
                if ($numeroTour == $NbTours){
                    alert ("Partie terminée !");
                }else{
                    $numeroTour++;
                    $AffichageNumeroTour.html($numeroTour);
                    if ($numeroTour == $NbTours){
                        $(".AffichageTour").css("color","red");
                    }
                    //changement d'initiative
                    if($("#jetonActivationM").hasClass('visible')){
                        $("#jetonActivationM").removeClass('visible');
                        $("#jetonActivationO").addClass('visible');
                    };
                    if($("#jetonActivationO").hasClass('visible')){
                        $("#jetonActivationO").removeClass('visible');
                        $("#jetonActivationM").addClass('visible');
                    };

                    //réinitialisation des activations
                    $numeroActivation=0;
                    $(".activee").removeClass('activee');
                }
            }
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

        // Boss Mob
        for ($i=0; $i<($BossMob); $i++){
            $nom="bossmob";
            $affichageUnites.append('<div class="unite"><div class="carte colonne">  <img class="carteImage" src="assets/images/units/ork_'+$nom+'_R.png">   <p class="carteTitre">'+$nom+'</p>   </div></div>');
            $affichageUnites.children().last().addClass("ork");
            $affichageUnites.children().last().attr('id','ork'+$numeroOrk);
            $affichageUnites.children().last().append('<p class="carteNumero policeOrk">'+$numeroOrk+'</p>');
            $numeroOrk++;
        }

        // Sluggas
        for ($i=0; $i<($Sluggas); $i++){
            $nom="sluggas";
            $affichageUnites.append('<div class="unite"><div class="carte colonne">  <img class="carteImage" src="assets/images/units/ork_'+$nom+'_R.png">   <p class="carteTitre">'+$nom+'</p>   </div></div>');
            $affichageUnites.children().last().addClass("ork");
            $affichageUnites.children().last().attr('id','ork'+$numeroOrk);
            $affichageUnites.children().last().append('<p class="carteNumero policeOrk">'+$numeroOrk+'</p>');
            $numeroOrk++;
        }

        // Shootas
        for ($i=0; $i<($Shootas); $i++){
            $nom="shootas";
            $affichageUnites.append('<div class="unite"><div class="carte colonne">  <img class="carteImage" src="assets/images/units/ork_'+$nom+'_R.png">   <p class="carteTitre">'+$nom+'</p>   </div></div>');
            $affichageUnites.children().last().addClass("ork");
            $affichageUnites.children().last().attr('id','ork'+$numeroOrk);
            $affichageUnites.children().last().append('<p class="carteNumero policeOrk">'+$numeroOrk+'</p>');
            $numeroOrk++;
        }

        // Bigshoota
        for ($i=0; $i<($Bigshoota); $i++){
            $nom="bigshoota";
            $affichageUnites.append('<div class="unite"><div class="carte colonne">  <img class="carteImage" src="assets/images/units/ork_'+$nom+'_R.png">   <p class="carteTitre">'+$nom+'</p>   </div></div>');
            $affichageUnites.children().last().addClass("ork");
            $affichageUnites.children().last().attr('id','ork'+$numeroOrk);
            $affichageUnites.children().last().append('<p class="carteNumero policeOrk">'+$numeroOrk+'</p>');
            $numeroOrk++;
        }

        // RokkitLauncha
        for ($i=0; $i<($RokkitLauncha); $i++){
            $nom="rokkitlauncha";
            $affichageUnites.append('<div class="unite"><div class="carte colonne">  <img class="carteImage" src="assets/images/units/ork_'+$nom+'_R.png">   <p class="carteTitre">'+$nom+'</p>   </div></div>');
            $affichageUnites.children().last().addClass("ork");
            $affichageUnites.children().last().attr('id','ork'+$numeroOrk);
            $affichageUnites.children().last().append('<p class="carteNumero policeOrk">'+$numeroOrk+'</p>');
            $numeroOrk++;
        }

        // KillaKan
        for ($i=0; $i<($KillaKan); $i++){
            $nom="killakan";
            $affichageUnites.append('<div class="unite"><div class="carte colonne">  <img class="carteImage" src="assets/images/units/ork_'+$nom+'_R.png">   <p class="carteTitre">'+$nom+'</p>   </div></div>');
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
            $("#"+$IDclic).remove();
            $ZoneAffichageUnite.html('');
            $PopupUnite.removeClass('visible');
        })

        // nettoyage et fermeture du popup
        $(".BoutonFermerUnite").on("click", function(){
            $ZoneAffichageUnite.html('');
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
                    //tirage au sort
                    $actionsDispo=$BDDactions;
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
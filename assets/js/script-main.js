$(document).ready(function() {  /* chargement du DOM */

    
    /* Appel BDD
    ************************************************************/
    function fonctionAccesBDD(){
        fetch('assets/bdd/BDDorkmind.json')
            .then(response => response.json())
            .then(data => {
                $BDD = data;
                $NbOrks = $BDD.orks.length;
            })
            .catch(error => console.error('Erreur lors du chargement du fichier BDD.JSON :', error));
    }

    $BDD="";
    $NbOrks="";
    fonctionAccesBDD();


    /* Chargement de la config enregistrée
    *************************************************************/
        $sessionConfig = JSON.parse(localStorage.getItem("Config"));

        // réglage Options
        $NbTours=$sessionConfig.options.NbTours;
        $ObjectifMission=$sessionConfig.options.ObjectifMission;
 
        // initiative
        $initiative="mar";
        $("#jetonActivation").append('<img id="jetonActivationM" src="assets/images/interface/jeton_mar.png" class="icone jetonActivation">');

    
    setTimeout(() =>{

    /* BDD évènements, actions, fin de tour
    **************************************************************/
        $BDDevenements=$BDD.evenements;
        
        $BDDactionsCommunes=$BDD.actionsCommunes;
        $BDDactionsAssaut=$BDD.actionsAssaut;
        $BDDactionsTir=$BDD.actionsTir;   
        $BDDactionsTirLourd=$BDD.actionsTirLourd;

        $BDDactionsObjectifTenir=$BDD.actionsObjectifTenir;
        $BDDactionsObjectifProtecChef=$BDD.actionsObjectifProtecChef;
        $BDDactionsObjectifTuerChef=$BDD.actionsObjectifTuerChef;

        $BDDfin=$BDD.finTour;

        // ajout actions type d'unité type d'unité
            // Assaut
            $NbActionsAssaut=$BDDactionsAssaut.length;
            for ($i=0; $i<$BDDactionsCommunes.length; $i++){
                $BDDactionsAssaut[$NbActionsAssaut+$i]=$BDDactionsCommunes[$i];
            }
            // Tir
            $NbActionsTir=$BDDactionsTir.length;
            for ($i=0; $i<$BDDactionsCommunes.length; $i++){
                $BDDactionsTir[$NbActionsTir+$i]=$BDDactionsCommunes[$i];
            }
            // Tir Lourd
            $NbActionsTirLourd=$BDDactionsTirLourd.length;
            for ($i=0; $i<$BDDactionsCommunes.length; $i++){
                $BDDactionsTirLourd[$NbActionsTirLourd+$i]=$BDDactionsCommunes[$i];
            }
        

        // ajout des actions spécifiques à l'objectif
        if ($ObjectifMission == "Tenir objectif" || $ObjectifMission == "Capturer objectif"){
            //assaut
            $NbActionsAssaut=$BDDactionsAssaut.length;
            for ($i=0; $i<$BDDactionsObjectifTenir.length; $i++){
                $BDDactionsAssaut[$NbActionsAssaut+$i]=$BDDactionsObjectifTenir[$i];
            }
            // Tir
            $NbActionsTir=$BDDactionsTir.length;
            for ($i=0; $i<$BDDactionsObjectifTenir.length; $i++){
                $BDDactionsTir[$NbActionsTir+$i]=$BDDactionsObjectifTenir[$i];
            }
            // Tir Lourd
            $NbActionsTirLourd=$BDDactionsTirLourd.length;
            for ($i=0; $i<$BDDactionsObjectifTenir.length; $i++){
                $BDDactionsTirLourd[$NbActionsTirLourd+$i]=$BDDactionsObjectifTenir[$i];
            }
            
        }
        if ($ObjectifMission == "Protéger Boss"){
            //assaut
            $NbActionsAssaut=$BDDactionsAssaut.length;
            for ($i=0; $i<$BDDactionsObjectifProtecChef.length; $i++){
                $BDDactionsAssaut[$NbActionsAssaut+$i]=$BDDactionsObjectifProtecChef[$i];
            }
            // Tir
            $NbActionsTir=$BDDactionsTir.length;
            for ($i=0; $i<$BDDactionsObjectifProtecChef.length; $i++){
                $BDDactionsTir[$NbActionsTir+$i]=$BDDactionsObjectifProtecChef[$i];
            }
            // Tir Lourd
            $NbActionsTirLourd=$BDDactionsTirLourd.length;
            for ($i=0; $i<$BDDactionsObjectifProtecChef.length; $i++){
                $BDDactionsTirLourd[$NbActionsTirLourd+$i]=$BDDactionsObjectifProtecChef[$i];
            }
        }
        if ($ObjectifMission == "Tuer Chef"){
            //assaut
            $NbActionsAssaut=$BDDactionsAssaut.length;
            for ($i=0; $i<$BDDactionsObjectifTuerChef.length; $i++){
                $BDDactionsAssaut[$NbActionsAssaut+$i]=$BDDactionsObjectifTuerChef[$i];
            }
            // Tir
            $NbActionsTir=$BDDactionsTir.length;
            for ($i=0; $i<$BDDactionsObjectifTuerChef.length; $i++){
                $BDDactionsTir[$NbActionsTir+$i]=$BDDactionsObjectifTuerChef[$i];
            }
            // Tir Lourd
            $NbActionsTirLourd=$BDDactionsTirLourd.length;
            for ($i=0; $i<$BDDactionsObjectifTuerChef.length; $i++){
                $BDDactionsTirLourd[$NbActionsTirLourd+$i]=$BDDactionsObjectifTuerChef[$i];
            }
        }




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
        $Orks=[];

        for ($i=0; $i<$NbOrks; $i++){
            $Orks[$i]=$sessionConfig.orks[$i];
            $nom=$BDD.orks[$i].nom;
            $role=$BDD.orks[$i].role;
            for($j=0; $j<$Orks[$i]; $j++){
                // changement taille pour noms trop longs
                if ($nom.length>10){
                    $taillePolice="carteTitreS";
                }
                else{
                    $taillePolice="carteTitre"
                }    
                // injection de la carte
                $affichageUnites.append('<div class="unite '+$role+'"><div class="carte colonne">  <img class="carteImage" src="assets/images/units/'+$nom+'.png">   <p class="'+$taillePolice+'">'+$nom+'</p>   </div></div>');
                $affichageUnites.children().last().addClass("ork");
                $affichageUnites.children().last().attr('id','ork'+$numeroOrk);
                $affichageUnites.children().last().append('<p class="carteNumero policeOrk">'+$numeroOrk+'</p>');
                $numeroOrk++;
                

                
            }
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
                $numeroActivation++;
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
                //console.log($listeUnites);

                // tirage au sort
                $random=Math.floor(Math.random()*($listeUnites.length));
                $UniteActive=$("#"+$listeUnites[$random]);
                //console.log($UniteActive);
                $ContenuCarteUniteActive=$UniteActive.html();

            //Ouverture du popup
                // affichage de l'unité
                $(".ZoneAffichageActivation").html($ContenuCarteUniteActive);
                $(".ZoneAffichageActivation").children().last().addClass('numeroCarteActive');

                // affichage de l'évènement
                $randomEvt=[Math.floor(Math.random()*($BDDevenements.length))]
                $(".EvenementAffiche").html('<p class="souligne">'+$BDDevenements[$randomEvt].titre+"</p><p>"+$BDDevenements[$randomEvt].texte+'</p>');

                // affichage des actions

                    // initialisation des actions dispo (selon type d'unité)
                    if ($UniteActive.hasClass('assaut')){
                        $actionsDispo=$BDDactionsAssaut;
                    }
                    if ($UniteActive.hasClass('tir')){
                        $actionsDispo=$BDDactionsTir;
                    }
                    if ($UniteActive.hasClass('tirlourd')){
                        $actionsDispo=$BDDactionsTirLourd;
                    }

                    console.log($actionsDispo);
                    
                    //tirage au sort
                    
                    for ($i=1; $i<6; $i++){
                        //tirage d'une action
                        $action=$actionsDispo[Math.floor(Math.random()*($actionsDispo.length))];

                        // remplacement des mots par des icones pour l'affichage
                        $actionIcones = $action.replace("Assaut", "<img class='iconesmall' src='assets/images/icones/icone-assaut.png'>")
                            .replace("Tir", "<img class='iconesmall' src='assets/images/icones/icone-tir.png'>")
                            .replace("Ennemi", "<img class='iconesmall' src='assets/images/icones/icone-ennemi.png'>")
                            .replace("Officier", "<img class='iconesmall' src='assets/images/icones/icone-officier.png'>")
                            .replace("Véhicule léger", "<img class='iconesmall' src='assets/images/icones/icone-vehicleger.png'>")
                            .replace("Véhicule", "<img class='iconesmall' src='assets/images/icones/icone-vehic.png'>")
                            .replace("Blessé", "<img class='iconesmall' src='assets/images/icones/icone-blesse.png'>")
                            .replace("Mouvement", "<img class='iconesmall' src='assets/images/icones/icone-mvt.png'>")
                            .replace("Allié", "<img class='iconesmall' src='assets/images/icones/icone-ork.png'>")
                            .replace("Objectif", "<img class='iconesmall' src='assets/images/icones/icone-objectif.png'>");

                        // ajout dans le html
                        $(".ActionAffiche"+$i).html($actionIcones);

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
            // affichage Popup plus d'activations
            $(".PopupPlusActivation").addClass('visible');
            //alert("Plus d'activations pour ce tour !");
        }
    }

    $OrkMind.on("click", function(){
        fonctionActivation();
    })

    $(".BoutonFermerActivation").on("click", function(){
        $PopupActivation.removeClass('visible');
        $actionsDispo=[];
    })

    $(".BoutonFermerPlusActivation").on("click", function(){
        $(".PopupPlusActivation").removeClass('visible');
    })





    },100)

    


});
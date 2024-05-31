$(document).ready(function() {  /* chargement du DOM */

    /* Gestion des choix de la page config
    *************************************************************/
    // variable config
    $config={
        "options": {
            "NbTours":0,
            "NbActivations":0
        },
        "orks": {
            "BossMob":0,
            "Sluggas":0,
            "Shootas":0,
            "BigShoota":0,
            "RokkitLauncha":0,
            "KillaKan":0
        }
    };
    console.log($config);
    
    // fonction sauvegarde config
    function fonctionEcritureConfig(){   
        // enregistrement des options
            //Nb de Tours :
            $config.options.NbTours = $('#NbToursSelect').val();
            //Nb d'Activations :
            $config.options.NbActivations = $('#NbActivationsSelect').val();

        // enregistrement des unités
            //Boss Mob :
            $config.options.BossMob = $('#NbBossmobSelect').val();
            //Sluggas :
            $config.options.Sluggas = $('#NbSluggasSelect').val();
            //Shootas :
            $config.options.Shootas = $('#NbShootasSelect').val();
            //Bigshoota :
            $config.options.BigShoota = $('#NbBigshootaSelect').val();
            //RokkitLauncha :
            $config.options.RokkitLauncha = $('#NbRokkitLaunchaSelect').val();
            //Shootas :
            $config.options.KillaKan = $('#NbKillaKanSelect').val();

                    
        // Enregistrement des données sous forme de chaîne JSON, dans le localstorage (source : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#utiliser_json.stringify_avec_localstorage)
        localStorage.setItem("Config", JSON.stringify($config));
                
    }

    // Bouton Valider
    $(".BoutonValiderConfig").on("click", function(){
        fonctionEcritureConfig();
        console.log($config);
        
        // renvoi vers la page de l'application
        setTimeout(() =>{
            document.location.href="../index.html";
        },100)
    })

   
    /* Gestion des unités éliminées depuis l'écran principal
    *************************************************************/
    $PopupUnite=$(".PopupUnite");
    $ZoneAffichageUnite=$(".ZoneAffichageUnite");

    $(".ork").on("click", function(){
        console.log("clic");
        $PopupUnite.addClass('visible');
        $ZoneAffichageUnite.append(this.innerHTML);
    });



});
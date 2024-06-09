$(document).ready(function() {  /* chargement du DOM */

    /* Injection des unités depuis la BDD
    *************************************************************/

    // Appel BDD
    function fonctionAccesBDD(){
        fetch('../assets/bdd/BDDorkmind.json')
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

    setTimeout(() =>{   //délai pour attendre chargement fetch

        // injection des sélecteurs
        $ZoneChoixUnites=$(".ZoneChoixUnites");
        for($i=0; $i<$NbOrks; $i++){
            $nomUnite=$BDD.orks[$i].nom;
            $NbMax=$BDD.orks[$i].nbmax;
            $type=$BDD.orks[$i].type;
            // changement taille pour noms trop longs
            if ($nomUnite.length>10){
                $taillePolice="carteTitreConfigS";
            }
            else{
                $taillePolice="";
            } 
            // injection de la carte
            $ZoneChoixUnites.append('<div class="colonne">  <div class="carte colonne">   <img class="carteImage" src="../assets/images/units/'+$nomUnite+'.png">    </div> <div class="selection">     <label for="Nb'+$nomUnite+'Select" class="'+$taillePolice+'">'+$nomUnite+' :</label>     <select id="Nb'+$nomUnite+'Select">     </select>     </div>     </div>');

            for ($j=0; $j<$NbMax+1; $j++){
                $("#Nb"+$nomUnite+"Select").append('<option>'+$j+'</option>');
            }
        }


        /* Gestion des choix de la page config
        *************************************************************/
        // variable config
        $config={"options": {}, "orks":{}};
        
        // fonction sauvegarde config
        function fonctionEcritureConfig(){   
            // enregistrement des options
                //Nb de Tours :
                $config.options.NbTours = $('#NbToursSelect').val();
                //Nb d'Activations :
                $config.options.NbActivations = $('#NbActivationsSelect').val();
                //Objectif mission :
                $config.options.ObjectifMission = $('#ObjectifMission').val();

            // enregistrement des unités
                for($i=0; $i<$NbOrks; $i++){
                    $nomUnite=$BDD.orks[$i].nom;
                    console.log($nomUnite);
                    //$config.orks+=$nomUnite+',';
                    $config.orks[$i]=$('#Nb'+$nomUnite+'Select').val();
                }
                
                console.log($config);
                        
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





    },100)
    


    

    

    

});
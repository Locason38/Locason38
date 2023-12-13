function getDestination(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const prix = urlParams.get('prix8')
    
    importer();
    
    //document.getElementById("dest").innerHTML="Votre destination : "+destination;
    //document.getElementById("prix").innerHTML="Prix total : "+prix+"€";
    //document.getElementById("nb_adult").innerHTML="Nombre d'adulte : "+NbAdult;
    //document.getElementById("nb_enfant").innerHTML="Nombre d'enfant : "+NbEnfant;
    //document.getElementById("nb_jour").innerHTML="Nombre de jours : "+Nbjour;
    //document.getElementById("date_arrive").innerHTML="Date d'arrivé : "+begin_Date;
    //document.getElementById("date_fin").innerHTML="Date de fin : "+end_Date;
    //document.getElementById("lunch").innerHTML="pitiDejeunaiw : "+lunch;
    return prix;
}



function importer(){
    let tplt = document.getElementById("mon_template");
    let tableau_taches = localStorage.getItem("liste_voyages");
    var prix_Total=0;
    //console.log(pitiDejeunaiw);
    let taches = JSON.parse(tableau_taches);
    var i=1;

    for (item of taches){
        if(item.PitiDejeunaiw)
        {
            item.PitiDejeunaiw="Oui";
        }
        else
        {
            item.PitiDejeunaiw="Non";
        }

        if(item.assurance)
        {
            item.assurance="Oui";
        }
        else
        {
            item.assurance="Non";
        }

        clone = document.importNode(tplt.content, true);

        clone.firstElementChild.innerHTML = clone.firstElementChild.innerHTML
        .replace(/{{ville}}/g, item.destination);

        clone.getElementById("Achat").innerHTML = clone.getElementById("Achat").innerHTML        
        .replace(/{{nbAdult}}/g, item.Nombreadulte)
        .replace(/{{nbEnfant}}/g, item.Nombreenfant)
        .replace(/{{lunch}}/g, item.PitiDejeunaiw)
        .replace(/{{mont}}/g, item.assurance)
        .replace(/{{dateArrive}}/g, item.Datearrivé)
        .replace(/{{dateFin}}/g, item.Datefin)
        .replace(/{{nbJour}}/g, item.NbJour)
        .replace(/{{soustotal}}/g, item.prix);

        prix_Total=prix_Total+parseInt(item.prix);

        action = "supprimerVoyage("+i+")";
        clone.getElementById("suppresionVoyage").setAttribute("onclick", action);
        i++;    
        clone.getElementById("image_dest").setAttribute("src", item.image);
        document.getElementById("voyages").appendChild(clone); //ajoute à la fin du body, mais nous ce sera pas là par contre
    }
    document.getElementById("prixpanier").innerHTML= "Valeur total du panier : "+ prix_Total + "€";
}


function supprimer()
{
    localStorage.removeItem("liste_voyages");
    location.reload();
}

function supprimerVoyage(numeroVoyage){
    let tableau_taches = localStorage.getItem("liste_voyages");
    //console.log(pitiDejeunaiw);
    let taches = JSON.parse(tableau_taches);
    var i=1;
    var nouvelleChaine = '[';
    for (item of taches){
        if ((i===1) || (nouvelleChaine === '[')){
            if (i!=numeroVoyage){
                nouvelleChaine = nouvelleChaine + '{"destination":"' + item.destination + '","prix":"' + item.prix +'","Nombreadulte":"'+ item.Nombreadulte +'","Nombreenfant":"'+ item.Nombreenfant + '","PitiDejeunaiw":' + item.PitiDejeunaiw + ',"Datearrivé":"' + item.Datearrivé + '","Datefin":"' + item.Datefin + '","assurance":' + item.assurance + ',"NbJour":' + item.NbJour + ',"image":"'+item.image+'"}';
            }
        }
        else {
            if (i!=numeroVoyage){
                nouvelleChaine = nouvelleChaine + ',{"destination":"' + item.destination + '","prix":"' + item.prix +'","Nombreadulte":"'+ item.Nombreadulte +'","Nombreenfant":"'+ item.Nombreenfant + '","PitiDejeunaiw":' + item.PitiDejeunaiw + ',"Datearrivé":"' + item.Datearrivé + '","Datefin":"' + item.Datefin + '","assurance":' + item.assurance + ',"NbJour":' + item.NbJour + ',"image":"' +item.image+'"}';
            }
        }
        i++;

    }
    nouvelleChaine = nouvelleChaine + ']';
    console.log(nouvelleChaine);
    localStorage.setItem("liste_voyages", nouvelleChaine);
    location.reload();
}
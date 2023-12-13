
function getInfoPerso(){
    importer()
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const Nom = urlParams.get('user_name')
    const Mail = urlParams.get('user_mail')
    const adress = urlParams.get('adresse_postal')
    const num_portable = urlParams.get('num_portable')
    const num_fix = urlParams.get('num_fix')
    const com = urlParams.get('user_message')
    document.getElementById("nom").innerHTML="Votre Nom : "+Nom;
    document.getElementById("mail").innerHTML="Votre mail : "+Mail;
    document.getElementById("num_portable").innerHTML="Votre numero de portable : "+num_portable;
    document.getElementById("num_fix").innerHTML="Votre numero de fix : "+num_fix;
    document.getElementById("adress").innerHTML="Votre adresse de facturation : "+adress;
    document.getElementById("com").innerHTML="Votre commentaire : "+com;
    getDestination();
    //return prix;
}


function getDestination(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const prix = urlParams.get('prix8')

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
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const Nom = urlParams.get('user_name')
    const Mail = urlParams.get('user_mail')
    const adress = urlParams.get('adresse_postal')
    const num_portable = urlParams.get('num_portable')
    const num_fix = urlParams.get('num_fix')
    const com = urlParams.get('user_message')
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

        clone = document.importNode(tplt.content, true);

        clone.firstElementChild.innerHTML = clone.firstElementChild.innerHTML
        .replace(/{{ville}}/g, item.destination);

        clone.getElementById("Achat").innerHTML = clone.getElementById("Achat").innerHTML        
        .replace(/{{nbAdult}}/g, item.Nombreadulte)
        .replace(/{{nbEnfant}}/g, item.Nombreenfant)
        .replace(/{{lunch}}/g, item.PitiDejeunaiw)
        .replace(/{{dateArrive}}/g, item.Datearrivé)
        .replace(/{{dateFin}}/g, item.Datefin)
        .replace(/{{nbJour}}/g, item.NbJour)
        .replace(/{{soustotal}}/g, item.prix);

        prix_Total=prix_Total+parseInt(item.prix); 
  
        clone.getElementById("image_dest").setAttribute("src", item.image);
        document.getElementById("voyages").appendChild(clone); //ajoute à la fin du body, mais nous ce sera pas là par contre
        document.getElementById("mailto").setAttribute("href", "mailto:chose"+"@bidule.fr?subject=Demande de reservation&body="+item.destination+"%0Anombre de produit : "+item.Nombreadulte+"%0Adate de debut : "+item.Datearrivé+"%0Adate de fin : "+item.Datefin);
    }
    document.getElementById("prixconfirmation").innerHTML= "Prix total : "+ prix_Total + "€";
}


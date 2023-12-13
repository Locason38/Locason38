$(document).ready(function(){
    display();
})

async function display(){

    //let apiKey = "88004a8c9b07fb490ac0af30f7b076f0";

    prixMax = document.getElementById("prixMax");
    assurance = document.getElementById("assurance");
    console.log(prixMax.value);
    console.log(assurance.value);

    contenu_json = {};
    await fetch("../json/destinations.json")
    .then(function(response){
        return response.json();
    }).then(function(json){
        contenu_json = json;
    })

    let tplt = document.getElementById("mon_template");

    for (v of contenu_json){ //in pour des entiers, donc 1,2,3. on pour des objets comme ici
        clone = document.importNode(tplt.content, true);
    
        clone.firstElementChild.innerHTML = clone.firstElementChild.innerHTML
        .replace(/{{destination}}/g, v.location)
        .replace(/{{lien}}/g, v.lien)
        .replace(/{{prix}}/g, v.prix)

        clone.getElementById("imageDest").setAttribute('src', v.img);

    
    
        document.getElementById("destinationGrid").appendChild(clone); //ajoute à la fin du body, mais nous ce sera pas là par contre
    
    }
}
    function valeurprix()
    {
    var slider = document.getElementById("prixMax");
    var output = document.getElementById("demo");
    output.innerHTML = slider.value;
    
    slider.oninput = function() {
        output.innerHTML = this.value;
    }
    }

    function filter(){
        valeurprix();
        let divs = document.getElementsByClassName("voyages");
        let prixMax = (document.getElementById("prixMax").value);
        let assurance = document.getElementById("assurance").checked;
        let montage = document.getElementById("montage").checked;
        console.log("c'est le " + prixMax);
    
        for (i in contenu_json){
            var dejDest = true;


            if (divs[i].style.display == "none"){
                if ((contenu_json[i].prix <= prixMax) && (!(assurance) || (contenu_json[i].assurance == assurance)) && (!(montage) || (montage==contenu_json[i].montage))) {
                    divs[i].style.display = "flex";
                }
            } else {
                if (contenu_json[i].prix > prixMax){
                    divs[i].style.display = "none";
                } else if ((assurance) && !(contenu_json[i].assurance)) {
                    divs[i].style.display = "none";
                } else if ((montage) && !(contenu_json[i].montage)){
                    divs[i].style.display = "none";
                }
            }

        }
    }




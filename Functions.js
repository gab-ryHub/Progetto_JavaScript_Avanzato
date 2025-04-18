import PromptSync from "prompt-sync";

const prompt = PromptSync();

export function Registra_Atleti(){
    return{
        Nome         :  prompt("Nome atleta: "),
        Cognome      :  prompt("Cognome atleta: "),
        Data_Nascita :  prompt("Data di nascita dell'utente: "),
        Id           :  prompt("Id dell'utente: "),
    }
}

export function Registra_Gare(registro_atleti){
    let atleti_partecipanti = [...Registra_Partecipanti(registro_atleti)];
    let punteggi_atleti = [...Registra_Punteggi(atleti_partecipanti)];

    let partecipanti = new Array();

    for(let i in atleti_partecipanti)
        partecipanti[i]={
                Atleti_Partecipanti :   atleti_partecipanti[i],
                Punteggi_Atleti     :   punteggi_atleti[i],
            }

    return{
        Nome_Gara   :   prompt("Nome della gara: "),
        Descrizione :   prompt("Dettagli della gara (facoltativi): "),
        Partecipanti:   partecipanti,
    }
}

export function Crea_Classifica(registro_gare){
    let podio = new Array;

    registro_gare.forEach((gare, i) =>{
        let ordinati = [...gare.Partecipanti];

        podio[i] = ordinati.sort((x, y) => y.Punteggi_Atleti - x.Punteggi_Atleti);
    })

    return podio;
}

export function Calcola_Media(punteggi){
    //implementare successivamente una media per categoria

    let media = new Array();

    punteggi.forEach(punteggio_gara =>{
        let somma = 0;
        punteggio_gara.forEach(x =>{somma += x});
        media.push(somma/punteggio_gara.length);
    });

    return media;   //restituisce la media dei punteggi in una singola gara
}


export const Percentuale_Gare = function(classifica_campionato, atleta){
    let gare_vinte = 0;
    classifica_campionato.forEach(classifica =>{
        
        let indice = classifica.findIndex(x => x.Atleti_Partecipanti.Nome == atleta);

        if(indice == 0)
            gare_vinte++;
    })
    return gare_vinte;
}

export const Posizioni_Podio = function(classifica_campionato, atleta){
    let cont = 1;
    classifica_campionato.forEach(classifica =>{
        
        let indice = classifica.findIndex(x => x.Atleti_Partecipanti.Nome == atleta);

        console.log(`L'atleta si è posizionato ${indice + 1}° nella ${cont}° gara.`);
        cont++;
    })
}

export const Numero_Piazzamenti = function(classifica_campionato, atleta){
    let dentro = 0;
    let fuori = 0;
    classifica_campionato.forEach(classifica =>{
        
        let indice = classifica.findIndex(x => x.Atleti_Partecipanti.Nome == atleta);

        if(indice <= 3)
            dentro++;
        else
            fuori++;
    })
    console.log(`Atleta ${atleta}.\n Numero di piazzamenti sul podio: ${dentro}.\n Numero di piazzamenti fuori dal podio: ${fuori}.`);
}


const Registra_Partecipanti = (registro_atleti) =>{
    let partecipanti = new Array();
    
    registro_atleti.forEach( atleta=>{
        let partecipa = prompt(`L'atleta ${atleta.Nome} ${atleta.Cognome} è tra i partecipanti della gara (y:n)?`);
        if(partecipa == "y")
            partecipanti.push(atleta);
    });

    return partecipanti;
}

const Registra_Punteggi = (partecipanti) =>{
    let punteggi = new Array(partecipanti.length);

    for(let i = 0; i < partecipanti.length; i++)
        punteggi[i] = Number.parseInt(prompt(`Punteggio atleta ${partecipanti[i].Nome} ${partecipanti[i].Cognome}:`));

    return punteggi;
}
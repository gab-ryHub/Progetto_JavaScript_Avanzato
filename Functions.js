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
    let partecipanti = Registra_Partecipanti(registro_atleti);
    return{
        Nome_Gara   :   prompt("Nome della gara: "),
        Descrizione :   prompt("Dettagli della gara (facoltativi): "),
        Partecipanti:   partecipanti,
        Punteggi    :   Registra_Punteggi(partecipanti),
    }
}

export function Calcola_Media(punteggi){
    //implementare successivamente una media per categoria

    let media = new Array();

    punteggi.forEach(punteggio_gara =>{
        let somma = 0;
        punteggio_gara.forEach(x =>{somma += x})
        media.push(somma/punteggio_gara.length);
    });

    return media;   //restituisce la media dei punteggi in una singola gara
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
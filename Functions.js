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
    return{
        Nome_Gara   :   prompt("Nome della gara: "),
        Descrizione :   prompt("Dettagli della gara (facoltativi): "),
        Partecipanti:   Registra_Partecipanti(registro_atleti),
    }
}




const Registra_Partecipanti = (registro_atleti) =>{
    let partecipanti = new Array;

    registro_atleti.forEach( atleta=>{
        let partecipa = prompt(`L'atleta ${atleta.Nome} ${atleta.Cognome} è tra i partecipanti della gara?(y:n)`);
        if(partecipa == "y")
            partecipanti.push(atleta);
    });

    return partecipanti;
}
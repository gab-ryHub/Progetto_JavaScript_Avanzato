import PromptSync from "prompt-sync";
import * as u from "./Functions.js";

const prompt = PromptSync();

let scelta;
let registro_atleti;
let registro_competizioni;
let classifica_campionato;

do{
    console.log("\nMenù.\n 1)Registrazione dati anagrafici.\n 2)Registrazione gare e concorrenti.\n 3)Creazione/Aggiornamento classifica.\n 4)Calcolo della media dei punteggi.\n 5)Maggiori info.\n 6)Visualizza registro utenti.\n 7)Uscita.");
    scelta = Number.parseInt(prompt("Fai una scelta: "));
    console.log("\n");

    switch(scelta){
        case 1:
            let n_atleti = Number.parseInt(prompt("Numero di atleti partecipanti al campionato:"));
            registro_atleti = Array.of(n_atleti);

            for(let i = 0; i < n_atleti; i++){
                console.log(`\nAtleta ${i+1} :`);
                registro_atleti[i] = u.Registra_Atleti();
            }
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            break;
        case 6:
            break;
        case 7:
            console.log("\nFine programma.");
            break;
    }
}while(scelta != 7);
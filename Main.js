import PromptSync from "prompt-sync";
import * as u from "./Functions.js";

const prompt = PromptSync();

let scelta;
let registro_atleti;
let registro_gare;
let classifica_campionato;
let punteggi;

do{
    console.log("\nMenù.\n 1)Registrazione dati anagrafici.\n 2)Registrazione gare e concorrenti.\n 3)Creazione/Aggiornamento classifica.\n 4)Calcolo della media dei punteggi.\n 5)Maggiori info.\n 6)Visualizza registro utenti.\n 7)Uscita.");
    scelta = Number.parseInt(prompt("Fai una scelta: "));
    console.log("\n");

    switch(scelta){
        case 1:
            let n_atleti = Number.parseInt(prompt("Numero di atleti partecipanti al campionato:"));
            registro_atleti = new Array(n_atleti);

            for(let i = 0; i < n_atleti; i++){
                console.log(`\nAtleta ${i+1} :`);
                registro_atleti[i] = u.Registra_Atleti();
            }
            break;
        case 2:
            let n_gare = Number.parseInt(prompt("Numero di gare del campionato: "));
            
            registro_gare = new Array(n_gare);
            punteggi =  new Array(n_gare);
            
            for(let i = 0; i < n_gare; i++){
                console.log(`\nGara ${i+1} :`);
                registro_gare[i] = u.Registra_Gare(registro_atleti);
            }
            break;
        case 3:
            registro_gare.forEach(gare =>{
                punteggi.push(gare.Punteggi);
            })
            break;
        case 4:
            console.log("\nMedia punteggi per ogni gara: ");
            u.Calcola_Media(punteggi).forEach((punteggio_gara, index)=>{
                console.log(`Media punteggi della gara ${index+1}: ${punteggio_gara}`);
            })
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
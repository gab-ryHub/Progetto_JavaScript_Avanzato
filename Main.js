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
            //modificare il case in modo che stampi la classifica e non solo i puntggi (riprendere ciò che c'è nel case 5)
            registro_gare.forEach((gare, i) =>{
                let temp = [...gare.Partecipanti];
                punteggi[i] =  temp.map(p => p.Punteggi_Atleti);
            })
            console.log(punteggi);
            break;
        case 4:
            console.log("\nMedia punteggi per ogni gara: ");
            u.Calcola_Media(punteggi).forEach((punteggio_gara, index)=>{
                console.log(`Media punteggi della gara ${index+1}: ${punteggio_gara}`);
            })
            break;
        case 5:
            //funzionante ma deve essere implementato nel case 3 e non nel 5. aggiungere la percentuale di gare vinte
            u.Percentule_Gare(registro_gare);
            break;
        case 6:
            console.log(registro_atleti);

            console.log(registro_gare.forEach(gara => console.log(gara.Partecipanti)));
            break;
        case 7:
            console.log("\nFine programma.");
            break;
    }
}while(scelta != 7);
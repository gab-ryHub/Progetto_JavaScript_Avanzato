import PromptSync from "prompt-sync";

const prompt = PromptSync();

let scelta;
let registro_utenti;
let registro_competizioni;
let classifica_campionato;

do{
    console.log("\nMenù.\n 1)Registrazione dati anagrafici.\n 2)Registrazione gare e concorrenti.\n 3)Creazione/Aggiornamento classifica.\n 4)Calcolo della media dei punteggi.\n 5)Maggiori info.\n 6)Uscita.");
    scelta = Number.parseInt(prompt("Fai una scelta: "));

    switch(scelta){
        case 1:
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
            console.log("\nFine programma.");
            break;
    }
}while(scelta != 6);
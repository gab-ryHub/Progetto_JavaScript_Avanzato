import PromptSync from "prompt-sync";
import * as u from "./Functions.js";

const prompt = PromptSync();

let scelta;
let registro_atleti = new Array();
let registro_gare = new Array();
let classifica_campionato = new Array();
let punteggi = new Array();

do{
    console.log("\nMenù.\n 1)Registrazione dati anagrafici.\n 2)Registrazione gare e concorrenti.\n 3)Creazione/Aggiornamento classifica.\n 4)Calcolo della media dei punteggi.\n 5)Maggiori info.\n 6)Visualizza registro utenti.\n 7)Uscita.");
    scelta = Number.parseInt(prompt("Fai una scelta: "));
    console.log("\n");

    switch(scelta){
        case 1:
            //aggiungere controllo per verificare se un atleta è già stato iscritto al campionato
            let n_atleti;

            if(registro_atleti == null){
                n_atleti = Number.parseInt(prompt("Numero di atleti partecipanti al campionato:"));

                for(let i = 0; i < n_atleti; i++){
                    console.log(`\nAtleta ${i+1} :`);
                    registro_atleti[i] = u.Registra_Atleti();
                }
            }
            else{
                n_atleti = Number.parseInt(prompt("Numero di nuovi atleti da aggiungere al campionato:"));
                let atleti_iscritti = registro_atleti.length;
                
                for(let i = atleti_iscritti; i < (atleti_iscritti + n_atleti); i++){
                    console.log(`\nAtleta ${i+1} :`);
                    registro_atleti[i] = u.Registra_Atleti();
                }
            }
            break;
        case 2:
            let n_gare;

            if(registro_gare == null){
                n_gare = Number.parseInt(prompt("Numero di gare del campionato: "));
                
                
                for(let i = 0; i < n_gare; i++){
                    console.log(`\nGara ${i+1} :`);
                    registro_gare[i] = u.Registra_Gare(registro_atleti);
                }
            }
            else{
                n_gare = Number.parseInt(prompt("Numero di nuove gare del campionato da registrare: "));
                let gare_registrate = registro_gare.length;
                
                for(let i = gare_registrate; i < (gare_registrate + n_gare); i++){
                    console.log(`\nGara ${i+1} :`);
                    registro_gare[i] = u.Registra_Gare(registro_atleti);
                }
            }
            break;
        case 3:
            registro_gare.forEach((gare, i) =>{
                let temp = [...gare.Partecipanti];
                punteggi[i] =  temp.map(p => p.Punteggi_Atleti);
            });
            classifica_campionato.push(...u.Crea_Classifica(registro_gare));
            break;
        case 4:
            console.log("\nMedia punteggi per ogni gara: ");
            u.Calcola_Media(punteggi).forEach((punteggio_gara, index)=>{
                console.log(`Media punteggi della gara ${index+1}: ${punteggio_gara}`);
            })
            break;
        case 5:
            let filtro;
            do{
                //aggiungere il controllo che permette di aggiornare automaticamente a classifica se viene aggiunta una gara
                console.log("\nMenù.\n 1-Percentuale gare vinte.\n 2-Piazzamenti sul podio.\n 3-Numero piazzamenti sul podio.\n 4-Uscita");
                filtro = Number.parseInt(prompt("Fai una scelta: "));

                console.log("\n");
                
                switch(filtro){
                    case 1:
                        let atleta = prompt("Nome atleta di cui visualizzare le gare vinte: ");
                        //aggiungere controllo con registro degli atleti

                        let vittorie = u.Percentuale_Gare(classifica_campionato, atleta);
                        console.log(`Numero di gare vinte dall'atleta ${atleta} : ${vittorie}.\nPercentuale sul totale: ${(vittorie/registro_gare.length)*100}%`);
                        break;
                    case 2:
                        let atleta_2 = prompt("Nome atleta di cui visualizzare i piazzamenti sul podio (dentro e fuori) per ogni gara: ");
                        //aggiungere controllo con registro degli atleti
                        
                        console.log(`Posizioni sul podio.\n`);
                        u.Posizioni_Podio(classifica_campionato, atleta_2);
                        break;
                    case 3:
                        for(let i of registro_atleti){
                            let atleta = i.Nome;
                            u.Numero_Piazzamenti(classifica_campionato, atleta);
                        }
                        break;
                    case 4:
                        console.log("Uscita menù info.");
                        break;
                }
            }while(filtro != 4);
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
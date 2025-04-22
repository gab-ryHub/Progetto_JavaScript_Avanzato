import PromptSync from "prompt-sync";
import * as u from "./Functions.js";

const prompt = PromptSync();

let scelta;
let registro_atleti;
let registro_gare;
let classifica_campionato = new Array();
let punteggi;

do{
    console.log("\nMenù.\n 1)Registrazione dati anagrafici.\n 2)Registrazione gare e concorrenti.\n 3)Creazione/Aggiornamento classifica.\n 4)Calcolo della media dei punteggi.\n 5)Maggiori info sulle gare.\n 6)Visualizza registro atleti/gare.\n 7)Uscita.");
    scelta = Number.parseInt(prompt("Fai una scelta: "));
    console.log("\n");

    switch(scelta){
        case 1:
            let n_atleti;

            if(registro_atleti == null){

                registro_atleti = new Array();
                
                do{
                    n_atleti = Number.parseInt(prompt("Numero di atleti partecipanti al campionato:"));
                }while(isNaN(n_atleti) || n_atleti == "0");

                for(let i = 0; i < n_atleti; i++){
                    console.log(`\nAtleta ${i+1} :`);
                    registro_atleti[i] = u.Registra_Atleti();
                }
            }
            else{
                do{
                    n_atleti = Number.parseInt(prompt("Numero di atleti partecipanti al campionato:"));
                }while(isNaN(n_atleti) || n_atleti == "0");
                
                let atleti_iscritti = registro_atleti.length;
                
                for(let i = atleti_iscritti; i < (atleti_iscritti + n_atleti); i++){
                    console.log(`\nAtleta ${i+1} :`);
                    registro_atleti[i] = u.Registra_Atleti();
                }
            }
            break;
        case 2:
            if(registro_atleti != null){
                let n_gare;

                if(registro_gare == null){
                    
                    registro_gare = new Array();

                    do{
                        n_gare= Number.parseInt(prompt("Numero di gare del campionato: "));
                    }while(isNaN(n_gare) || n_gare == "0");
                    
                    
                    for(let i = 0; i < n_gare; i++){
                        console.log(`\nGara ${i+1} :`);
                        registro_gare[i] = u.Registra_Gare(registro_atleti);
                    }
                }
                else{
                    do{
                        n_gare= Number.parseInt(prompt("Numero di gare del campionato: "));
                    }while(isNaN(n_gare) || n_gare == "0");
                    let gare_registrate = registro_gare.length;
                    
                    for(let i = gare_registrate; i < (gare_registrate + n_gare); i++){
                        console.log(`\nGara ${i+1} :`);
                        registro_gare[i] = u.Registra_Gare(registro_atleti);
                    }
                }
            }
            break;
        case 3:
            if(registro_atleti != null && registro_gare != null){
                registro_gare.forEach((gare, i) =>{
                    punteggi = new Array();
                    let temp = [...gare.Partecipanti];
                    punteggi[i] =  temp.map(p => p.Punteggi_Atleti);
                });
                classifica_campionato.push(...u.Crea_Classifica(registro_gare));
                console.log("Classifica aggiornata con successo.");
            }
            break;
        case 4:
            if(punteggi != null){
                console.log("\nMedia punteggi per ogni gara: ");
                u.Calcola_Media(punteggi).forEach((punteggio_gara, index)=>{
                    console.log(`Media punteggi della gara ${index+1}: ${punteggio_gara}`);
                })
            }
            break;
        case 5:
            if(registro_atleti != null && registro_gare != null && classifica_campionato != null){
                let filtro;
                do{
                    //aggiungere il controllo che permette di aggiornare automaticamente a classifica se viene aggiunta una gara
                    console.log("\nMenù.\n 1-Percentuale gare vinte.\n 2-Piazzamenti sul podio.\n 3-Numero piazzamenti sul podio.\n 4-Uscita");
                    filtro = Number.parseInt(prompt("Fai una scelta: "));

                    console.log("\n");

                    let nome;
                    let cognome;
                    
                    switch(filtro){
                        case 1:
                            let ctrl;

                            do{
                                nome = prompt("Nome atleta di cui visualizzare i piazzamenti sul podio (dentro e fuori) per ogni gara: ");
                                cognome = prompt("Cognome atleta di cui visualizzare i piazzamenti sul podio (dentro e fuori) per ogni gara: ");
                                nome = u.Formatta_Dati(nome);
                                cognome = u.Formatta_Dati(cognome);

                                ctrl = u.Check_Atleta(registro_atleti, nome, cognome);
                                if(!ctrl)
                                    console.log("Inserire il nome di un atleta presente nel registro.");
                            }while(!ctrl);

                            let vittorie = u.Percentuale_Gare(classifica_campionato, nome, cognome);
                            console.log(`Numero di gare vinte dall'atleta ${nome} ${cognome} : ${vittorie}.\nPercentuale sul totale: ${(vittorie/registro_gare.length)*100}%`);
                            break;
                        case 2:
                            let controllo;

                            do{
                                nome = prompt("Nome atleta di cui visualizzare i piazzamenti sul podio (dentro e fuori) per ogni gara: ");
                                cognome = prompt("Cognome atleta di cui visualizzare i piazzamenti sul podio (dentro e fuori) per ogni gara: ");
                                nome = u.Formatta_Dati(nome);
                                cognome = u.Formatta_Dati(cognome);

                                controllo = u.Check_Atleta(registro_atleti, nome, cognome);
                                if(!controllo)
                                    console.log("Inserire il nome di un atleta presente nel registro.");
                            }while(!controllo);
                            
                            console.log(`Posizioni sul podio.\n`);
                            u.Posizioni_Podio(classifica_campionato, nome, cognome);
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
            }
            break;
        case 6:
            if(registro_atleti != null && registro_atleti != null){
                console.log("Atleti Registrati.");
                registro_atleti.forEach(atleta => console.log(`\nNome: ${atleta.Nome}\nCognome: ${atleta.Cognome}\nData di nascita: ${atleta.Data_Nascita}\nId: ${atleta.Id}`));
                console.log("\nGare registrare.");
                registro_gare.forEach((gara, i) => {
                    console.log(`\nNome gara: ${gara.Nome_Gara} \nDescrizione gara: ${gara.Descrizione}`);
                    console.log(`\nPartecipanti alla gara: `);
                    gara.Partecipanti.forEach(atleta => console.log(`\nNome: ${atleta.Atleti_Partecipanti.Nome}\nCognome: ${atleta.Atleti_Partecipanti.Cognome}\nPunteggio: ${atleta.Punteggi_Atleti}`));
                });
            }
            break;
        case 7:
            console.log("\nFine programma.");
            break;
    }
}while(scelta != 7);
import PromptSync from "prompt-sync";

const prompt = PromptSync();

export function Registra_Atleti(){
    let nome;
    let cognome;
    let data;
    let id;

    do{
        nome = prompt("Nome atleta: ");
        nome = Formatta_Dati(nome);
    }while(nome == "");

    do{
        cognome = prompt("Cognome atleta: ");
        cognome = Formatta_Dati(cognome);
    }while(cognome == "");

    let giorno, mese, anno;
    do{
        console.log("Data di nascita dell'utente.");
        giorno = prompt("Giorno di nascita: ");
        mese = prompt("Mese di nascita: ");
        anno = prompt("Anno di nascita: ");
        data = giorno + "/" + mese + "/" + anno;
    }while(giorno == "" || mese == "" || anno == "");

    let controllo;
    do{
        id = prompt("Id dell'utente(6 valori alfanumerici): ");
        id = Formatta_Dati(id);
        controllo = Check_Id(id);
    }while(!controllo || id.length > 6);

    return{
        Nome         :  nome,
        Cognome      :  cognome,
        Data_Nascita :  data,
        Id           :  id,
    }
}

export function Registra_Gare(registro_atleti){
    let nome_gara;
    let descrizione;

    let atleti_partecipanti;
    let punteggi_atleti;
    let partecipanti = new Array();

    do{
        nome_gara = prompt("Nome della gara: ");
        nome_gara = Formatta_Dati(nome_gara);
    }while(nome_gara == "");

    descrizione = prompt("Dettagli della gara (facoltativi): ");

    if(descrizione.trim() == "")
        descrizione = "Nessuna descrizione";

    atleti_partecipanti = [...Registra_Partecipanti(registro_atleti)];
    punteggi_atleti = [...Registra_Punteggi(atleti_partecipanti)];

    for(let i in atleti_partecipanti)
        partecipanti[i]={
                Atleti_Partecipanti :   atleti_partecipanti[i],
                Punteggi_Atleti     :   punteggi_atleti[i],
            }

    return{
        Nome_Gara   :   nome_gara,
        Descrizione :   descrizione,
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

export function Aggiorna_Classifica(registro_gare, classifica_campionato, punteggi){
    registro_gare.forEach((gare, i) =>{
        let temp = [...gare.Partecipanti];
        punteggi[i] =  temp.map(p => p.Punteggi_Atleti);
    });
    classifica_campionato.push(...Crea_Classifica(registro_gare));
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

export const Check_Atleta = (registro_atleti, atleta_ricercato) =>{
    let controllo = false;

    registro_atleti.forEach(atleta =>{
        
        if(atleta.Nome == atleta_ricercato){
            controllo = true;
        }
    })
    return controllo;
}



const Registra_Partecipanti = (registro_atleti) =>{
    let partecipanti = new Array();
    
    registro_atleti.forEach( atleta=>{
        let partecipa;
        do{
            partecipa = prompt(`L'atleta ${atleta.Nome} ${atleta.Cognome} è tra i partecipanti della gara (y:n)? `);
        }while(partecipa != "y" && partecipa != "n");

        if(partecipa == "y")
            partecipanti.push(atleta);
    });

    return partecipanti;
}

const Registra_Punteggi = (partecipanti) =>{
    let punteggi = new Array(partecipanti.length);

    for(let i = 0; i < partecipanti.length; i++)
        do{
            punteggi[i] = Number.parseInt(prompt(`Punteggio atleta ${partecipanti[i].Nome} ${partecipanti[i].Cognome} (10-100): `));
        }while(punteggi[i] < 10 || punteggi[i] > 100 || isNaN(punteggi[i]));

    return punteggi;
}

const Formatta_Dati = (dato) =>{
    return dato.toUpperCase();
}

const Check_Id = (id) =>{
    let cont_lettere = 0;
    let cont_valori = 0;
    let controllo = false;

    for(let i in id){
        if(id.charCodeAt(i) >= 65 && id.charCodeAt(i) <=90)
            cont_lettere++;
        if(id.charCodeAt(i) >= 48 && id.charCodeAt(i) <= 57)
            cont_valori++;
    }
    if(cont_lettere == 3)
        if(cont_valori == 3)
            controllo = true;

    return controllo;
}
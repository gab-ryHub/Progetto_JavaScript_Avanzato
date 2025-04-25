import PromptSync from "prompt-sync";

const prompt = PromptSync();

/**
 * @typedef     {object}    registro_atleti
 * @property    {string}    Nome    Nome dell'atleta
 * @property    {string}    Cognome Cognome dell'atleta
 * @property    {string}    Data_Nascita    Data di nascita dell'atleta
 * @property    {string}    Id      Id dell'atleta
 */

/**
 * @typedef     {object}    registro_gare
 * @property    {string}    Nome_Gara    Nome della gara
 * @property    {string}    Descrizione  Descrizione aggiuntiva della gara (facoltativa)
 * @property    {Array}     Partecipanti Contiene due oggetti: registro degli atleti che partecipano alla gara; punteggi di ogni atleta
 */

/**
 * @author          gab.ry\gab-ryHub (Gabriele Potenza)
 * @function        Registra_Atleti
 * @description     Restituisce un oggetto contenente i dati di ogni atleta
 * @returns {registro_atleti}  Contiene tutti i dati dell'atleta
 */
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

/**
 * @author          gab.ry\gab-ryHub (Gabriele Potenza)
 * @function        Registra_Gare
 * @description     Restituisce un oggetto contenente le informazioni riguardanti ogni gara (nome, descrizione, partecipanti e i loro punteggi)
 * @param   {registro_atleti} registro_atleti   Contiene tutte le informazioni relative ai dati degli atleti
 * @returns {registro_gare}   Contiene tutti le informazioni riguardanti ogni gara
 */
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

/**
 * @author          gab.ry\gab-ryHub (Gabriele Potenza)
 * @function        Crea_Classifica
 * @description     Restituisce un vettore contente le posizioni totalizzate dai giocatori in ordine di posizionamento
 * @param   {registro_gare} registro_gare   Contiene tutte le informazioni relative ai dati delle gare
 * @returns {Array} Contiene i posizionamenti ordinati di ogni giocatore
 */
export function Crea_Classifica(registro_gare){
    let podio = new Array;

    registro_gare.forEach((gare, i) =>{
        let ordinati = [...gare.Partecipanti];

        podio[i] = ordinati.sort((x, y) => y.Punteggi_Atleti - x.Punteggi_Atleti);
    })

    return podio;
}

/**
 * @author          gab.ry\gab-ryHub (Gabriele Potenza)
 * @function        Calcola_Media
 * @description     Restituisce un vettore contente le medie dei punteggi totalizzati in ogni gara
 * @param   {Array} registro_atleti   Contiene tutte le informazioni relative ai posizionamenti dei giocatori
 * @returns {Array} Contiene le medie dei punteggi per ogni gara
 */
export function Calcola_Media(punteggi){
    let media = new Array();

    punteggi.forEach(punteggio_gara =>{
        let somma = 0;
        punteggio_gara.forEach(x =>{somma += x});
        media.push(somma/punteggio_gara.length);
    });

    return media;
}


/**
 * @author          gab.ry\gab-ryHub (Gabriele Potenza)
 * @function        Percentuale_Gare
 * @description     Restituisce il numero di gare vinte da un determinato atleta, per poterne poi calcolare la percentuale sul totale
 * @param {Array}   classifica_campionato Contiene i dati relativi all'attuale classifica del campionato
 * @param {string}  nome Nome dell'atleta di cui si vuole conoscere il numero di gare vinte
 * @param {string}  cognome Cognome dell'atleta di cui si vuole conoscere il numero di gare vinte
 * @return {number} Restituisce il numero di gare vinteda un determinato atleta
 */
export const Percentuale_Gare = function(classifica_campionato, nome, cognome){
    let gare_vinte = 0;
    classifica_campionato.forEach(classifica =>{
        
        let indice = classifica.findIndex(x => (x.Atleti_Partecipanti.Nome == nome && x.Atleti_Partecipanti.Cognome == cognome));

        if(indice == 0)
            gare_vinte++;
    })
    return gare_vinte;
}

/**
 * @author          gab.ry\gab-ryHub (Gabriele Potenza)
 * @function        Posizioni_Podio
 * @description     Stampa la posizione di un atleta (preso da input), in ogni gara a cui ha partecipato
 * @param {Array}   classifica_campionato Contiene i dati relativi all'attuale classifica del campionato
 * @param {string}  nome Nome dell'atleta di cui si vogliono stampare le posizioni in classifica nelle gare in cui ha partecipato
 * @param {string}  cognome Cognome dell'atleta di cui si vogliono stampare le posizioni in classifica nelle gare in cui ha partecipato
 */
export const Posizioni_Podio = function(classifica_campionato, nome, cognome){
    let cont = 1;
    classifica_campionato.forEach(classifica =>{
        
        let posizione = classifica.findIndex(x => (x.Atleti_Partecipanti.Nome == nome  && x.Atleti_Partecipanti.Cognome == cognome));

        console.log(`L'atleta si è posizionato ${posizione + 1}° nella ${cont}° gara.`);
        cont++;
    })
}

/**
 * @author          gab.ry\gab-ryHub (Gabriele Potenza)
 * @function        Numero_Piazzamenti
 * @description     Stampa il numero di piazzamenti, dentro e fuori dal podio, che OGNI atleta ha totalizzato (la funzione viene richiamata per ogni atleta)
 * @param {Array}   classifica_campionato Contiene i dati relativi all'attuale classifica del campionato
 * @param {string}  atleta Nome dell'atleta corrente di cui stampare i piazzamenti
 */
export const Numero_Piazzamenti = function(classifica_campionato, atleta){
    let dentro = 0;
    let fuori = 0;
    classifica_campionato.forEach(classifica =>{
        
        let posizione = classifica.findIndex(x => x.Atleti_Partecipanti.Nome == atleta);

        if(posizione <= 3)
            dentro++;
        else
            fuori++;
    })
    console.log(`Atleta ${atleta}.\n Numero di piazzamenti sul podio: ${dentro}.\n Numero di piazzamenti fuori dal podio: ${fuori}.`);
}


/**
 * @author          gab.ry\gab-ryHub (Gabriele Potenza)
 * @function        Formatta_Dati
 * @description     Formatta la stringa ricevuta (parametro) in caps lock
 * @param {string}  dato Dato da formattare
 * @return {string} Dato formattato in caps lock
 * @example
 * input("esempio") / output("ESEMPIO")
 */
export const Formatta_Dati = (dato) =>{
    return dato.toUpperCase();
}

/**
 * @author              gab.ry\gab-ryHub (Gabriele Potenza)
 * @function            Check_Atleta
 * @description         Verifica che l'utente ricercato sia presente nel registro
 * @param {Array}       registro_atleti Contiene oggetti le cui proprietà rappresentano i dati relativi ad ogni atleta
 * @param {string}      nome Nome dell'atleta da cercare
 * @param {string}      cognome Cognome dell'atleta da cercare
 * @return {boolean}    Restituisce true se l'atleta è registrato, false se non è presente nel registro
 */
export const Check_Atleta = (registro_atleti, nome, cognome) =>{
    //utilizzata per tenere traccia delle operazioni del forEach
    let controllo = false;

    registro_atleti.forEach(atleta =>{
        
        if(atleta.Nome == nome)
            if(atleta.Cognome == cognome)
                controllo = true;
    })
    return controllo;
}

/**
 * @author              gab.ry\gab-ryHub (Gabriele Potenza)
 * @function            Registra_Atleti
 * @description         Registra gli atleti partecipanti ad una gara
 * @param {Array}       registro_atleti Contiene oggetti le cui proprietà rappresentano i dati relativi ad ogni atleta
 * @return {Array}      Restituisce un array che contiene i dati di tutti gli atleti partecipanti ad una determinata gara
 */
const Registra_Partecipanti = (registro_atleti) =>{
    //array formato da oggetti in cui sono registrati i dati degli atleti
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

/**
 * @author              gab.ry\gab-ryHub (Gabriele Potenza)
 * @function            Registra_Punteggi
 * @description         Registra i punteggi di ogni singolo alteta ad ogni gara a cui ha partecipato
 * @param {Array}       partecipanti Contiene i dati relativi ad ogni atleta che partecipa ad una determinata gara
 * @return {Array}      Restituisce un array che contiene tutti i punteggi di ogni atleta alla gara a cui l'atleta ha partecipato
 * @example
 * 2 atleti 3 gare in cui partecipano entrambi gli atleti => Registra_Punteggi(partecipanti): restituisce vettori che contengono i punteggi dei due atleti in ogni singola gara
 */
const Registra_Punteggi = (partecipanti) =>{
    let punteggi = new Array(partecipanti.length);

    for(let i = 0; i < partecipanti.length; i++)
        do{
            punteggi[i] = Number.parseInt(prompt(`Punteggio atleta ${partecipanti[i].Nome} ${partecipanti[i].Cognome} (10-100): `));
        }while(punteggi[i] < 10 || punteggi[i] > 100 || isNaN(punteggi[i]));

    return punteggi;
}

/**
 * @author              gab.ry\gab-ryHub (Gabriele Potenza)
 * @function            Check_Id
 * @description         Verifica che l'id inserito sia corretto e accettabile
 * @param {string}      id  Id preso in input da verificare
 * @return {boolean}    Restituisce true se l'id è corretto (id di 6 caratteri, 3 lettere e 3 numeri); false se errato
 * @example
 * asd123 => Check_Id(id): true -Id corretto e accettabile
 * as1233 => Check_Id(id): false -Id non corretto e non accettabile
*/
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
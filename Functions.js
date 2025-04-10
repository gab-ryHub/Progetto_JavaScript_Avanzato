import PromptSync from "prompt-sync";

const prompt = PromptSync();

export function Registra_Atleti(){
    return{
        Name    : prompt("Nome atleta: "),
        Cognome : prompt("Cognome atleta: "),
        Nascita : prompt("Data di nascita dell'utente: "),
        Id      : prompt("Id dell'utente: "),
    }
}
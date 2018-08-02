import codiciComuni from './codici.json'
import {Vocali,Mesi,dispari,pari,resto} from './costanti'

const calcola = (Cognome,Nome,Sesso,Data,Comune) => {
    let risultato = ''
    risultato = clc_cognome(Cognome)
    risultato += clc_nome(Nome)
    risultato += clc_anno(Data)
    risultato += clc_mese(Data)
    risultato += clc_giorno(Data,Sesso)
    risultato += clc_comune(Comune)
    risultato += clc_controllo(risultato)
    if(risultato.indexOf('undefined') == -1)
    return risultato
    else
    return ''
}

function clc_cognome (cognome) {
    let ris=''
    if(cognome!==undefined){
        cognome = cognome.toUpperCase()
        let cgn = cognome.split('')
        cgn.forEach(function(c) {
            if(Vocali.indexOf(c)==-1 && ris.length<3){
                ris += c
            }
        })
        if(ris.length<3){
            cgn.forEach(function(c) {
                if(Vocali.indexOf(c)!==-1 && ris.length<3){
                    ris += c
                }
            })
        }
    }
    return ris
}

function clc_nome (nome) {
    let ris = ''
    if(nome!==undefined){
        nome = nome.toUpperCase()
        let nm = nome.split('')  
        let consonanti = []
        let vocali = []

        nm.forEach(function(c) {
            if(Vocali.indexOf(c)==-1)
            consonanti.push(c)
            else vocali.push(c)
        })

        if(consonanti.length >3)
            ris = consonanti[0] + consonanti[2] + consonanti[3]
        else if(consonanti.length == 3)
            ris = consonanti[0] + consonanti[1] + consonanti[2]
        else if(consonanti.length == 2)
            ris = consonanti[0] + consonanti[1] + vocali[0]
        else if(consonanti.length == 1)
            ris = consonanti[0] + vocali[0] + vocali[1]
        else
            ris = vocali[0] + vocali[1] + vocali[2]
    }
    return ris
}

function clc_anno (Data) {
    if(Data!==undefined){
    let anno = String(Data.getFullYear()).split('')
    return anno[anno.length-2] + anno[anno.length-1]
    }
    return ''
}

function clc_mese (Data) {
    if(Data!==undefined)
    return Mesi[Data.getMonth()]
    return ''
}

function clc_giorno (Data, Sesso) {
    if(Data!==undefined && Sesso!== undefined){
    let gg = Data.getDate()
    if(Sesso == 'Donna') gg += 40
    return gg
    }
    return ''
}

function clc_comune (Comune) {
    if(Comune!==undefined){
    Comune = Comune.charAt(0).toUpperCase() + Comune.substr(1).toLowerCase()
    return codiciComuni[0][Comune]
    }
    return ''
}

function clc_controllo (CodFiscale) {
    if(CodFiscale!==''){
        let sum_pari = 0
        let sum_dispari = 0
        let cod = CodFiscale.split('')
        for (let i =0; i<cod.length; i++)
        {
            if((i-1)%2==0) 
            sum_pari+=pari[cod[i]]
            else 
            sum_dispari+=dispari[cod[i]]
        }
        return resto[(sum_pari+sum_dispari)%26]
    }
    return ''

}

export {calcola}
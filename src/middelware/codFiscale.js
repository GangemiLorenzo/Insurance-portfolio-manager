import codiciComuni from '@/assets/codici.json'

const Vocali = ['A','E','I','O','U']

const Mesi = ['A','B','C','D','E','H','L','M','P','R','S','T']

const dispari = {
    "0":1,
    "1":0,
    "2":5,
    "3":7,
    "4":9,
    "5":13,
    "6":15,
    "7":17,
    "8":19,
    "9":21,
    "A":1,
    "B":0,
    "C":5,
    "D":7,
    "E":9,
    "F":13,
    "G":15,
    "H":17,
    "I":19,
    "J":21,
    "K":2,
    "L":4,
    "M":18,
    "N":20,
    "O":11,
    "P":3,
    "Q":6,
    "R":8,
    "S":12,
    "T":14,
    "U":16,
    "V":10,
    "W":22,
    "X":25,
    "Y":24,
    "Z":23
}

const pari = {
    "0":0,
    "1":1,
    "2":2,
    "3":3,
    "4":4,
    "5":5,
    "6":6,
    "7":7,
    "8":8,
    "9":9,
    "A":0,
    "B":1,
    "C":2,
    "D":3,
    "E":4,
    "F":5,
    "G":6,
    "H":7,
    "I":8,
    "J":9,
    "K":10,
    "L":11,
    "M":12,
    "N":13,
    "O":14,
    "P":15,
    "Q":16,
    "R":17,
    "S":18,
    "T":19,
    "U":20,
    "V":21,
    "W":22,
    "X":23,
    "Y":24,
    "Z":25
}

const resto = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

const calcola = (Cognome,Nome,Maschio,Data,Comune) => {
    let risultato = ''
    risultato = clc_cognome(Cognome)
    risultato += clc_nome(Nome)
    risultato += clc_anno(Data)
    risultato += clc_mese(Data)
    risultato += clc_giorno(Data,Maschio)
    risultato += clc_comune(Comune)
    risultato += clc_controllo(risultato)
    return risultato
}

function clc_cognome (cognome) {
    let ris=''
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
    return ris
}

function clc_nome (nome) {
    let ris = ''
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
    return ris
}

function clc_anno (Data) {
    let anno = String(Data.getFullYear()).split('')
    return anno[anno.length-2] + anno[anno.length-1]
}

function clc_mese (Data) {
    return Mesi[Data.getMonth()]
}

function clc_giorno (Data, Maschio) {
    let gg = Data.getDate()
    if(!Maschio) gg += 40
    return gg
}

function clc_comune (Comune) {
    Comune = Comune.charAt(0).toUpperCase() + Comune.substr(1).toLowerCase()
    return codiciComuni[0][Comune]
}

function clc_controllo (CodFiscale) {
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

export {calcola}
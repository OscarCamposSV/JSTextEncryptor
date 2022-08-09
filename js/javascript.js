// noinspection EqualityComparisonWithCoercionJS

class arrayLetters {

    constructor() {
        this.count = 0;
        this.letters = new Array(5);
        this.size = 5;
        for (let i = 0; i < this.size; i++){
            this.letters[i] = new Array(2);
        }
    }

    setValues(letter, encrypt){
        this.letters[this.count][0] = letter;
        this.letters[this.count][1] = encrypt;
        this.count = this.count + 1;
    }

    getArray(){
        return this.letters;
    }

    getSize(){
        return this.size;
    }

    validate(letter) {
        let rs;
        switch (letter){
            case "á":
                rs = "a";
                break;
            case "é":
                rs = "e";
                break;
            case "í":
                rs = "i";
                break;
            case "ó":
                rs = "o";
                break;
            case "ú":
                rs = "u";
                break;
            default:
                rs = letter;
                break;
        }
        return rs;
    }
}

const array = new arrayLetters();
array.setValues("a","ai");
array.setValues("e","enter");
array.setValues("i","imes");
array.setValues("o","ober");
array.setValues("u","ufat");

function encrypt(string){
    let result = "";
    let aux = "";
    let temp = "";
    for (let i = 0; i < string.length; i++){
        temp = array.validate(string.charAt(i).toLowerCase());
        for (let j = 0; j < array.getSize(); j++){
            if (temp == array.getArray()[j][0]){
                aux = array.getArray()[j][1];
                break;
            }
            else {
                aux = "";
            }
        }
        if (aux != ""){
            result += aux;
        }
        else {
            result += temp;
        }
    }
    return result;
}

function decrypt(string){
    for (let i = 0; i < array.getSize(); i++){
        let position = string.indexOf(array.getArray()[i][1]);
        while (position >= 0) {
            string = string.slice(0, position) + array.getArray()[i][0] + string.slice(position + array.getArray()[i][1].length);
            position = string.indexOf(array.getArray()[i][1]);
        }
    }

    return string;
}

function println(args) {
    document.getElementById("rs-text").innerHTML = args;
}

function emptyField(){
    let flag;
    let inputs = document.getElementById("inputs").value;
    flag = inputs != "";
    return flag;
}

function changes(){
    if (emptyField() == true){
        document.getElementById("nothing").style.visibility = "hidden";
        document.getElementById("result").style.visibility = "visible";
    }
    else {
        document.getElementById("nothing").style.visibility = "visible";
        document.getElementById("result").style.visibility = "hidden";
    }
}

function copyToClickBoard(){
    let content = document.getElementById('rs-text').innerHTML;

    navigator.clipboard.writeText(content)
        .then(() => {
            alert("Copiado")
        })
        .catch(err => {
            console.log('Something went wrong', err);
        })

}



document.getElementById("encrypt").onclick = function (){
    changes();
    let string = document.getElementById("inputs").value;
    println(encrypt(string));
}

document.getElementById("decrypt").onclick = function (){
    changes();
    let string = document.getElementById("inputs").value;
    println(decrypt(string));
}

document.getElementById("copy").onclick = function (){
    copyToClickBoard();
}

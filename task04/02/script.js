function isSubStrHere(str, subStr){
    if(str.indexOf(subStr) >= 0){
        let arrOfWords = str.split(' ');
        for(let i = 0; i < arrOfWords.length; i++){
            if(arrOfWords[i].indexOf(subStr) >=0){
                return console.log(arrOfWords[i].replace(/[^А-яЁёіІїЇєЄ A-Za-z]/g,""));
            }
        }
    }
    return false;
}
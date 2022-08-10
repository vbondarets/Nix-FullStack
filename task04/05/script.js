function setCorrectName(names) {
    let regExp = /(\w+), (\w+)/g;
    let str = names.replace(regExp, '$2 $1');

    return console.log(str.replace(/\n/g, '\n'));
}
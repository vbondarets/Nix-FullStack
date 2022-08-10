function DateCheck(str) {
    let regExp = /^([1-2]\d|0?[1-9]|3[0-1])-(0?[1-9]|1[0-2])-(\d{4})$/;
    return regExp.test(str);
}

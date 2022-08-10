function strPad(input, fullLen, fillStr, fillType = "") {
    let str = "";
    let strCount; 
    
    if(fillType == "FILL_RIGHT" || fillType == ""){
        strCount = 0;
        for(let i = input.length; i < fullLen; i++) {
            if (strCount === fillStr.length) {
                strCount = 0;
            }
            input += fillStr[strCount];
            strCount++;
        }
        str = input;
    }
    else if(fillType == "FILL_LEFT"){
        strCount = 0;
        for(let i = 0; i < fullLen - input.length; i++) {
            if (strCount === fillStr.length) {
                strCount = 0;
            }
            str += fillStr[strCount];
            strCount++;
        }
        str += input;
    }
    else if(fillType == "FILL_BOTH"){
        str += setPad(input, Math.ceil((fullLen - input.length) / 2) + input.length, fillStr, 'FILL_LEFT');
        str = setPad(str, fullLen, fillStr);
    }
    else {
        return null;
    }

    return str;
}
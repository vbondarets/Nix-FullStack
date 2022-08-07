function testString(str){
    let symbStr = "";
    let checkArr =[];
    for(let i = 0; i < str.length; i++){
        if(str[i] == '(' || str[i] == '[' || str[i] == ')' || str[i] == ']'){
            symbStr += str[i];
        }
    }
    for(let i = 0; i < symbStr.length; i++){
        if(symbStr[i] == ")" || symbStr[i] == "]"){
            let currSymb = checkArr.pop();
            if (symbStr[i] ===')') {
                if (currSymb != '(') {
                    return false;
                }
            }
            else if (symbStr[i] ==']'){
                if (currSymb != '[') {
                    return false
                }
            }
            else if(currSymb == undefined){
                return false;
            }
        }
        else{
            checkArr.push(symbStr[i]);
        }
    }
    if(checkArr.length == 0){
        return true;
    }
    return false;
}


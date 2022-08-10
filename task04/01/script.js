function isPowOfTwo(num){
    if (num > 0 && (num & (num - 1)) == 0){
        return true;
    }
    return false;
}
function circleArray(){
    this.arr = [];
    this.add = function(city) {
        this.arr.push(city);
    };
    this.get = function(index) {
        if (index >= 0) {
            return this.arr[index % this.arr.length];
        }
        else {
            if (index == -1) {
                return this.arr[this.arr.length - 1];
            }
            else {
                let negIndx = this.arr.length - ((index * -1) % this.arr.length);
                if (negIndx == this.arr.length) {
                    return this.arr[0];
                }
                return this.arr[negIndx];
            }
        }
    };
}
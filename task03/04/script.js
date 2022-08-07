function Square() {
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('width' ,'fit-content');
    if (this.canvas.getContext) {
        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = "yellow";
        this.ctx.fillRect(10, 10, 100, 100);
        document.body.appendChild(this.canvas);
    }
}

function Triangle() {
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('width' ,'fit-content');
    if (this.canvas.getContext) {
      this.ctx = this.canvas.getContext('2d');
  
      this.ctx.beginPath();
      this.ctx.moveTo(50,10);
      this.ctx.lineTo(10,50);
      this.ctx.lineTo(90,50);
      this.ctx.fillStyle = "red";
      this.ctx.fill();
  
      document.body.appendChild(this.canvas);
    }
}
  
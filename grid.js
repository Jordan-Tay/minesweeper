function Grid(x, y){
    this.x = x;
    this.y = y;
    this.change = 150;
    this.stk = 75;

    this.checked = function(){
        this.change = 200;
        this.stk = 180;
    }

    this.show = function(){
        fill(this.change);
        stroke(this.stk);
        strokeCap(SQUARE);
        rect(this.x, this.y, 30, 30);
    }
}
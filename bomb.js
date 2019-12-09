function Bomb(x, y){
    this.x = x + 15;
    this.y = y + 15;

    this.show = function(){
        stroke(0);
        fill(50);
        ellipse(this.x, this.y, 9, 9);
    }
}
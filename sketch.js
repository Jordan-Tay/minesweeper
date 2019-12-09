var col = 36;
var row = 16;
var grid = [];
var bomb = [];
var bombCount = 100;
var opt = [];
var arr = [];
var rev = [];
var play = 0;
var visited = [];
var flag = [];

function setup(){
    var cnv = createCanvas(30 * col + 1, 30 * row + 1);
    cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);
    for (var i = 0; i < row; i++){
        grid[i] = [];
        visited[i] = [];
        arr[i] = [];
        flag[i] = [];
        for (var j = 0; j < col; j++){
            grid[i].push(new Grid(30 * j, 30 * i));
            visited[i][j] = 0;
            opt.push([i, j]);
            // initialise map
            arr[i][j] = 0;
            flag[i][j] = 0;
        }
    }
    for (var i = 0; i < bombCount; i++){
        var k = floor(random(opt.length));
        bomb.push(new Bomb(30 * opt[k][1], 30 * opt[k][0]));
        // update map
        arr[opt[k][0]][opt[k][1]] = -1;
        for (var j = opt[k][0] - 1; j <= opt[k][0] + 1; j++){
            for (var l = opt[k][1] - 1; l <= opt[k][1] + 1; l++){
                if (j >= 0 && j < row && l >= 0 && l < col && arr[j][l] != -1) arr[j][l]++;
            }
        }
        opt.splice(k, 1);
    }
    console.log(arr);
}

function draw(){
    var end = 0;
    background(0);
    for (var i = row - 1; i >= 0; i--){
        for (var j = col - 1; j >= 0; j--){
            grid[i][j].show();
        }
    }
    for (var i = 0; i < rev.length; i++){
        // writes number
        fill(0);
        text(rev[i][0], 30 * rev[i][2] + 12, 30 * rev[i][1] + 20);
    }
    for (var i = 0; i < row; i++){
        for (var j = 0; j < col; j++){
            // cnt
            end += visited[i][j];
        }
    }
    for (var i = 0; i < row; i++){
        for (var j = 0; j < col; j++){
            if (flag[i][j] == 1){
                // draws flag
                fill(255, 0, 0);
                stroke(0);
                beginShape();
                vertex(j * 30 + 7.5, i * 30 + 25);
                vertex(j * 30 + 7.5, i * 30 + 5);
                vertex(j * 30 + 22.5, i * 30 + 10);
                vertex(j * 30 + 7.5, i * 30 + 15);
                endShape();
            }
        }
    }
    // when lost
    if (play == 1){
        for (var i = 0; i < bomb.length; i++){
            // reveal bombs
            bomb[i].show();
        }
        for (var i = 0; i < row; i++){
            for (var j = 0; j < col; j++){
                // remove flags
                flag[i][j] = 0;
            }
        }
        // disables mouse
        mousePressed = false;
        // sad face
        stroke(0);
        fill(255, 255, 0);
        ellipse(col * 15, row * 15, 50, 50);
        fill(0);
        line(col * 15 - 15, row * 15 - 5, col * 15 - 5, row * 15 + 5);
        line(col * 15 - 15, row * 15 + 5, col * 15 - 5, row * 15 - 5);
        line(col * 15 + 15, row * 15 - 5, col * 15 + 5, row * 15 + 5);
        line(col * 15 + 15, row * 15 + 5, col * 15 + 5, row * 15 - 5);
    }
    // when won
    if (end == col * row - bombCount){
        // disables mouse
        mousePressed = false;
        // happy face
        stroke(0);
        fill(255, 255, 0);
        ellipse(col * 15, row * 15, 50, 50);
        fill(0);
        ellipse(col * 15 + 10, row * 15 - 7, 8, 8);
        ellipse(col * 15 - 10, row * 15 - 7, 8, 8);
        strokeWeight(2);
        noFill();
        arc(col * 15, row * 15 + 5, 30, 25, 0, PI, OPEN);
        strokeWeight(1);
    }
}

function mousePressed(){
    var a = floor(mouseY / 30);
    var b = floor(mouseX / 30);
    // if flag is not present && left click
    if (mouseButton === LEFT && flag[a][b] == 0){
        if (arr[a][b] > 0){
            grid[a][b].checked();
            rev.push([arr[a][b], a, b]);
            visited[a][b] = 1;
            arr[a][b] = -2;
        }
        else if (arr[a][b] == -1) play = 1;
        else if (arr[a][b] == 0){
            checkZero(a, b);
        }
    }
    // if flag is present
    else if (flag[a][b] == 1) flag[a][b] = 0;
    // if flag is not present && right click && block is not revealed
    else if (flag[a][b] == 0 && arr[a][b] != -2) flag[a][b] = 1;
}

// click all blocks around 0 recursively
function checkZero(x, y){
    grid[x][y].checked();
    for (var i = x - 1; i <= x + 1; i++){
        for (var j = y - 1; j <= y + 1; j++){
            if (i >= 0 && i < row && j >= 0 && j < col){
                if (visited[i][j] == 0){
                    visited[i][j] = 1;
                    if (arr[i][j] == 0) checkZero(i, j);
                    else if (arr[i][j] > 0){
                        grid[i][j].checked();
                        rev.push([arr[i][j], i, j]);
                        arr[i][j] = -2;
                    }
                }   
            }
        }
    }
}
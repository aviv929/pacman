
var users=[];
users[0]={
    username: "a",
    password: "a",
    firstname: "a",
    lastname: "a",
    email: "a",
    birthdate: "a"
};



$(function () {

        $.validator.setDefaults({
            errorClass: 'help-block',
            highlight: function (element) {
                $(element)
                    .closest('.form-group')
                    .addClass('has-error');
            },
            unhighlight: function (element) {
                $(element)
                    .closest('.form-group')
                    .removeClass('has-error');
            },
            errorPlacement: function (error, element) {
                if (element.prop('type') === 'checkbox') {
                    error.insertAfter(element.parent());
                } else {
                    error.insertAfter(element);
                }
            }
        });
        $.validator.addMethod('strongPassword', function (value, element) {
            return this.optional(element)
                || value.length >= 8
                && /\d/.test(value)
                && /[a-z]/i.test(value);
        }, 'Your password must be at least 8 letters and contain at least one number and one char')

        $("form[name='registration']").validate({
            rules: {

                rfirstname: {
                    required: true,
                    nowhitespace: true,
                    lettersonly: true
                },
                rlastname: {
                    required: true,
                    nowhitespace: true,
                    lettersonly: true
                },
                remail: {
                    required: true,
                    email: true
                },
                rpassword: {
                    required: true,
                    strongPassword: true
                },
                rusername: {
                    required: true
                }
            },
            messages: {
                rfirstname: {
                    required: "Please provide a first name",
                },
                rlastname: {
                    required: "Please provide a last name",
                },

                remail: "Please enter a valid email address",
                rpassword: {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 8 characters long",
                    pattern: "wayway"
                },
                rusername: "Please provide a username"
            },
            submitHandler: function (form) {
                if (checkusers())
                    alert("exist username");
                else
                    submit();
            }
        });
    });

function register() {

    document.getElementById("register").hidden=false;
    document.getElementById("login").hidden=true;
    document.getElementById("main").hidden=true;
    document.getElementById("game").hidden=true;
    document.getElementById("inputDetails").hidden=true;
    document.getElementById("registerForm").reset();

    createdate();
}
function createdate(){
    var s="";
    for (let i = 1; i <32 ; i++) {
        s+="<option value="+i+">"+i+"</option>";
    }
    document.getElementById("day").innerHTML=s;

    s="";
    for (let i = 1; i <13 ; i++) {
        s+="<option value="+i+">"+i+"</option>";
    }
    document.getElementById("month").innerHTML=s;

    s="";
    for (let i = 1970; i <2019 ; i++) {
        s+="<option value="+i+">"+i+"</option>";
    }
    document.getElementById("year").innerHTML=s;
}
function login() {
    document.getElementById("register").hidden=true;
    document.getElementById("login").hidden=false;
    document.getElementById("main").hidden=true;
    document.getElementById("game").hidden=true;
    document.getElementById("inputDetails").hidden=true;
    document.getElementById("loginForm").reset();

}
function main() {
    document.getElementById("register").hidden=true;
    document.getElementById("login").hidden=true;
    document.getElementById("main").hidden=false;
    document.getElementById("game").hidden=true;
    document.getElementById("inputDetails").hidden=true;

}
function game() {
    document.getElementById("register").hidden=true;
    document.getElementById("login").hidden=true;
    document.getElementById("main").hidden=true;
    document.getElementById("game").hidden=false;
    document.getElementById("inputDetails").hidden=true;

}
function submit(){
    users[users.length]=
        {
            username: document.getElementById("rusername").value,
            password: document.getElementById("rpassword").value,
            firstname: document.getElementById("rfirstname").value,
            lastname: document.getElementById("rlastname").value,
            email: document.getElementById("remail").value,
            birthdate: document.getElementById("day").value+"/"+document.getElementById("month").value+"/"+document.getElementById("year").value
        };
    alert("registration success");
    main();
}
function verify(){
    var i;
    for(i=0;i<users.length;i++)
    {
        if(users[i].username===document.getElementById("lusername").value&&users[i].password===document.getElementById("lpassword").value) {
            moveToDetails();
            return;
        }
    }
    alert("wrong username or password");
}
function checkusers(){
    for (let i = 0; i < users.length; i++) {
        if (users[i].username===document.getElementById("rusername").value)
            return true;
    }
    return false;
}

function moveToDetails() {
    document.getElementById("register").hidden=true;
    document.getElementById("login").hidden=true;
    document.getElementById("main").hidden=true;
    document.getElementById("game").hidden=true;
    document.getElementById("inputDetails").hidden=false;
    document.getElementById("inputD").reset();
}


var context;
var shape;
var board;
var score;
var pac_color="yellow";
var start_time;
var time_elapsed;
var interval;
var monsterArray;
var bonus;
var live;
var maxTime;
var food_remain;
var monsnum;
var clock=0;
var mons1 = new Image();mons1.src='mons1.png';
var mons2 = new Image();mons2.src='mons2.png';
var mons3 = new Image();mons3.src='mons3.png';
var livePic = new Image();livePic.src='lev.png';
var clockPic = new Image();clockPic.src='clock.gif';
var bonusPic = new Image();bonusPic.src='pacit.png';
var intervalCounter=0;
var size=12;
var food=0;

var canvas=null;
var context=null;
document.addEventListener("DOMContentLoaded", function(event) {//can be replaced to "ready"
    canvas = document.getElementById('canvas');
    context=canvas.getContext("2d");
    fireworks();
    fire=true;
});


function verDetails() {
    food_remain= document.getElementById("dBoll").value;
    maxTime= document.getElementById("dTime").value;
    monsnum= document.getElementById("dMonsters").value;
    food=food_remain;

    if (!((food_remain>=50&& food_remain<=90) && (maxTime>=60) && (monsnum>=1 && monsnum<=3)))
        alert("Your input is not at the possible range..");
    else
    {
        game();
        Start();
    }
}


function Start() {
    stop();
    document.getElementById("actorDisp").innerText="username:  "+ document.getElementById("lusername").value;

    monsterArray=[];
    monsterArray[0]=new Object();monsterArray[0].i=0;monsterArray[0].j=0;
    if (monsnum>=2) {
        monsterArray[1]=new Object();monsterArray[1].i=0;monsterArray[1].j=size-1;}
    if (monsnum==3) {
        monsterArray[2]=new Object();monsterArray[2].i=size-1;monsterArray[2].j=0;}


    var rand = Math.floor(Math.random() * 5)+1;
    mons1.src="mons"+rand+".png";
    rand = Math.floor(Math.random() * 5)+1;
    mons2.src="mons"+rand+".png";
    rand = Math.floor(Math.random() * 5)+1;
    mons3.src="mons"+rand+".png";


    bonus=new Object();
    bonus.i=size-1;bonus.j=size-1;

    shape=new Object();
    board = new Array();
    score = 0;
    live=3;
    var cnt = size*size;
    var food_light= food_remain*60/cnt;
    var food_medium= food_remain*30/cnt;
    var food_big = food_remain-food_medium-food_light;
    var pacman_remain = 1;
    var monster_remain = 3;
    var clocker=2;
    var live_remain=2;

    start_time= new Date();
    for (var i = 0; i < size; i++) {
        board[i] = new Array();
        for (var j = 0; j < size; j++) {
            if((i==3 && j==3)||(i==3 && j==4)||(i==3 && j==5)||(i==6 && j==1)||(i==6 && j==2)  ||(i==8 && j==8)||(i==1 && j==8)||(i==8 && j==1)||(i==1 && j==1)||(i==7 && j==6)||(i==6 && j==1)||(i==2 && j==6)||(i==4 && j==7)||(i==5 && j==6)||(i==6 && j==4))
            {
                board[i][j] = 4;
            }
            else if (isCorner(i,j)==true) {board[i][j] = 0;}
            else{
                var randomNum = Math.random();
                if (randomNum <= food_light/cnt) {
                    food_light--;
                    board[i][j] = 1;
                }
                else if (randomNum < 1.0 * pacman_remain/cnt) {
                    shape.i=i;
                    shape.j=j;
                    pacman_remain--;
                    board[i][j] = 2;
                }
                else if (randomNum < 1.0 * clocker/cnt) {
                    shape.i=i;
                    shape.j=j;
                    clocker--;
                    board[i][j] = 3;
                }
                else if (randomNum < 1.0 * food_medium/cnt) {
                    shape.i=i;
                    shape.j=j;
                    food_medium--;
                    board[i][j] = 5;
                }
                else if (randomNum < 1.0 * food_big/cnt) {
                    shape.i=i;
                    shape.j=j;
                    food_big--;
                    board[i][j] = 6;
                }
                else {
                    board[i][j] = 0;
                }
                cnt--;
            }
        }
    }

    while(food_light>0){
        var emptyCell = findRandomEmptyCell(board);
        if (isCorner(emptyCell[0],emptyCell[1])==false){
            board[emptyCell[0]][emptyCell[1]] = 1;
            food_light--;
        }
    }
    while(food_medium>0){
        var emptyCell = findRandomEmptyCell(board);
        if (isCorner(emptyCell[0],emptyCell[1])==false){
            board[emptyCell[0]][emptyCell[1]] = 5;
            food_medium--;
        }
    }
    while(food_big>0){
        var emptyCell = findRandomEmptyCell(board);
        if (isCorner(emptyCell[0],emptyCell[1])==false){
            board[emptyCell[0]][emptyCell[1]] = 6;
            food_big--;
        }
    }
    while (0< live_remain) {
        var emptyCell = findRandomEmptyCell(board);
        if (isCorner(emptyCell[0],emptyCell[1])==false){
            board[emptyCell[0]][emptyCell[1]] = 8;
            live_remain--;
        }
    }
    while (clocker>0) {
        var bay = findRandomEmptyCell(board);
        if (isCorner(emptyCell[0],emptyCell[1])==false){
            board[bay[0]][bay[1]] = 3;
            clocker--;
        }
    }
    while(pacman_remain>0){
        var emptyCell = findRandomEmptyCell(board);
        if (isCorner(emptyCell[0],emptyCell[1])==false) {
            board[emptyCell[0]][emptyCell[1]] = 2;
            shape.i=emptyCell[0];
            shape.j=emptyCell[1];
            pacman_remain--;
        }
    }
    keysDown = {};
    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.keyCode] = false;
    }, false);
    interval=setInterval(UpdatePosition, 110);
    musicon();


}
function stop(){
    window.clearInterval(interval);
    fire=true;
    musicoff();
}
function isCorner(i,j) {
    if((i==0&&j==0)||(i==size-1&&j==0)||(i==0&&j==size-1)||(i==size-1&&j==size-1))
        return true;
    return false;
}
function musicon() {
    var audio = document.getElementById('audio1');
    {
        audio.pause();
        audio.currentTime = 0
        audio.play();
    }
}
function musicoff() {
    var audio = document.getElementById('audio1');
    audio.pause();
}
function findRandomEmptyCell(board){
    var i = Math.floor((Math.random() * (size-1)) + 1);
    var j = Math.floor((Math.random() * (size-1)) + 1);
    while(board[i][j]!=0)
    {
        i = Math.floor((Math.random() * (size-1)) + 1);
        j = Math.floor((Math.random() * (size-1)) + 1);
    }
    return [i,j];
}
function GetKeyPressed() {
    if (keysDown[38]) {
        return 1;
    }
    if (keysDown[40]) {
        return 2;
    }
    if (keysDown[37]) {
        return 3;
    }
    if (keysDown[39]) {
        return 4;
    }
}
function Draw(side) {
    canvas.width=canvas.width; //clean board
    lblScore.value = score;
    lblLive.value=live;
    lblTime.value = time_elapsed;
    var cell=600/size;

    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            var center = new Object();
            center.x = i * cell + 0.5*cell;
            center.y = j * cell + 0.5*cell;
            if (board[i][j] == 2) {



                context.beginPath();
                if(side==1)
                    context.arc(center.x, center.y, cell/2, 0.15 * Math.PI+55, 1.85 * Math.PI+55); // half circle
                else if(side==2)
                    context.arc(center.x, center.y, cell/2, 0.15 * Math.PI-55, 1.85 * Math.PI-55); // half circle
                else if(side==3)//left
                    context.arc(center.x, center.y, cell/2, 0.15 * Math.PI -135, 1.85 * Math.PI-135); // half circle
                else
                    context.arc(center.x, center.y, cell/2, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
                context.lineTo(center.x, center.y);
                context.fillStyle = pac_color; //color
                context.fill();
                context.beginPath();
                if(side==1)
                    context.arc(center.x - 15, center.y - 5, 5, 0, 2 * Math.PI); // circle
                else if(side==2)//gooooooooooood
                    context.arc(center.x + 15, center.y + 5, 5, 0, 2 * Math.PI); // circle
                else if(side==3)
                    context.arc(center.x - 5, center.y -15 , 5, 0, 2 * Math.PI); // circle
                else
                    context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
                context.fillStyle = "black"; //color
                context.fill();
            } else if (board[i][j] == 1) {
                context.beginPath();
                context.arc(center.x, center.y, cell/12, 0, 2 * Math.PI); // circle
                context.fillStyle = "#ff6600"; //color
                context.fill();

            }
            else if (board[i][j] == 4) {
                context.beginPath();
                context.rect(center.x-cell/2, center.y-cell/2, cell, cell);
                context.fillStyle = "white"; //color
                context.fill();
            }
            else if (board[i][j] == 5) {
                context.beginPath();
                context.arc(center.x, center.y, cell/12, 0, 2 * Math.PI); // circle
                context.fillStyle="#00ff00"; //color
                context.fill();
            }
            else if (board[i][j] == 6) {
                context.beginPath();
                context.arc(center.x, center.y, cell/12, 0, 2 * Math.PI); // circle
                context.fillStyle = "#cc0099"; //color
                context.fill();
            }
            else if (board[i][j] == 3) {
                context.drawImage(clockPic,i*cell,j*cell,cell,cell);
            }
            else if (board[i][j] == 8) {
                context.drawImage(livePic,i*cell,j*cell,cell,cell);
            }

            if (monsterArray.length>=1&& monsterArray[0].i == i&&monsterArray[0].j == j) {
                context.drawImage(mons1,i * cell ,j * cell,cell,cell);
            }
            if (monsterArray.length>=2&& monsterArray[1].i == i&&monsterArray[1].j == j) {
                context.drawImage(mons2,i * cell ,j * cell,cell,cell);
            }
            if (monsterArray.length>=3&& monsterArray[2].i == i&&monsterArray[2].j == j) {
                context.drawImage(mons3,i * cell ,j * cell,cell,cell);
            }
            if (bonus.i==i&&bonus.j==j) {
                context.drawImage(bonusPic,i * cell ,j * cell ,cell,cell);
            }


        }
    }


}
function UpdatePosition() {

    if (isMonsterHere(shape.i,shape.j))
    {
        lose();
        return;
    }

    board[shape.i][shape.j]=0;
    var x = GetKeyPressed();
    if(x==1)
    {
        if(shape.j>0 && board[shape.i][shape.j-1]!=4 && !isMonsterHere(shape.i,shape.j-1))
        {
            shape.j--;
        }
    }
    if(x==2)
    {
        if(shape.j<size-1 && board[shape.i][shape.j+1]!=4 && !isMonsterHere(shape.i,shape.j+1))
        {
            shape.j++;
        }
    }
    if(x==3)
    {
        if(shape.i>0 && board[shape.i-1][shape.j]!=4 && !isMonsterHere(shape.i-1,shape.j))
        {
            shape.i--;
        }
    }
    if(x==4)
    {
        if(shape.i<size-1 && board[shape.i+1][shape.j]!=4 && !isMonsterHere(shape.i+1,shape.j))
        {
            shape.i++;
        }
    }



    if(board[shape.i][shape.j]==1)
    {
        score=score+5;
        food--;
    }
    if(board[shape.i][shape.j]==5)
    {
        score=score+15;
        food--;
    }
    if(board[shape.i][shape.j]==6)
    {
        score=score+25;
        food--;
    }
    if(board[shape.i][shape.j]==7)
    {
        score=score+50;
        //food--;
    }
    if(board[shape.i][shape.j]==8)
    {
        live++;
    }
    if(bonus.i==shape.i&&bonus.j==shape.j)
    {
        score+=50;
        bonus.i=-1;
        bonus.j=-1;
    }

    board[shape.i][shape.j]=2;

    if (isMonsterHere(shape.i,shape.j))
    {
        lose();
        return;
    }


    if(intervalCounter==0)
        updatemonsters();
    if(intervalCounter%2==0)
        updatebonus();
    intervalCounter=(intervalCounter+1)%3;



    var currentTime=new Date();

    if(board[shape.i][shape.j]==3)
    {
        clock=clock+5000;
    }
    time_elapsed=(currentTime-start_time-clock)/1000;
    if (time_elapsed<0) {
        clock= -1000 * time_elapsed ;
    }


    Draw(x);



    if (food<=-1)
    {
        fire=false;
        musicoff();
        window.clearInterval(interval);
    }

    if(score<=150&&time_elapsed>=maxTime)
    {
        fire=true;
        musicoff();
        window.clearInterval(interval);
        alert("You Can Better!");


    }
    else if(score>=150&&time_elapsed>=maxTime)
    {
        fire=false;
        musicoff();
        window.clearInterval(interval);
        //window.alert("Game completed - We Have A Winner!");
    }



}
function updatemonsters(){
    var b=new Array();
    var i;
    var j;
    for (var i = 0; i < size; i++) {
        b[i]=new Array();
        for (var j = 0; j < size; j++) {
            if (board[i][j]==4)
                b[i][j]=100;
            else
                b[i][j]=-1;
        }
    }
    bfs(b,shape.i,shape.j);

    for (var i = 0; i < monsterArray.length; i++) {
        var up = 100;
        var down = 100;
        var right = 100;
        var left = 100;
        if (monsterArray[i].i > 0)
            up = b[monsterArray[i].i - 1][monsterArray[i].j];
        if (monsterArray[i].i < size - 1)
            down = b[monsterArray[i].i + 1][monsterArray[i].j];
        if (monsterArray[i].j < size - 1)
            right = b[monsterArray[i].i][monsterArray[i].j + 1];
        if (monsterArray[i].j > 0)
            left = b[monsterArray[i].i][monsterArray[i].j - 1];


        var min = Math.min(up, down, right, left);
        if (min == up){
            if (isMonsterHere( monsterArray[i].i-1, monsterArray[i].j)==false)
                //alert(i+" up")
            monsterArray[i].i -= 1;
        }
        else if(min==down) {
             if (isMonsterHere( monsterArray[i].i+1, monsterArray[i].j)==false)
                 //alert(i+" down")
            monsterArray[i].i += 1;
        }
        else if(min==right) {
              if (isMonsterHere( monsterArray[i].i, monsterArray[i].j+1)==false)
                  //alert(i+" right")
            monsterArray[i].j += 1;
        }
        else if(min==left) {
             if (isMonsterHere( monsterArray[i].i, monsterArray[i].j-1)==false)
                 //alert(i+" left")
            monsterArray[i].j -= 1;
        }

    }
}
function bfs(b,i,j){


    b[i][j]=0;
    var queue=[];
    var x=new Object;x.i=i;x.j=j;
    queue.push(x);
    while (queue.length!=0) {
        var tmp=queue.shift();
        if(tmp.i+1<size &&  b[tmp.i+1][tmp.j]==-1)
        {
            b[tmp.i+1][tmp.j]=b[tmp.i][tmp.j]+1;
            var y=new Object;y.i=tmp.i+1;y.j=tmp.j;
            queue.push(y);
        }
        if(tmp.j+1<size &&  b[tmp.i][tmp.j+1]==-1)
        {
            b[tmp.i][tmp.j+1]=b[tmp.i][tmp.j]+1;
            var y=new Object;y.i=tmp.i;y.j=tmp.j+1;
            queue.push(y);
        }
        if(tmp.i-1>-1 &&  b[tmp.i-1][tmp.j]==-1)
        {
            b[tmp.i-1][tmp.j]=b[tmp.i][tmp.j]+1;
            var y=new Object;y.i=tmp.i-1;y.j=tmp.j;
            queue.push(y);
        }
        if(tmp.j-1>-1 &&  b[tmp.i][tmp.j-1]==-1)
        {
            b[tmp.i][tmp.j-1]=b[tmp.i][tmp.j]+1;
            var y=new Object;y.i=tmp.i;y.j=tmp.j-1;
            queue.push(y);
        }
    }

    /*
        var s="";
        for (var x1 = 0; x1 < 11; x1++) {
            for (var y1 = 0; y1 < 11; y1++) {
                s+=b[x1][y1]+",";
            }
            s+="\n";
        }
        alert(s);
    */

}
function updatebonus(){
    if(bonus.i==-1&&bonus.j==-1)
        return;

    var flag=true;
    while(flag) {
        var rand = Math.floor(Math.random() * 4);
        if (rand==0&& bonus.i>0&&board[bonus.i-1][bonus.j]!=4)
        {
            bonus.i-=1;
            flag=false;
        }
        else if (rand==1&& bonus.i<size-1&&board[bonus.i+1][bonus.j]!=4)
        {
            bonus.i+=1;
            flag=false;
        }
        else if (rand==2&& bonus.j<size-1&&board[bonus.i][bonus.j+1]!=4)
        {
            bonus.j+=1;
            flag=false;
        }
        else if (rand==3&& bonus.j>0&&board[bonus.i][bonus.j-1]!=4)
        {
            bonus.j-=1;
            flag=false;
        }
    }
    if(bonus.i==shape.i&&bonus.j==shape.j)
    {
        score+=100;
        bonus.i=-1;
        bonus.j=-1;
    }
}
function lose(){
    window.clearInterval(interval);
    live--;
    board[shape.i][shape.j]=0;
    shape.i=-1;
    shape.j=-1;
    musicoff();
    Draw(2);

    if(live==0)
    {
        alert("Game Over");
    }
    else
    {
        monsterArray[0].i=0;monsterArray[0].j=0;
        if (monsterArray.length>=2)
        {
            monsterArray[1].i=0;monsterArray[1].j=size-1;
        }
        if (monsterArray.length>=3)
        {
            monsterArray[2].i=size-1;monsterArray[2].j=0;
        }

        var x=1;
        while(x>0){
            var emptyCell = findRandomEmptyCell(board);
            if (isCorner(emptyCell[0],emptyCell[1])==false) {
                board[emptyCell[0]][emptyCell[1]] = 2;
                shape.i=emptyCell[0];
                shape.j=emptyCell[1];
                x--;
            }
        }


        pause(1000);


        musicon();
        interval=setInterval(UpdatePosition, 110);
    }
}
function pause(millis){
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}
function isMonsterHere(i,j){
    if(monsterArray[0].i==i&&monsterArray[0].j==j)
        return true;
    if(monsterArray.length>=2&&monsterArray[1].i==i&&monsterArray[1].j==j)
        return true;
    if(monsterArray.length>=3&&monsterArray[2].i==i&&monsterArray[2].j==j)
        return true;
    return false;
}




const PI2 = Math.PI * 2;
let random = (min, max) => Math.random() * (max - min + 1) + min | 0;
let canvas2 = null;
let ctx = null;
let birthday= null;
var fire=false;

class Birthday {
    constructor() {
        this.resize()

        // create a lovely place to store the firework
        this.fireworks = []
        this.counter = 0

    }
    resize() {
        this.width = canvas2.width //= window.innerWidth
        let center = this.width / 2 | 0
        this.spawnA = center - center / 4 | 0
        this.spawnB = center + center / 4 | 0

        this.height = canvas2.height //= window.innerHeight
        this.spawnC = this.height * .1
        this.spawnD = this.height * .5

    }
    onClick(evt) {
        let x = evt.clientX || evt.touches && evt.touches[0].pageX
        let y = evt.clientY || evt.touches && evt.touches[0].pageY

        let count = random(3,5)
        for(let i = 0; i < count; i++) this.fireworks.push(new Firework(
            random(this.spawnA, this.spawnB),
            this.height,
            x,
            y,
            random(300, 450),
            random(30, 110)))

        this.counter = -30

    }
    update() {
        if (fire)
            return;

        ctx.globalCompositeOperation = 'hard-light'
        ctx.fillStyle = 'rgba(20,20,20,0.15)'
        ctx.fillRect(0, 0, this.width, this.height)

        ctx.globalCompositeOperation = 'lighter'
        for (let firework of this.fireworks) firework.update()

        // if enough time passed... create new new firework
        if (++this.counter === 15) {
            this.fireworks.push(new Firework(
                random(this.spawnA, this.spawnB),
                this.height,
                random(0, this.width),
                random(this.spawnC, this.spawnD),
                random(300, 450),
                random(30, 110)))
            this.counter = 0
        }

        // remove the dead fireworks
        if (this.fireworks.length > 1000) this.fireworks = this.fireworks.filter(firework => !firework.dead)

    }
}
class Firework {
    constructor(x, y, targetX, targetY, shade, offsprings) {
        this.dead = false
        this.offsprings = offsprings

        this.x = x
        this.y = y
        this.targetX = targetX
        this.targetY = targetY

        this.shade = shade
        this.history = []
    }
    update() {
        if (this.dead) return;

        let xDiff = this.targetX - this.x
        let yDiff = this.targetY - this.y
        if (Math.abs(xDiff) > 3 || Math.abs(yDiff) > 3) { // is still moving
            this.x += xDiff / 20
            this.y += yDiff / 20

            this.history.push({
                x: this.x,
                y: this.y
            })

            if (this.history.length > 20) this.history.shift()

        } else {
            if (this.offsprings && !this.madeChilds) {

                let babies = this.offsprings / 2;
                for (let i = 0; i < babies; i++) {
                    let targetX = this.x + this.offsprings * Math.cos(PI2 * i / babies) | 0
                    let targetY = this.y + this.offsprings * Math.sin(PI2 * i / babies) | 0

                    birthday.fireworks.push(new Firework(this.x, this.y, targetX, targetY, this.shade, 0))

                }

            }
            this.madeChilds = true
            this.history.shift()
        }

        if (this.history.length === 0) this.dead = true
        else if (this.offsprings) {
            for (let i = 0; this.history.length > i; i++) {
                let point = this.history[i]
                ctx.beginPath()
                ctx.fillStyle = 'hsl(' + this.shade + ',100%,' + i + '%)'
                ctx.arc(point.x, point.y, 1, 0, PI2, false)
                ctx.fill()
            }
        } else {
            ctx.beginPath()
            ctx.fillStyle = 'hsl(' + this.shade + ',100%,50%)'
            ctx.arc(this.x, this.y, 1, 0, PI2, false)
            ctx.fill()
        }

    }
}

function fireworks(){
    fire=false;

    canvas2 = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    birthday= new Birthday
    //window.onresize = () => birthday.resize()
    //document.onclick = evt => birthday.onClick(evt)

    //document.ontouchstart = evt => birthday.onClick(evt)

    ;(function update() {
        requestAnimationFrame(update)
        birthday.update()

    }())
}



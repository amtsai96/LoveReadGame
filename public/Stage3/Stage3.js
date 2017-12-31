$(document).ready(()=>{ // jQuery main
    let stage = new createjs.Stage(canvas);
    var context=document.getElementById("canvas");
    let repo = new createjs.LoadQueue();
    let car_road = document.getElementById("car_road");
    let clapping = document.getElementById("clapping");
    let crow = document.getElementById("crow");
    car_road.load();
    clapping.load();
    crow.load();
    // function init() {
    //     car_road.addEventListener('loadeddata', () = > {
    //         clapping.addEventListener('loadeddata', () = > {
    //              crow.addEventListener('loadeddata', setup());
    //         });
    //     });
    // }
    function setup() {
        car_road.loop = true;
        car_road.play();
        // automatically update
        createjs.Ticker.on("tick", e => stage.update());
        createjs.Ticker.framerate = 60;
        // load assets
        repo.loadManifest([{id:'blood',src:"images/blood.png"},
            {id:'car1',src:"images/car1.PNG"},
            {id:'car2',src:"images/car2.PNG"},
            {id:'car3',src:"images/car3.PNG"},
            {id:'car4',src:"images/car4.PNG"},
            {id:'car5',src:"images/car5.PNG"},
            {id:'car6',src:"images/car6.PNG"},
            {id:'car7',src:"images/car1.PNG"},
            {id:'waiting1',src:"images/waiting1.PNG"},
            {id:'waiting2',src:"images/waiting2.PNG"},
            {id:'walking1',src:"images/walking1.PNG"},
            {id:'walking2',src:"images/walking2.PNG"},
            {id:'win1',src:"images/win1.PNG"},
            {id:'win2',src:"images/win2.PNG"}]);
        repo.on('complete', draw);
    }

    function draw(){
        var flag = 1;
        //動作宣告
        let people = [
            new createjs.Bitmap(repo.getResult('waiting1')),
            new createjs.Bitmap(repo.getResult('waiting2')),
            new createjs.Bitmap(repo.getResult('walking1')),
            new createjs.Bitmap(repo.getResult('walking2')),
            new createjs.Bitmap(repo.getResult('win1')),
            new createjs.Bitmap(repo.getResult('win2'))];
        for(var i=0;i<6;i++) {
            people[i].set({x: 360, y: 50});
        }

        var shape=new createjs.Shape();
        var graphics=shape.graphics;
        //馬路邊界一
        graphics.beginStroke("black");
        graphics.setStrokeStyle(5);
        graphics.moveTo(0,150);
        graphics.lineTo(720,150);
        //馬路邊界二
        graphics.beginStroke("black");
        graphics.setStrokeStyle(5);
        graphics.moveTo(0,550);
        graphics.lineTo(720,550);
        //let people= new createjs.Bitmap(repo.getResult('waiting1'));

        let blood = new createjs.Bitmap(repo.getResult('blood'));
        //車子宣告
        let cars = [
            new createjs.Bitmap(repo.getResult('car1')),
            new createjs.Bitmap(repo.getResult('car2')),
            new createjs.Bitmap(repo.getResult('car3')),
            new createjs.Bitmap(repo.getResult('car4')),
            new createjs.Bitmap(repo.getResult('car5')),
            new createjs.Bitmap(repo.getResult('car6')),
            new createjs.Bitmap(repo.getResult('car7'))];

        let carsWidthLength = [[57,30],[58,28],[58,60],[57,32],[54,38],[56,38],[57,30]];

        cars[0].x = -100; cars[0].y = 170;
        cars[1].x = 750; cars[1].y = 350;
        cars[2].x = 750; cars[2].y = 270;
        cars[3].x = 750; cars[3].y = 400;
        cars[4].x = 750; cars[4].y = 500;
        cars[5].x = -200; cars[5].y = 220;
        cars[6].x = -100; cars[6].y = 450;
        createjs.Tween.get(cars[0],{loop:true}).to({x:720,y:170},3500);
        createjs.Tween.get(cars[1],{loop:true}).to({x:0,y:350},4000);
        createjs.Tween.get(cars[2],{loop:true}).to({x:0,y:270},3500);
        createjs.Tween.get(cars[3],{loop:true}).to({x:0,y:400},2500);
        createjs.Tween.get(cars[4],{loop:true}).to({x:0,y:500},2500);
        createjs.Tween.get(cars[5],{loop:true}).to({x:720,y:220},3000);
        createjs.Tween.get(cars[6],{loop:true}).to({x:720,y:450},3000);


        //控制上下左右
        window.addEventListener('keydown', function(e){
            flag=2;
            switch(e.keyCode){
                case 37:
                    for(var i =0;i<6;i++){
                        people[i].x-=10;
                        if(people[i].x<=0){
                            people[i].x=0;
                        }
                    }
                    break;
                case 38:
                    for(var i =0;i<6;i++){
                        people[i].y-=10;
                        if(people[i].y<=0){
                            people[i].y=0;
                        }
                    }
                    break;
                case 39:
                    for(var i =0;i<6;i++){
                        people[i].x+=10;
                        if(people[i].x>=660) {
                            people[i].x = 660;
                        }
                    }
                    break;
                case 40:
                    for(var i =0;i<6;i++){
                        people[i].y+=10;
                        if(people[i].y>=550){
                            car_road.pause();
                            clapping.play();
                            flag=3;
                        }
                        if(people[i].y>=660){
                            people[i].y=660;
                        }
                    }
                    break;
            }
        });
        //判斷走路時的動畫(有三種)
        window.setInterval(function flagtest() {
            if(flag==1) {
                    window.setTimeout(function () {
                        stage.addChild(people[0]);
                    }, 0);
                    window.setTimeout(function () {
                        stage.removeChild(people[0]);
                    }, 500);
                    window.setTimeout(function () {
                        stage.addChild(people[1]);
                    }, 500);
                    window.setTimeout(function () {
                        stage.removeChild(people[1]);
                    }, 1000);
            }
            if(flag==2) {
                    window.setTimeout(function () {
                        stage.addChild(people[2]);
                    }, 0);
                    window.setTimeout(function () {
                        stage.removeChild(people[2]);
                    }, 500);
                    window.setTimeout(function () {
                        stage.addChild(people[3]);
                    }, 500);
                    window.setTimeout(function () {
                        stage.removeChild(people[3]);
                    }, 1000);
            }
            if(flag==3) {
                    window.setTimeout(function () {
                        stage.addChild(people[4]);
                    }, 0);
                    window.setTimeout(function () {
                        stage.removeChild(people[4]);
                    }, 500);
                    window.setTimeout(function () {
                        stage.addChild(people[5]);
                    }, 500);
                    window.setTimeout(function () {
                        stage.removeChild(people[5]);
                    }, 1000);
            }
        },1000);

        //判斷有沒有撞到車子
        window.setInterval(function HitTest() {
            for(var i =0;i<7;i++){
                for(var j=0;j<6;j++){
                    if (isHit(people[j].x, people[j].y, 49, 60, cars[i].x, cars[i].y,
                            carsWidthLength[i][0], carsWidthLength[i][1]) == true) {
                        createjs.Tween.get(blood)
                            .call(() => {
                                crow.play();
                                blood.set({x: people[2].x, y: people[2].y});
                                stage.addChild(blood);
                                people[0].set({x: 360, y: 50});
                                people[1].set({x: 360, y: 50});
                                people[2].set({x: 360, y: 50});
                                people[3].set({x: 360, y: 50});
                                people[4].set({x: 360, y: 50});
                                people[5].set({x: 360, y: 50});

                            }).wait(250).call(() => stage.removeChild(blood));
                    }
                }
            }
        }, 0);

        stage.addChild(cars[0],cars[1],cars[2],cars[3],cars[4],cars[5],cars[6]);
        stage.addChild(shape);
        stage.update();
    }
    function isHit(ax,ay, aw,ah, bx,by, bw,bh) {
        return (ax+aw > bx && ax < bx + bw  && ay+ah > by && ay < by + bh);
    }
    setup();
    // init();
});







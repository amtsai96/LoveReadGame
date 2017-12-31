$(document).ready(()=>{ // jQuery main

    let stage = new createjs.Stage(canvas);
    let repo = new createjs.LoadQueue();
    let scene = 0;

    function setup() {
        // automatically update
        createjs.Ticker.on("tick", e => stage.update());
        createjs.Ticker.framerate = 60;

        repo.loadManifest([
            {id:'boy',src:'images/boy.png'},
            {id:'girl',src:'images/girl.png'},
            {id:'introText',src:'images/intro.png'},
            {id:'intro',src:'images/intro_button.png'},
            {id:'start',src:'images/start_button.png'},
            {id:'enter',src:'images/enter_name.png'},
            {id:'title',src:'images/title.png'}
        ]);
        repo.on('complete', draw);
    }

    function draw(){

        let playerName = '';
        let otherName = '';
        if(scene === -1){

        }
        else if(scene === 0){
            // menu

            let title = new createjs.Bitmap(repo.getResult('title'));
            // title.set({scaleX: 1.44, scaleY: 1.44});
            title.set({x: 200, y: 120});
            stage.addChild(title);

            let intro = new createjs.Bitmap(repo.getResult('intro'));
            // intro.set({scaleX: 1.44, scaleY: 1.44});
            intro.set({x: 200, y: 450});
            stage.addChild(intro);

            let start = new createjs.Bitmap(repo.getResult('start'));
            // start.set({scaleX: 1.44, scaleY: 1.44});
            start.set({x: 520, y: 450});
            stage.addChild(start);

            intro.on('click', e => {
                stage.removeChild(title);
                stage.removeChild(intro);
                stage.removeChild(start);
                scene++;
                draw();
            });

            start.on('click', e => {
                stage.removeChild(title);
                stage.removeChild(intro);
                stage.removeChild(start);
                scene+=2;
                draw();
            });


        }else if(scene === 1){
            //intro

            let introText = new createjs.Bitmap(repo.getResult('introText'));
            introText.set({scaleX: 1.3, scaleY: 1.3});
            introText.set({x: 100, y: 100});
            stage.addChild(introText);

            let start = new createjs.Bitmap(repo.getResult('start'));
            // start.set({scaleX: 1.44, scaleY: 1.44});
            start.set({x: 520, y: 450});
            stage.addChild(start);

            start.on('click', e => {
                stage.removeChild(introText);
                stage.removeChild(start);
                scene++;
                draw();
            });


        }else if (scene === 2){
            // enter name
            let textField = new TextInput();
            textField.set({x: 265, y: 155});
            textField.placeHolder = "George"; // updates the default text
            stage.addChild(textField);
            textField.update();

            let textFieldOther = new TextInput();
            textFieldOther.set({x: 265, y: 345});
            textFieldOther.placeHolder = "Mary"; // updates the default text
            stage.addChild(textFieldOther);
            textFieldOther.update();

            let boy = new createjs.Bitmap(repo.getResult('boy'));
            boy.set({x: 100, y: 75});
            stage.addChild(boy);

            let girl = new createjs.Bitmap(repo.getResult('girl'));
            girl.set({x: 100, y: 275});
            stage.addChild(girl);

            let enter = new createjs.Bitmap(repo.getResult('enter'));
            // enter.set({scaleX: 1.44, scaleY: 1.44});
            enter.set({x: 250, y: 100});
            stage.addChild(enter);

            let start = new createjs.Bitmap(repo.getResult('start'));
            // start.set({scaleX: 1.44, scaleY: 1.44});
            start.set({x: 520, y: 450});
            stage.addChild(start);


            start.on('click', e => {
                stage.removeChild(enter);
                stage.removeChild(start);
                playerName = textField.placeHolder.toString();
                otherName = textFieldOther.placeHolder.toString();
                stage.removeChild(textField);
                stage.removeChild(textFieldOther);
                scene++;
                draw();

            });
        }else{
            let text = new createjs.Text(playerName, "30px AbrahamLincoln", "black");
            text.x = 270;
            text.y = 50;
            stage.addChild(text);
            let text2 = new createjs.Text(otherName, "30px AbrahamLincoln", "black");
            text2.x = 270;
            text2.y = 200;
            stage.addChild(text2);

        }
    }

    setup();
    //draw();

});
//1.44
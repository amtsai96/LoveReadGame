$(document).ready(()=>{ // jQuery main
    
	let stage = new createjs.Stage(canvas);
    let repo = new createjs.LoadQueue();
    let lineY = 0;
    let scene = 0;
    let rand;
    let letterQuality;
		   
	function setup() {
		// automatically update
		createjs.Ticker.on("tick", e => stage.update());
		createjs.Ticker.framerate = 60;
        repo.loadManifest([
            {id:'startBoy',src:'images/bfLetter1.png'},
            {id:'playingBoy',src:'images/bfLetter4.png'},
            {id:'successBoy',src:'images/bfLetter2.png'},
            {id:'failBoy',src:'images/bfLetter3.png'},
            {id:'startGirl',src:'images/gfLetter1.png'},
            {id:'successGirl',src:'images/gfLetter2.png'},
            {id:'nothingGirl',src:'images/gfLetter3.png'},
            {id:'letter',src:'images/letter.png'},
            {id:'stage1',src:'images/stage1.png'},
            {id:'stage1Text',src:'images/stage1_text.png'},
            {id:'heartText',src:'images/heart_text.png'},
            {id:'heart',src:'images/heart1.png'},
            {id:'background',src:"sound/background_music.mp3"},
            {id:'heartbeat',src:"sound/heartbeats.mp3"}
        ]);
        repo.on('complete', draw);
	}

    function draw(){
	    /*
        let rect = new createjs.Shape();
        rect.graphics.beginStroke("purple").drawRect(0, 0, 720, 720);
        stage.addChild(rect);
        */
        let background = repo.getResult('background');
        let heartbeat = repo.getResult('heartbeat');
        background.play();

        if(scene === 0){
            let stage1Text = new createjs.Bitmap(repo.getResult('stage1Text'));
            stage1Text.set({scaleX: 1.44, scaleY: 1.44});
            stage1Text.set({x: 201.6, y: 273.6});
            stage.addChild(stage1Text);
            setTimeout(function(){
                stage.removeChild(stage1Text);
                scene++;
                draw();
            }, 5000);
        }else if(scene === 1){
            let text = new createjs.Text("請選擇一封", "30px AbrahamLincoln", "black");
            text.x = 270;
            text.y = 200;
            stage.addChild(text);

            let letter = new createjs.Bitmap(repo.getResult('letter'));
            // letter.set({scaleX: 5, scaleY: 5});
            letter.set({x: 100, y: 300});
            stage.addChild(letter);

            let letter1 = new createjs.Bitmap(repo.getResult('letter'));
            // letter1.set({scaleX: 5, scaleY: 5});
            letter1.set({x: 400, y: 300});
            stage.addChild(letter1);

            letter.on('click', e => {
                rand = Math.floor( Math.random() * 2 );
                if(rand){
                    //good
                    letterQuality = true;
                }else {
                    //bad
                    letterQuality = false;
                }
                stage.removeChild(text);
                stage.removeChild(letter);
                stage.removeChild(letter1);
                scene++;
                draw();
            });

            letter1.on('click', e => {
                rand = Math.floor( Math.random() * 2 );
                if(rand){
                    //good
                    letterQuality = true;
                }else {
                    //bad
                    letterQuality = false;
                }
                stage.removeChild(text);
                stage.removeChild(letter);
                stage.removeChild(letter1);
                scene++;
                draw();
            });
        }else if(scene === 2){
            let text;
            if(letterQuality){
                text = new createjs.Text("good letter", "30px AbrahamLincoln", "black");
                text.x = 270;
                text.y = 270;
                stage.addChild(text);
            }else{
                text = new createjs.Text("bad letter", "30px AbrahamLincoln", "black");
                text.x = 270;
                text.y = 270;
                stage.addChild(text);
            }
            setTimeout(function(){
                stage.removeChild(text);
                scene++;
                draw();
            }, 2000);
        }else if(scene === 3){
            let letter1 = new createjs.Bitmap(repo.getResult('letter'));
            letter1.set({scaleX: 1.44, scaleY: 1.44});
            letter1.set({x: 122.4, y: 316.8});

            let letter2 = new createjs.Bitmap(repo.getResult('letter'));
            letter2.set({scaleX: 1.44, scaleY: 1.44});
            letter2.set({x: 266.4, y: 316.8});

            let letter3 = new createjs.Bitmap(repo.getResult('letter'));
            letter3.set({scaleX: 1.44, scaleY: 1.44});
            letter3.set({x: 410.4, y: 316.8});

            let letter4 = new createjs.Bitmap(repo.getResult('letter'));
            letter4.set({scaleX: 1.44, scaleY: 1.44});
            letter4.set({x: 554.4, y: 316.8});

            let stage1 = new createjs.Bitmap(repo.getResult('stage1'));
            stage1.set({scaleX: 1.44, scaleY: 1.44});

            let heartText = new createjs.Bitmap(repo.getResult('heartText'));
            heartText.set({scaleX: 1.44, scaleY: 1.44});
            heartText.set({x: 288, y: 14.4});

            let heart = new createjs.Bitmap(repo.getResult('heart'));
            heart.set({scaleX: 1.44, scaleY: 1.44});
            heart.set({x: 446.4, y: 31.68});

            let heart1 = new createjs.Bitmap(repo.getResult('heart'));
            heart1.set({scaleX: 1.44, scaleY: 1.44});
            heart1.set({x: 485, y: 31.68});

            let startGirl = new createjs.Bitmap(repo.getResult('startGirl'));
            startGirl.set({scaleX: 1.44, scaleY: 1.44});
            startGirl.set({x: 50.4, y: 590.4});

            let playingBoy = new createjs.Bitmap(repo.getResult('playingBoy'));
            playingBoy.set({scaleX: 1.44, scaleY: 1.44});
            playingBoy.regX = playingBoy.image.width/2;

            let startBoy = new createjs.Bitmap(repo.getResult('startBoy'));
            startBoy.set({scaleX: 1.44, scaleY: 1.44});
            startBoy.y = 172.8;
            startBoy.regX = startBoy.image.width/2;

            let successGirl = new createjs.Bitmap(repo.getResult('successGirl'));
            successGirl.set({scaleX: 1.44, scaleY: 1.44});
            successGirl.set({x: 50.4, y: 590.4});

            let nothingGirl = new createjs.Bitmap(repo.getResult('nothingGirl'));
            nothingGirl.set({scaleX: 1.44, scaleY: 1.44});
            nothingGirl.set({x: 50.4, y: 590.4});

            let hLine1 = [];
            let hLine2 = [];
            let hLine3 = [];
            let line = new createjs.Shape();
            stage.addChild(line);
            line.graphics.beginStroke("black");
            line.graphics.setStrokeStyle(5);
            //||||
            line.graphics.moveTo(145,341-lineY).lineTo(145,1051-lineY);
            line.graphics.moveTo(290,341-lineY).lineTo(290,1051-lineY);
            line.graphics.moveTo(435,341-lineY).lineTo(435,1051-lineY);
            line.graphics.moveTo(580,341-lineY).lineTo(580,1051-lineY);
            //---71*9
            //1
            rand = Math.floor( Math.random() * 2 );
            if(rand){
                line.graphics.moveTo(145,412-lineY).lineTo(290,412-lineY);
                hLine1.push(1);
                rand = Math.floor( Math.random() * 2 );
                if(rand){
                    line.graphics.moveTo(435,412-lineY).lineTo(580,412-lineY);
                    hLine3.push(1);
                }
            }else {
                rand = Math.floor( Math.random() * 2 );
                if(rand){
                    line.graphics.moveTo(290,412-lineY).lineTo(435,412-lineY);
                    hLine2.push(1);
                }
                else {
                    rand = Math.floor( Math.random() * 2 );
                    if(rand){
                        line.graphics.moveTo(435,412-lineY).lineTo(580,412-lineY);
                        hLine3.push(1);
                    }
                }
            }
            //2
            rand = Math.floor( Math.random() * 2 );
            if(rand){
                line.graphics.moveTo(145,483-lineY).lineTo(290,483-lineY);
                hLine1.push(2);
                rand = Math.floor( Math.random() * 2 );
                if(rand){
                    line.graphics.moveTo(435,483-lineY).lineTo(580,483-lineY);
                    hLine3.push(2);
                }
            }else {
                rand = Math.floor( Math.random() * 2 );
                if(rand){
                    line.graphics.moveTo(290,483-lineY).lineTo(435,483-lineY);
                    hLine2.push(2);
                }
                else {
                    rand = Math.floor( Math.random() * 2 );
                    if(rand){
                        line.graphics.moveTo(435,483-lineY).lineTo(580,483-lineY);
                        hLine3.push(2);
                    }
                }
            }
            //3
            rand = Math.floor( Math.random() * 2 );
            if(rand){
                line.graphics.moveTo(145,554-lineY).lineTo(290,554-lineY);
                hLine1.push(3);
                rand = Math.floor( Math.random() * 2 );
                if(rand){
                    line.graphics.moveTo(435,554-lineY).lineTo(580,554-lineY);
                    hLine3.push(3);
                }
            }else {
                rand = Math.floor( Math.random() * 2 );
                if(rand){
                    line.graphics.moveTo(290,554-lineY).lineTo(435,554-lineY);
                    hLine2.push(3);
                }
                else {
                    rand = Math.floor( Math.random() * 2 );
                    if(rand){
                        line.graphics.moveTo(435,554-lineY).lineTo(580,554-lineY);
                        hLine3.push(3);
                    }
                }
            }
            //4
            rand = Math.floor( Math.random() * 2 );
            if(rand){
                line.graphics.moveTo(145,625-lineY).lineTo(290,625-lineY);
                hLine1.push(4);
                rand = Math.floor( Math.random() * 2 );
                if(rand){
                    line.graphics.moveTo(435,625-lineY).lineTo(580,625-lineY);
                    hLine3.push(4);
                }
            }else {
                rand = Math.floor( Math.random() * 2 );
                if(rand){
                    line.graphics.moveTo(290,625-lineY).lineTo(435,625-lineY);
                    hLine2.push(4);
                }
                else {
                    rand = Math.floor( Math.random() * 2 );
                    if(rand){
                        line.graphics.moveTo(435,625-lineY).lineTo(580,625-lineY);
                        hLine3.push(4);
                    }
                }
            }
            //5
            rand = Math.floor( Math.random() * 2 );
            if(rand){
                line.graphics.moveTo(145,696-lineY).lineTo(290,696-lineY);
                hLine1.push(5);
                rand = Math.floor( Math.random() * 2 );
                if(rand){
                    line.graphics.moveTo(435,696-lineY).lineTo(580,696-lineY);
                    hLine3.push(5);
                }
            }else {
                rand = Math.floor( Math.random() * 2 );
                if(rand){
                    line.graphics.moveTo(290,696-lineY).lineTo(435,696-lineY);
                    hLine2.push(5);
                }
                else {
                    rand = Math.floor( Math.random() * 2 );
                    if(rand){
                        line.graphics.moveTo(435,696-lineY).lineTo(580,696-lineY);
                        hLine3.push(5);
                    }
                }
            }
            //6
            rand = Math.floor( Math.random() * 2 );
            if(rand){
                line.graphics.moveTo(145,767-lineY).lineTo(290,767-lineY);
                hLine1.push(6);
                rand = Math.floor( Math.random() * 2 );
                if(rand){
                    line.graphics.moveTo(435,767-lineY).lineTo(580,767-lineY);
                    hLine3.push(6);
                }
            }else {
                rand = Math.floor( Math.random() * 2 );
                if(rand){
                    line.graphics.moveTo(290,767-lineY).lineTo(435,767-lineY);
                    hLine2.push(6);
                }
                else {
                    rand = Math.floor( Math.random() * 2 );
                    if(rand){
                        line.graphics.moveTo(435,767-lineY).lineTo(580,767-lineY);
                        hLine3.push(6);
                    }
                }
            }
            //7
            rand = Math.floor( Math.random() * 2 );
            if(rand){
                line.graphics.moveTo(145,838-lineY).lineTo(290,838-lineY);
                hLine1.push(7);
                rand = Math.floor( Math.random() * 2 );
                if(rand){
                    line.graphics.moveTo(435,838-lineY).lineTo(580,838-lineY);
                    hLine3.push(7);
                }
            }else {
                rand = Math.floor( Math.random() * 2 );
                if(rand){
                    line.graphics.moveTo(290,838-lineY).lineTo(435,838-lineY);
                    hLine2.push(7);
                }
                else {
                    rand = Math.floor( Math.random() * 2 );
                    if(rand){
                        line.graphics.moveTo(435,838-lineY).lineTo(580,838-lineY);
                        hLine3.push(7);
                    }
                }
            }
            //8
            rand = Math.floor( Math.random() * 2 );
            if(rand){
                line.graphics.moveTo(145,909-lineY).lineTo(290,909-lineY);
                hLine1.push(8);
                rand = Math.floor( Math.random() * 2 );
                if(rand){
                    line.graphics.moveTo(435,909-lineY).lineTo(580,909-lineY);
                    hLine3.push(8);
                }
            }else {
                rand = Math.floor( Math.random() * 2 );
                if(rand){
                    line.graphics.moveTo(290,909-lineY).lineTo(435,909-lineY);
                    hLine2.push(8);
                }
                else {
                    rand = Math.floor( Math.random() * 2 );
                    if(rand){
                        line.graphics.moveTo(435,909-lineY).lineTo(580,909-lineY);
                        hLine3.push(8);
                    }
                }
            }
            //9
            rand = Math.floor( Math.random() * 2 );
            if(rand){
                line.graphics.moveTo(145,980-lineY).lineTo(290,980-lineY);
                hLine1.push(9);
                rand = Math.floor( Math.random() * 2 );
                if(rand){
                    line.graphics.moveTo(435,980-lineY).lineTo(580,980-lineY);
                    hLine3.push(9);
                }
            }else {
                rand = Math.floor( Math.random() * 2 );
                if(rand){
                    line.graphics.moveTo(290,980-lineY).lineTo(435,980-lineY);
                    hLine2.push(9);
                }
                else {
                    rand = Math.floor( Math.random() * 2 );
                    if(rand){
                        line.graphics.moveTo(435,980-lineY).lineTo(580,980-lineY);
                        hLine3.push(9);
                    }
                }
            }

            letter1.on('click', e => {
                heartbeat.play();
                playingBoy.x = startBoy.x;
                playingBoy.y = startBoy.y;
                stage.removeChild(startBoy);
                stage.removeChild(letter1);
                stage.removeChild(letter2);
                stage.removeChild(letter3);
                stage.removeChild(letter4);
                stage.addChild(playingBoy);

                let vLine = 1;
                line.graphics.beginStroke("red");
                for(let i=0;i<10;i++){
                    if(vLine === 1){
                        line.graphics.moveTo(145,341+71*i-lineY).lineTo(145,341+71*(i+1)-lineY);
                        var isLine = hLine1[0];
                        while(isLine < i+1){
                            hLine1.shift();
                            isLine = hLine1[0];
                        }
                        if(isLine === i+1){
                            hLine1.shift();
                            line.graphics.moveTo(145,341+71*(i+1)-lineY).lineTo(290,341+71*(i+1)-lineY);
                            vLine = 2;
                        }
                    }else if(vLine === 2){
                        line.graphics.moveTo(290,341+71*i-lineY).lineTo(290,341+71*(i+1)-lineY);
                        var isLineLeft = hLine1[0];
                        var isLineRight = hLine2[0];
                        while(isLineLeft < i+1){
                            hLine1.shift();
                            isLineLeft = hLine1[0];
                        }
                        while(isLineRight < i+1){
                            hLine2.shift();
                            isLineRight = hLine2[0];
                        }
                        if(isLineLeft === i+1){
                            hLine1.shift();
                            line.graphics.moveTo(145,341+71*(i+1)-lineY).lineTo(290,341+71*(i+1)-lineY);
                            vLine = 1;
                        }else if(isLineRight === i+1){
                            hLine2.shift();
                            line.graphics.moveTo(290,341+71*(i+1)).lineTo(435,341+71*(i+1));
                            vLine = 3;
                        }
                    }else if(vLine === 3){
                        line.graphics.moveTo(435,341+71*i-lineY).lineTo(435,341+71*(i+1)-lineY);
                        var isLineLeft = hLine2[0];
                        var isLineRight = hLine3[0];
                        while(isLineLeft < i+1){
                            hLine2.shift();
                            isLineLeft = hLine2[0];
                        }
                        while(isLineRight < i+1){
                            hLine3.shift();
                            isLineRight = hLine3[0];
                        }
                        if(isLineLeft === i+1){
                            hLine2.shift();
                            line.graphics.moveTo(290,341+71*(i+1)-lineY).lineTo(435,341+71*(i+1)-lineY);
                            vLine = 2;
                        }else if(isLineRight === i+1){
                            hLine3.shift();
                            line.graphics.moveTo(435,341+71*(i+1)-lineY).lineTo(580,341+71*(i+1)-lineY);
                            vLine = 4;
                        }
                    }else{
                        line.graphics.moveTo(580,341+71*i-lineY).lineTo(580,341+71*(i+1)-lineY);
                        var isLine = hLine3[0];
                        while(isLine < i+1){
                            hLine3.shift();
                            isLine = hLine3[0];
                        }
                        if(isLine === i+1){
                            hLine3.shift();
                            line.graphics.moveTo(435,341+71*(i+1)-lineY).lineTo(580,341+71*(i+1)-lineY);
                            vLine = 3;
                        }
                    }
                }
                createjs.Tween.get(line)
                    .to({y:-374},3000)
                    .call(()=> {
                        console.log(vLine);
                        if(vLine === 1){
                            if(letterQuality){
                                let successBoy = new createjs.Bitmap(repo.getResult('successBoy'));
                                successBoy.set({scaleX: 1.44, scaleY: 1.44});
                                successBoy.regX = successBoy.image.width/2;
                                successBoy.x = playingBoy.x;
                                successBoy.y = playingBoy.y;
                                stage.removeChild(playingBoy);
                                stage.addChild(successBoy);
                                stage.removeChild(startGirl);
                                stage.addChild(successGirl);
                                stage.addChild(heart1);
                            }else{
                                let failBoy = new createjs.Bitmap(repo.getResult('failBoy'));
                                failBoy.set({scaleX: 1.44, scaleY: 1.44});
                                failBoy.regX = failBoy.image.width/2;
                                failBoy.x = playingBoy.x;
                                failBoy.y = playingBoy.y;
                                stage.removeChild(playingBoy);
                                stage.addChild(failBoy);
                                stage.removeChild(startGirl);
                                stage.addChild(nothingGirl);
                                stage.removeChild(heart);
                            }
                            heartbeat.pause();
                        }else {
                            let failBoy = new createjs.Bitmap(repo.getResult('failBoy'));
                            failBoy.set({scaleX: 1.44, scaleY: 1.44});
                            failBoy.regX = failBoy.image.width/2;
                            failBoy.x = playingBoy.x;
                            failBoy.y = playingBoy.y;
                            stage.removeChild(playingBoy);
                            stage.addChild(failBoy);
                            stage.removeChild(startGirl);
                            stage.addChild(nothingGirl);
                            heartbeat.pause();
                        }
                    });
            });

            letter2.on('click', e => {
                heartbeat.play();
                playingBoy.x = startBoy.x;
                playingBoy.y = startBoy.y;
                stage.removeChild(startBoy);
                stage.removeChild(letter1);
                stage.removeChild(letter2);
                stage.removeChild(letter3);
                stage.removeChild(letter4);
                stage.addChild(playingBoy);

                let vLine = 2;
                line.graphics.beginStroke("red");
                for(let i=0;i<10;i++){
                    if(vLine === 1){
                        line.graphics.moveTo(145,341+71*i).lineTo(145,341+71*(i+1));
                        var isLine = hLine1[0];
                        while(isLine < i+1){
                            hLine1.shift();
                            isLine = hLine1[0];
                        }
                        if(isLine === i+1){
                            hLine1.shift();
                            line.graphics.moveTo(145,341+71*(i+1)).lineTo(290,341+71*(i+1));
                            vLine = 2;
                        }
                    }else if(vLine === 2){
                        line.graphics.moveTo(290,341+71*i).lineTo(290,341+71*(i+1));
                        var isLineLeft = hLine1[0];
                        var isLineRight = hLine2[0];
                        while(isLineLeft < i+1){
                            hLine1.shift();
                            isLineLeft = hLine1[0];
                        }
                        while(isLineRight < i+1){
                            hLine2.shift();
                            isLineRight = hLine2[0];
                        }
                        if(isLineLeft === i+1){
                            hLine1.shift();
                            line.graphics.moveTo(145,341+71*(i+1)).lineTo(290,341+71*(i+1));
                            vLine = 1;
                        }else if(isLineRight === i+1){
                            hLine2.shift();
                            line.graphics.moveTo(290,341+71*(i+1)).lineTo(435,341+71*(i+1));
                            vLine = 3;
                        }
                    }else if(vLine === 3){
                        line.graphics.moveTo(435,341+71*i).lineTo(435,341+71*(i+1));
                        var isLineLeft = hLine2[0];
                        var isLineRight = hLine3[0];
                        while(isLineLeft < i+1){
                            hLine2.shift();
                            isLineLeft = hLine2[0];
                        }
                        while(isLineRight < i+1){
                            hLine3.shift();
                            isLineRight = hLine3[0];
                        }
                        if(isLineLeft === i+1){
                            hLine2.shift();
                            line.graphics.moveTo(290,341+71*(i+1)).lineTo(435,341+71*(i+1));
                            vLine = 2;
                        }else if(isLineRight === i+1){
                            hLine3.shift();
                            line.graphics.moveTo(435,341+71*(i+1)).lineTo(580,341+71*(i+1));
                            vLine = 4;
                        }
                    }else{
                        line.graphics.moveTo(580,341+71*i).lineTo(580,341+71*(i+1));
                        var isLine = hLine3[0];
                        while(isLine < i+1){
                            hLine3.shift();
                            isLine = hLine3[0];
                        }
                        if(isLine === i+1){
                            hLine3.shift();
                            line.graphics.moveTo(435,341+71*(i+1)).lineTo(580,341+71*(i+1));
                            vLine = 3;
                        }
                    }
                }
                createjs.Tween.get(line)
                    .to({y:-374},3000)
                    .call(()=> {
                        console.log(vLine);
                        if(vLine === 1){
                            if(letterQuality){
                                let successBoy = new createjs.Bitmap(repo.getResult('successBoy'));
                                successBoy.set({scaleX: 1.44, scaleY: 1.44});
                                successBoy.regX = successBoy.image.width/2;
                                successBoy.x = playingBoy.x;
                                successBoy.y = playingBoy.y;
                                stage.removeChild(playingBoy);
                                stage.addChild(successBoy);
                                stage.removeChild(startGirl);
                                stage.addChild(successGirl);
                                stage.addChild(heart1);
                            }else{
                                let failBoy = new createjs.Bitmap(repo.getResult('failBoy'));
                                failBoy.set({scaleX: 1.44, scaleY: 1.44});
                                failBoy.regX = failBoy.image.width/2;
                                failBoy.x = playingBoy.x;
                                failBoy.y = playingBoy.y;
                                stage.removeChild(playingBoy);
                                stage.addChild(failBoy);
                                stage.removeChild(startGirl);
                                stage.addChild(nothingGirl);
                                stage.removeChild(heart);
                            }
                            heartbeat.pause();
                        }else {
                            let failBoy = new createjs.Bitmap(repo.getResult('failBoy'));
                            failBoy.set({scaleX: 1.44, scaleY: 1.44});
                            failBoy.regX = failBoy.image.width/2;
                            failBoy.x = playingBoy.x;
                            failBoy.y = playingBoy.y;
                            stage.removeChild(playingBoy);
                            stage.addChild(failBoy);
                            stage.removeChild(startGirl);
                            stage.addChild(nothingGirl);
                            heartbeat.pause();
                        }
                    });
            });

            letter3.on('click', e => {
                heartbeat.play();
                playingBoy.x = startBoy.x;
                playingBoy.y = startBoy.y;
                stage.removeChild(startBoy);
                stage.removeChild(letter1);
                stage.removeChild(letter2);
                stage.removeChild(letter3);
                stage.removeChild(letter4);
                stage.addChild(playingBoy);

                let vLine = 3;
                line.graphics.beginStroke("red");
                for(let i=0;i<10;i++){
                    if(vLine === 1){
                        line.graphics.moveTo(145,341+71*i).lineTo(145,341+71*(i+1));
                        var isLine = hLine1[0];
                        while(isLine < i+1){
                            hLine1.shift();
                            isLine = hLine1[0];
                        }
                        if(isLine === i+1){
                            hLine1.shift();
                            line.graphics.moveTo(145,341+71*(i+1)).lineTo(290,341+71*(i+1));
                            vLine = 2;
                        }
                    }else if(vLine === 2){
                        line.graphics.moveTo(290,341+71*i).lineTo(290,341+71*(i+1));
                        var isLineLeft = hLine1[0];
                        var isLineRight = hLine2[0];
                        while(isLineLeft < i+1){
                            hLine1.shift();
                            isLineLeft = hLine1[0];
                        }
                        while(isLineRight < i+1){
                            hLine2.shift();
                            isLineRight = hLine2[0];
                        }
                        if(isLineLeft === i+1){
                            hLine1.shift();
                            line.graphics.moveTo(145,341+71*(i+1)).lineTo(290,341+71*(i+1));
                            vLine = 1;
                        }else if(isLineRight === i+1){
                            hLine2.shift();
                            line.graphics.moveTo(290,341+71*(i+1)).lineTo(435,341+71*(i+1));
                            vLine = 3;
                        }
                    }else if(vLine === 3){
                        line.graphics.moveTo(435,341+71*i).lineTo(435,341+71*(i+1));
                        var isLineLeft = hLine2[0];
                        var isLineRight = hLine3[0];
                        while(isLineLeft < i+1){
                            hLine2.shift();
                            isLineLeft = hLine2[0];
                        }
                        while(isLineRight < i+1){
                            hLine3.shift();
                            isLineRight = hLine3[0];
                        }
                        if(isLineLeft === i+1){
                            hLine2.shift();
                            line.graphics.moveTo(290,341+71*(i+1)).lineTo(435,341+71*(i+1));
                            vLine = 2;
                        }else if(isLineRight === i+1){
                            hLine3.shift();
                            line.graphics.moveTo(435,341+71*(i+1)).lineTo(580,341+71*(i+1));
                            vLine = 4;
                        }
                    }else{
                        line.graphics.moveTo(580,341+71*i).lineTo(580,341+71*(i+1));
                        var isLine = hLine3[0];
                        while(isLine < i+1){
                            hLine3.shift();
                            isLine = hLine3[0];
                        }
                        if(isLine === i+1){
                            hLine3.shift();
                            line.graphics.moveTo(435,341+71*(i+1)).lineTo(580,341+71*(i+1));
                            vLine = 3;
                        }
                    }
                }
                createjs.Tween.get(line)
                    .to({y:-374},3000)
                    .call(()=> {
                        console.log(vLine);
                        if(vLine === 1){
                            if(letterQuality){
                                let successBoy = new createjs.Bitmap(repo.getResult('successBoy'));
                                successBoy.set({scaleX: 1.44, scaleY: 1.44});
                                successBoy.regX = successBoy.image.width/2;
                                successBoy.x = playingBoy.x;
                                successBoy.y = playingBoy.y;
                                stage.removeChild(playingBoy);
                                stage.addChild(successBoy);
                                stage.removeChild(startGirl);
                                stage.addChild(successGirl);
                                stage.addChild(heart1);
                            }else{
                                let failBoy = new createjs.Bitmap(repo.getResult('failBoy'));
                                failBoy.set({scaleX: 1.44, scaleY: 1.44});
                                failBoy.regX = failBoy.image.width/2;
                                failBoy.x = playingBoy.x;
                                failBoy.y = playingBoy.y;
                                stage.removeChild(playingBoy);
                                stage.addChild(failBoy);
                                stage.removeChild(startGirl);
                                stage.addChild(nothingGirl);
                                stage.removeChild(heart);
                            }
                            heartbeat.pause();
                        }else {
                            let failBoy = new createjs.Bitmap(repo.getResult('failBoy'));
                            failBoy.set({scaleX: 1.44, scaleY: 1.44});
                            failBoy.regX = failBoy.image.width/2;
                            failBoy.x = playingBoy.x;
                            failBoy.y = playingBoy.y;
                            stage.removeChild(playingBoy);
                            stage.addChild(failBoy);
                            stage.removeChild(startGirl);
                            stage.addChild(nothingGirl);
                            heartbeat.pause();
                        }
                    });
            });

            letter4.on('click', e => {
                heartbeat.play();
                playingBoy.x = startBoy.x;
                playingBoy.y = startBoy.y;
                stage.removeChild(startBoy);
                stage.removeChild(letter1);
                stage.removeChild(letter2);
                stage.removeChild(letter3);
                stage.removeChild(letter4);
                stage.addChild(playingBoy);

                let vLine = 4;
                line.graphics.beginStroke("red");
                for(let i=0;i<10;i++){
                    if(vLine === 1){
                        line.graphics.moveTo(145,341+71*i).lineTo(145,341+71*(i+1));
                        var isLine = hLine1[0];
                        while(isLine < i+1){
                            hLine1.shift();
                            isLine = hLine1[0];
                        }
                        if(isLine === i+1){
                            hLine1.shift();
                            line.graphics.moveTo(145,341+71*(i+1)).lineTo(290,341+71*(i+1));
                            vLine = 2;
                        }
                    }else if(vLine === 2){
                        line.graphics.moveTo(290,341+71*i).lineTo(290,341+71*(i+1));
                        var isLineLeft = hLine1[0];
                        var isLineRight = hLine2[0];
                        while(isLineLeft < i+1){
                            hLine1.shift();
                            isLineLeft = hLine1[0];
                        }
                        while(isLineRight < i+1){
                            hLine2.shift();
                            isLineRight = hLine2[0];
                        }
                        if(isLineLeft === i+1){
                            hLine1.shift();
                            line.graphics.moveTo(145,341+71*(i+1)).lineTo(290,341+71*(i+1));
                            vLine = 1;
                        }else if(isLineRight === i+1){
                            hLine2.shift();
                            line.graphics.moveTo(290,341+71*(i+1)).lineTo(435,341+71*(i+1));
                            vLine = 3;
                        }
                    }else if(vLine === 3){
                        line.graphics.moveTo(435,341+71*i).lineTo(435,341+71*(i+1));
                        var isLineLeft = hLine2[0];
                        var isLineRight = hLine3[0];
                        while(isLineLeft < i+1){
                            hLine2.shift();
                            isLineLeft = hLine2[0];
                        }
                        while(isLineRight < i+1){
                            hLine3.shift();
                            isLineRight = hLine3[0];
                        }
                        if(isLineLeft === i+1){
                            hLine2.shift();
                            line.graphics.moveTo(290,341+71*(i+1)).lineTo(435,341+71*(i+1));
                            vLine = 2;
                        }else if(isLineRight === i+1){
                            hLine3.shift();
                            line.graphics.moveTo(435,341+71*(i+1)).lineTo(580,341+71*(i+1));
                            vLine = 4;
                        }
                    }else{
                        line.graphics.moveTo(580,341+71*i).lineTo(580,341+71*(i+1));
                        var isLine = hLine3[0];
                        while(isLine < i+1){
                            hLine3.shift();
                            isLine = hLine3[0];
                        }
                        if(isLine === i+1){
                            hLine3.shift();
                            line.graphics.moveTo(435,341+71*(i+1)).lineTo(580,341+71*(i+1));
                            vLine = 3;
                        }
                    }
                }
                createjs.Tween.get(line)
                    .to({y:-374},3000)
                    .call(()=> {
                        console.log(vLine);
                        if(vLine === 1){
                            if(letterQuality){
                                let successBoy = new createjs.Bitmap(repo.getResult('successBoy'));
                                successBoy.set({scaleX: 1.44, scaleY: 1.44});
                                successBoy.regX = successBoy.image.width/2;
                                successBoy.x = playingBoy.x;
                                successBoy.y = playingBoy.y;
                                stage.removeChild(playingBoy);
                                stage.addChild(successBoy);
                                stage.removeChild(startGirl);
                                stage.addChild(successGirl);
                                stage.addChild(heart1);
                                heartbeat.pause();
                            }else{
                                let failBoy = new createjs.Bitmap(repo.getResult('failBoy'));
                                failBoy.set({scaleX: 1.44, scaleY: 1.44});
                                failBoy.regX = failBoy.image.width/2;
                                failBoy.x = playingBoy.x;
                                failBoy.y = playingBoy.y;
                                stage.removeChild(playingBoy);
                                stage.addChild(failBoy);
                                stage.removeChild(startGirl);
                                stage.addChild(nothingGirl);
                                stage.removeChild(heart);
                            }
                        }else {
                            let failBoy = new createjs.Bitmap(repo.getResult('failBoy'));
                            failBoy.set({scaleX: 1.44, scaleY: 1.44});
                            failBoy.regX = failBoy.image.width/2;
                            failBoy.x = playingBoy.x;
                            failBoy.y = playingBoy.y;
                            stage.removeChild(playingBoy);
                            stage.addChild(failBoy);
                            stage.removeChild(startGirl);
                            stage.addChild(nothingGirl);
                            heartbeat.pause();
                        }
                    });
            });

            let rect1 = new createjs.Shape();
            rect1.graphics.beginFill("white").drawRect(0, 0, 720, 341);
            stage.addChild(rect1);

            stage.addChild(letter1);
            stage.addChild(letter2);
            stage.addChild(letter3);
            stage.addChild(letter4);

            stage.addChild(stage1);
            stage.addChild(heartText);
            stage.addChild(heart);
            stage.addChild(startGirl);
            stage.addChild(startBoy);

            startBoy.on('tick', e => {
                startBoy.x = stage.mouseX;
            });
        }
	}
	
	setup();
	//draw();
	
});
//1.44
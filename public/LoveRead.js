$(document).ready(()=>{ // jQuery main

    const stage = new createjs.Stage(canvas);
    const repo = new createjs.LoadQueue();
    let level = 0;
    let scene = 0;
    let stage3flag = 0;
    function setup() {
        // automatically update
        createjs.Ticker.on("tick", e => stage.update());
        createjs.Ticker.framerate = 60;

        repo.loadManifest([
            // Stage 0
            {id:'boy',src:'Stage0/images/boy.png'},
            {id:'girl',src:'Stage0/images/girl.png'},
            {id:'introText',src:'Stage0/images/intro.png'},
            {id:'intro',src:'Stage0/images/intro_button.png'},
            {id:'start',src:'Stage0/images/start_button.png'},
            {id:'enter',src:'Stage0/images/enter_name.png'},
            {id:'title',src:'Stage0/images/title.png'},
            // Stage 1
            {id:'startBoy',src:'Stage1/images/bfLetter1.png'},
            {id:'playingBoy',src:'Stage1/images/bfLetter4.png'},
            {id:'successBoy',src:'Stage1/images/bfLetter2.png'},
            {id:'failBoy',src:'Stage1/images/bfLetter3.png'},
            {id:'startGirl',src:'Stage1/images/gfLetter1.png'},
            {id:'successGirl',src:'Stage1/images/gfLetter2.png'},
            {id:'nothingGirl',src:'Stage1/images/gfLetter3.png'},
            {id:'letter',src:'Stage1/images/letter.png'},
            {id:'stage1',src:'Stage1/images/stage1.png'},
            {id:'stage1Text',src:'Stage1/images/stage1_text_.png'},
            {id:'goodLetter',src:'Stage1/images/good.png'},
            {id:'badLetter',src:'Stage1/images/bad.png'},

            {id:'heartText',src:'Stage1/images/heart_text.png'},
            //{id:'heart',src:'Stage1/images/heart1.png'},

            {id:'background',src:"Stage1/sound/background_music.mp3"},
            {id:'heartbeat',src:"Stage1/sound/heartbeats.mp3"},

            // Stage 2
            {id:'s2', src:'Stage2/images/stage2.png'},
            //{id:'s2_text', src:'Stage2/images/stage2_text.png'},
            {id:'heart_text', src:'Stage2/images/heart_text.png'},
            {id:'life', src:'Stage2/images/heart.png'},
            {id:'burp', src:'Stage2/images/burp.PNG'},
            {id:'rude', src:'Stage2/images/rude.PNG'},
            {id:'girle1', src:'Stage2/images/gfEating1.PNG'},
            {id:'girle2', src:'Stage2/images/gfEating2.PNG'},
            {id:'girlm1', src:'Stage2/images/gfMad1.PNG'},
            {id:'girlm2', src:'Stage2/images/gfMad2.PNG'},
            {id:'boye1', src:'Stage2/images/bfBurp1.PNG'},
            {id:'boye2', src:'Stage2/images/bfBurp3.PNG'},
            {id:'boye3', src:'Stage2/images/bfBurp5.PNG'},
            {id:'boye4', src:'Stage2/images/bfBurp7.PNG'},
            {id:'boye5', src:'Stage2/images/bfBurp9.PNG'},
            {id:'boyb1', src:'Stage2/images/bfBurp2.PNG'},
            {id:'boyb2', src:'Stage2/images/bfBurp4.PNG'},
            {id:'boyb3', src:'Stage2/images/bfBurp6.PNG'},
            {id:'boyb4', src:'Stage2/images/bfBurp8.PNG'},
            //{id:'CHfont', src:'Stage2/images/CSong3HK.otf'},
            {id:'burp_sound', src:'Stage2/sound/burp1.mp3'},

            // Stage 3
            {id:'stage3',src:'Stage3/images/stage3.png'},
            {id:'stage3_text',src:'Stage3/images/stage3_text.png'},
            {id:'blood',src:"Stage3/images/blood.png"},
            {id:'car1',src:"Stage3/images/car1.PNG"},
            {id:'car2',src:"Stage3/images/car2.PNG"},
            {id:'car3',src:"Stage3/images/car3.PNG"},
            {id:'car4',src:"Stage3/images/car4.PNG"},
            {id:'car5',src:"Stage3/images/car5.PNG"},
            {id:'car6',src:"Stage3/images/car6.PNG"},
            {id:'car7',src:"Stage3/images/car1.PNG"},
            {id:'waiting1',src:"Stage3/images/waiting1.PNG"},
            {id:'waiting2',src:"Stage3/images/waiting2.PNG"},
            {id:'walking1',src:"Stage3/images/walking1.PNG"},
            {id:'walking2',src:"Stage3/images/walking2.PNG"},
            {id:'win1',src:"Stage3/images/win1.PNG"},
            {id:'win2',src:"Stage3/images/win2.PNG"},
            {id:'carRoad',src:"Stage3/sound/car_road3.mp3"},
            {id:'clapping',src:"Stage3/sound/clapping_short.mp3"},
            {id:'crow',src:"Stage3/sound/crow1.mp3"},

            // Stage 4
            {id:'stage4',src:'Stage4/images/stage4.png'},
            {id:'stage4_button1',src:'Stage4/images/stage4_button1.png'},
            {id:'stage4_button2',src:'Stage4/images/stage4_button2.png'},
            {id:'stage4_button3',src:'Stage4/images/stage4_button3.png'},
            {id:'stage4_text',src:'Stage4/images/stage4_text.png'}

        ]);
        repo.on('complete', draw);
    }

    function draw(){

        if (window.otherName == null) window.otherName = 'G';

        let life = [];
        for (let i = 0; i < 6; i++) {
            life[i] = new createjs.Bitmap(repo.getResult('life'));
            life[i].set({x: canvas.width - life[i].image.width * 1.1 * (6 - i), y: 5});
        }

        let heart_text = new createjs.Bitmap(repo.getResult('heart_text'));
        heart_text.set({
            x: canvas.width - heart_text.image.width * 1.35 - 55 * 6, y: -13,
            scaleX: 1.35, scaleY: 1.35
        });

        let score = 2;
        let scoreChange = false;

        if(level === 0) {
            if (scene === 0) {
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
                    scene += 2;
                    draw();
                });


            } else if (scene === 1) {
                //intro
                let introText = new createjs.Bitmap(repo.getResult('introText'));
                introText.set({scaleX: 1.3, scaleY: 1.3});
                introText.set({x: 100, y: 100});
                stage.addChild(introText);

                let start = new createjs.Bitmap(repo.getResult('start'));
                start.set({x: 520, y: 450});
                stage.addChild(start);

                start.on('click', e => {
                    stage.removeChild(introText);
                    stage.removeChild(start);
                    scene++;
                    draw();
                });

            } else if (scene === 2) {
                // enter name

                let boy = new createjs.Bitmap(repo.getResult('boy'));
                boy.set({x: 100, y: 60});
                stage.addChild(boy);

                let girl = new createjs.Bitmap(repo.getResult('girl'));
                girl.set({x: 100, y: 265});
                stage.addChild(girl);

                let enter = new createjs.Bitmap(repo.getResult('enter'));
                // enter.set({scaleX: 1.44, scaleY: 1.44});
                enter.set({x: 250, y: 100});
                stage.addChild(enter);

                let start = new createjs.Bitmap(repo.getResult('start'));
                // start.set({scaleX: 1.44, scaleY: 1.44});
                start.set({x: 520, y: 450});
                stage.addChild(start);

                var plName_ = $('<input type="text" value="George" id="plInput">').appendTo(document.body)[0];
                var plName = new createjs.DOMElement(plName_);
                plName.set({x:-390,y:160});
                stage.addChild(plName);

                var otName_ = $('<input type="text" value="Mary" id="otInput">').appendTo(document.body)[0];
                var otName = new createjs.DOMElement(otName_);
                otName.set({x:-390,y:355});
                stage.addChild(otName);

                start.on('click', e => {
                    let player = document.getElementById('plInput');
                    window.playerName = player.value;
                    let other = document.getElementById('otInput');
                    window.otherName = other.value;
                    alert('你的姓名是: '+playerName+'\n對方的姓名是: '+otherName);
                    plName_.remove();
                    otName_.remove();
                    win();

                });
            }

        }else if(level === 1) {
            let lineY = 0;
            let rand;

            let winTime = 3500;
            let background = repo.getResult('background');
            let heartbeat = repo.getResult('heartbeat');
            background.play();

            if (scene === 0) {
                // alert(otherName);
                let textSize = 27;
                let offsetX = 48;
                let offsetY = 0;
                for (var i = 0;i < 7;i++) {
                    if (otherName.length - i > 5) {
                        offsetX -= 5.6;
                        textSize -= 1.3;
                        offsetY += 0.8;
                    }
                }
                let otherNameText = new createjs.Text(otherName, textSize+"px CSong3HK", "black");
                otherNameText.set({x: 371+offsetX, y: 211+offsetY});
                stage.addChild(otherNameText);

                let otherNameText2 = new createjs.Text(otherName, textSize+"px CSong3HK", "black");
                otherNameText2.set({x: 453+offsetX, y: 356+offsetY});
                stage.addChild(otherNameText2);

                let stage1Text = new createjs.Bitmap(repo.getResult('stage1Text'));
                stage1Text.set({scaleX: 1.44, scaleY: 1.44});
                stage1Text.set({x: 240, y: 200});
                stage.addChild(stage1Text);
                setTimeout(function () {
                    stage.removeChild(stage1Text);
                    stage.removeChild(otherNameText);
                    stage.removeChild(otherNameText2);
                    scene++;
                    draw();
                }, 3500);
            } else if (scene === 1) {
                let text = new createjs.Text("請選擇一封", "40px CSong3HK", "black");
                text.set({x: 300, y: 200});
                stage.addChild(text);

                let letter = new createjs.Bitmap(repo.getResult('letter'));
                letter.set({scaleX: 2.2, scaleY: 2.2});
                letter.set({x: 200, y: 300});
                stage.addChild(letter);

                let letter1 = new createjs.Bitmap(repo.getResult('letter'));
                letter1.set({scaleX: 2.2, scaleY: 2.2});
                letter1.set({x: 520, y: 300});
                stage.addChild(letter1);

                letter.on('click', e => {

                    rand = Math.floor(Math.random() * 2);
                    if (rand) {
                        //good
                        window.letterQuality = true;
                        // alert(letterQuality);
                        console.log(window.letterQuality);
                    } else {
                        //bad
                        window.letterQuality = false;
                        // alert(letterQuality);
                        console.log(window.letterQuality);
                    }
                    stage.removeChild(text);
                    stage.removeChild(letter);
                    stage.removeChild(letter1);
                    scene++;
                    draw();
                });

                letter1.on('click', e => {
                    rand = Math.floor(Math.random() * 2);
                    if (rand) {
                        //good
                        window.letterQuality = true;
                        console.log(window.letterQuality);
                    } else {
                        //bad
                        window.letterQuality = false;
                        console.log(window.letterQuality);
                    }
                    stage.removeChild(text);
                    stage.removeChild(letter);
                    stage.removeChild(letter1);
                    scene++;
                    draw();
                });
            } else if (scene === 2) {
                //let text;
                console.log(window.letterQuality);
                if (window.letterQuality) {
                    let goodLetter = new createjs.Bitmap(repo.getResult('goodLetter'));
                    //letter1.set({scaleX: 1.44, scaleY: 1.44});
                    //goodLetter.set({x: 122.4, y: 316.8});
                    stage.addChild(goodLetter);
                } else {
                    let badLetter = new createjs.Bitmap(repo.getResult('badLetter'));
                    //letter1.set({scaleX: 1.44, scaleY: 1.44});
                    //badLetter.set({x: 122.4, y: 316.8});
                    stage.addChild(badLetter);
                }
                setTimeout(function () {
                    stage.removeAllChildren();
                    scene++;
                    draw();
                }, 2000);
            } else if (scene === 3) {
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
                playingBoy.regX = playingBoy.image.width / 2;

                let startBoy = new createjs.Bitmap(repo.getResult('startBoy'));
                startBoy.set({scaleX: 1.44, scaleY: 1.44});
                startBoy.y = 172.8;
                startBoy.regX = startBoy.image.width / 2;

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
                line.graphics.moveTo(145, 341 - lineY).lineTo(145, 1051 - lineY);
                line.graphics.moveTo(290, 341 - lineY).lineTo(290, 1051 - lineY);
                line.graphics.moveTo(435, 341 - lineY).lineTo(435, 1051 - lineY);
                line.graphics.moveTo(580, 341 - lineY).lineTo(580, 1051 - lineY);
                //---71*9
                //1
                rand = Math.floor(Math.random() * 2);
                if (rand) {
                    line.graphics.moveTo(145, 412 - lineY).lineTo(290, 412 - lineY);
                    hLine1.push(1);
                    rand = Math.floor(Math.random() * 2);
                    if (rand) {
                        line.graphics.moveTo(435, 412 - lineY).lineTo(580, 412 - lineY);
                        hLine3.push(1);
                    }
                } else {
                    rand = Math.floor(Math.random() * 2);
                    if (rand) {
                        line.graphics.moveTo(290, 412 - lineY).lineTo(435, 412 - lineY);
                        hLine2.push(1);
                    }
                    else {
                        rand = Math.floor(Math.random() * 2);
                        if (rand) {
                            line.graphics.moveTo(435, 412 - lineY).lineTo(580, 412 - lineY);
                            hLine3.push(1);
                        }
                    }
                }
                //2
                rand = Math.floor(Math.random() * 2);
                if (rand) {
                    line.graphics.moveTo(145, 483 - lineY).lineTo(290, 483 - lineY);
                    hLine1.push(2);
                    rand = Math.floor(Math.random() * 2);
                    if (rand) {
                        line.graphics.moveTo(435, 483 - lineY).lineTo(580, 483 - lineY);
                        hLine3.push(2);
                    }
                } else {
                    rand = Math.floor(Math.random() * 2);
                    if (rand) {
                        line.graphics.moveTo(290, 483 - lineY).lineTo(435, 483 - lineY);
                        hLine2.push(2);
                    }
                    else {
                        rand = Math.floor(Math.random() * 2);
                        if (rand) {
                            line.graphics.moveTo(435, 483 - lineY).lineTo(580, 483 - lineY);
                            hLine3.push(2);
                        }
                    }
                }
                //3
                rand = Math.floor(Math.random() * 2);
                if (rand) {
                    line.graphics.moveTo(145, 554 - lineY).lineTo(290, 554 - lineY);
                    hLine1.push(3);
                    rand = Math.floor(Math.random() * 2);
                    if (rand) {
                        line.graphics.moveTo(435, 554 - lineY).lineTo(580, 554 - lineY);
                        hLine3.push(3);
                    }
                } else {
                    rand = Math.floor(Math.random() * 2);
                    if (rand) {
                        line.graphics.moveTo(290, 554 - lineY).lineTo(435, 554 - lineY);
                        hLine2.push(3);
                    }
                    else {
                        rand = Math.floor(Math.random() * 2);
                        if (rand) {
                            line.graphics.moveTo(435, 554 - lineY).lineTo(580, 554 - lineY);
                            hLine3.push(3);
                        }
                    }
                }
                //4
                rand = Math.floor(Math.random() * 2);
                if (rand) {
                    line.graphics.moveTo(145, 625 - lineY).lineTo(290, 625 - lineY);
                    hLine1.push(4);
                    rand = Math.floor(Math.random() * 2);
                    if (rand) {
                        line.graphics.moveTo(435, 625 - lineY).lineTo(580, 625 - lineY);
                        hLine3.push(4);
                    }
                } else {
                    rand = Math.floor(Math.random() * 2);
                    if (rand) {
                        line.graphics.moveTo(290, 625 - lineY).lineTo(435, 625 - lineY);
                        hLine2.push(4);
                    }
                    else {
                        rand = Math.floor(Math.random() * 2);
                        if (rand) {
                            line.graphics.moveTo(435, 625 - lineY).lineTo(580, 625 - lineY);
                            hLine3.push(4);
                        }
                    }
                }
                //5
                rand = Math.floor(Math.random() * 2);
                if (rand) {
                    line.graphics.moveTo(145, 696 - lineY).lineTo(290, 696 - lineY);
                    hLine1.push(5);
                    rand = Math.floor(Math.random() * 2);
                    if (rand) {
                        line.graphics.moveTo(435, 696 - lineY).lineTo(580, 696 - lineY);
                        hLine3.push(5);
                    }
                } else {
                    rand = Math.floor(Math.random() * 2);
                    if (rand) {
                        line.graphics.moveTo(290, 696 - lineY).lineTo(435, 696 - lineY);
                        hLine2.push(5);
                    }
                    else {
                        rand = Math.floor(Math.random() * 2);
                        if (rand) {
                            line.graphics.moveTo(435, 696 - lineY).lineTo(580, 696 - lineY);
                            hLine3.push(5);
                        }
                    }
                }
                //6
                rand = Math.floor(Math.random() * 2);
                if (rand) {
                    line.graphics.moveTo(145, 767 - lineY).lineTo(290, 767 - lineY);
                    hLine1.push(6);
                    rand = Math.floor(Math.random() * 2);
                    if (rand) {
                        line.graphics.moveTo(435, 767 - lineY).lineTo(580, 767 - lineY);
                        hLine3.push(6);
                    }
                } else {
                    rand = Math.floor(Math.random() * 2);
                    if (rand) {
                        line.graphics.moveTo(290, 767 - lineY).lineTo(435, 767 - lineY);
                        hLine2.push(6);
                    }
                    else {
                        rand = Math.floor(Math.random() * 2);
                        if (rand) {
                            line.graphics.moveTo(435, 767 - lineY).lineTo(580, 767 - lineY);
                            hLine3.push(6);
                        }
                    }
                }
                //7
                rand = Math.floor(Math.random() * 2);
                if (rand) {
                    line.graphics.moveTo(145, 838 - lineY).lineTo(290, 838 - lineY);
                    hLine1.push(7);
                    rand = Math.floor(Math.random() * 2);
                    if (rand) {
                        line.graphics.moveTo(435, 838 - lineY).lineTo(580, 838 - lineY);
                        hLine3.push(7);
                    }
                } else {
                    rand = Math.floor(Math.random() * 2);
                    if (rand) {
                        line.graphics.moveTo(290, 838 - lineY).lineTo(435, 838 - lineY);
                        hLine2.push(7);
                    }
                    else {
                        rand = Math.floor(Math.random() * 2);
                        if (rand) {
                            line.graphics.moveTo(435, 838 - lineY).lineTo(580, 838 - lineY);
                            hLine3.push(7);
                        }
                    }
                }
                //8
                rand = Math.floor(Math.random() * 2);
                if (rand) {
                    line.graphics.moveTo(145, 909 - lineY).lineTo(290, 909 - lineY);
                    hLine1.push(8);
                    rand = Math.floor(Math.random() * 2);
                    if (rand) {
                        line.graphics.moveTo(435, 909 - lineY).lineTo(580, 909 - lineY);
                        hLine3.push(8);
                    }
                } else {
                    rand = Math.floor(Math.random() * 2);
                    if (rand) {
                        line.graphics.moveTo(290, 909 - lineY).lineTo(435, 909 - lineY);
                        hLine2.push(8);
                    }
                    else {
                        rand = Math.floor(Math.random() * 2);
                        if (rand) {
                            line.graphics.moveTo(435, 909 - lineY).lineTo(580, 909 - lineY);
                            hLine3.push(8);
                        }
                    }
                }
                //9
                rand = Math.floor(Math.random() * 2);
                if (rand) {
                    line.graphics.moveTo(145, 980 - lineY).lineTo(290, 980 - lineY);
                    hLine1.push(9);
                    rand = Math.floor(Math.random() * 2);
                    if (rand) {
                        line.graphics.moveTo(435, 980 - lineY).lineTo(580, 980 - lineY);
                        hLine3.push(9);
                    }
                } else {
                    rand = Math.floor(Math.random() * 2);
                    if (rand) {
                        line.graphics.moveTo(290, 980 - lineY).lineTo(435, 980 - lineY);
                        hLine2.push(9);
                    }
                    else {
                        rand = Math.floor(Math.random() * 2);
                        if (rand) {
                            line.graphics.moveTo(435, 980 - lineY).lineTo(580, 980 - lineY);
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
                    for (let i = 0; i < 10; i++) {
                        if (vLine === 1) {
                            line.graphics.moveTo(145, 341 + 71 * i - lineY).lineTo(145, 341 + 71 * (i + 1) - lineY);
                            var isLine = hLine1[0];
                            while (isLine < i + 1) {
                                hLine1.shift();
                                isLine = hLine1[0];
                            }
                            if (isLine === i + 1) {
                                hLine1.shift();
                                line.graphics.moveTo(145, 341 + 71 * (i + 1) - lineY).lineTo(290, 341 + 71 * (i + 1) - lineY);
                                vLine = 2;
                            }
                        } else if (vLine === 2) {
                            line.graphics.moveTo(290, 341 + 71 * i - lineY).lineTo(290, 341 + 71 * (i + 1) - lineY);
                            var isLineLeft = hLine1[0];
                            var isLineRight = hLine2[0];
                            while (isLineLeft < i + 1) {
                                hLine1.shift();
                                isLineLeft = hLine1[0];
                            }
                            while (isLineRight < i + 1) {
                                hLine2.shift();
                                isLineRight = hLine2[0];
                            }
                            if (isLineLeft === i + 1) {
                                hLine1.shift();
                                line.graphics.moveTo(145, 341 + 71 * (i + 1) - lineY).lineTo(290, 341 + 71 * (i + 1) - lineY);
                                vLine = 1;
                            } else if (isLineRight === i + 1) {
                                hLine2.shift();
                                line.graphics.moveTo(290, 341 + 71 * (i + 1)).lineTo(435, 341 + 71 * (i + 1));
                                vLine = 3;
                            }
                        } else if (vLine === 3) {
                            line.graphics.moveTo(435, 341 + 71 * i - lineY).lineTo(435, 341 + 71 * (i + 1) - lineY);
                            var isLineLeft = hLine2[0];
                            var isLineRight = hLine3[0];
                            while (isLineLeft < i + 1) {
                                hLine2.shift();
                                isLineLeft = hLine2[0];
                            }
                            while (isLineRight < i + 1) {
                                hLine3.shift();
                                isLineRight = hLine3[0];
                            }
                            if (isLineLeft === i + 1) {
                                hLine2.shift();
                                line.graphics.moveTo(290, 341 + 71 * (i + 1) - lineY).lineTo(435, 341 + 71 * (i + 1) - lineY);
                                vLine = 2;
                            } else if (isLineRight === i + 1) {
                                hLine3.shift();
                                line.graphics.moveTo(435, 341 + 71 * (i + 1) - lineY).lineTo(580, 341 + 71 * (i + 1) - lineY);
                                vLine = 4;
                            }
                        } else {
                            line.graphics.moveTo(580, 341 + 71 * i - lineY).lineTo(580, 341 + 71 * (i + 1) - lineY);
                            var isLine = hLine3[0];
                            while (isLine < i + 1) {
                                hLine3.shift();
                                isLine = hLine3[0];
                            }
                            if (isLine === i + 1) {
                                hLine3.shift();
                                line.graphics.moveTo(435, 341 + 71 * (i + 1) - lineY).lineTo(580, 341 + 71 * (i + 1) - lineY);
                                vLine = 3;
                            }
                        }
                    }
                    createjs.Tween.get(line)
                        .to({y: -374}, 3000)
                        .call(() => {
                            console.log(vLine);
                            if (vLine === 1) {
                                if (window.letterQuality) {
                                    let successBoy = new createjs.Bitmap(repo.getResult('successBoy'));
                                    successBoy.set({scaleX: 1.44, scaleY: 1.44});
                                    successBoy.regX = successBoy.image.width / 2;
                                    successBoy.x = playingBoy.x;
                                    successBoy.y = playingBoy.y;
                                    stage.removeChild(playingBoy);
                                    stage.addChild(successBoy);
                                    stage.removeChild(startGirl);
                                    stage.addChild(successGirl);
                                    //stage.addChild(heart1);
                                    pressToNext(score,true,scoreChange);
                                } else {
                                    let failBoy = new createjs.Bitmap(repo.getResult('failBoy'));
                                    failBoy.set({scaleX: 1.44, scaleY: 1.44});
                                    failBoy.regX = failBoy.image.width / 2;
                                    failBoy.x = playingBoy.x;
                                    failBoy.y = playingBoy.y;
                                    stage.removeChild(playingBoy);
                                    stage.addChild(failBoy);
                                    stage.removeChild(startGirl);
                                    stage.addChild(nothingGirl);
                                    stage.removeChild(heart);
                                    pressToNext(score,false,scoreChange);
                                }
                                heartbeat.pause();
                                setTimeout(function(){
                                    background.pause();
                                    win();
                                }, winTime);
                            } else {
                                let failBoy = new createjs.Bitmap(repo.getResult('failBoy'));
                                failBoy.set({scaleX: 1.44, scaleY: 1.44});
                                failBoy.regX = failBoy.image.width / 2;
                                failBoy.x = playingBoy.x;
                                failBoy.y = playingBoy.y;
                                stage.removeChild(playingBoy);
                                stage.addChild(failBoy);
                                stage.removeChild(startGirl);
                                stage.addChild(nothingGirl);
                                heartbeat.pause();
                                setTimeout(function(){
                                    background.pause();
                                    win();
                                }, winTime);
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
                    for (let i = 0; i < 10; i++) {
                        if (vLine === 1) {
                            line.graphics.moveTo(145, 341 + 71 * i).lineTo(145, 341 + 71 * (i + 1));
                            var isLine = hLine1[0];
                            while (isLine < i + 1) {
                                hLine1.shift();
                                isLine = hLine1[0];
                            }
                            if (isLine === i + 1) {
                                hLine1.shift();
                                line.graphics.moveTo(145, 341 + 71 * (i + 1)).lineTo(290, 341 + 71 * (i + 1));
                                vLine = 2;
                            }
                        } else if (vLine === 2) {
                            line.graphics.moveTo(290, 341 + 71 * i).lineTo(290, 341 + 71 * (i + 1));
                            var isLineLeft = hLine1[0];
                            var isLineRight = hLine2[0];
                            while (isLineLeft < i + 1) {
                                hLine1.shift();
                                isLineLeft = hLine1[0];
                            }
                            while (isLineRight < i + 1) {
                                hLine2.shift();
                                isLineRight = hLine2[0];
                            }
                            if (isLineLeft === i + 1) {
                                hLine1.shift();
                                line.graphics.moveTo(145, 341 + 71 * (i + 1)).lineTo(290, 341 + 71 * (i + 1));
                                vLine = 1;
                            } else if (isLineRight === i + 1) {
                                hLine2.shift();
                                line.graphics.moveTo(290, 341 + 71 * (i + 1)).lineTo(435, 341 + 71 * (i + 1));
                                vLine = 3;
                            }
                        } else if (vLine === 3) {
                            line.graphics.moveTo(435, 341 + 71 * i).lineTo(435, 341 + 71 * (i + 1));
                            var isLineLeft = hLine2[0];
                            var isLineRight = hLine3[0];
                            while (isLineLeft < i + 1) {
                                hLine2.shift();
                                isLineLeft = hLine2[0];
                            }
                            while (isLineRight < i + 1) {
                                hLine3.shift();
                                isLineRight = hLine3[0];
                            }
                            if (isLineLeft === i + 1) {
                                hLine2.shift();
                                line.graphics.moveTo(290, 341 + 71 * (i + 1)).lineTo(435, 341 + 71 * (i + 1));
                                vLine = 2;
                            } else if (isLineRight === i + 1) {
                                hLine3.shift();
                                line.graphics.moveTo(435, 341 + 71 * (i + 1)).lineTo(580, 341 + 71 * (i + 1));
                                vLine = 4;
                            }
                        } else {
                            line.graphics.moveTo(580, 341 + 71 * i).lineTo(580, 341 + 71 * (i + 1));
                            var isLine = hLine3[0];
                            while (isLine < i + 1) {
                                hLine3.shift();
                                isLine = hLine3[0];
                            }
                            if (isLine === i + 1) {
                                hLine3.shift();
                                line.graphics.moveTo(435, 341 + 71 * (i + 1)).lineTo(580, 341 + 71 * (i + 1));
                                vLine = 3;
                            }
                        }
                    }
                    createjs.Tween.get(line)
                        .to({y: -374}, 3000)
                        .call(() => {
                            console.log(vLine);
                            if (vLine === 1) {
                                console.log(window.letterQuality);
                                if (window.letterQuality) {
                                    let successBoy = new createjs.Bitmap(repo.getResult('successBoy'));
                                    successBoy.set({scaleX: 1.44, scaleY: 1.44});
                                    successBoy.regX = successBoy.image.width / 2;
                                    successBoy.x = playingBoy.x;
                                    successBoy.y = playingBoy.y;
                                    stage.removeChild(playingBoy);
                                    stage.addChild(successBoy);
                                    stage.removeChild(startGirl);
                                    stage.addChild(successGirl);
                                    stage.addChild(heart1);
                                    pressToNext(score,true,scoreChange);
                                } else {
                                    let failBoy = new createjs.Bitmap(repo.getResult('failBoy'));
                                    failBoy.set({scaleX: 1.44, scaleY: 1.44});
                                    failBoy.regX = failBoy.image.width / 2;
                                    failBoy.x = playingBoy.x;
                                    failBoy.y = playingBoy.y;
                                    stage.removeChild(playingBoy);
                                    stage.addChild(failBoy);
                                    stage.removeChild(startGirl);
                                    stage.addChild(nothingGirl);
                                    stage.removeChild(heart);
                                    pressToNext(score,false,scoreChange);
                                }
                                heartbeat.pause();
                                setTimeout(function(){
                                    background.pause();
                                    win();
                                }, winTime);
                            } else {
                                let failBoy = new createjs.Bitmap(repo.getResult('failBoy'));
                                failBoy.set({scaleX: 1.44, scaleY: 1.44});
                                failBoy.regX = failBoy.image.width / 2;
                                failBoy.x = playingBoy.x;
                                failBoy.y = playingBoy.y;
                                stage.removeChild(playingBoy);
                                stage.addChild(failBoy);
                                stage.removeChild(startGirl);
                                stage.addChild(nothingGirl);
                                heartbeat.pause();
                                setTimeout(function(){
                                    background.pause();
                                    win();
                                }, winTime);
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
                    for (let i = 0; i < 10; i++) {
                        if (vLine === 1) {
                            line.graphics.moveTo(145, 341 + 71 * i).lineTo(145, 341 + 71 * (i + 1));
                            var isLine = hLine1[0];
                            while (isLine < i + 1) {
                                hLine1.shift();
                                isLine = hLine1[0];
                            }
                            if (isLine === i + 1) {
                                hLine1.shift();
                                line.graphics.moveTo(145, 341 + 71 * (i + 1)).lineTo(290, 341 + 71 * (i + 1));
                                vLine = 2;
                            }
                        } else if (vLine === 2) {
                            line.graphics.moveTo(290, 341 + 71 * i).lineTo(290, 341 + 71 * (i + 1));
                            var isLineLeft = hLine1[0];
                            var isLineRight = hLine2[0];
                            while (isLineLeft < i + 1) {
                                hLine1.shift();
                                isLineLeft = hLine1[0];
                            }
                            while (isLineRight < i + 1) {
                                hLine2.shift();
                                isLineRight = hLine2[0];
                            }
                            if (isLineLeft === i + 1) {
                                hLine1.shift();
                                line.graphics.moveTo(145, 341 + 71 * (i + 1)).lineTo(290, 341 + 71 * (i + 1));
                                vLine = 1;
                            } else if (isLineRight === i + 1) {
                                hLine2.shift();
                                line.graphics.moveTo(290, 341 + 71 * (i + 1)).lineTo(435, 341 + 71 * (i + 1));
                                vLine = 3;
                            }
                        } else if (vLine === 3) {
                            line.graphics.moveTo(435, 341 + 71 * i).lineTo(435, 341 + 71 * (i + 1));
                            var isLineLeft = hLine2[0];
                            var isLineRight = hLine3[0];
                            while (isLineLeft < i + 1) {
                                hLine2.shift();
                                isLineLeft = hLine2[0];
                            }
                            while (isLineRight < i + 1) {
                                hLine3.shift();
                                isLineRight = hLine3[0];
                            }
                            if (isLineLeft === i + 1) {
                                hLine2.shift();
                                line.graphics.moveTo(290, 341 + 71 * (i + 1)).lineTo(435, 341 + 71 * (i + 1));
                                vLine = 2;
                            } else if (isLineRight === i + 1) {
                                hLine3.shift();
                                line.graphics.moveTo(435, 341 + 71 * (i + 1)).lineTo(580, 341 + 71 * (i + 1));
                                vLine = 4;
                            }
                        } else {
                            line.graphics.moveTo(580, 341 + 71 * i).lineTo(580, 341 + 71 * (i + 1));
                            var isLine = hLine3[0];
                            while (isLine < i + 1) {
                                hLine3.shift();
                                isLine = hLine3[0];
                            }
                            if (isLine === i + 1) {
                                hLine3.shift();
                                line.graphics.moveTo(435, 341 + 71 * (i + 1)).lineTo(580, 341 + 71 * (i + 1));
                                vLine = 3;
                            }
                        }
                    }
                    createjs.Tween.get(line)
                        .to({y: -374}, 3000)
                        .call(() => {
                            console.log(vLine);
                            if (vLine === 1) {
                                if (window.letterQuality) {
                                    let successBoy = new createjs.Bitmap(repo.getResult('successBoy'));
                                    successBoy.set({scaleX: 1.44, scaleY: 1.44});
                                    successBoy.regX = successBoy.image.width / 2;
                                    successBoy.x = playingBoy.x;
                                    successBoy.y = playingBoy.y;
                                    stage.removeChild(playingBoy);
                                    stage.addChild(successBoy);
                                    stage.removeChild(startGirl);
                                    stage.addChild(successGirl);
                                    stage.addChild(heart1);
                                    pressToNext(score,true,scoreChange);
                                } else {
                                    let failBoy = new createjs.Bitmap(repo.getResult('failBoy'));
                                    failBoy.set({scaleX: 1.44, scaleY: 1.44});
                                    failBoy.regX = failBoy.image.width / 2;
                                    failBoy.x = playingBoy.x;
                                    failBoy.y = playingBoy.y;
                                    stage.removeChild(playingBoy);
                                    stage.addChild(failBoy);
                                    stage.removeChild(startGirl);
                                    stage.addChild(nothingGirl);
                                    stage.removeChild(heart);
                                    pressToNext(score,false,scoreChange);
                                }
                                heartbeat.pause();
                                setTimeout(function(){
                                    background.pause();
                                    win();
                                }, winTime);
                            } else {
                                let failBoy = new createjs.Bitmap(repo.getResult('failBoy'));
                                failBoy.set({scaleX: 1.44, scaleY: 1.44});
                                failBoy.regX = failBoy.image.width / 2;
                                failBoy.x = playingBoy.x;
                                failBoy.y = playingBoy.y;
                                stage.removeChild(playingBoy);
                                stage.addChild(failBoy);
                                stage.removeChild(startGirl);
                                stage.addChild(nothingGirl);
                                heartbeat.pause();
                                setTimeout(function(){
                                    background.pause();
                                    win();
                                }, winTime);
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
                    for (let i = 0; i < 10; i++) {
                        if (vLine === 1) {
                            line.graphics.moveTo(145, 341 + 71 * i).lineTo(145, 341 + 71 * (i + 1));
                            var isLine = hLine1[0];
                            while (isLine < i + 1) {
                                hLine1.shift();
                                isLine = hLine1[0];
                            }
                            if (isLine === i + 1) {
                                hLine1.shift();
                                line.graphics.moveTo(145, 341 + 71 * (i + 1)).lineTo(290, 341 + 71 * (i + 1));
                                vLine = 2;
                            }
                        } else if (vLine === 2) {
                            line.graphics.moveTo(290, 341 + 71 * i).lineTo(290, 341 + 71 * (i + 1));
                            var isLineLeft = hLine1[0];
                            var isLineRight = hLine2[0];
                            while (isLineLeft < i + 1) {
                                hLine1.shift();
                                isLineLeft = hLine1[0];
                            }
                            while (isLineRight < i + 1) {
                                hLine2.shift();
                                isLineRight = hLine2[0];
                            }
                            if (isLineLeft === i + 1) {
                                hLine1.shift();
                                line.graphics.moveTo(145, 341 + 71 * (i + 1)).lineTo(290, 341 + 71 * (i + 1));
                                vLine = 1;
                            } else if (isLineRight === i + 1) {
                                hLine2.shift();
                                line.graphics.moveTo(290, 341 + 71 * (i + 1)).lineTo(435, 341 + 71 * (i + 1));
                                vLine = 3;
                            }
                        } else if (vLine === 3) {
                            line.graphics.moveTo(435, 341 + 71 * i).lineTo(435, 341 + 71 * (i + 1));
                            var isLineLeft = hLine2[0];
                            var isLineRight = hLine3[0];
                            while (isLineLeft < i + 1) {
                                hLine2.shift();
                                isLineLeft = hLine2[0];
                            }
                            while (isLineRight < i + 1) {
                                hLine3.shift();
                                isLineRight = hLine3[0];
                            }
                            if (isLineLeft === i + 1) {
                                hLine2.shift();
                                line.graphics.moveTo(290, 341 + 71 * (i + 1)).lineTo(435, 341 + 71 * (i + 1));
                                vLine = 2;
                            } else if (isLineRight === i + 1) {
                                hLine3.shift();
                                line.graphics.moveTo(435, 341 + 71 * (i + 1)).lineTo(580, 341 + 71 * (i + 1));
                                vLine = 4;
                            }
                        } else {
                            line.graphics.moveTo(580, 341 + 71 * i).lineTo(580, 341 + 71 * (i + 1));
                            var isLine = hLine3[0];
                            while (isLine < i + 1) {
                                hLine3.shift();
                                isLine = hLine3[0];
                            }
                            if (isLine === i + 1) {
                                hLine3.shift();
                                line.graphics.moveTo(435, 341 + 71 * (i + 1)).lineTo(580, 341 + 71 * (i + 1));
                                vLine = 3;
                            }
                        }
                    }
                    createjs.Tween.get(line)
                        .to({y: -374}, 3000)
                        .call(() => {
                            console.log(vLine);
                            if (vLine === 1) {
                                if (window.letterQuality) {
                                    let successBoy = new createjs.Bitmap(repo.getResult('successBoy'));
                                    successBoy.set({scaleX: 1.44, scaleY: 1.44});
                                    successBoy.regX = successBoy.image.width / 2;
                                    successBoy.x = playingBoy.x;
                                    successBoy.y = playingBoy.y;
                                    stage.removeChild(playingBoy);
                                    stage.addChild(successBoy);
                                    stage.removeChild(startGirl);
                                    stage.addChild(successGirl);
                                    stage.addChild(heart1);
                                    pressToNext(score,true,scoreChange);
                                } else {
                                    let failBoy = new createjs.Bitmap(repo.getResult('failBoy'));
                                    failBoy.set({scaleX: 1.44, scaleY: 1.44});
                                    failBoy.regX = failBoy.image.width / 2;
                                    failBoy.x = playingBoy.x;
                                    failBoy.y = playingBoy.y;
                                    stage.removeChild(playingBoy);
                                    stage.addChild(failBoy);
                                    stage.removeChild(startGirl);
                                    stage.addChild(nothingGirl);
                                    stage.removeChild(heart);
                                    pressToNext(score,false,scoreChange);
                                }
                                heartbeat.pause();
                                setTimeout(function(){
                                    background.pause();
                                    win();
                                }, winTime);
                            } else {
                                let failBoy = new createjs.Bitmap(repo.getResult('failBoy'));
                                failBoy.set({scaleX: 1.44, scaleY: 1.44});
                                failBoy.regX = failBoy.image.width / 2;
                                failBoy.x = playingBoy.x;
                                failBoy.y = playingBoy.y;
                                stage.removeChild(playingBoy);
                                stage.addChild(failBoy);
                                stage.removeChild(startGirl);
                                stage.addChild(nothingGirl);
                                heartbeat.pause();
                                setTimeout(function(){
                                    background.pause();
                                    win();
                                }, winTime);
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
        }else if(level === 2) {
            let isWin = true;
            //createjs.FontLoader(repo.getResult('CHfont'));
            let s2_text = new createjs.Text(
                "你 約  "+otherName+"  去 吃 浪 漫 晚 餐\n" +
                "吃 飽 後 你 很 想 打 個 嗝\n" +
                "請 選 擇 在 正 確 的 時 機 點 解 放", "40px CSong3HK", "#000000");
            s2_text.set({textAlign:'center', lineHeight:70, scaleX: 0.8});
            s2_text.set({x: 360, y: 250});

            createjs.Tween.get(s2_text).wait(5000).call( function(){
                let time_loop;
                stage.removeChild(s2_text);

                let s2 = new createjs.Bitmap(repo.getResult('s2'));
                s2.set({y: 3, scaleX: 1.44, scaleY: 1.44});
                stage.addChild(s2); // ＳＴＡＧＥ ２

                console.log(score);
                printScore(score);

                let girle = [new createjs.Bitmap(repo.getResult('girle1')),
                    new createjs.Bitmap(repo.getResult('girle2'))];
                for (let girl of girle) {
                    girl.set({x: 500, y: 250, scaleX: 1.5, scaleY: 1.5});
                }

                let girl_count = 0;
                stage.addChild(girle[0]);
                let girl_loop = createjs.Tween.get(girle, {loop: true}).wait(1000).call(function () {
                    stage.removeChild(girle[girl_count]);
                    girl_count = (girl_count + 1) % 2;
                    stage.addChild(girle[girl_count]);
                });

                let girlm = [new createjs.Bitmap(repo.getResult('girlm1')),
                    new createjs.Bitmap(repo.getResult('girlm2'))];
                for (let girl of girlm) {
                    girl.set({x: 500, y: 250, scaleX: 1.5, scaleY: 1.5});
                }

                let rude = new createjs.Bitmap(repo.getResult('rude'));
                rude.set({x: 510, y: 120, scaleX: 2, scaleY: 2});

                let burp = new createjs.Bitmap(repo.getResult('burp'));
                burp.set({x: 240, y: 280, scaleX: 1.5, scaleY: 1.5});

                let boye = [new createjs.Bitmap(repo.getResult('boye1')),
                    new createjs.Bitmap(repo.getResult('boye2')),
                    new createjs.Bitmap(repo.getResult('boye3')),
                    new createjs.Bitmap(repo.getResult('boye4')),
                    new createjs.Bitmap(repo.getResult('boye5'))];
                for (let boy of boye) {
                    boy.set({scaleX: 1.5, scaleY: 1.5, regY: boy.image.height, x: 100, y: 460});
                }

                let boyb = [new createjs.Bitmap(repo.getResult('boyb1')),
                    new createjs.Bitmap(repo.getResult('boyb2')),
                    new createjs.Bitmap(repo.getResult('boyb3')),
                    new createjs.Bitmap(repo.getResult('boyb4')),
                    new createjs.Bitmap(repo.getResult('boye5'))];
                for (let boy of boyb) {
                    boy.set({scaleX: 1.5, scaleY: 1.5, regY: boy.image.height, x: 100, y: 460});
                }

                let boy_count = 0;
                let burp_count = 0;
                stage.addChild(boye[0]);
                let boy_loop = createjs.Tween.get(boye, {loop: true}).wait(700).call(function () {
                    stage.removeChild(boye[boy_count]);

                    window.addEventListener('keydown', function (e) {
                        switch (e.keyCode) {
                            case 66: //space
                                stage.removeChild(boye[boy_count]);
                                stage.addChild(boyb[boy_count]);
                                stage.addChild(burp);
                                repo.getResult('burp_sound').play();
                                burp_count += 1;
                                if (boy_count == 0 || boy_count == 1 || burp_count >= 10) {
                                    isWin = false;
                                    stage.removeChild(girle[girl_count]);
                                    girl_loop.setPaused(true);
                                    stage.removeChild(girlm[1]);
                                    stage.addChild(girlm[0]);
                                    girl_loop = createjs.Tween.get(girlm).wait(800).call(function () {
                                        stage.removeChild(girlm[0]);
                                        stage.addChild(girlm[1]);
                                    });
                                    stage.addChild(rude);
                                }
                                stage.removeChild(illu_text);
                                time_loop.setPaused(true);
                                boy_loop.setPaused(true);
                                girl_loop.setPaused(true);
                                pressToNext(score,isWin,scoreChange);
                        }
                    });

                    boy_count = (boy_count + 1) % 5;
                    stage.addChild(boye[boy_count]);
                });

                let s2_time = 30;
                let illu_text = new createjs.Text("按下‘b’鍵打嗝\n" +
                    "還剩 " + s2_time + " 秒", "16px Arial", "#c4322e");
                illu_text.set({textAlign: 'center', lineHeight:24, x: 160, y: 150});
                stage.addChild(illu_text);

                time_loop = createjs.Tween.get(illu_text, {loop: true}).wait(1000).call(function () {
                    stage.removeChild(illu_text);
                    s2_time -= 1;
                    illu_text.text = "按下‘b’鍵打嗝\n" + "還剩 " + s2_time + " 秒";
                    if (s2_time > 0) {
                        stage.addChild(illu_text);
                    } else {
                        repo.getResult('burp_sound').play();
                        stage.removeChild(boye[boy_count]);
                        boy_loop.setPaused(true);
                        stage.addChild(boyb[boy_count]);
                        stage.addChild(burp);
                        if (boy_count == 1 || boy_count == 0) {
                            isWin = false;
                            stage.removeChild(girle[girl_count]);
                            girl_loop.setPaused(true);
                            stage.removeChild(girlm[1]);
                            stage.addChild(girlm[0]);
                            createjs.Tween.get(girlm).wait(800).call(function () {
                                stage.removeChild(girlm[0]);
                                stage.addChild(girlm[1]);
                            });
                            stage.addChild(rude);
                        }
                        stage.removeChild(illu_text);
                        time_loop.setPaused(true);
                        girl_loop.setPaused(true);
                        pressToNext(score,isWin,scoreChange);
                    }
                });

            } );
            stage.addChild(s2_text);

        }else if(level === 3) {
            stage.removeAllChildren();
            let carRoad = repo.getResult('carRoad');
            let clapping = repo.getResult('clapping');
            let crow = repo.getResult('crow');
            let s3_text = new createjs.Text(
                "吃 完 飯 後 ， 你 帶 "+otherName+"  去 散 散 步 \n" +
                "請 小 心 來 車 ， 安 全 橫 越 大 馬 路\n" , "40px CSong3HK", "#000000");
            createjs.Tween.get().wait(0).call( function() {

                s3_text.set({textAlign:'center', lineHeight:70, scaleX: 0.8});
                s3_text.set({x: 360, y: 250});
                stage.addChild(s3_text);
            });
            createjs.Tween.get().wait(5000).call( function() {
                stage.removeChild(s3_text);
                let s3 = new createjs.Bitmap(repo.getResult('stage3'));
                s3.set({y: 3, scaleX: 1.44, scaleY: 1.44});
                stage.addChild(s3); // ＳＴＡＧＥ 3

                for (let i = 0; i < score; i++) {
                    stage.addChild(life[i]); // hearts
                }

                let heart_text = new createjs.Bitmap(repo.getResult('heart_text'));
                heart_text.set({
                    x: canvas.width - heart_text.image.width * 1.35 - 55 * 6, y: -13,
                    scaleX: 1.35, scaleY: 1.35
                });
                stage.addChild(heart_text); // 好感度

                carRoad.play();
                let flag = 1;
                //動作宣告
                let people = [
                    new createjs.Bitmap(repo.getResult('waiting1')),
                    new createjs.Bitmap(repo.getResult('waiting2')),
                    new createjs.Bitmap(repo.getResult('walking1')),
                    new createjs.Bitmap(repo.getResult('walking2')),
                    new createjs.Bitmap(repo.getResult('win1')),
                    new createjs.Bitmap(repo.getResult('win2'))];
                for (let i = 0; i < 6; i++) {
                    people[i].set({x: 360, y: 50});
                }

                let shape = new createjs.Shape();
                let graphics = shape.graphics;
                //馬路邊界一
                graphics.beginStroke("black");
                graphics.setStrokeStyle(5);
                graphics.moveTo(0, 150);
                graphics.lineTo(720, 150);
                //馬路邊界二
                graphics.beginStroke("black");
                graphics.setStrokeStyle(5);
                graphics.moveTo(0, 550);
                graphics.lineTo(720, 550);
                //車子宣告
                let cars = [
                    new createjs.Bitmap(repo.getResult('car1')),
                    new createjs.Bitmap(repo.getResult('car2')),
                    new createjs.Bitmap(repo.getResult('car3')),
                    new createjs.Bitmap(repo.getResult('car4')),
                    new createjs.Bitmap(repo.getResult('car5')),
                    new createjs.Bitmap(repo.getResult('car6')),
                    new createjs.Bitmap(repo.getResult('car7'))];

                let carsWidthLength = [[57, 30], [58, 28], [58, 60], [57, 32], [54, 38], [56, 38], [57, 30]];
                cars[0].set({x: -100, y: 170});
                cars[1].set({x: 750, y: 350});
                cars[2].set({x: 750, y: 270});
                cars[3].set({x: 750, y: 400});
                cars[4].set({x: 750, y: 500});
                cars[5].set({x: -200, y: 220});
                cars[6].set({x: -100, y: 450});
                let blood = new createjs.Bitmap(repo.getResult('blood'));
                createjs.Tween.get(cars[0], {loop: true}).to({x: 720, y: 170}, 3500);
                createjs.Tween.get(cars[1], {loop: true}).to({x: 0, y: 350}, 4000);
                createjs.Tween.get(cars[2], {loop: true}).to({x: 0, y: 270}, 3500);
                createjs.Tween.get(cars[3], {loop: true}).to({x: 0, y: 400}, 2500);
                createjs.Tween.get(cars[4], {loop: true}).to({x: 0, y: 500}, 2500);
                createjs.Tween.get(cars[5], {loop: true}).to({x: 720, y: 220}, 3000);
                createjs.Tween.get(cars[6], {loop: true}).to({x: 720, y: 450}, 3000);
                stage.addChild(cars[0], cars[1], cars[2], cars[3], cars[4], cars[5], cars[6]);
                stage.addChild(shape);

                stage.update();

                let stopFlag = false;
                //控制上下左右
                window.addEventListener('keydown', function (e) {
                    flag = 2;
                    switch (e.keyCode) {
                        // Used for Debugging
                        case 0:
                        case 32:
                            if (stopFlag) {
                                //cars stop
                                for (var i = 0; i < 6; i++) {
                                    createjs.Tween.get(cars[i], {loop: false}).to({x: cars[i].x, y: cars[i].y});
                                }
                            }
                            else {
                                createjs.Tween.get(cars[0], {loop: true}).to({x: 720, y: 170}, 3500);
                                createjs.Tween.get(cars[1], {loop: true}).to({x: 0, y: 350}, 4000);
                                createjs.Tween.get(cars[2], {loop: true}).to({x: 0, y: 270}, 3500);
                                createjs.Tween.get(cars[3], {loop: true}).to({x: 0, y: 400}, 2500);
                                createjs.Tween.get(cars[4], {loop: true}).to({x: 0, y: 500}, 2500);
                                createjs.Tween.get(cars[5], {loop: true}).to({x: 720, y: 220}, 3000);
                                createjs.Tween.get(cars[6], {loop: true}).to({x: 720, y: 450}, 3000);
                            }

                        case 37:
                            for (var i = 0; i < 6; i++) {
                                people[i].x -= 10;
                                if (people[i].x <= 0) {
                                    people[i].x = 0;
                                }
                            }
                            break;
                        case 38:
                            for (var i = 0; i < 6; i++) {
                                people[i].y -= 10;
                                if (people[i].y <= 0) {
                                    people[i].y = 0;
                                }
                            }
                            break;
                        case 39:
                            for (var i = 0; i < 6; i++) {
                                people[i].x += 10;
                                if (people[i].x >= 660) {
                                    people[i].x = 660;
                                }
                            }
                            break;
                        case 40:
                            for (var i = 0; i < 6; i++) {
                                people[i].y += 10;
                                if (people[i].y >= 550) {
                                    // Win
                                    carRoad.pause();
                                    clapping.play();
                                    flag = 3;
                                }
                                if (people[i].y >= 660) {
                                    people[i].y = 660;
                                }
                            }
                            break;
                    }
                });
                //判斷走路時的動畫(有三種)
                var check = window.setInterval(function flagtest() {
                    if (flag === 1) {
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
                    if (flag === 2) {
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
                    if (flag === 3) {
                        //win
                        clearInterval(check);
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
                        flag=4;
                    }
                    if(flag===4){
                        window.setTimeout(function () {
                            win3();
                        }, 1000);
                    }
                }, 1000);

                //判斷有沒有撞到車子
                window.setInterval(function HitTest() {
                    for (var i = 0; i < 7; i++) {
                        for (var j = 0; j < 6; j++) {
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

            });
        }else if(stage3flag === 1 ){
            //level 4
            let stage4 = new createjs.Bitmap(repo.getResult('stage4'));
            let stage4_text = new createjs.Bitmap(repo.getResult('stage4_text'));
            stage4_text.set({x: 150, y: 120});
            let stage4_button1 = new createjs.Bitmap(repo.getResult('stage4_button1'));
            stage4_button1.set({x: 100, y: 400});
            let stage4_button2 = new createjs.Bitmap(repo.getResult('stage4_button2'));
            stage4_button2.set({x: 250, y: 400});
            let stage4_button3 = new createjs.Bitmap(repo.getResult('stage4_button3'));
            stage4_button3.set({x: 400, y: 400});
            let heartText = new createjs.Bitmap(repo.getResult('heartText'));	
            heartText.set({scaleX: 1.44, scaleY: 1.44});
            heartText.set({x: 288, y: 14.4});
            let heart1 = new createjs.Bitmap(repo.getResult('heart'));	
            heart1.set({scaleX: 1.44, scaleY: 1.44});
            heart1.set({x: 485, y: 31.68});


            stage4_button1.on('click',e =>{
                // location.assign('http://localhost:3000/Stage4/stage4_fire/');
                
                stage.removeChild(stage4_button3);
                stage.removeChild(stage4_button2);
                stage.removeChild(stage4_button1);
                stage.removeChild(stage4_text);
                stage.addChild(heartText);
                stage.addChild(heart1);
                var fire_= $('<video autoplay><source src="Stage4/video/fire.mp4" type="video/mp4"></video>').appendTo(document.body)[0];
                var fire = new createjs.DOMElement(fire_);
                fire.set({x:-720,y:-30});
                stage.addChild(fire);
                setTimeout(function(){
                    win();
                }, 22000);
                
            });
            stage4_button2.on('click',e =>{
                // location.assign('http://localhost:3000/Stage4/stage4_sea/');
                stage.removeChild(stage4_button3);
                stage.removeChild(stage4_button2);
                stage.removeChild(stage4_button1);
                stage.removeChild(stage4_text);
                stage.addChild(heartText);
                stage.addChild(heart1);
                var sea_= $('<video autoplay><source src="Stage4/video/sea.mp4" type="video/mp4"></video>').appendTo(document.body)[0];
                var sea = new createjs.DOMElement(sea_);
                sea.set({x:-720,y:-30});
                stage.addChild(sea);
                setTimeout(function(){
                    win();
                }, 29000);
                
            });
            stage4_button3.on('click',e =>{
                // location.assign('http://localhost:3000/Stage4/stage4_home/');
                stage.removeChild(stage4_button3);
                stage.removeChild(stage4_button2);
                stage.removeChild(stage4_button1);
                stage.removeChild(stage4_text);
                stage.addChild(heartText);
                stage.addChild(heart1);
                var home_= $('<video autoplay><source src="Stage4/video/home.mp4" type="video/mp4"></video>').appendTo(document.body)[0];
                var home = new createjs.DOMElement(home_);
                home.set({x:-720,y:-30});
                stage.addChild(home);
                setTimeout(function(){
                    win();
                }, 29000);
               
            });

            stage.addChild(stage4);
            stage.addChild(stage4_button3);
            stage.addChild(stage4_button2);
            stage.addChild(stage4_button1);
            stage.addChild(stage4_text);
        }else{
            //end

        }

        function printScore(score) {
            for (let i = 0; i < 6; i++) {
                if (i < score) stage.addChild(life[i]); // hearts
                else stage.removeChild(life[i]);
            }

            stage.addChild(heart_text); // 好感度
        }

        function pressToNext(score,isWin,scoreChanged) {
            let bg = new createjs.Shape();
            bg.graphics.beginFill('#ffffff').drawRect(0,490,720,100);
            stage.addChild(bg);
            let text = new createjs.Text("按下‘enter’鍵前往下一關", "16px Arial", "#c4322e");
            text.set({textAlign: 'center', x: 360, y: 500});
            stage.addChild(text);
            if (!scoreChanged) {
                if (!isWin) score--;
                else score++;
                scoreChanged = true;
                window.score = score;
            }
            console.log(window.score);
            printScore(window.score);
            window.addEventListener('keydown', function (e) {
                switch (e.keyCode) {
                    case 13: //enter
                        win();
                        scoreChanged = false;
                }
            });
        }

    }

    function isHit(ax,ay, aw,ah, bx,by, bw,bh) {
        return (ax+aw > bx && ax < bx + bw  && ay+ah > by && ay < by + bh);
    }
    function win() {
        // let rect = new createjs.Shape();
        // rect.graphics.beginFill("white").drawRect(0, 0, 720, 720);
        // stage.addChild(rect);
        stage.removeAllChildren();
        stage.update();
        level++;
        scene = 0;
        draw();
    }
    function win3() {
        // let rect = new createjs.Shape();
        // rect.graphics.beginFill("white").drawRect(0, 0, 720, 720);
        // stage.addChild(rect);
        stage.removeAllChildren();
        stage.update();
        stage3flag++;
        scene = 0;
        draw();
    }

    setup();

});

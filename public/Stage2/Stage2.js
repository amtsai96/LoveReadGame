$(document).ready(()=>{ // jQuery main
    
	let stage = new createjs.Stage(canvas);
	let repo = new createjs.LoadQueue();
    let score = 6;

	function setup() {
		// automatically update
		createjs.Ticker.on("tick", e => stage.update());
		createjs.Ticker.framerate = 60;
        repo.loadManifest([	{id:'s2', src:'images/stage2.png'},
            {id:'s2_text', src:'images/stage2_text.png'},
            {id:'heart_text', src:'images/heart_text.png'},
            {id:'heart', src:'images/heart.png'},
            {id:'burp', src:'images/burp.PNG'},
            {id:'rude', src:'images/rude.PNG'},
            {id:'girle1', src:'images/gfEating1.PNG'},
            {id:'girle2', src:'images/gfEating2.PNG'},
            {id:'girlm1', src:'images/gfMad1.PNG'},
            {id:'girlm2', src:'images/gfMad2.PNG'},
            {id:'boye1', src:'images/bfBurp1.PNG'},
            {id:'boye2', src:'images/bfBurp3.PNG'},
            {id:'boye3', src:'images/bfBurp5.PNG'},
            {id:'boye4', src:'images/bfBurp7.PNG'},
            {id:'boye5', src:'images/bfBurp9.PNG'},
            {id:'boyb1', src:'images/bfBurp2.PNG'},
            {id:'boyb2', src:'images/bfBurp4.PNG'},
            {id:'boyb3', src:'images/bfBurp6.PNG'},
            {id:'boyb4', src:'images/bfBurp8.PNG'},
            {id:'CHfont', src:'images/CSong3HK.otf'},
            {id:'burp_sound', src:'sound/burp1.mp3'} ]);
        repo.on('complete', draw);
    }
	
	function draw() {
        let CHfont = new createjs.FontLoader(repo.getResult('CHfont'));
        let s2_text = new createjs.Text(
            "你 約 "+otherName+" 去 吃 浪 漫 晚 餐\n" +
            "吃 飽 後 你 很 想 打 個 嗝\n" +
            "請 選 擇 在 正 確 的 時 機 點 解 放", "40px CHfont", "#000000");
        s2_text.set({textAlign:'center', lineHeight:70, scaleX: 0.8});
        s2_text.set({x: 360, y: 250});

        createjs.Tween.get(s2_text).wait(500).call( function(){
            stage.removeChild(s2_text);

            let s2 = new createjs.Bitmap(repo.getResult('s2'));
            s2.set({y:3, scaleX:1.44, scaleY:1.44});
            stage.addChild(s2); // ＳＴＡＧＥ ２

            for (let i=0; i<score; i++) {
                let heart = new createjs.Bitmap(repo.getResult('heart'));
                heart.set({ x: canvas.width - heart.image.width * 1.1 * (6-i), y:5 });
                stage.addChild(heart); // hearts
            }

            let heart_text = new createjs.Bitmap(repo.getResult('heart_text'));
            heart_text.set({x:canvas.width - heart_text.image.width * 1.35 - 55 * 6, y:-13,
                scaleX:1.35, scaleY:1.35});
            stage.addChild(heart_text); // 好感度

            let illu_text = new createjs.Text("按下‘b’鍵打嗝", "20px Arial", "#c4322e");
            illu_text.set({textAlign:'center', x:360, y:150});
            stage.addChild(illu_text);

            let girle = [ new createjs.Bitmap(repo.getResult('girle1')),
                new createjs.Bitmap(repo.getResult('girle2')) ];
            for (let girl of girle) { girl.set({x: 500, y: 250, scaleX: 1.5, scaleY: 1.5}); }

            let girl_count = 0;
            stage.addChild(girle[0]);
            girl_loop = createjs.Tween.get(girle, {loop:true}).wait(1000).call( function() {
                stage.removeChild(girle[girl_count]);
                girl_count = (girl_count+1) % 2;
                stage.addChild(girle[girl_count]);
            });

            let girlm = [ new createjs.Bitmap(repo.getResult('girlm1')),
                new createjs.Bitmap(repo.getResult('girlm2')) ];
            for (let girl of girlm) { girl.set({x: 500, y: 250, scaleX: 1.5, scaleY: 1.5}); }

            let rude = new createjs.Bitmap(repo.getResult('rude'));
            rude.set({x: 510, y: 120, scaleX: 2, scaleY: 2});

            let burp = new createjs.Bitmap(repo.getResult('burp'));
            burp.set({x: 240, y: 280, scaleX: 1.5, scaleY: 1.5});

            let boye = [ new createjs.Bitmap(repo.getResult('boye1')),
                new createjs.Bitmap(repo.getResult('boye2')),
                new createjs.Bitmap(repo.getResult('boye3')),
                new createjs.Bitmap(repo.getResult('boye4')),
                new createjs.Bitmap(repo.getResult('boye5')) ];
            for (let boy of boye) { boy.set({scaleX: 1.5, scaleY: 1.5, regY: boy.image.height, x: 100, y: 460}); }

            let boyb = [ new createjs.Bitmap(repo.getResult('boyb1')),
                new createjs.Bitmap(repo.getResult('boyb2')),
                new createjs.Bitmap(repo.getResult('boyb3')),
                new createjs.Bitmap(repo.getResult('boyb4')),
                new createjs.Bitmap(repo.getResult('boye5')) ];
            for (let boy of boyb) { boy.set({scaleX: 1.5, scaleY: 1.5, regY: boy.image.height, x: 100, y: 460}); }

            let boy_count = 0;
            let burp_count = 0;
            stage.addChild(boye[0]);
            boy_loop = createjs.Tween.get(boye, {loop:true}).wait(1000).call( function() {
                stage.removeChild(boye[boy_count]);

                window.addEventListener('keydown', function (e) {
                    switch (e.keyCode) {
                        case 66: //space
                            stage.removeChild(boye[boy_count]);
                            stage.addChild(boyb[boy_count]);
                            stage.addChild(burp);
                            repo.getResult('burp_sound').play();
                            console.log(burp_count);
                            if ( boy_count == 0 || burp_count >= 5 ) {
                                stage.addChild(rude);
                            }
                            boy_loop.setPaused(true);
                    }
                });
                window.addEventListener('keyup', function (e) {
                    switch (e.keyCode) {
                        case 66: //space
                            burp_count+=1;
                    }
                });

                boy_count = (boy_count+1) % 5;
                stage.addChild(boye[boy_count]);
            });

        } );
        stage.addChild(s2_text);


        tank1.on('click', function(e) {
        	let dot = new createjs.Shape();
        	dot.graphics.beginFill('red').drawCircle(tank1.x+22, tank1.y-9,5);
        	createjs.Tween.get(dot).to({x:300},1500).call(function () {
				stage.removeChild(dot);//子彈不見
        	});
        	stage.addChild(dot);
        });

        tank1.on('mousedown', e =>{
        	stage.on('stagemousemove', e =>{
        		tank1.x= stage.mouseX;
        		tank1.y= stage.mouseY;
        	});
        	stage.on('stagemouseup', e =>{
        		e.target.removeAllEventListeners();
        	});
        });
    }
	
	setup();
	
});
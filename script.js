	var canvas=document.getElementById('myCanvas');
	var ctx=canvas.getContext("2d");
	var ballRadius=10;
	var x=canvas.width/2;
	var y=canvas.height-30;
	var dx=6;
	var dy=-6;
	var paddleHeight=10;
	var paddleWidth=250;
	var paddleX=(canvas.width-paddleWidth)/2;
	var rightPressed=false;
	var leftPressed=false;
	var brickRowCount=13;
	var brickColumnCount=5;
	var brickWidth=80;
	var brickHeight=50;
	var brickPadding=7;
	var brickOffSetLeft=30;
	var brickOffSetTop=30;
	var score=0;
	var lives=3;
	var bricks=[];
	for(var col=0;col<brickColumnCount;col++){
	 bricks[col]=[];
	 for(var row=0;row<brickRowCount;row++){
	 	bricks[col][row]={x:0,y:0,status:1};
	    }	
	}
	function drawBall() {
		ctx.beginPath();
		ctx.arc(x,y,ballRadius,0,Math.PI*2);
		ctx.fillStyle="#dc5539";
		ctx.fill();
		ctx.closePath();
	}
	document.addEventListener("keydown",keyDownHandler,false);
	document.addEventListener("keyup",keyUpHandler,false);
	document.addEventListener("mousemove",mouseMoveHandler,false);
	function keyDownHandler(e) {
		if(e.keyCode==39){
			rightPressed=true;
		}
		if(e.keyCode==37){
			leftPressed=true;
		}
	}
	function keyUpHandler(e) {
		if(e.keyCode==39){
			rightPressed=false;
		}
		if(e.keyCode==37){
			leftPressed=false;
		}
	}
	function mouseMoveHandler(e) {
		var relX=e.clientX-canvas.offsetLeft;
		if(relX>0&&relX<canvas.width){
			paddleX=relX-paddleWidth/2;
		}
	}
	function drawPaddle(){
		ctx.beginPath();
		ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
		ctx.fillStyle="#dc5539";
		ctx.fill();
		ctx.closePath;
	}
	function drawScore() {
		ctx.font="16px Arial"
		ctx.fillStyle="#dc5539"
		ctx.fillText("Score:" +score,8,20);
	}
	function drawLives() {
		ctx.font="16px Arial"
		ctx.fillStyle="#dc5539"
		ctx.fillText("Lives:"+lives,canvas.width-65,20);
	}
	function drawBricks() {
		for(var c=0;c<brickColumnCount;c++){
			for(var r=0;r<brickRowCount;r++){
				if(bricks[c][r].status==1){
					var brickX=(r*(brickWidth+brickPadding))+brickOffSetLeft;
				var brickY=(c*(brickHeight+brickPadding))+brickOffSetTop;
				bricks[c][r].x=brickX;
				bricks[c][r].y=brickY;
				ctx.beginPath();
				ctx.rect(brickX,brickY,brickWidth,brickHeight);
				ctx.fillStyle="#dc5539";
				ctx.fill();
				ctx.closePath();
				}
			}
		}
	}
	function colDetect() {
		for(var c=0;c<brickColumnCount;c++){
			for(var r=0;r<brickRowCount;r++){
				var b=bricks[c][r];
				if(b.status==1){
					if(x>b.x&&x<b.x+brickWidth&&y>b.y&&y<b.y+brickHeight){
						dy=-dy;
						b.status=0;
						score+=7;
						if(score == brickRowCount*brickColumnCount*7){
							alert("You Won!");
							document.location.reload();
						}

					}
				}
			}
		}
		
	}
	function draw() {
		ctx.clearRect(0,0,canvas.width,canvas.height);
		drawBricks();
	    drawPaddle();
	    drawBall();
	    drawScore();
	    drawLives();
	    colDetect();
	    if(x+dx>canvas.width-ballRadius || x+dx<ballRadius){
	    	dx=-dx;
	    }
	    if(y+dy<ballRadius){
	    	dy=-dy;
	    }
	    else if(y + dy>canvas.height-ballRadius){//collisionDetection
	    	if(x>paddleX && x<paddleX+paddleWidth){
	    		dx=8*((x-(paddleX+paddleWidth/2))/paddleWidth);
	    		dy=-dy;
	    	}
	    	else{
	    		lives--;
	    		if(!lives){
	    			alert("Game Over");
	    			document.location.reload();
	    		}
	    		else{
	    			x=canvas.width/2;
	    			y=canvas.height-30;
	    			dx=6;
	    			dy=-6;
	    		}
	    	}
	    }
	    if(rightPressed && paddleX < canvas.width-paddleWidth/2){
	    	paddleX+=14;
	    }
	     if(leftPressed && paddleX > -paddleWidth/2){
	    	paddleX-=14;
	    }
	    x+=dx;
	    y+=dy;
	     requestAnimationFrame(draw);
    }
	draw();
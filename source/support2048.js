/* support-2048.js */

// 棋盘方格块背景颜色判断函数
function getNumberBackgroundColor(number) {
	switch(number) {
		case 2: 
			return "#eee4da";
			break;
		case 4: 
			return "#ede0c8";
			break;
		case 8: 
			return "#f2b179";
			break;
		case 16: 
			return "f599563";
			break;
		case 32:
			return "#f67c5f";
			break;
		case 64: 
			return "#f65a3b";
			break;
		case 128: 
			return "#f65e3b";
			break;
		case 256:
			return "#edcf72";
			break;
		case 512:
			return "#9c0";
			break;
		case 1024: 
			return "#33b5e5";
		case 2048:
			return "#09c";
			break;
		case 4096:
			return "#a6c";
			break;
		case 8192:
			return "#93c";
			break;
	}
	return "black";
}

// 字体颜色判断函数
function getNumberColor(number) {
	if(number <= 4) {
		return "#776e65"
	}
	return "#fff";
}

// 随机输出一个数字以及其位置
function generateOneCell() {
	// 判断还有没有空格
	if(noSpace())
		return false;
	// 随机产生一个位置
	var randX =  parseInt(Math.floor(Math.random() * 4)),
		randY =  parseInt(Math.floor(Math.random() * 4));
	while(1) {
		if(board[randX][randY] == 0)
			break;
	var randX =  parseInt(Math.floor(Math.random() * 4)),
		randY =  parseInt(Math.floor(Math.random() * 4));
	}
	// 随机产生一个数字(2||4)
	randNum = Math.random() > 0.5 ? 4 : 2;
	board[randX][randY] = randNum ;
	// 载入数字(动画滑动效果)
	showNumAnimation(randX, randY, randNum);
	return true;
}

function showNumAnimation( x, y, Num) {
	var NumCell = $("#number-cell-" + x + "-" + y);
	NumCell.css("background-color", getNumberBackgroundColor(Num));   
	NumCell.css("color", getNumberColor(Num));	
	NumCell.text(Num);
	NumCell.animate({
		width: "100px",
		height: "100px",
		left: getPos(x, y)[0],
		top: getPos(x, y)[1]
	},100);
}
// 判断游戏中是否还有空格,返回false,就表示还有空格
function noSpace() {
	for(var i= 0; i< 4; i++) 
		for(var j= 0; j< 4; j++) 
			if(board[i][j] == 0)
				return false;   
	return true;
}

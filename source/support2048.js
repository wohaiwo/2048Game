/*
*
* @author zhanhang
* @time 2015/8/24 10:20
* @version 2015/10/10 22:20
* @description 修复了移动化 兼容手机的bug
*/

/* 开始游戏 */
function newGame() {
	// 初始化棋盘格
	init();      
	// 随机输出两个方格
	generateOneCell();
	generateOneCell();
}

// 初始化网格
function init() {
	for(var i = 0; i < 4; i++) 
		for(var j = 0; j < 4; j++) {
			var gridCell = document.getElementById("grid-cell-"+ i +"-" + j);
			gridCell.style.left = getPos(i, j)[0] + "px";
			gridCell.style.top = getPos(i, j)[1] + "px";
	}  
	// 创建一个二维数组来存放数据
	for(var i = 0; i < 4; i++) {
		board[i] = new Array();
		hasConflicted[i] = new Array();
		for(var j = 0; j < 4; j++) {
			board[i][j] = 0;         	 // 初始化二维数组
			hasConflicted[i][j] = false;
		}
	}
	updateBoardView();
}

// 绘制方格中的数字
function updateBoardView() {
	
	// 删除已经绘制好的数字
	$(".number-cell").remove();
	for(var i = 0; i < 4; i++) {
		for(var j = 0; j < 4; j++) {
			/*
			var element	= document.createElement("div");
			element.className = "number-cell";
			element.id = "number-cell-"+ i + "-" + j;
			var gridContainer = document.getElementById("grid-container");
			gridContainer.appendChild(element);
			*/
			$("#grid-container").append('<div class="number-cell" id="number-cell-'+ i + '-' + j +'"></div>');
			var theNumberCell = $("#number-cell-" + i + "-" + j);

			if(board[i][j] == 0) {
				theNumberCell.css("height", "0px");
				theNumberCell.css("width", "0px");
				theNumberCell.css("left", getPos(i, j)[0] + 50);		// 不能加引号 left top的值是数值 不是字符串
				theNumberCell.css("top", getPos(i, j)[1] + 50);
			} else {
				theNumberCell.css("height", "100px");
				theNumberCell.css("width", "100px");
				theNumberCell.css("left", getPos(i, j)[0]);		
				theNumberCell.css("top", getPos(i, j)[1]);
				theNumberCell.css("background-color", getNumberBackgroundColor(board[i][j]));      // 背景颜色和数字有关系
				theNumberCell.css("color", getNumberColor(board[i][j]));					    	// 设置字体的颜色 字体颜色随着数字大小的变化而变化
				theNumberCell.text(board[i][j]);
			}
			hasConflicted[i][j] = false;
		}
	} 	
}

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
			return "#599563";
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

	//随机一个位置
	var randX = parseInt(Math.floor(Math.random() * 4));
	var randY = parseInt(Math.floor(Math.random() * 4));
	while(1){
		// 如果存在空格 就跳出死循环
		if(board[randX][randY] == 0) {
			break;
		}
		randX = parseInt(Math.floor(Math.random() * 4));
		randY = parseInt(Math.floor(Math.random() * 4));
	}

	// 随机产生一个数字(2||4)
	randNum = Math.random() > 0.5 ? 4 : 2;
	board[randX][randY] = randNum;
	// 载入数字(动画滑动效果)
	showNumAnimation(randX, randY, randNum);
}

// 载入数字时的动画效果
function showNumAnimation(x, y, Num) {
	var NumCell = $("#number-cell-" + x + "-" + y);
	NumCell.css("background-color", getNumberBackgroundColor(Num));   
	NumCell.css("color", getNumberColor(Num));	
	NumCell.text(Num);
	NumCell.animate({
		width: "100px",
		height: "100px",
		left: getPos(x, y)[0],
		top: getPos(x, y)[1]
	}, 200);
}

//  row   表示方格所在的行  
// 	col1  表示靠左边的方格(将要移入的位置)
//  col2  表示靠右边的方格(要移动的方格)
function noHorizontalBlock(row, col1, col2) {
	for( var i= col1 + 1; i< col2; i++) {
		if(board[row][i] != 0) 
			return false;
	}
	return true;
}

//	col 表示当前想要比较方格所在的列数
//	row1 起点的数字所在的行数
// 	row2 终点的数字所在的行数
function noVerticalBlock(col, row1, row2) {
	for( var i= row1 + 1; i< row2; i++) {
		if(board[i][col] != 0)
			return false;
	}
	return true;
}

// 是否可以向左边移动
function canMoveLeft() {
	for(var i= 0; i< 4; i++) {
		for( var j= 1; j< 4; j++) 
			if(board[i][j] != 0) {
				if(board[i][j-1] == 0 || board[i][j] == board[i][j-1] ) 
				return true;
			}
	}
	return false;
}
function canMoveRight() {
	for( var i= 0; i< 4; i++) {
		for( var j= 0; j< 3; j++) 
			if(board[i][j] !=0) {
				if(board[i][j+1] == 0 || board[i][j] == board[i][j+1] ) 
					return true;
			}
	}
	return false;
}
function canMoveUp() {
	for(var j= 0; j< 4; j++) {
		for(var i= 1; i< 4; i++) 
			if(board[i][j] != 0) {
				if(board[i-1][j] == 0 || board[i][j] == board[i-1][j] )  
					return true;
			}
	}
	return false;
}
function canMoveDown() {
		for(var i= 0; i< 3; i++) {
		for(var j= 0; j< 4; j++) 
			if(board[i][j] != 0) {
				if(board[i+1][j] == 0 || board[i][j] == board[i+1][j] ) 
					return true;
			}
	}
	return false;
}

function moveLeft() {
	// 判断是否可以向左边移动
	if(!canMoveLeft) {
		return false;
	}
	// 执行向左移动
	for(var i= 0; i< 4; i++) {
		// j= 1 最左边的不用考虑移动
		for(var j= 1; j< 4; j++) {
			// 当 board[i][j] != 0 的时候, 表示存在一个可以移动的值
			if(board[i][j] != 0) {
				for(var k = 0;  k < j; k++) {
					if(board[i][k] == 0 && noHorizontalBlock(i, k, j)) {
						//	移动方格
						showMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if ( board[i][k] == board[i][j] && noHorizontalBlock(i, k, j)  && !hasConflicted[i][k] ){
						showMoveAnimation(i, j, i, k);
						board[i][k] += board[i][j];
						board[i][j] = 0;
						score += board[i][k];
						hasConflicted[i][k] = true;
						updateScore(score);
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()", 200);
	return true;
}

function moveRight() {
	if(!canMoveRight()) {
		return false;
	}
		// 执行向右移动
	for(var i= 0; i< 4; i++) {
		// j= 1 最左边的不用考虑移动
		for(var j= 2; j>= 0; j--) {
			// 当 board[i][j] != 0 的时候, 表示存在一个可以移动的值
			if(board[i][j] != 0) {
				// 判断当前方格右边是否可以移动
				for(var k= 3; k> j; k--) {
					if(board[i][k] == 0 && noHorizontalBlock(i, j, k)) {
						//	移动方格
						showMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if ( board[i][k] == board[i][j] && noHorizontalBlock(i, j, k) && !hasConflicted[i][k]) {
						showMoveAnimation(i, j ,i, k);
						board[i][k] += board[i][j];
						board[i][j] = 0;
						hasConflicted[i][k] = true;
						score += board[i][k];
						updateScore(score);
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()", 200);
	return true;
}
function moveUp() {
	if(!canMoveUp()) {
		return false;
	}
	// 最上边的一行不用考虑 i= 1
	for(var j= 0; j< 4; j++) {
		for(var i= 1; i< 4; i++) {
			if(board[i][j] != 0) {
				for(var k= 0; k< i; k++) {
					if( board[k][j] == 0 && noVerticalBlock(j, k, i)) {
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;						
						continue;
					} else if (board[k][j] == board[i][j] && noVerticalBlock(j, k, i) && !hasConflicted[k][j]) {
						showMoveAnimation(i, j, k, j);
						board[k][j] += board[i][j];
						board[i][j] = 0;		
						hasConflicted[k][j] = true;
						score += board[i][k];	
						updateScore(score);			
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}

function moveDown() {
	if(!canMoveDown()) {
		return false;
	}
	//for(var i= 0; i< 3; i++) {
		// j= 1 最左边的不用考虑移动
	//	for(var j= 0; j< 4; j++) {
	for(var j= 0; j< 4; j++) {
		for(var i= 2; i>= 0; i--) {
			if(board[i][j] != 0) {
					for(var k= 3; k> i; k--) {
					if( board[k][j] == 0 && noVerticalBlock(j, i, k)) {
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						break;
					} else if (board[k][j] == board[i][j] && noVerticalBlock(j, i, k) && !hasConflicted[k][j]) {
						showMoveAnimation(i, j, k, j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						score += board[i][k];
						hasConflicted[k][j] = true;
						updateScore(score);
						break;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()", 200);
	return true;
}

// 移动数字节点
function showMoveAnimation(fromx, fromy, tox, toy) {
	var numberCell = $('#number-cell-'+fromx+'-'+fromy);
	numberCell.animate({
		top: getPos(tox, toy)[1],
		left: getPos(tox, toy)[0]
	}, 300);
}

// 获取方格位置,返回数组[left,top]
function getPos(i, j) {
	return [20 + 120 * j , 20 + 120 * i];
}

// 可以添加动画功能上去
function updateScore(num) {
	$("#score").text(num);
}

// 判断游戏中是否还有空格,返回false,就表示还有空格
function noSpace() {
	for(var i= 0; i< 4; i++) {
		for(var j= 0; j< 4; j++) 
			if(board[i][j] == 0)
				return false;   
	}
	return true;
}

// 判断游戏中有没有可以移动的方格
function noMove() {
	if( canMoveLeft() || canMoveUp() || canMoveRight() || canMoveDown()) {
		return false;
	}
	return true;
}

// 判断游戏是否结束
function isGameOver() {
	if(noSpace() && noMove()) {
		gameOver();
	}
}

// 输出游戏结束对话框
function gameOver() {
	alert("game over!");
}




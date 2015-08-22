
//  全局变量
var score = 0;   // 玩家分数
var board = new Array();  // 存放页面布局数据
var hasConflicted  = new Array();	// 来判断该位置是否已经重叠过
window.onload = function() {
	newGame();
}

/* 开始游戏 */
function newGame() {
	// 初始化棋盘格
	init();      
	// 随机输出两个方格
	generateOneCell();
	generateOneCell();
}

// 初始化 
function init() {
	for(var i = 0; i < 4; i++) 
		for(var j = 0; j < 4; j++) {
		var gridCell = document.getElementById("grid-cell-"+ i +"-" + j);
		gridCell.style.left = getPos(i, j)[0] + "px";
		gridCell.style.top = getPos(i , j)[1] + "px";
	}  
	// 创建一个二维数组来存放数据
	for(var i = 0; i < 4; i++) {
		board[i] = new Array();
		hasConflicted[i] = new Array();
		for(var j = 0; j < 4; j++) {
			board[i][j] = 0;          // 初始化二维数组
			hasConflicted[i][j] = false;
		}
	}
	updateBoardView();
}
// 获取方格位置,返回数组[left,top]
function getPos(i, j) {
		return [20 + 120 * j , 20 + 120 * i];
	}
function updateBoardView() {

/*
	if(document.getElementById("number-cell") != null) {
		console.log("just to test it");
		console.log(document.getElementsByClassName("number-cell"));
		var removeElement =	document.getElementsByClassName("number-cell");
		removeElement.parentNode.removeChild(removeElement);   // 删除已经绘制好的数字
	}
*/
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
		//	console.log($("#number-cell-" + i + "-" + j));
			var theNumberCell = $("#number-cell-" + i + "-" + j);
		//	console.log(theNumberCell);

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
				theNumberCell.css("background-color", getNumberBackgroundColor(board[i][j] ));    // 背景颜色和数字有关系
				theNumberCell.css("color", getNumberColor(board[i][j]));					// 设置字体的颜色 字体颜色随着数字大小的变化而变化
			}
			hasConflicted[i][j] = false;
		}
	} 
		
}
// 响应用户的按键 移动数字
$(document).keydown(function (ev) {
	switch(ev.keyCode) {
		case 37:  // left
			if(moveLeft()) {		// 先判断是否可以向左移动 然后进行移动 如果移动成功了就返回true
				setTimeout("generateOneCell(),isGameOver()",100);	// 移动后判断随机生成一个数字
			}
			break;
		case 38:  // up
			if(moveUp()) {
			setTimeout(	"generateOneCell(),isGameOver()",100);
			}
			break;
		case 39:  // right
			if(moveRight()) {
				setTimeout(	"generateOneCell(),isGameOver()",100);
			}
			break;
		case 40:  // down
			if(moveDown()) {
			setTimeout(	"generateOneCell(),isGameOver()",100);
			}
			break;
		default: 
			break;
	}
});
// 获取方格位置,返回数组[left,top]
function getPos(i, j) {
		return [20 + 120 * j , 20 + 120 * i];
}




//  row 表示方格所在的行  
// 	col1  表示靠左边的方格(将要移入的位置)
//  col2  表示靠右边的方格(要移动的方格)
function noHorizontalBlock(row, col1, col2, board) {
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

// 判断游戏中是否还有空格,返回false,就表示还有空格
function noSpace() {
	for(var i= 0; i< 4; i++) 
		for(var j= 0; j< 4; j++) 
			if(board[i][j] == 0)
				return false;   
	return true;
}


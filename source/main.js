
//  全局变量
var score = 0;   // 玩家分数
var board = new Array();  // 存放页面布局数据

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
		for(var j = 0; j < 4; j++) {
			board[i][j] = 0;          // 初始化二维数组
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
		}
	} 
		
}

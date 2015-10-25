

var score = 0; 						 			 // 玩家分数
var bestScore = 0;								 // 最高分
var board = new Array(); 						 // 存放页面布局数据
var hasConflicted  = new Array();				 // 来判断该位置是否已经重叠过	防止出现多次方格叠加的问题	
var documentWdith = window.innerWidth;		   	 // 获得屏幕的大小 设置自适应尺寸
var gridContainerWidth = 0.92 * documentWdith;	 
var cellSideLength = 0.18 * documentWdith;		 // 单个方格的宽度
var cellSpace = 0.04 * documentWdith;

window.onload = function() {
	prepareForMobile();
	newGame();
};

// 监听游戏开始事件
document.getElementById("new-game-button").addEventListener("click", function(event) {
	event.preventDefault();
	newGame();
}, false);
document.getElementById("new-game-button").addEventListener("touchstart", function(event) {
	newGame();
})

// 响应用户的按键 移动数字
document.addEventListener("keydown", function(event) {
	// 取消键盘方向键的默认行为 
	event.preventDefault();
	switch(event.keyCode) {
		case 37:  // left
			if(moveLeft()) {		
				setTimeout("generateOneCell(), isGameOver()",100);	
			}
			break;
		case 38:  // up
			if(moveUp()) {
			setTimeout(	"generateOneCell(), isGameOver()",100);
			}
			break;
		case 39:  // right
			if(moveRight()) {
				setTimeout(	"generateOneCell(), isGameOver()",100);
			}
			break;
		case 40:  // down
			if(moveDown()) {
			setTimeout(	"generateOneCell(), isGameOver()",100);
			}
			break;
		default: 
			break;
	}
});

// 手机触屏是的起点，终点的坐标
var startX, startY;
document.addEventListener("touchstart", function(event) {
	event.preventDefault();							// 消除手指滑动的触发的事件
	startX = event.touches[0].pageX;
	startY = event.touches[0].pageY;
}, false);
document.addEventListener("touchend", function(event) {
	endX = event.changedTouches[0].pageX;
	endY = event.changedTouches[0].pageY;
	mobileMove(endX, endY);
}, false);

function mobileMove(endX, endY) {
	var X = endX - startX;
	var Y = endY - startY;
	console.log(Math.abs(X) + " " + Math.abs(Y) + " " + 0.05*documentWdith);
	// 手指单击的时候会发生触发 "touchend"事件, 这里设置一个手指移动距离来防止这个问题
	if(Math.abs(X) < 0.2 * documentWdith && Math.abs(Y) < 0.2 * documentWdith) {
		return false;
	}
	if(Math.abs(X) > Math.abs(Y)) {
		if(X > 0) {
		// 向右边移动
			if(moveRight()) {		
				setTimeout("generateOneCell(), isGameOver()",100);
			}
		} else {
			// 向左边移动
			if(moveLeft()) {
				setTimeout(	"generateOneCell(), isGameOver()",100);
			}
		}
	} else {
		if(Y > 0) {
			// 向下边移动
			if(moveDown()) {
				setTimeout(	"generateOneCell(), isGameOver()",100);
			}
		} else {
			// 向上边移动
			if(moveUp()) {
				setTimeout(	"generateOneCell(), isGameOver()",100);
			}
		}
	}
}






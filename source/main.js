
var score = 0;   // 玩家分数
var board = new Array();  // 存放页面布局数据
var hasConflicted  = new Array();	// 来判断该位置是否已经重叠过
window.onload = function() {
	//  全局变量
	newGame();
};

// 响应用户的按键 移动数字
$(document).keydown(function (ev) {
	switch(ev.keyCode) {
		case 37:  // left
			if(moveLeft()) {		// 先判断是否可以向左移动 然后进行移动 如果移动成功了就返回true
				setTimeout("generateOneCell(), isGameOver()",100);	// 移动后判断随机生成一个数字
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







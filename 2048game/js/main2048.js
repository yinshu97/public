var board = new Array();
var score = 0;
 
$(document).ready(function() { 
    newgame();
 });
 
function newgame() { 
     score = 0;
     updateScore(score);
    //初始化棋盘
    init();
    //在随机两个格子生成数字
    generateOneNumber(); //第一次
    generateOneNumber(); //第二次
  }
 
function init() { 
    for(var i = 0; i < 4; i++)
        for(var j = 0; j < 4; j++)
        {
            var gridCell = $("#grid-cell-"+i+"-"+j);
            gridCell.css('top', getPosTop(i,j));
            gridCell.css('left', getPosLeft(i,j));
        }
    // 给二维数组赋初值，0表示没有数字
	for(var i=0;i<4;i++){
		board[i] = new Array();
		for(var j=0;j<4;j++){
			board[i][j] = 0;
		}
	}
	updateBoardView(); //更新数组
}
//更新数组
function updateBoardView() { 
    $(".number-cell").remove();
    for(var i = 0; i < 4; i++)
        for(var j = 0; j < 4; j++){
            $("#grid-container").append("<div class='number-cell' id='number-cell-"+i+"-"+j+"'></div>");
            var theNumberCell = $('#number-cell-'+i+'-'+j);

            if(board[i][j] == 0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px'); 
                theNumberCell.css('top',getPosTop(i,j)+45);
                theNumberCell.css('left',getPosLeft(i,j)+45);
            }
            else{
                theNumberCell.css('width','90px');
                theNumberCell.css('height','90px');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));//数字背景颜色
                theNumberCell.css('color',getNumberColor(board[i][j])); //数字颜色
                theNumberCell.text(board[i][j]);
            }
        }   
 }
//随机生成一个数字
function generateOneNumber(){
	//判断是否还有空格
    if(nospace(board)){
        return false;
    }
    
    //随机生成0-4,位置
    var randx = parseInt(Math.floor(Math.random()*4));
    var randy = parseInt(Math.floor(Math.random()*4));
    
    while(true){
    	//如果位置是空格，结束循环，如果不是，继续随机位置
        if(board[randx][randy]==0) break;

        randx = parseInt(Math.floor(Math.random()*4));
        randy = parseInt(Math.floor(Math.random()*4));
    }
    //随机一个数字
    var randNumber = Math.random() > 0.5?2:4;
    //在随机位置显示随机数字
    board[randx][randy] = randNumber;
    //显示动画
    showNumberWithAnimation(randx,randy,randNumber);
     return true;
 }
//响应键盘事件
$(document).keydown(function(event){
	switch(event.keyCode){
		 case 37: //left
            if( moveLeft() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 38: //up
            if( moveUp() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 39: //right
            if( moveRight() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 40: //down
            if( moveDown() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        default: //default
            break;
	}
});
//左移
function moveLeft(){
    if(!canMoveLeft(board)) //判断是否能左移
        return false;
	for(var i = 0; i < 4; i++)
        for(var j = 1; j <4 ; j++){
            if(board[i][j] != 0){
                for(var k = 0; k < j; k++){
                    if(board[i][k] == 0 && noBlockHorizontal(i,k,j,board)){
                        //移动
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board)){
                        //移动
                        showMoveAnimation(i, j, i, k);
                        //叠加
                        board[i][k] *= 2;
                        board[i][j] = 0;
						score += board[i][k];
						updateScore(score);
                        continue;
                    }     
                }
            }
        }
    setTimeout('updateBoardView()',200);
    return true;  
}

function moveRight(){
	if(!canMoveRight(board))
		return false;
	for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 2 ; j >= 0 ; j -- ){
            if( board[i][j] != 0 ){
                for( var k = 3 ; k > j ; k -- ){

                    if( board[i][k] == 0 && noBlockHorizontal( i , j , k , board ) ){
                        showMoveAnimation( i , j , i , k );
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[i][k] == board[i][j] && noBlockHorizontal( i , j , k , board ) ){
                        showMoveAnimation( i , j , i , k);
                        board[i][k] *= 2;
                        board[i][j] = 0;
						score += board[i][k];
						updateScore(score);
                        continue;
                    }
                }
            }
        }
	setTimeout('updateBoardView()',200);
    return true;  
}

function moveUp(){
	if(!canMoveUp(board))
		return false;
	for(var j=0;j<4;j++)
		for(var i=1;i<4;i++){
			if(board[i][j] != 0){
				for(var k=0;k<i;k++){
					if(board[k][j] == 0 && noBlockVertical(j,k,i,board)){ //第j列，k到i行
						showMoveAnimation(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if(board[k][j] == board[i][j] && noBlockVertical(j,k,i,board)){
						showMoveAnimation(i,j,k,j);
						board[k][j] *= 2;
						board[i][j] = 0;
						score += board[k][j];
						updateScore(score);
						continue;
					}
				}
			}
		}
	setTimeout('updateBoardView()',200);
    return true; 
}
function moveDown(){
    if( !canMoveDown( board ) )
        return false;

    //moveDown
    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 2 ; i >= 0 ; i -- ){
            if( board[i][j] != 0 ){
                for( var k = 3 ; k > i ; k -- ){

                    if( board[k][j] == 0 && noBlockVertical( j , i , k , board ) ){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical( j , i , k , board ) ){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] *= 2;                      
                        board[i][j] = 0;
						score += board[k][j];
						updateScore(score);
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}
function updateScore(score){
	$("#score").text(score);
}
function isgameover(){
	if(nospace(board) && nomove(board)){
		alert("Game Over!!");
	}
}

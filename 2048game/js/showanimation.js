function showNumberWithAnimation(i, j, randNumber){
    var numberCell = $('#number-cell-'+i+'-'+j);
    numberCell.css('background-color',getNumberBackgroundColor(randNumber));
    numberCell.css('color',getNumberColor(randNumber));
    numberCell.text(randNumber);
	//50毫秒动画
    numberCell.animate({
        width:"90px",
        height:"90px",
        top:getPosTop(i,j),
        left:getPosLeft(i,j)
    },50);
}
//移动
function showMoveAnimation(fromx,fromy,tox,toy){
    var numberCell = $('#number-cell-' + fromx + '-' + fromy);
    numberCell.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy)
    },200);
}

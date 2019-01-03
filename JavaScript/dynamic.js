var index=1,timer;

function init(){
    eventBind();
    autoPlay();
}
init();
function autoPlay(){
    timer =setInterval(function () {
        animation(-1200);
        dotIndex(true);
    },3000)/*-------------------------------修改图片变换时间------------------------------------------*/
}
function stopAutoPlay() {
    clearInterval(timer);
}
function dotIndex(add){
    if(add){
        index++;
    }
    else{
        index--;
    }
    if(index>5){
        index = 1;
    }
    if(index<1){
        index = 5;
    }
    dotActive();
}
function dotActive() {
    var dots = document.getElementsByClassName("dot");
    var len = dots.length;
    for(var i=0 ;i<len ;i++){
        dots[i].className = "dot";
    }

    for(var i=0;i<len;i++){
        /*此处可以不用parseInt，当不用全等时*/
        if(index === parseInt(dots[i].getAttribute("index"))){
            dots[i].className = "dot active";
        }
    }
}
function eventBind(){
    /*点的点击事件*/
    var dots = document.getElementsByClassName("dot");
    var len = dots.length;
    for(var i=0;i<len;i++){
        (function(j){
            dots[j].onclick = function(e){
                var ind = parseInt(dots[j].getAttribute("index"));
                animation((index - ind)*(-1200));/*显示点击的图片*/
                index = ind;
                dotActive();
            }
        })(i)
    }
    /*容器的hover事件*/
    var con = document.getElementsByClassName("container")[0];
    /*鼠标移动到容器上时，停止制动滑动，离开时继续滚动*/
    con.onmouseover = function (e) {
        stopAutoPlay();
    }
    con.onmouseout =function(e){
        autoPlay();
    }
    /*箭头事件的绑定*/
    var pre = document.getElementsByClassName("pre")[0];
    var next = document.getElementsByClassName("next")[0];
    pre.onclick = function (e) {
        dotIndex(false);
        animation(1200);
    }
    next.onclick = function (e) {
        dotIndex(true);
        animation(-1200);
    }
}
function animation(offset){
    var lists = document.getElementsByClassName("list")[0];
    var left = parseInt(lists.style.left.slice(0,lists.style.left.indexOf("p"))) + offset;
    if(left<-6000){
        lists.style.left = "-1200px";
    }
    else if(left>-1200){
        lists.style.left = "-6000px";
    }
    else{
        lists.style.left = left+"px";
    }
}
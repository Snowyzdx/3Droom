window.onload=function () {
    var sence=document.querySelector(".sence");
    var room=document.querySelector(".room");

    //获取浏览器宽高
    var clientw=document.documentElement.clientWidth;
    var clienth=document.documentElement.clientHeight;

    //地板 天花板
    var ceil=document.querySelector(".panel:first-child");
    var floor=document.querySelector(".panel:nth-child(5)");
    ceil.style.width=ceil.style.height=floor.style.width=floor.style.height=clientw+"px";
    floor.style.top=-(clientw-clienth)+"px";

    room.style.transformOrigin="center center "+-clientw/2+"px";
    room.style.transform="translate3d(0,0,"+clientw+"px) rotate3d(0,1,0,0deg)";
    //设置最后一个面的位置
    var lastpanel=document.querySelector(".panel:last-child");
    lastpanel.style.transform="translate3d(0,0,"+-clientw+"px)";
    lastpanel.onclick=function(){
        room.style.transition="transform 2s ease";
        room.style.transform="translate3d(0,0,"+clientw/2+"px)  rotate3d(0,1,0,180deg)";
    };
    //房间内进行旋转

    var angle=0,angle1=0;
    flag1=false;

    document.onmousedown=function (e) {
        
        var startx=e.clientX;
        var starty=e.clientY;
        e.preventDefault();
        document.onmousemove=function(e){
            flag1=true;
            var movex=e.clientX;
            var movey=e.clientY;
            e.preventDefault();

            angle=Math.abs(movex-startx)>Math.abs(movey-starty)?movex-startx:movey-starty;

            room.style.transition="none";
            room.style.transform="translate3d(0,0,"+clientw/2+"px) rotate3d(0,1,0,"+(angle+angle1)+"deg)";
        };
        
        document.onmouseup=function () {
            if(flag1) {
                angle1+=angle;console.log(angle1+"onclick");
            }
            flag1=false;

            document.onmousemove=null;
            document.onmouseup=null;
        }
    };
    var panel=document.querySelectorAll(".panel");
    var flag=true;
    for(var i=0;i<panel.length;i++){
        if(i<panel.length-1) {
            panel[i].ondblclick = function () {
                room.style.transition = "transform 2s ease";
                if (flag) {
                    room.style.transform = "translate3d(0,0,1400px) rotate3d(0,1,0,"+angle1+"deg)";
                    flag = false;
                    console.log(room.style.transform);
                } else {
                    room.style.transform = "translate3d(0,0,"+clientw/2+"px) rotate3d(0,1,0,"+angle1+"deg)";
                    console.log(room.style.transform);
                    flag = true;
                }
            }
        }
    }
}

function autoStart(){
    var pwd=document.getElementById("pwdLogin"),
        quick=document.getElementById("quick-login"),
        tab1=document.getElementById("J_Static2Quick"),
        tab2=document.getElementById("J_Quick2Static"),
        login=document.getElementById("J_Login"),
        nick=document.getElementById("J_NickX1433840767962"),
        userna=document.getElementById("TPL_username_1"),
        qrcod=document.getElementById("J_QRCodeImg");

    tab2.onclick=function(){
        pwd.style.display="block";
        quick.style.display="none";
        tab2.style.borderBottom="1px solid #f40";
        tab1.style.borderBottom="1px solid #dedede";
    };
    tab1.onclick=function(){
        pwd.style.display="none";
        quick.style.display="block";
        tab1.style.borderBottom="1px solid #f40";
        tab2.style.borderBottom="1px solid #dedede";
    };
    userna.onclick=function(){
        nick.style.display="block";
        nick.onclick=function(){
            userna.value="";
        };
    };
    var opacity = 0;
    var interval;
    interval = setInterval(function(){
        opacity+=0.04;
        if (opacity<1) {
            login.style.opacity = opacity;
        }else{
            clearInterval(interval);
        }
    },50);






};

var email=document.getElementById("J_EmailFrom"),
    into=document.getElementById("J_InfoForm"),
    succ=document.getElementById("J_Succ"),
    btnemail=document.getElementById("J_BtnEmailForm"),
    btninfo=document.getElementById("J_BtnInfoForm"),
    createAccount=document.getElementById("r_p_createAccount"),
    fillUserInfo=document.getElementById("r_p_fillUserInfo"),
    regSuc=document.getElementById("r_p_regSuc"),
    agreebtn=document.getElementById("J_AgreementBtn"),
    agree=document.getElementById("J_AgreementDialog");


agreebtn.onclick=function(){
    agree.style.display="none";
}

btnemail.onclick=function(){
    into.style.display="block";
    email.style.display="none";
    createAccount.style.backgroundImage="url(images/ico-circle2.png)";
    fillUserInfo.style.backgroundImage="url(images/ico-circle1.png)";
};
btninfo.onclick=function(){
    succ.style.display="block";
    into.style.display="none";
    fillUserInfo.style.backgroundImage="url(images/ico-circle2.png)";
    regSuc.style.backgroundImage="url(images/ico-circle1.png)";
};
var emailput=document.getElementById("J_Email"),
    errorEmail=document.getElementById("J_error_Email"),
    putemail=document.getElementById("M_putemail"),
    merror=document.getElementById("M_errormail"),
    errorfrom=document.getElementById("M_errormailfrom"),
    okemail=document.getElementById("M_okemail"),
    erroed=document.getElementById("M_erroed");
emailput.onfocus=function (){
    putemail.style.display="block";
    errorfrom.style.display="none";
};
emailput.onblur=function(){
    putemail.style.display="none";
    if(this.value==''){
        merror.style.display="block";
    }
    else{
        var emailva = this.value;
        chkEmail(emailva);
        merror.style.display="none";
    }
};
function chkEmail(emailpu) {
    var checkEm = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!checkEm.test(emailpu)) {
        errorfrom.style.display="block";
    }
    else {
        okemail.style.display="block";
    }
};
var rePassword=document.getElementById("J_RePassword"),
    password=document.getElementById("J_Password");
rePassword.onblur=function(){
    if(rePassword.value != password.value){
        erroed.style.display="block";
    }
    else{
        erroed.style.display="none";
    }

}
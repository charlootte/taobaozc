$(document).ready(function() {


    //初始化页面
    var project = opener.project;

    function reset(obj) {
        var now = new Date();
        var ft = obj.finishTime.substr(0,10);
        var t = Date.parse(now) / (60 * 60 * 24 * 1000) - Date.parse(obj.startTime) / (60 * 60 * 24 * 1000);
        t = Math.round(t*100);
        var progress = Math.round(obj.currentMoney/obj.goalMoney*100)+ "%";
        $(".project_title h1").html(obj.proTitle);
        $(".box.proDes").html(obj.proDescribe);
        $(".current-money .money").html(obj.currentMoney);
        $(".target-money .fTime").html(ft);
        $(".percentage").html(progress);
        $(".target-money .money").html(obj.goalMoney);
        $(".data-number.people").html(obj.supportNum);
        $(".data-number.time").html(t);
        $(".repay1 p").html(obj.perSupport.payBack1);
        $(".repay2 p").html(obj.perSupport.payBack2);
        $(".repay3 p").html(obj.perSupport.payBack3);
        for (var i = 0; i < obj.img.length; i++) {
            insertImg(obj.img[i]);
        }
    }

    reset(project);


    //详情页tab选项卡的切换
    function tabchange() {
        $(".tabs_wrap li").click(function () {
            $(".tabs_wrap li").eq($(this).index())
                .addClass("selected")
                .siblings()
                .removeClass('selected');
            $(".project_content > div").eq($(this).index())
                .css('display', 'block')
                .siblings()
                .css('display', 'none');

        });
    }

    tabchange();

    //插入项目介绍的图片
    function insertImg(imgsrc) {
        var img = "<img src=\" images\\" + imgsrc + "\"" + "alt=\"\">";
        $(".cover").append(img);

    }

    //支持项目
    function mySupport(pro){
        $(".support").click(function(){
            var sNum =pro.supportNum + 1;
            var num = 0;
            var cMoney = 0;
            if($(this).attr("id")=="repay1"){
                num = 20;
            }else{
                if($(this).attr("id")=="repay2"){
                    num = 100;
                }else{
                    num = 200;
                }

            }
            cMoney = pro.currentMoney + num;
            $(".current-money .money").html(cMoney);
            $.ajax({
                type: "post",
                url: "/supportPro",
                data:{
                    _id:pro._id,
                    money:cMoney,
                    sptNum:sNum
                },
                success: function(data) {
                    alert("成功");
                },
                error: function(data) {
                    alert("失败");
                }
            })
        })

    }
    mySupport(project);

})
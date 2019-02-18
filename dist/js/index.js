var root = window.player;
var len,dataList,control,timer;
// var nowIndex = 0;
var audio = root.audioRender;
// console.log(root.indexControls)
console.log(audio);
function getData(url){
    $.ajax({
        type:'GET',
        url:url,
        success:function(data){
            console.log(data);
            len = data.length;
            dataList = data;
            // root.render(data[0]);
        //    audio.getAudio(data[0].audio);
           control = new root.indexControls(len);
            btnEvent();
            touchEvent();
          $('body').trigger('play:change',0);
        },
        error:function(data){
            console.log('error');
        }
    })
}


function btnEvent(){
      $('body').on('play:change',function(e,index){
        root.render(dataList[index]);
        audio.getAudio(dataList[index].audio);
        root.pro.renderAllTime(dataList[index].duration);
        if(audio.status == 'play'){
            audio.play();
            rotated(0);
        }
        $('.img-box').attr('data-deg',0);
        $('.img-box').css({
            'transform':'rotateZ('+0+'deg)',
            'transition':'none',
        })
      })

    $('.prev').on('click',function(){
        // if(nowIndex == 0){
        //     nowIndex = len - 1;
        // }else{
        //     nowIndex--;
        // }
        var i = control.prev();
        $('body').trigger('play:change',i);
        root.pro.start(0);
        if(audio.status == 'pause'){
            root.pro.stop()
        }
    });
    $('.next').on('click',function(){
        // if(nowIndex == len-1){
        //     nowIndex = 0;
        // }else{
        //     nowIndex++;
        // }
        var i = control.next();
        $('body').trigger('play:change',i);
        root.pro.start(0);
        if(audio.status == 'pause'){
            root.pro.stop()
        }
        // root.render(dataList[i]);
        // audio.getAudio(dataList[i].audio);
        // if(audio.status == 'play'){
        //     audio.play();
        // }
    })

    $('.play').on('click',function(){
        if(audio.status == 'pause'){
            audio.play();
            var deg = $('.img-box').attr('data-deg')||0;
            rotated(deg);
            root.pro.start();
        }else{
            audio.pause();
            clearInterval(timer);
            root.pro.stop();       
         }
        $('.play').toggleClass('playing');
    })
}

function rotated(deg){
    clearInterval(timer);
    // var deg = 2;
    deg = +deg;
    timer = setInterval(function(){
        
        deg+=2;
        $('.img-box').attr('data-deg',deg);
         $('.img-box').css({
             'transform':'rotateZ('+deg+'deg)',
             'transition':'all 1s ease-out',
         })
    },200)
}

function touchEvent(){
    var $slider = $('.slider');
    var bottom = $('.pro-bottom').offset();
    var l = bottom.left;
    var w = bottom.width;
    $slider.on('touchstart',function(){
        root.pro.stop();
        // console.log(e)
    }).on('touchmove',function(e){
        var x = e.changedTouches[0].clientX;
        var pre = (x-l)/w;
        if((pre>=0)&&(pre<=1)){
            root.pro.upDate(pre);
        }
    }).on('touchend',function(e){
        var x = e.changedTouches[0].clientX;
        var pre = (x-l)/w;
        if((pre>=0)&&(pre<=1)){
            var time = pre*dataList[control.index].duration;
            console.log(pre)
            root.pro.start(pre);
            audio.playTo(time);
            // console.log(0)
            audio.play();
            audio.status = 'play';
            $('.play').addClass('playing');
        }
       
    })
}



getData('../mock/data.json');
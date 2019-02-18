(function($,root){
      function renderImg(src){
           var img = new Image();
           img.src = src;
           img.onload = function(){
               $('.img-box img').attr('src',src);
               root.blurImg(img,$('body'));
           }
      }

      function renderInfo(info){
          var str = '<div class="song-name">'+info.song+'</div>\
          <div class="singer-name">'+info.singer+'</div>\
          <div class="album-name">'+info.album+'</div>';
          $('.song-info').html(str);
      }

      function isLike(like){
          if(like){
            $('.like').addClass('likeing');
          }else{
             $('.like').removeClass('likeing');
          }
      }
    root.render = function(data){
        renderImg(data.image);
        renderInfo(data);
        isLike(data.isLike);
    }
})(Zepto,window.player||(window.player = {}))
(function($,root){
    var format,lastPro=0,pre,duration;
       function renderAllTime(all){
           duration = all;
            var time = formatTime(all);
            $('.all-time').html(time);
       }

       function formatTime(t){
           t = Math.round(t);
            var m = Math.floor(t/60);
            var s = t - (m*60);
           m = (m<10)?('0'+m):m;
           s = (s<10)?('0'+s):s;
            return m+':'+s;
       }

       function start(j){
          
           cancelAnimationFrame(format);
            pre = new Date().getTime();
            
            lastPro = (j == undefined)?lastPro:j;
            console.log(lastPro)
           function now(){
               var cur = new Date().getTime();
               //比例
               var curtime = lastPro+(cur-pre)/(duration*1000);
               console.log(curtime)
               if(curtime<1){
                   upDate(curtime);
               }else{
                cancelAnimationFrame(format);
               }

            format = requestAnimationFrame(now);
           }
           now();
       }

   function upDate(curt){
        var size = formatTime(curt*duration);
        $('.cur-time').html(size);
        var x = (curt - 1)*100;
        $('.pro-top').css({
            transform:'translateX('+x+'%)',
        })
   }

   function stop(){
         cancelAnimationFrame(format);
         var nowe = new Date().getTime();
         lastPro = lastPro + (nowe - pre)/(duration*1000);
   }

       root.pro = {
           renderAllTime:renderAllTime,
           start:start,
           stop:stop,
           upDate:upDate,
       }
})(window.Zepto,window.player||(window.player={}))
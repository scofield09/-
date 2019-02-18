(function($,root){
    function RenderAudio(){
        this.status = 'pause';
        this.audio = new Audio();
    }
    RenderAudio.prototype.play = function(){
        this.status = 'play';
        this.audio.play();
    }
    RenderAudio.prototype.pause = function(){
        this.status = 'pause';
        this.audio.pause();
    }
    RenderAudio.prototype.getAudio = function(src){
        // this.status = 'loaded';
        this.audio.src = src;
        
        this.audio.load();
        console.log(src)
    }
    RenderAudio.prototype.playTo = function(t){
      this.audio.currentTime = t;
    }
    root.audioRender = new RenderAudio(); 
})(window.Zepto,window.player||(window.player={}))
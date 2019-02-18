(function($,root){
    function Controls(len){
        this.index = 0;
        this.len = len;
    }
    Controls.prototype = {
        prev:function(){
            return this.getIndex(-1);
        },
        next:function(){
            return this.getIndex(1);
        },
        getIndex:function(val){
            var index = this.index;
            var len = this.len;
            var cur = (len + val + index)%len;
            this.index = cur;
            return cur;
        }
    }
    root.indexControls = Controls;
})(window.Zepto,window.play||(window.player = {}))
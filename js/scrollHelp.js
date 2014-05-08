
	var scrollHelp = function (win) {
	    this.win = win;
	    this.step = 80;
	    this.interval = 0;
	    this.intervalID = null;
	    this.upOrDown = "";
	    this.init();
	}
	scrollHelp.prototype = {
	    init: function () {
	        var _this = this;
	  //       if(document.attachEvent){ 
			// 	document.attachEvent('onmousewheel',scrollHander); 
			// }else{
            _this.win.onmousewheel = function (e) {
            	// clearInterval(_this.intervalID);
            	if(!$(window).is(":animated")){
	                e = e || window.event;
	                _this.upOrDown = e.wheelDelta > 0 ? "up" : "dw";
	                _this.scrollHander();
	                e.returnValue = false;
	            }	            
	        // }
	        } 
	    },
	    scrollHander: function () {	    	
	        var _this = this;
	        if (document.attachEvent) {
	        	var tar = document.documentElement.scrollTop + _this.step * (_this.upOrDown === "up" ? -2 : 2);
	        }else{
	        	var tar = _this.win.scrollTop + _this.step * (_this.upOrDown === "up" ? -1 : 1);
	        }
	        console.log(document.documentElement.scrollTop);
	        console.log(tar);
	        // _this.intervalID = setInterval(function () {
	        //     //缓动
	        //     _this.win.scrollTop += (tar - _this.win.scrollTop) * _this.f + 7*(_this.upOrDown === "up" ? -1 : 1);
	        //     if (_this.upOrDown === 'up') {
	        //     	if (tar >= _this.win.scrollTop) {
		       //          clearInterval(_this.intervalID);
		       //      }
	        //     }else if(_this.upOrDown === 'dw'){
	        //     	if (tar <= _this.win.scrollTop) {
		       //          clearInterval(_this.intervalID);
		       //      }
	        //     }	           
	        //     if (_this.win.scrollTop===0) clearInterval(_this.intervalID);
	        //     // if (_this.win.scrollTop===5517) clearInterval(_this.intervalID);
	        // }, _this.interval);

	        $('body').stop().animate({scrollTop:tar},400);
	        window.event.preventDefault();
	    }
	}
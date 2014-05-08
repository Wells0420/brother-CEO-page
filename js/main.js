var inheriting = {};
var win = document.getElementById('win');
	new scrollHelp(win);
/* BaseClass
 ------------------------------------ */
function BaseClass($section){
	if(arguments[0] === inheriting) return;
	this.$section = $section;	
}
BaseClass.prototype = {
	visible : true,
	bk_move_delta: 300,
	$section: null,
	contentVisible : false,
	
	//Public Method
	resize : function(){},
	
	align: function(move_ratio, move_position){
			
	},
	
	showMe: function(){
        this.visible = true;
        this.$section.removeClass("inactive");
    },
	
	hideMe: function(){
        this.visible = false;
        this.$section.addClass("inactive");
    },
	
	height: function(){
		return this.$section.height();	
	},
	
	top: function(){
		return this.$section.position().top;	
	},
	
	updateBgPos: function(move_ratio){
		this.$section.css({"background-position":"50% -" + this.bk_move_delta*move_ratio + "px"});	
	}
	
};

/* Video
 ------------------------------------ */
function Video($section){
	BaseClass.call(this, $section);
	this.$videoContent = $("#videoContent");
	this.$ceoPic = $("#ceo-pic");
	this.$ceoWords = $("#ceo-words");
	this.$joinBtn = $("#btn-join-1");
	
}
Video.prototype = new BaseClass(inheriting);
Video.prototype.align = function(move_ratio, move_position){
	var topPos = move_position-windowHeight;
	
	this.$ceoPic.css("marginTop", 150*move_ratio);
	this.$ceoWords.css("marginTop", 200-200*move_ratio);
	//this.$joinBtn.css("marginTop", 100*move_ratio);

	if(topPos > 100){
		this.$ceoPic.stop().fadeTo(1000,1);
	}
	if(topPos > 400){
		this.$ceoWords.stop().show().fadeTo(1000,1);	
	}
	if(topPos > 700){
		this.$joinBtn.addClass('scale-1');		
	}
	if(topPos < 100){
		this.$ceoPic.stop().fadeTo(1000,0);
        this.$ceoWords.stop().show().fadeTo(1000,0);	
		this.$joinBtn.removeClass('scale-1');	
	}	
};
Video.prototype.resize = function(){
	$("#video .video-bg").css('height',windowHeight+100);
	$("#video .slogan").css({'margin-top':'-230px'});
	this.$ceoPic.css('top','10%');
	this.$ceoWords.css('top','20%');
};

Video.prototype.bk_move_delta = 0;

/* Ceo
 ------------------------------------ */
function Ceo($section){
	BaseClass.call(this, $section);
	this.$hiddenElements = $('.hidden',$section);
	
	this.$time0 = $('#time0',$section);
	this.$time1 = $('#time1',$section);
	this.$time2 = $('#time2',$section);
	this.$wineGlass = $('#wine-glass',$section);
	this.$wine = $('#wine',$section);
	this.$room = $('#room',$section);
	this.$food1 = $('#food1',$section);
	this.$person1 = $('#person1',$section);
	this.$moveBg = $('#move-bg',$section);
	this.$ceo1Bg = $('#ceo-1',$section);
	this.$ceoTitle = $('#ceoTitle',$section);
	this.$car = $('#car',$section);
	this.$person2 = $('#person2',$section);
	this.$person2Words = $('#person2-words',$section);
	
	this.$moveBg.data('visible',false);
	this.$room.data('visible',false).css('top',windowHeight+'px');
}
Ceo.prototype = new BaseClass(inheriting);
Ceo.prototype.align = function(move_ratio, move_position){
	var topPos = move_position - windowHeight;
	var that = this;
	
	
	if(topPos > -200){
		this.$ceo1Bg.stop().show().animate({'top':'600px','opacity':1},1000);		
	}else{
		this.$ceo1Bg.stop().animate({'top':'700px','opacity':0},100,function(){this.hide();});		
	}
	if(topPos > -400){
		this.$room.animate({top:windowHeight-200 + 'px'},{queue: false, easing: 'easeOutExpo', duration: 1000});
		this.$room.data('visible',true);
	}else{
		if(this.$room.data('visible'))
		this.$room.animate({top:windowHeight +'px'},{queue: false, easing: 'easeOutExpo', duration: 1000});	
	}

	if(topPos > -200){
		this.$food1.addClass('scale-1');	
		this.$person1.addClass('scale-1');	
	}else if(topPos <= 200){
		this.$food1.removeClass('scale-1');	
		this.$person1.removeClass('scale-1');		
	}
	if(topPos > 0){
		this.$moveBg.stop().animate({left: '0%'},{queue: false, easing: 'easeOutExpo', duration: 1000});	
		this.$moveBg.data('visible',true);
		
	}else{
		if(this.$moveBg.data('visible'))
		this.$moveBg.stop().animate({left: '-100%'},{queue: false, easing: 'easeOutExpo', duration: 1000})
	}
	if(topPos > 100){
		this.$car.stop().animate({left: '100px'},{queue: false, easing: 'easeOutExpo', duration: 1000});	
		this.$person2.stop().animate({right: '100px'},{queue: false, easing: 'easeOutExpo', duration: 1000,complete:function(){that.$person2Words.addClass('scale-1')}});	
		
	}else{
		this.$car.stop().animate({left: '-540px'},{queue: false, easing: 'easeOutExpo', duration: 1000});	
		this.$person2.stop().animate({right: '-217px'},{queue: false, easing: 'easeOutExpo', duration: 1000});	
		this.$person2Words.removeClass('scale-1');
	}
	this.$wineGlass.css("background-position","50% -" +1800*move_ratio + "px");
	this.$wine.css("background-position","50% -" +400*move_ratio + "px");
	this.$room.css("background-position","50% -" +800*move_ratio + "px");
	this.$time1.css("marginTop", 300*move_ratio);
	this.$food1.css("marginTop", -500*move_ratio);
	this.$person1.css("marginTop", -700*move_ratio);
	this.$ceo1Bg.css("marginTop", -300*move_ratio).css({"background-position":"50% " + 150*move_ratio + "px"});	;
}
Ceo.prototype.showMe = function(){
	BaseClass.prototype.showMe.call(this);	
}
Ceo.prototype.hideMe = function(){
	BaseClass.prototype.hideMe.call(this)
	
}

Ceo.prototype.bk_move_delta = 200;


/* Ceo-2
 ------------------------------------ */
function Ceo2($section){
	BaseClass.call(this, $section);
	this.$time3 = $('#time3',$section);
	this.$time4 = $('#time4',$section);
	this.$time5 = $('#time5',$section);
	this.$notebook = $('#notebook',$section);
	this.$gita = $('#gita',$section);
	this.$food2 = $('#food2',$section);
	this.$btn = $('#btn-join-2',$section);
	this.$txt1 = $('#txt1',$section);
	
}
Ceo2.prototype = new BaseClass(inheriting);
Ceo2.prototype.align = function(move_ratio,move_position){
	var topPos = move_position - windowHeight;
	var that = this;

	if(topPos>100){
		this.$time3.addClass('scale-1');
	}else{
		this.$time3.removeClass('scale-1');	
	}
	if(topPos>200){
		this.$time4.stop().show().fadeTo(1000,1);	
		this.$time5.stop().show().fadeTo(1000,1);	
	}else{
		this.$time4.stop().hide().fadeTo(0,0);
		this.$time5.stop().hide().fadeTo(0,0);
	}
	if(topPos>600){
		this.$notebook.addClass('scale-1');	
	}else{
		this.$notebook.removeClass('scale-1');		
	}
	if(topPos>700){
		this.$gita.stop().show().fadeTo(1000,1);	
	}else{
		this.$gita.stop().hide().fadeTo(0,0);
	}
	if(topPos>1100){
		this.$food2.addClass('scale-1');	
		setTimeout(function(){that.$txt1.stop().show().fadeTo(1000,1);},1000);	
	}else{
		this.$food2.removeClass('scale-1');	
		this.$txt1.stop().hide().fadeTo(0,0);
	}
	if(topPos>1400){
		this.$btn.addClass('scale-1');	
	}else{
		this.$btn.removeClass('scale-1');		
	}
	this.$time3.css("marginTop", -400*move_ratio);
	this.$notebook.css("marginTop", 100-100*move_ratio);
	this.$gita.css("marginTop", -400*move_ratio);

}

Ceo2.prototype.bk_move_delta = 600;

/* Life
 ------------------------------------ */
function Life($section){
	BaseClass.call(this, $section);
	this.$person3 = $('#person3',$section);
	this.$vegetable = $('#vegetable',$section);
	this.$txt2 = $('#txt2',$section);
	this.$person3Word = this.$person3.find("#person3-word");
}
Life.prototype = new BaseClass(inheriting);
Life.prototype.align = function(move_ratio, move_position){
	var topPos = move_position - windowHeight;
	var that = this;

	if(topPos > 0){
		this.$person3.animate({'left':windowWidth/5*3,'top':65},{queue: false, easing: 'easeOutExpo', duration: 5000,complete:function(){that.$person3Word.addClass('scale-1');}});	
		this.$vegetable.animate({'left':0,'top':15},{queue: false, easing: 'easeOutExpo', duration: 5000});	
		
		
	}else{
		this.$person3.stop().animate({'left':-320,'top':65},{queue: false, easing: 'easeOutExpo', duration: 2000});	
		this.$vegetable.stop().animate({'left':-820,'top':15},{queue: false, easing: 'easeOutExpo', duration: 3000});		
		this.$person3Word.removeClass('scale-1');
	}
}

Life.prototype.bk_move_delta = 50;

function Life2($section){
	BaseClass.call(this, $section);
	this.$lifeBg1 = $('#lifeBg1',$section);
	this.$lifeBg2 = $('#lifeBg2',$section);
	this.$lifeBg3 = $('#lifeBg3',$section);
}
Life2.prototype = new BaseClass(inheriting);
Life2.prototype.align = function(move_ratio, move_position){
	var topPos = move_position - windowHeight;
	var that = this;

	this.$lifeBg1.css("background-position","50% -" +10*move_ratio + "px");
	this.$lifeBg2.css("background-position","50% " +500*move_ratio + "px");
	this.$lifeBg3.css("background-position","50% -" +1200*move_ratio + "px");
}

Life2.prototype.bk_move_delta = 300;

//---------------------------------------
function Con1($section){
	BaseClass.call(this, $section);
	this.$txtContent = $('#fixCon-1', $section);
	this.$person6 = $('#person6', $section);
	this.$person6Wd = $('#person6-wd', $section);	
	this.$person7 = $('#person7', $section);	
	this.$person7Wd = $('#person7-wd', $section);
	this.$btn = $('#btn-join-3',$section);
	this.$printer = $('#printer',$section);
}
Con1.prototype = new BaseClass(inheriting);
Con1.prototype.align = function(move_ratio, move_position){
	var topPos = move_position - windowHeight;
	var that = this;

	if(topPos > 500){
		this.$person6.stop().show().animate({top:'-200px',opacity:1},{queue: false, easing: 'easeOutBack', duration: 500,complete:function(){that.$person6Wd.addClass('scale-1')}});		
	}
	if(topPos > 1200){
		this.$person7.stop().show().animate({top:'500px',opacity:1},{queue: false, easing: 'easeOutExpo', duration: 800,complete:function(){that.$person7Wd.addClass('scale-1')}});		
	}
	if(topPos > 1400){
	  this.$printer.stop().show().animate({top:'600px',opacity:1},{queue: false, easing: 'easeOutExpo', duration: 800});	
	}
	if(topPos > 1500){
		this.$btn.addClass('scale-1');
	}
	this.$txtContent.css('marginTop', 1000-1500*move_ratio);
	
}
Con1.prototype.bk_move_delta = 100;

//---------------------------------------
function Con2($section){
	BaseClass.call(this, $section);
	this.$txtContent = $('#fixCon-2', $section);
	this.$person8 = $('#person8', $section);
	this.$person9 = $('#person9', $section);
	this.$btn = $('#btn-join-4',$section);
	this.$refresh = $('#refresh',$section);
	this.$fivem = $('#fivem',$section);
}
Con2.prototype = new BaseClass(inheriting);
Con2.prototype.align = function(move_ratio, move_position){
	var topPos = move_position - windowHeight;
	var that = this;
	
	if(topPos > 800){
		this.$person8.stop().show().animate({top:'500px',opacity:1},{queue: false, easing: 'easeOutExpo', duration: 800});	
		this.$person9.stop().show().animate({top:'500px',opacity:1},{queue: false, easing: 'easeOutExpo', duration: 800});	
	}
	if(topPos > 1100){
		this.$refresh.stop().show().fadeTo(100,1).addClass('rotate-1');
	}
	if(topPos > 1400){
		this.$fivem.addClass('scale-1');
	}
	if(topPos > 1500){
		this.$btn.addClass('scale-1');
	}
	this.$txtContent.css('marginTop', 900-1700*move_ratio);
	
}
Con2.prototype.bk_move_delta = 100;

//---------------------------------------
function Con3($section){
	BaseClass.call(this, $section);
	this.$txtContent = $('#fixCon-3', $section);
	this.$person10 = $('#person10', $section);
	this.$person10Wd = $('#person10-wd', $section);
	this.$btn = $('#btn-join-5',$section);

}
Con3.prototype = new BaseClass(inheriting);
Con3.prototype.align = function(move_ratio, move_position){
	var topPos = move_position - windowHeight;
	var that = this;
	
	if(topPos > -100){
		this.$person10.stop().show().animate({top:'-60px',opacity:1},{queue: false, easing: 'easeOutBack', duration: 500,complete:function(){that.$person10Wd.addClass('scale-1')}});		
	}
	if(topPos > 200){
		this.$btn.addClass('scale-1');
	}
	this.$txtContent.css('marginTop', 1100-1700*move_ratio);
	
}
Con3.prototype.bk_move_delta = 100;

//---------------------------------------
function Con4($section){
	BaseClass.call(this, $section);
	this.$txtContent = $('#fixCon-4', $section);
	this.$share1 = $('#sina-share', $section);
	this.$share2 = $('#qq-share', $section);
	this.$share3 = $('#qzone-share', $section);
	this.$share4 = $('#renren-share', $section);

}
Con4.prototype = new BaseClass(inheriting);
Con4.prototype.align = function(move_ratio, move_position){
	var topPos = move_position - windowHeight;
	var that = this;
	
	if(topPos > -100){
		setTimeout(function(){that.$share1.addClass('scale-1');},0);
		setTimeout(function(){that.$share2.addClass('scale-1');},100);
		setTimeout(function(){that.$share3.addClass('scale-1');},200);
		setTimeout(function(){that.$share4.addClass('scale-1');},300);
	}
	this.$txtContent.css('marginTop', 1100-1500*move_ratio);
	
}
Con4.prototype.bk_move_delta = 210;
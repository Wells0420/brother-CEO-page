var windowWidth = $(window).width(),
	windowHeight = $(window).height();
/* ---------------------------------- */
/* Class */
function Base($slide){
	this.$slide = $slide;	
}

Base.prototype = {
	bg_delta : 10,
	align: function(){
		//abstatct class function	
	},
	updateBgPos : function(move_ratio){
		this.$slide.css('background-position','50% -' + this.bg_delta * move_ratio + "px");		
	}
}
/* ---------------------------------- */
/* Intro Class */
var Intro = function($slide){
	Base.call(this, $slide);		
}
Intro.prototype = new Base();
Intro.prototype.constuctor = Intro;

/* ---------------------------------- */
/* Story Class */
var Story = function($slide){
	Base.call(this, $slide);	
	this.$ceoPic = $("#ceo-pic", $slide);
	this.$ceoWords = $("#ceo-words", $slide);
	this.$joinBtn = $("#btn-join-1", $slide);	
}
Story.prototype = new Base();
Story.prototype.constuctor = Story;
Story.prototype.align = function(move_ratio, move_position, height){
	var mp = move_position;

	if(mp > height-50){
		this.$joinBtn.addClass('scale-1');	
	}
	if(mp < 100){	
		this.$joinBtn.removeClass('scale-1');	
	}
}

/* ---------------------------------- */
/* Goodlife Class */
var Goodlife = function($slide){
	Base.call(this, $slide);	
	this.$wineGlass = $('#wine-glass',$slide);
	this.$wine = $('#wine',$slide);	
	this.$food1 = $('#food1',$slide);	
	this.$time0 = $('#time0',$slide);	
	this.$time1 = $('#time1',$slide);	
	this.$moveBg = $('#move-bg',$slide);
	this.$car = $('#car',$slide);
	this.$person2 = $('#person2',$slide);
	this.$person2Words = $('#person2-words',$slide);
	this.$notebook = $('#notebook',$slide);
	this.$gita = $('#gita',$slide);
	this.$food2 = $('#food2',$slide);
	this.$btn = $('#btn-join-2',$slide);
	this.$txt1 = $('#txt1',$slide);	
}
Goodlife.prototype = new Base();
Goodlife.prototype.constuctor = Goodlife;
Goodlife.prototype.align = function(move_ratio, move_position, height){
	var mp = move_position;
	var that = this;
	
	if(mp > 580){
		this.$food1.addClass('scale-1');	
	}else{
		this.$food1.removeClass('scale-1');			
	}
	if(mp > 800){
		this.$moveBg.stop().animate({left: '0%'},{queue: false, easing: 'easeOutExpo', duration: 1000});	
		this.$moveBg.data('visible',true);	
	}else{
		if(this.$moveBg.data('visible'))
		this.$moveBg.stop().animate({left: '-100%'},{queue: false, easing: 'easeOutExpo', duration: 1000})
	}
	if(mp > 1110){
		this.$car.stop().animate({left: '100px'},{queue: false, easing: 'easeOutExpo', duration: 1000});	
	}else{
		this.$car.stop().animate({left: -500 + move_ratio*200 + 'px'},{queue: false, easing: 'easeOutExpo', duration: 1000});	
	}
	if(mp > 900){	
		this.$person2.stop().animate({right: '200px'},{queue: false, easing: 'easeOutExpo', duration: 1000});
		setTimeout(function(){that.$person2Words.css('opacity',1).addClass('scale-1')},300);		
	}else{
		that.$person2Words.removeClass('scale-1').css('opacity',0);
		this.$person2.stop().animate({right: -200 + move_ratio*200 + 'px'},{queue: false, easing: 'easeOutExpo', duration: 1000});
	}
	if(mp > 1300){
		this.$time1.addClass('scale-1');	
		this.$time1.css("margin-top",-200*move_ratio+ "px");
	}
	else{
		this.$time1.removeClass('scale-1');		
	}
	if(mp > 1500){
		this.$food2.addClass('scale-1');	
	}else{
		this.$food2.removeClass('scale-1');		
	}
	if(mp > 1860){
		this.$btn.addClass('scale-1');	
	}
	else{
		this.$btn.removeClass('scale-1');		
	}

	this.$wineGlass.css("background-position","50% -" + 1500*move_ratio + "px");
	this.$wine.css("background-position","50% " + (200*move_ratio-50) + "px");
	this.$time0.css("background-position","0 " + (10-400*move_ratio)+ "px");
	this.$notebook.css("background-position","0 " + (600-600*move_ratio + "px"));
	this.$gita.css("background-position","50% " + (-200*move_ratio + "px"));
}

/* ---------------------------------- */
/* Badlife Class */
var Badlife = function($slide){
	Base.call(this, $slide);	
	this.$lifemask = $('#lifemask', $slide);	
	this.$time5 = $('#time5', $slide);
	this.$person3 = $('#person3',$slide);
	this.$vegetable = $('#vegetable',$slide);
	this.$person3Word = this.$person3.find("#person3-word");
	this.$moveBg = $('#move-bg1',$slide);
	this.$person12 = $('#person12',$slide);
	this.$person13 = $('#person13',$slide);
	this.$person12Wd = $('#person12-wd',$slide);
	this.$person13Wd = $('#person13-wd',$slide);
	this.$picBg1 = $('#pic-bg1',$slide);
	this.$picBg2 = $('#pic-bg2',$slide);
	this.$picBg3 = $('#pic-bg3',$slide);
	this.$btn = $('#btn-join-8',$slide);
}
Badlife.prototype = new Base();
Badlife.prototype.constuctor = Badlife;
Badlife.prototype.align = function(move_ratio, move_position, height){
	var mp = move_position;
	var that = this;
	
	if(mp > 500){
		this.$person3.animate({'left':windowWidth-600,'top':245},{queue: false, easing: 'easeOutExpo', duration: 5000});	
		this.$vegetable.animate({'left':0,'top':185},{queue: false, easing: 'easeOutExpo', duration: 5000});	
		setTimeout(function(){that.$person3Word.addClass('scale-1')},1000);
		
	}else{
		this.$person3.stop().animate({'left':-320,'top':200},{queue: false, easing: 'easeOutExpo', duration: 2000});	
		this.$vegetable.stop().animate({'left':-820,'top':200},{queue: false, easing: 'easeOutExpo', duration: 3000});		
		this.$person3Word.removeClass('scale-1');
	}
	
	if(mp > 1200){
		this.$moveBg.stop().animate({left: '0%'},{queue: false, easing: 'easeOutExpo', duration: 1000});		
	}else{
		this.$moveBg.stop().animate({left: '100%'},{queue: false, easing: 'easeOutExpo', duration: 1000})
	}
	if(mp > 1200){
		this.$person12.stop().animate({left: '50px'},{queue: false, easing: 'easeOutExpo', duration: 1000});	
		this.$person13.stop().animate({right: '150px'},{queue: false, easing: 'easeOutExpo', duration: 1000});	
		setTimeout(function(){that.$person12Wd.addClass('scale-1');that.$person13Wd.addClass('scale-1')},500);
	}else{
		this.$person12.stop().animate({left: -230 + move_ratio*200 + 'px'},{queue: false, easing: 'easeOutExpo', duration: 1000});	
		this.$person13.stop().animate({right: -200 + move_ratio*200 + 'px'},{queue: false, easing: 'easeOutExpo', duration: 1000});
		that.$person12Wd.removeClass('scale-1');
		that.$person13Wd.removeClass('scale-1');
	}
	if(mp > 1900){
		this.$btn.addClass('scale-1');	
	}else{
		this.$btn.removeClass('scale-1');		
	}
	this.$lifemask.css('top',100*move_ratio-200);
	this.$time5.css("background-position","0 " + -150*move_ratio + "px");
	//this.$picBg1.css("background-position","100% " + 250*move_ratio + "px");
	this.$picBg2.css("background-position","50% -" + 1050*move_ratio + "px");
	this.$picBg3.css("background-position","50% " + (-750*move_ratio)+ "px");
	
		
}
/* ---------------------------------- */
/* Rules Class */
var Rules = function($slide){
	Base.call(this, $slide);	
	this.$txtContent = $('.fixed-con', $slide);
	this.$person6 = $('#person6', $slide);
	this.$person6Wd = $('#person6-wd', $slide);	
	this.$person7 = $('#person7', $slide);	
	this.$person7Wd = $('#person7-wd', $slide);
	this.$btn = $('#btn-join-3',$slide);
	this.$printer = $('#printer',$slide);	
}
Rules.prototype = new Base();
Rules.prototype.constuctor = Rules;
Rules.prototype.align = function(move_ratio, move_position, height){
	var mp = move_position;
	var that = this;

	if(mp > 550){
		this.$person6.stop().show().animate({top:'-150px',opacity:1},{queue: false, easing: 'easeOutBack', duration: 500});
	  	setTimeout(function(){that.$person6Wd.addClass('scale-1')},500);	
	}
	if(mp > 1000){
		this.$person7.stop().show().animate({top:'500px',opacity:1},{queue: false, easing: 'easeOutExpo', duration: 800});	
		setTimeout(function(){that.$person7Wd.addClass('scale-1')},500);	
	}
	if(mp > 1100){
	  this.$printer.stop().show().animate({top:'625px',opacity:1},{queue: false, easing: 'easeOutExpo', duration: 800});	
	}
	if(mp > 1200){
		this.$btn.addClass('scale-1');
	}
	this.$txtContent.css('marginTop', 800-1000*move_ratio + 'px');
}
/* ---------------------------------- */

/* ---------------------------------- */
/* RulesA Class */
var RulesA = function($slide){
	Base.call(this, $slide);	
	this.$txtContent = $('.fixed-con', $slide);
	this.$person8 = $('#person8', $slide);
	this.$person9 = $('#person9', $slide);
	this.$btn = $('#btn-join-4',$slide);
	this.$refresh = $('#refresh',$slide);
	this.$fivem = $('#fivem',$slide);
	this.$fivemt = $('#fivemt',$slide);
}
RulesA.prototype = new Base();
RulesA.prototype.constuctor = RulesA;
RulesA.prototype.align = function(move_ratio, move_position, height){
	var mp = move_position;
	var that = this;
	
	if(mp > 920){
		this.$person8.stop().show().animate({top:'500px',opacity:1},{queue: false, easing: 'easeOutExpo', duration: 800});	
		this.$person9.stop().show().animate({top:'500px',opacity:1},{queue: false, easing: 'easeOutExpo', duration: 800});	
		this.$refresh.stop().show().fadeTo(100,1).addClass('rotate-1');
	}
	if(mp > 1000){
		setTimeout(function(){that.$fivem.addClass('scale-1')},500);
		setTimeout(function(){that.$fivemt.addClass('scale-1')},0);
	}
	if(mp > 1200){
		this.$btn.addClass('scale-1');
	}
	this.$txtContent.css('marginTop', 800-1000*move_ratio);
}
/* ---------------------------------- */

/* ---------------------------------- */
/* RulesB Class */
var RulesB = function($slide){
	Base.call(this, $slide);	
	this.$txtContent = $('.fixed-con', $slide);
	this.$person10 = $('#person10', $slide);
	this.$person10Wd = $('#person10-wd', $slide);
	this.$btn = $('#btn-join-5',$slide);
}
RulesB.prototype = new Base();
RulesB.prototype.constuctor = RulesA;
RulesB.prototype.align = function(move_ratio, move_position, height){
	var mp = move_position;
	var that = this;
	
	if(mp > 500){
		this.$person10.stop().show().animate({top:'-60px',opacity:1},{queue: false, easing: 'easeOutBack', duration: 500});
		setTimeout(function(){that.$person10Wd.addClass('scale-1')},500);		
	}
	if(mp > 900){
		this.$btn.addClass('scale-1');
	}
	this.$txtContent.css('marginTop', 800-1000*move_ratio);
}
/* ---------------------------------- */

/* ---------------------------------- */
/* RulesC Class */
var RulesC = function($slide){
	Base.call(this, $slide);	
	this.$txtContent = $('.fixed-con', $slide);
	this.$share1 = $('#sina-share', $slide);
	this.$share2 = $('#qq-share', $slide);
	this.$share3 = $('#qzone-share', $slide);
	this.$share4 = $('#renren-share', $slide);
	this.$earth = $('#earth', $slide);
}
RulesC.prototype = new Base();
RulesC.prototype.constuctor = RulesA;
RulesC.prototype.align = function(move_ratio, move_position, height){
	var mp = move_position;
	var that = this;
	if(mp > height-150){
		this.$earth.addClass('scale-1');	
	}
	if(mp > height-100){
		setTimeout(function(){that.$share1.addClass('scale-1');},0);
		setTimeout(function(){that.$share2.addClass('scale-1');},100);
		setTimeout(function(){that.$share3.addClass('scale-1');},200);
		setTimeout(function(){that.$share4.addClass('scale-1');},300);
	}
	this.$txtContent.css('marginTop', 900-1500*move_ratio);
}
/* ---------------------------------- */
var SectionApps = [];
var className = [Intro,Story,Goodlife,Badlife,Rules,RulesA,RulesB,RulesC];
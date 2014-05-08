// parallax.js

//main configs
var currentHoverIndex = 0,
    selectedMenuId = 0,
	$contentBlocks;

var sectionApps = [],
    currentMenuItem;

//===================================
function onResize(){
	for(var index in sectionApps){
		var sectionApp = sectionApps[index]
		sectionApp.resize();	
	}
	
	//change image size according to windowHeight
	if(windowHeight < 700)
	{
		$resizable.addClass('img-w-1').removeClass('img-w-2');	
	}	
	else{
		$resizable.addClass('img-w-2').removeClass('img-w-1');	
	}
}

function move(forceAlign){
	var pos = $window.scrollTop();
	var pos_w = pos + windowHeight;	
	
	forceAlign = forceAlign || false;
	
	var hoverIndex = 0;
	for(var index in sectionApps){
		var sectionApp = sectionApps[index];
		var sectionTop = sectionApp.top();
		var sectionH = sectionApp.height();
		var move_ratio = 0;
		var move_position = 0;
		if(pos_w > sectionTop && pos_w < sectionTop + sectionH + windowHeight){
			if(!sectionApp.visible || forceAlign) sectionApp.showMe();
			move_ratio = (pos - sectionTop + windowHeight) / (sectionH + windowHeight);
			move_position = pos + windowHeight - sectionTop;
			sectionApp.updateBgPos(move_ratio);
			sectionApp.align(move_ratio, move_position);	
		}
		else{
			if(sectionApp.visible) sectionApp.hideMe();	
		}
		if(sectionTop <= pos + 15){
			hoverIndex = index;	
		}	
	}
	if(hoverIndex != currentHoverIndex){
		if(currentMenuItem){
			currentMenuItem.removeClass("selected");	
		}	
		if(hoverIndex > 0){
			currentMenuItem = $("#menu-item-" + hoverIndex).addClass("selected");	
		}
		currentHoverIndex = hoverIndex;
		selectedMenuId = currentHoverIndex;
	}
}
/* videoPlayer 
---------------------------------------*/
(function($){
	$.fn.videoPlayer = function(){
		this.each(function(){
						   
			var $self = $(this),
            $a_close = $self.find('a#close-video'),
            $a_play = $('[data-videoid]'),
            $darkslide = $self.find('.darkslide'),
            $container = $self.find('#video-container');
			
			$a_play.bind('click',
            function(e){
				_show_video( $(this).attr('data-videoid') );
				
              	e.preventDefault();
            })
         
        	$a_close.bind('click',
            function(e){
              _close_video();
              e.preventDefault();
            })

			function _show_video(vid) {
          		$self.addClass('_playing');
          		$darkslide.css({height: '100%'}).animate({opacity:.9},800,'easeInOutExpo',_bind_container(vid));
				var _scrolltop = $self.offset().top + ($self.height()-windowHeight)/2;
				if ($a_close.offset().top < _scrolltop)
            	_scrolltop = $a_close.offset().top;
			}
        
        	function _bind_container(vid) {
          		$container.html('<iframe width="810" height="442" src="http://www.tudou.com/l/wdqUvQAyujc/&resourceId=0_04_05_99&iid=146398459/v.swf" frameborder="0" allowfullscreen></iframe>');
        	}

        	function _close_video() {
          		$self.removeClass('_playing');		
				//$('#myExperience').remove();
				$container.html('');
          
          		$darkslide.css({height: '100%'}).animate({opacity:0},1200,'easeInOutQuart',function(){
            		$darkslide.css({height: '0'})
          		})
			 } 
		
		});
	}	  	  
})(jQuery)


//===============================================
//document ready
$(function(){
	
	function showInstructions() {  
          $('#instruction').removeClass('show').delay(2000).queue(function(show){
              $(this).addClass('show');
              show();
          })
     }
        
    showInstructions();
	
	$('#video-wrapper').videoPlayer();
	
	sectionApps.push(new Video($("#video")));
	sectionApps.push(new Ceo($("#ceo")));	
	sectionApps.push(new Ceo2($("#ceo-2")));	
	sectionApps.push(new Life($("#life")));	
	sectionApps.push(new Life2($("#life-2")));	
	sectionApps.push(new Con1($("#content-1")));
	sectionApps.push(new Con2($("#content-2")));	
	sectionApps.push(new Con3($("#content-3")));	
	sectionApps.push(new Con4($("#content-4")));	
	
	windowHeight = $window.height();
	windowWidth  = $window.width();
	
	$window.resize(function(){
		parallaxContentY = (contentH - windowHeight) / 2;
		windowHeight = $window.height();
		windowWidth = $window.width();
		onResize();
		move();
	});
	
	$window.scroll(function(){
		move();
		if($window.scrollTop() < 1){
			$('#instruction').addClass('show');	
		}else{
			$('#instruction').removeClass('show');		
		}
	});
	
	$window.bind('mousewheel', function(){
		$('html, body').stop();
	});
	
	//=============================
	$siteTop = $('#site-top');
	$resizable = $('img.resizable');
	
	//initialize
	onResize();
	move(true);
	
})




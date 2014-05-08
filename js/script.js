/**
 * Date: 12-8-28
 * Time: 下午4:50
 * To change this template use File | Settings | File Templates.
 */
/*--------------------------------------
*
*   Auther: Adways
*   cn.adways.net
*
* --------------------------------------*/


/* @Global */
(function($){
    $(function(){
        $.Body = $('body');
        $.Window = $(window);
        $.Scroll = ($.browser.mozilla || $.browser.msie) ? $('html') : $.Body;
        $.MobileWebkit = ($.Body.hasClass('webkit-mobile') || (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)));
        $.MobileDevice = ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/Android/i)));
        $.Tablet = ((navigator.userAgent.match(/iPad/i)));
		
		$.Body.History();
		$('[data-script]').Instantiate();
		
		
    })
})(jQuery);


(function($) {
  $.Events = {
    LOAD: 'siteLoad', 
    MOBILE_COVER: 'mobileCover',
    OMNITURE_TRACK: 'omnitureTrack',
    OMNITURE_TRACK_LINK: 'omnitureTrackLink',    
    RESIZE: 'browserResize',
    ORIENT: 'browserOrientation',
    MOBILE: 'mobileInit', 
    SLIDE_SCROLL: 'slideScroll',
    SLIDE_ENTER: 'slideEnter',
    SLIDE_EXIT: 'slideExit',
    SLIDE_NEXT: 'slideNext',
    SLIDE_PREV: 'slidePrev',
    SLIDE_HALF: 'slideHalf',
    MASK_ENTER: 'maskEnter',
    MASK_EXIT: 'maskExit', 
    MODAL: 'modalEnter',
    ABOUT: 'modalAbout',
    KEY_ESC: 'keyEscape',
    KEY_ENTER: 'keyEnter',
    KEY_SPACE: 'keySpace',
    KEY_UP: 'keyUp',
    KEY_DOWN: 'keyDown',
    KEY_RIGHT: 'keyRight',
    KEY_LEFT: 'keyLeft',
    VIDEO_ENTER: 'videoEnter',
    VIDEO_EXIT: 'videoExit',
    LINK_CLICK: 'linkClink',
    CHANGE_PAGE: 'changePage',
    SCROLL: 'scroll'
   } 
})(jQuery);


/* ---------------------------------- */
(function($) {

  $.fn.Instantiate = function(settings) {
    var config = {};
    if (settings) $.extend(config, settings);
      this.each(function() { 
          var $self = $(this),
              $script = $self.attr('data-script');
          if ($self[$script])
            $self[$script]();
      });
  }
})(jQuery);
/* ---------------------------------- */

/* Slides Nav */

(function($) {

  $.fn.SlidesNav = function(settings) {  
    this.each(function() { 
      var $self = $(this),
        $slides = $('[data-nav]'),
        _slides = new Array(),
        $navs = new Array(),
        _active = 0;
            
      if (!$.MobileDevice) { 
        $slides.each(function(i) {
          _slides.push($(this))
        })
          
        $self.css({marginTop:-$self.height()/2})
      }

      $('#side-nav li a').click(function(e){
        e.preventDefault();
        var path = $(this).attr('href');
        var event = {type: $.Events.LINK_CLICK, path: path};
        $.Body.triggerHandler(event);
      });
            
    });
     
    return this;
    
  }
    
})(jQuery);

/* ---------------------------------- */
$(function(){
	var $resizable = $('.resizable');
	var tips = $('#join-tips');
	
	window.onresize = function(){
	windowHeight = $(window).height();
	if(windowHeight < 700)
    {
  		$resizable.addClass('img-w-1').removeClass('img-w-2');	
	}	
  	else{
  		$resizable.addClass('img-w-2').removeClass('img-w-1');	
  	}	
	}	
	
	$('.btn-join').hover(
		function(){
			var that = $(this);
			tips.css({'left':that.offset().left + 230,'top':that.offset().top-30}).stop(true,true).fadeIn(500);
		},
		function(){
			tips.stop(true,true).fadeOut(300);
		}
	);
});

/* ---------------------------------- */
(function($) {
  $.fn.Slides = function(settings) {
    var config = {};
    if (settings) $.extend(config, settings);
      this.each(function() { 
        var $self = $(this),
          $slides = $self.find('.slide'); 
        $slides.Slide();
      }); 
      return this; 
} 

  /* ---------------------------------- */
  $.fn.Slide = function() {
    var $parent = this,
      HEIGHTS = new Array(),
      runningHeight = 0,
      _experience = $.Body.attr('data-experience'),
      _articleLength = this.length,
      _active = 0,
      _active_masked_content_child = 0;
	
    /* ---------------------------------- */
     
    $.Body
      .bind($.Events.SLIDE_NEXT,_next)
      .bind($.Events.SLIDE_PREV,_prev)
      .bind($.Events.SLIDE_ENTER,_enter)
      .bind($.Events.SLIDE_EXIT,_exit)
      .bind($.Events.SLIDE_HALF,_half)
      .bind($.Events.CHANGE_PAGE,_changepage);
      
    $.Window
      .bind('resize',_resize);
      
    window.onorientationchange = _orientation;
      
    /* ---------------------------------- */
    
   
    function _next(e) {
      
      _active++;
  
      if (_active >= _articleLength)
        _active = _articleLength-1;

      e.preventDefault();

      _seek(_active);
       
    }
     
    function _prev(e) {
      _active--;
  
      if (_active < 0)
        _active = 0;
  
      e.preventDefault();
       
      _seek(_active);
    
    }

    function _changepage(e){
      var index;
      try {
        index = e.route.seek;
      }catch(e){
        index = 0;
      }
      
      _seek(index);
      $('.active').removeClass('active');

      switch(index){
        case 0:
          $('#slides-nav-1').addClass('active');
        break;
        case 2:
          $('#slides-nav-2').addClass('active');
        break;
        case 4:
          $('#slides-nav-3').addClass('active');
        break;
        case 5:
          $('#slides-nav-4').addClass('active');
		break;
        case 6:
          $('#slides-nav-5').addClass('active');
        default:
          break;

      }
    }
     
    function _seek(seek_index) {
      _active = seek_index;
      try{
        $.Scroll.stop().animate({scrollTop: HEIGHTS[seek_index].min},600,'easeOutQuart');
      }catch(e){

      }
    }
       
    function _maskedContentChildren() {
     
      var $f = {};
         
      $parent.each(function(index) {
        
        if (index == _active)
          $f = $(this).find('.masked_content').children();
          
      });
         
      return $f;
     
    }

    function _articleprev(e){
     
    }
     
    function _enter(e,experience,id,index){
      _active = index;
    }
    
    function _half(e,experience,id,index){
      
    }
    
    function _exit(e, experience, id, index){
      
    }
    
    /* ---------------------------------- */  
        
    function _resize() {
     
      runningHeight = 0;
      $parent.triggerHandler($.Events.RESIZE);
      _setBodyHeight();  
    }
     
    function _orientation() {
  
      var orientation = window.orientation;
      
      $parent.triggerHandler($.Events.ORIENT,orientation);

    }
     
    function _setBodyHeight() {
     
      if (!$.MobileDevice)
        $.Body.css({height:runningHeight});
         
    }
    
    /* ---------------------------------- */
     
    this.each(function(index) {
      
      var $self = $(this),
        $masked_content = $self.find('.masked_content'),
        $masked_content_children = $masked_content.children(),
        $content = $self.find('.content'),
        $prev = $self.prev(),
        $next = $self.next(),
        _view = '',
        _active_masked_content_child = 0,
        _id = $self.attr('data-id'),
        _titlePage = $self.hasClass('title-page'),
        _fullscreen = $self.hasClass('fullscreen'),
        _index = index,
        _route = $self.attr('data-route'),
        _fixedHeight =  $self.attr('data-height'),
        _contentHeight = $content ? $content.height() : 0,
        _maskedContentHeight = $masked_content ? _masked_content_height() : 0,
        _ratio = 810/1203,
		_windowHeight = $.Window.height();
		
      $parent
        .bind($.Events.RESIZE,_size)
        .bind($.Events.ORIENT,_size);
        
      $self
        .bind($.Events.SLIDE_ENTER,_enter)
        .bind($.Events.SLIDE_EXIT, _exit)
      	.bind($.Events.SLIDE_SCROLL,_parallax);
		
      function _enter(e,experience,id,index){          
      }
      
      function _exit(e,experience,id,index){
      }
      
      function _masked_content_height(){
        //var h = $masked_content.height() - $masked_content.parent().height();
        
        //if ( h > 0 ) {
        //  return h;
        //}
        //else
          return $masked_content.height();
      }

      function _size() {
            
        _contentHeight = $content ? $content.height() : 0;
        
        _maskedContentHeight = $masked_content ? _masked_content_height() : 0;
        
        HEIGHTS[index]= {
          min: runningHeight,
          max: runningHeight + _height() 
        };
        
        runningHeight += _height();
            
        if (!$.MobileDevice) {
            
          $masked_content.css({height: _maskedContentHeight});
           
          $self.css({height:_selfHeight(), overflow:'hidden', zIndex:1000-_index});
            
        }
            
      }
          
      _size();
      
      if (!$.MobileWebkit)
        $.Window.bind('scroll',_scroll);
		
      
	  function _parallax(e, param){
  		
	  }
	  
      function _scroll(e) {
        var sTop = $.Window.scrollTop(),
          location = HEIGHTS[_index],
		  nextLoc = HEIGHTS[_index+1] ? HEIGHTS[_index+1] : 0,
		  posW = sTop + _windowHeight,
          vS = view_status(sTop);
		
		  SectionApps.push(new className[index]($self));

			var move_ratio = 0,
				move_position = 0;
			
			if(posW > location.min && posW < location.min + _selfHeight() + _windowHeight){
				move_ratio = (sTop - location.min + _windowHeight) / (_selfHeight() + _windowHeight);
				move_position = sTop + _windowHeight - location.min;	

				SectionApps[index].align(move_ratio, move_position, _windowHeight);
				//SectionApps[index].updateBgPos(move_ratio);
				//console.log(index + " m:" + move_ratio + " p:" + move_position);
				
			}

        switch (vS) {
          
          case "page":
            
            $self.css({marginTop: -(sTop-(location.min + _maskedContentHeight)) , visibility:'visible' });
            $masked_content.css({ marginTop: -(sTop - location.min)});
            //$self.triggerHandler($.Events.SLIDE_SCROLL, sTop - nextLoc.min);
            $self.addClass('scrolling');
              
          break;
            
          case "inview":
            
            $masked_content.css({marginTop: -(sTop - location.min)})
            $self.removeClass('scrolling');
            
            if (_view != vS)
              $self.css({marginTop:0, visibility:'visible'});
              
            //$self.triggerHandler($.Events.SLIDE_SCROLL, sTop - location.min)
              
          break;
            
          case "above":
            
            if (_view != vS) {
              $masked_content.css({marginTop: -_maskedContentHeight - 25})
              $self.css({marginTop:-_height() - 25, visibility:'hidden'})
              //$self.triggerHandler($.Events.SLIDE_SCROLL, sTop - nextLoc.min);
              $self.removeClass('scrolling');
            }
              
          break;
            
          case "outofview":
             
            if (_view != vS) {
              //$self.triggerHandler($.Events.SLIDE_SCROLL,0)
              $masked_content.css({marginTop: 0}) 
              $self.css({marginTop:0, visibility:'hidden'});
              $self.removeClass('scrolling');
            }
              
          break;
            
          default:
            
            if (_view != vS) {

              $masked_content.css({marginTop: 0}) 
              $self.css({marginTop:0, visibility:'visible'});	  
              $self.removeClass('scrolling');
            }
              
          break;
            
        }
            
        _view = vS;
        
      }
      
      function view_status(sTop){
          
        var location = HEIGHTS[_index];
          
        if (sTop >= location.min && sTop < location.max) {           
            
          if (!$self.hasClass('_inview')) {
            
            $self.addClass('_inview');
              
            $.Body.triggerHandler($.Events.SLIDE_ENTER, [_experience,_id,index, _route]);
            $self.triggerHandler($.Events.SLIDE_ENTER, [_experience,_id,index, _route]);
          }
              
          if (sTop > location.min + _maskedContentHeight) {
          
            return 'page';
            
          } else {
          
            return 'inview';
            
          }
          
        } else {
          
          if ($self.hasClass('_inview')){
            $.Body.triggerHandler($.Events.SLIDE_EXIT, [_experience,_id,index]);
            $self.triggerHandler($.Events.SLIDE_EXIT, [_experience,_id,index]);
            $self.removeClass('_inview');
          }
          
        }
          
        if (sTop <= (location.min - $.Window.height()) ) {
          //$self.triggerHandler($.Events.SLIDE_EXIT, [_experience,_id,index]);
          return 'outofview'; 
            
        }
            
        if (sTop <= location.min)
          return 'below';  
            
          
        if (sTop >= location.max) {
          //$self.triggerHandler($.Events.SLIDE_EXIT, [_experience,_id,index]);
          return 'above'; 
        }   
          
      }
      
      function _selfHeight() {
          
        var sH = $.Window.height(),
          sW = $.Window.width();
          
        if (_fixedHeight) {
          
          return _fixHeight(_fixedHeight, sW);
          
        }
            
        if ($.MobileWebkit)
          
          return (_maskedContentHeight + 250) > sH  ? _maskedContentHeight + 250: sH;  
  
          return _contentHeight + 100 < sH ? sH : _contentHeight + 100;
        
      }

      function _height() {
  
        var winHeight = (_contentHeight + 100 < $.Window.height()) ? $.Window.height() : _contentHeight + 100,
          sW = $.Window.width();
   
        if (_fixedHeight) {
            
          return _fixHeight(_fixedHeight, sW);
            
        }

        return _maskedContentHeight + winHeight;
          
      }
        
      function _fixHeight(_fixedHeight, sW) {
        
        if (_ratio * sW <= 810){
          return 810;
        }
          
        if (_ratio * sW > 810) {
          return Math.round(_ratio * sW);
        }

        return parseInt(_fixedHeight);
              
      }
    
    });
    
    _setBodyHeight()
       
    return this;
     
  } //Slide
  
  
  /* ---------------------------------- */
  
})(jQuery);


/* videoPlayer 
---------------------------------------*/
(function($){
	$.fn.videoPlayer = function(){
		this.each(function(){
						   
			var $self = $(this),
            $a_close = $self.find('a#close-video'),
            $a_play = $('[data-videoid]'),
            $darkslide = $self.find('.darkslide'),
            $container = $self.find('#video-container'),
			windowHeight = $.Window.height();
			
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
			
			$darkslide.bind('click',
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
          		$container.html('<iframe width="810" height="442" src="http://www.tudou.com/v/fsZmOYWJQSk/&resourceId=0_04_05_99/v.swf" frameborder="0" allowfullscreen></iframe>');
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
})(jQuery);



/* ---------------------------------- */
(function($) {

  $(function(){
    var $self = $(this),
        $instructions = $self.find('.instructions');    
        function showInstructions() {
          $instructions.removeClass('visible').delay(2000).queue(function(show){
              $(this).addClass('visible');
              show();
            })
        }   
        showInstructions();
  });
})(jQuery);

/* ---------------------------------- */
(function($) {
 
  $.fn.History = function(){
    var _link = false;
    var ROUTES = [
                 {route: '/brother/?video', title: 'video', callBack: dispatch },
                 {route: '/brother/?ceo-life-1', title: 'ceo-life-1', callBack: dispatch },
                 {route: '/brother/?ceo-life-2', title: 'ceo-life-2', callBack: dispatch },
				 {route: '/brother/?about-brother', title: 'about-brother', callBack: dispatch },
				 {route: '/brother/?rule', title: 'rule', callBack: dispatch },
               ];

    var manager = brother.history_manager(ROUTES);
    _link = true;
    manager.handleDeepLink();
    
    function dispatch(obj){
      
      var articleObj = getArticleIndex(obj.path)

      var seek = articleObj.index;
      obj.seek = seek;
      var event = {type: $.Events.CHANGE_PAGE, route: obj }
      $('body').triggerHandler(event);
      setTimeout(function(){ _link = false }, 1000);

      setNav(articleObj.navIndex);
    }

    function getArticleIndex(path){
     
      var article = $('[data-route="'+path+'"]');
      var index = $('.slide').index(article);

      var navIndex = article.attr("data-nav-index");
      return {index: index, navIndex: navIndex };
    }

    function goTo(e, no_action) {
      manager.goTo(e.path, no_action);
    }

    function handleLink(e){
      _link = true;
      goTo(e, false);
    }

    function _enter(e,experience,id,index, route){
      if(_link == true ) return;

      goTo({path: route}, true);
      var navIndex = getArticleIndex(route).navIndex;
      setNav(navIndex);
    }

    function setNav(index){
      $('.active').removeClass('active');
      var li =  $('#side-nav li')[index];
      $(li).addClass('active');
	  console.log(index)
    }      

    function _exit(e, experience, id, index){

    }
    $.Body
      .bind($.Events.LINK_CLICK, handleLink)
      .bind($.Events.SLIDE_ENTER,_enter)
      .bind($.Events.SLIDE_EXIT,_exit);
  } 
})(jQuery);


/* ---------------------------------- */
Array.max = function( array ){
    return Math.max.apply( Math, array );
};
Array.min = function( array ){
    return Math.min.apply( Math, array );
};





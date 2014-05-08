(function(global){
  
  function history_manager(routes){
    
    var routes = routes || {};
    var _no_action = false;

    var History = window.History;
    if(!History){
      return false;
    }

    History.Adapter.bind(global, 'statechange', function(){
      handleDeepLink();
    });

    function translateRoute(path){
      var l = routes.length;
      for(var i=0; i < l; i++){
        var r = routes[i];
        var regEx = new RegExp(routes[i].route);
        if(regEx.test(path)){
         
        }
      }
 r.path = path;
          return r
     // return null;
    }

    var goTo = function(path, no_action){
      var route = translateRoute(path);
      _no_action = no_action;
	  console.log(route);
      History.pushState( { route: route }, 'Brother - ' + route.title, route.path);
    };

    var handleDeepLink = function(){
      var state = History.getState();
      var route = state.data.route;
      if(!route){
        route = {};
        route.path = state.hash;
      }

      if(_no_action != true){
        routes[0].callBack(route);
      }else{
        _no_action = false;
      }
      
    };

    var getState = function(){
      return History.getState();
    };

    return {
              goTo: goTo,
              handleDeepLink: handleDeepLink,
              getState: getState
           };
  }

  global.brother = global.brother || {};
  global.brother.history_manager = history_manager;

})(window);

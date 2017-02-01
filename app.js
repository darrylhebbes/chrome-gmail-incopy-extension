
    var App = (function () {
        var POLLING_INTERVAL = 1000;
        var currentUrl = document.location.href;
        
        var init = function() {
            injectSidebar();
            checkUrl();
        };

        var checkUrl = function(){
            setInterval(function(){
                if (document.location.href != currentUrl) {
                    injectSidebar();
                    currentUrl = document.location.href;
                } 
            }, POLLING_INTERVAL);
        };
        
        var injectSidebar = function() {
    	var exp = $(".acZ").find(".gD");
            pollForElement(exp, function(el) {
      	    insertSidebar();
                insertSidebarCCList();
            });      
        };

        var buildCCObject = function() {
            var CC = $('div.adn.ads > div.gs > div.gE.iv.gt > table > tbody > tr.acZ.xD > td > table > tbody > tr > td > div.iw.ajw > span.hb > span.g2');
            CC = $.map( CC, function( n, i ) {
                return {
                    email: $(n).attr('email'),
                    alias: $(n).attr('name')
                };
            });
            return CC;
        };
        
        var pollForElement = function(selector, callback) {
            var timer = setInterval(function() {
      	    var el = selector;
                if (el) {
                    clearTimeout(timer);
                    callback(el);
                }
            }, POLLING_INTERVAL);
        }

        var insertSidebar = function(){
    	if (!$(".search-bookmarks-gmail-sidebar")[0]) {
    	    $("[role=complementary].nH").prepend("<div class='search-bookmarks-gmail-sidebar' style='background-color: #f1f1f1;padding: 5px;'><h4>CC Viewer</h4></div>");
    	}
        };
        
        var insertSidebarCCList = function(){
            var arrCCitems = buildCCObject();
            $.each(arrCCitems, function(i, item) {
                var encodedEmail = encodeURIComponent('from:'+ item.email);
                var searchUrl = 'https://mail.google.com/mail/u/0/#search/' + encodedEmail;
                $(".search-bookmarks-gmail-sidebar").append("<div style='font-size:80%'><a href='"+searchUrl+"'><div style='font-weight:bold;color:#000;margin-top: 5px;'>"+ item.alias +"</div><div style='color:#777'>"+ item.email +"</div></a></div>");
            });
        };
        
        return {
            init: init,
            injectSidebar:injectSidebar
        }
    })();

    App.init();

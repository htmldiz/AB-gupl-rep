function abjql(e){var t=document.createElement("script");t.type="text/javascript",t.readyState?t.onreadystatechange=function(){"loaded"!==t.readyState&&"complete"!==t.readyState||(t.onreadystatechange=null,e())}:t.onload=function(){e()},t.src="//code.jquery.com/jquery-3.3.1.min.js",document.getElementsByTagName("head")[0].appendChild(t)}function abjqlr(e){if(e(".filter-bar__options").length>0){var t=[{type:"filter",group:"filter_color",text:"color"},{type:"filter",group:"filter_color",text:"color"}],a=e(".filter-bar__options").clone();a.find('[id="collectionMobileButtonSort"]').addClass("btn-js-Sort"),a.find('[id="collectionMobileButtonFilter"]').addClass("btn-js-Filter"),a.find("[id]").attr("id",""),a.find(".collection-mobile__container").remove(),e(".site-header__main.bar.bar-fixed-on.bar-on").append('<ul class="tags-bar"></ul>'),e.each(t,function(t,a){e(".site-header__main.bar.bar-fixed-on.bar-on").find(".tags-bar").append('<li class="tag-item"><a href="#" class="tag-element" data-group-elements="'+a.group+'" data-type="'+a.type+'">'+a.text+"</a></li>")}),e("body").on("click",".tags-bar .tag-element",function(t){switch(e(this).attr("data-type")){case"filter":var a=e(this).attr("data-group-elements");e("body").find('[data-filter-group="'+a+'"] .collection-filter-item').find(".collection-filter-title").html(),e("body").find('[data-filter-group="'+a+'"] .collection-filter-item').each(function(t,a){var i=e(a).html();console.log(i)})}t.preventDefault()}),e(window).scroll(function(t){e(window).scrollTop()>10?e(".site-header__main.bar.bar-fixed-on.bar-on").addClass("header__main__scrolling"):e(".site-header__main.bar.bar-fixed-on.bar-on").removeClass("header__main__scrolling")}),e(".site-header__main.bar.bar-fixed-on.bar-on").append(a)}e("body").append("<style>.site-header__main .tags-bar{list-style:none;margin:0;padding:0;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding:14px 10px}.site-header__main .tags-bar .tag-item{padding-right:3px;padding-left:3px}.site-header__main .tags-bar .tag-element{padding:5px;background:#ebebeb;font-weight:500;font-size:10px;line-height:12px;text-transform:uppercase;border-radius:12px;padding:12px 6px}.site-header__main.header__main__scrolling .tags-bar .tag-element{padding:6px 5px}.site-header__main .filter-bar__options{position:static}</style>")}window.jQuery?jQuery(function(e){abjqlr(e)}):abjql(function(){jQuery(function(e){abjqlr(e)})});
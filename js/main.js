$(function(){
	
	$("menu .list").click(function(){
		$("nav").css("top", $(window).scrollTop()).addClass('show')
		setTimeout(function(){
			$("nav .list, nav li").addClass('show')
			setTimeout(function(){
				$("nav li span").addClass('end')
				$("nav .sign span").addClass('show')
				
				if($.cookie('name') == null){
					$("nav .tips").children().addClass('show')
					setTimeout(function(){
						$("nav .tips").children().removeClass('show')
						$.cookie('name', 'value');
					}, 5000)
				}
			}, 1000)
			$("nav .close").click(function(){
				$("nav li").removeClass('show')
				$("nav .tips").children().removeClass('show')
			})
			$("nav li a").click(function(e){
				e.preventDefault();
			})

			var offsetTop  = 0,
				offsetLeft = 0
			touch.on("nav li", "dragstart", function(e){
				offsetTop = $(this).offset().top
				offsetLeft = $(this).offset().left

				$("nav .sign span").removeClass('show')
				$("nav .circle").addClass('cur')
				$("nav .tips").children().removeClass('show')
			})
			touch.on("nav li", "drag", function(e){
				$(this).addClass('drag').offset({
					left: offsetLeft + e.x,
					top: offsetTop + e.y
				})
			})
			touch.on("nav li", "dragend", function(e){
				$(this).removeClass('drag')
				$("nav .sign span").addClass('show')
				$("nav .circle").removeClass('cur')

				var thisOL = $(this).offset().left + 109,
					thisOT = $(this).offset().top,
					signOL = $("nav .sign .in").offset().left,
					signOT = $("nav .sign .in").offset().top,
					thisurl = $(this).data("href")

				if(thisOL > signOL && thisOL < signOL + 136 && thisOT > signOT && thisOT < signOT + 136){
					$("nav li").attr("style", "").removeClass('show').stop().animate({opacity: 0}, 1200, function(){
						$("nav .list").removeClass('show').find("li").css("opacity", 1)
						window.location.href = thisurl
					})
				}
			})

		}, 800)
	})

	$("nav .close").click(function(){
		$("nav li").attr("style", "").removeClass('show').stop().animate({opacity: 0}, 1000, function(){
			$("nav .list").removeClass('show').find("li").css("opacity", 1)
			$("nav").removeClass('show').find("li span").removeClass('end')
		})
	})

	_PreLoadImg([
        $(".insban .tips img").attr('src')
	],function(){
		$(".insban .tips").height($(".insban .img-box img").height() + 70).find(".word-box").css("top", $(".insban .img-box img").height() + 20)
		$(".insban").stop().animate({opacity: 1}, 1200, "easeInQuart", function(){
			$(".insban .img-box").stop().animate({height: $(".insban .img-box img").height()}, 600)
			$(".insban .word-box").stop().animate({height: 50}, 600)
		})

		window.onresize = function(){
			$(".insban .tips, .insban .tips .word-box").attr("style", "")
			$(".insban .tips").height($(".insban .img-box img").height() + 70).find(".word-box").height(50).css("top", $(".insban .img-box img").height() + 20)
		};
	})

	$(document).on('click', '.outlink', function(e){
		e.preventDefault();
		var url = $(this).attr("href") || $(this).data("href")
		$.ajax({
			url: url,
			success: function(data){
				$(".info-out").addClass('show')
				setTimeout(function(){
					$("html, body").addClass('por ovh')
					$(".info-out .main .in").append(data)
					$('#outmain').perfectScrollbar();
				}, 1300)
			}
		})
	})
	$(".info-out .close .in").click(function(){
		$(".info-out").removeClass('show').find(".main .in").children().remove()
		$("html, body").removeClass('por ovh')
	})
});
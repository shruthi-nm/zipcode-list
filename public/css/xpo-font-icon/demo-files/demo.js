



$(document).ready(function(){
	
	$('.glyph').each(function(){
		
		
		var iconClass1 = $(this).find('.xico').attr('class').split(' ')[0]
		var iconClass2 = $(this).find('.xico').attr('class').split(' ')[1]
		
		//var iconHtml = $('<i></i>').attr("class", iconClass1 + ' ' + iconClass2 )
		
		var htm1 = ($('<code class="iconcode"><span>&lt;i class=</span>'+'<span>'+'"'+iconClass1+'</span> '+'<span>'+iconClass2+'"'+'</span>'+'<span>&gt;&lt;/i&gt;</span></code>'))
		
		$(htm1).appendTo(this).find('.fs0')
		
		
		$('.iconcode').css({'font-size':'17px','color':'#2576e6','font-weight':'bold'})
		
		
	})
	
})
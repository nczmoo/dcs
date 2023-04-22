$(document).on('click', '', function(e){

})

$(document).on('click', '#crawl', function(e){
	if (!game.config.crawling){
		game.config.crawling = true;		
		return;
	} 
	
	if (game.config.forward){
		game.config.forward = false;	
		return;
	}
	game.config.forward = true;
});


$(document).on('click', 'button', function(e){
	ui.refresh()
})

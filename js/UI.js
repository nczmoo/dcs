class UI{
	logs = [];
	animatingInterval = setInterval(this.animating, 1000);
	wins = null;
	winPointer = null;	
	constructor(){
		this.printReels();
	}
	refresh(){
		let fills = ['armor', 'credits', 'gold', 'health', 'lines', 'maxHealth', 'steps', 'weapon'];
		for (let fill of fills){			
			$("#" + fill).html(game.config[fill]);
		}
		for (let i in game.config.potions){
			let potion = game.config.potions[i];
			
			$("#" + i).html(potion);
			$("#drink-" + i).prop('disabled', potion < 1);		
		}
		if (!game.config.crawling){
			$("#crawl").html('enter');
			$("#crawl").addClass('btn-success');
			$("#crawl").removeClass('btn-danger');
		} else if (game.config.crawling && game.config.forward){
			$("#crawl").html('exit');
			$("#crawl").addClass('btn-danger');
			$("#crawl").removeClass('btn-success');
		} else if (game.config.crawling && !game.config.forward){
			$("#crawl").html('exiting');
		}
		$("#pull").prop('disabled', false);
		if (game.config.gold < 1 || this.wins != null){
			$("#pull").prop('disabled', true);
		}
		this.refreshFighting();
		this.printLog();
		
	}

	animating(){
		if (ui.wins != null){
			ui.animatingWins();
		}
	}

	animatingWins(){
		let win = game.config.wins[this.wins[this.winPointer]];
		$(".reel").removeClass('win');
		for (let reelID in win){
			$("#reel-" + reelID + "-" + win[reelID]).addClass('win');
		}
		this.winPointer++;
		if (this.winPointer > this.wins.length - 1 || this.winPointer > game.config.lines - 1){
			this.winPointer = null;
			this.wins = null;
			$("#pull").prop('disabled', false);
		}
	}

	animateWins(wins){
		if(wins.length < 1){
			return;
		}
		$("#pull").prop('disabled', true);
		this.wins = wins;
		this.winPointer = 0;
	}

	formatID(id){
		return Number(id) + 1;
	}

	printLog(){
		let txt = '';
		for (let i in this.logs){
			let log = this.logs[i];
			txt += "<div>" + log + "</div>";
		}
		$("#log").html(txt);
	}

	printReel(reelID){		
		let positions = game.fetchPositions(reelID);
		return "<div id='reel-" + reelID + "-prev' class='reel'>" 
			+ game.config.reels[reelID][positions.prev] 
			+ "</div><div  id='reel-" + reelID + "-pos' class='reel straight'>" 
			+ game.config.reels[reelID][positions.pos] 
			+ "</div><div id='reel-" + reelID + "-next' class='reel'>" 
			+ game.config.reels[reelID][positions.next] + "</div>"
	}

	printReels(){
		
		for (let i in game.config.reels){

			let txt = this.printReel(i);
			$("#reel-" + i).html(txt);
		} 
	}

	printStore(){
		this.printReel();
	}

	refreshFighting(){
		let caption = ' no one';
		if (game.config.mob != null){
			let mob = game.config.mob;
			caption = " lvl " + mob.level + " " + mob.name + " a: " 
				+ mob.attack + " hp: "+ mob.health
		}
		$("#fighting").html(caption);
	}

	status(msg){
		this.logs.unshift(msg);

	}
}

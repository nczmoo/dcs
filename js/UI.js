class UI{
	logs = [];
	constructor(){

	}
	refresh(){
		let fills = ['armor', 'gold', 'health', 'maxHealth', 'steps', 'weapon'];
		for (let fill of fills){			
			$("#" + fill).html(game.config[fill]);
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
		this.refreshFighting();
		this.printLog();
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

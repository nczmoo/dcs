class Game{
	config = new Config();	
	loopInterval = setInterval(this.looping, 500);
	constructor(){

	}

	back(){
		if (this.config.forward){
			return;
		}
		this.config.steps--;
		if (this.config.steps < 1){
			this.config.crawling = false;
		}
		
	}

	crawl(){
		if (this.config.mob != null){
			this.fight();
			return;
		}
		if (this.config.forward){
			this.config.steps++;
		}  
		this.back();
		let modifier = 1;
		if (!this.config.forward){
			modifier = 2;
		}
		if (randNum(1, this.config.spawnRate * 2) == 1){
			this.spawn();			
		}

	}

	die(){
		ui.status("You died " + this.config.steps + " steps in, lost all your gold, and someone brought you back to the entrance.");
		this.config.resetGold();
		this.config.crawling = false;
		this.config.steps = 0;
		this.config.resetHealth();
		this.config.mob = null;
	}

	downgradeMob(){
		let rand = randNum(1, 3);	
		if (this.config.modifiers.level < 1){
			return;
		}
		this.config.mob.modifiers.level--;
		if (rand == 1 && this.config.modifiers.attack > 1){
			this.config.modifiers.attack--;			
			return;
		}
		if (this.config.modifiers.health > 0){
			this.config.modifiers.health--;
		}
	}

	fight(){
		this.config.yourTurn = !this.config.yourTurn;
		if (this.config.yourTurn){
			this.playerHits();
			return;
		}
		this.mobHits();
	}

	looping(){
		if (game.config.crawling){
			game.crawl();
		}
		ui.refresh();
	}

	mobDies(){
		let loot = randNum(0, this.config.mob.level);
		ui.status("The lvl " + this.config.mob.level + " " 
			+ this.config.mob.name + " died and you looted " + loot 
			+ " gold from it. (<span class='text-success='>+" + loot 
			+ " gold</span>)");		
		this.config.getGold(loot);
		this.config.mob = null;		
		if (this.config.forward){			
			this.upgradeMob();
			return;
		}
		this.downgradeMob();
	}

	mobHits(){
		let dmg = randNum (0, this.config.mob.attack) - this.config.armor;
		if (dmg < 0){
			dmg = 0;
		}
		
		this.config.health -= dmg;
		let status = this.config.mob.name + " missed!";
		if (dmg > 0){
			status = "The " + this.config.mob.name 
			+ " hit you for " + dmg 
			+ " damage and you're now at " + this.config.health 
			+ " (<span class='text-danger'>-" + dmg + "</span>)";
		}
		ui.status(status);
		if (this.config.health < 1){
			this.die();
		}
	}

	playerHits(){		
		let dmg = randNum (0, this.config.weapon * 2);
		this.config.mob.health -= dmg;
		let status = "<span class='fw-bold'>You</span> missed";
		if (dmg > 0){
			status = "<span class='fw-bold'>You</span> hit the " 
			+ this.config.mob.name + " for " + dmg + " damage! It's now at " 
			+ this.config.mob.health + " hp."
		}
		ui.status(status)
		if (this.config.mob.health < 1){
			this.mobDies();
		}
	}

	spawn(){
		console.log('spawn');
		if (this.config.mob != null){
			return;
		}
		let name = 'rat';
		let mob = { ...this.config.mobs[name]};
		console.log(mob);
		this.config.mob = mob;
		for (let i in this.config.modifiers){
			let modifier = this.config.modifiers[i];
			this.config.mob[i] += modifier;
		}
		this.config.mob.name = name;
		console.log(this.config.mob);
		ui.status("<span class='fw-bold'>A lvl " + this.config.mob.level + " " + this.config.mob.name + " spawned</span> in front of you.")
	}

	upgradeMob(){
		
		let rand = randNum(1, 3);				
		this.config.modifiers.level++;
		if (rand == 1){
			this.config.modifiers.attack++;
			return;
		}
		this.config.modifiers.health++;
	}
}

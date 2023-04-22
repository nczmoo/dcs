class Config {
    armor = 0;
    crawling = false;
    forward = true;
    gold = 0;
    goldInRun = 0;
	health = 10;    
    maxHealth = 10;
    mob = null;
    mobs = {
        rat: {attack: 1, health: 2, level: 1}
    }
    modifiers = {
        attack: 0,
        health: 0,
        level: 0,
    }
    spawnRate = 3;
    steps = 0;    
    weapon = 1;
    yourTurn = true;

    getGold(delta){
        this.gold += delta;
        this.goldInRun += delta;
    }

    resetGold(){
        this.gold = 0;
    }

    resetHealth(){
        this.health = this.maxHealth;
    }
}
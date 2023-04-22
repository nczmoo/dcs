class Config {
    armor = 0;
    crawling = false;
    credits = 0;
    forward = true;
    gold = 100;
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
    numOfReels = 3;
    numOfSymbolsOnReel = 10;
    potions = {
        heal: 0,
        portal: 0,
    }
    positions = [];
    reelSymbols = ['heal', 'weapon', 'armor', 'health', 'portal'];
    reels = [];
    spawnRate = 3;
    steps = 0;    
    weapon = 1;
    wins = [
        ['pos',	'pos',	'pos'],
        ['prev',	'pos',	'next'],
        ['next',	'pos',	'prev'],
        ['next',	'pos',	'next'],
        ['prev',	'pos',	'prev']
    ];
    yourTurn = true;

    constructor(){        
        while (this.reels.length < this.numOfReels){
            this.reels.push(this.generateReel());
            this.positions.push(0);
        }
    }

    generateReel(){
        let reel = [];                
        while (reel.length < this.numOfSymbolsOnReel){
            let rand = this.reelSymbols[randNum(0, this.reelSymbols.length - 1)];            
            if (reel.length == 0 || reel[reel.length - 1] != rand){                
                reel.push(rand);
            }
        }
        
        return reel;
    }

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
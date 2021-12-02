let game = {
    techsOne: ['wordpress', 'c++','php', 'prolog','python','ruby'],//12 cartas
    techsTwo: ['bootstrap', 'css','electron', 'firebase','html','javascript','jquery', 'mongo', 'node', 'react'],//20 cartas
    techsThree: ['bootstrap', 'css', 'electron', 'firebase','html','javascript','jquery', 
    'mongo', 'node', 'react','ruby','python','angular','java','wordpress','c++','php','prolog'],//36 cartas
    cards: null,

    lockMode: false,
    firstCard: null,
    secondCard: null,

    setCard: function(id){
        let card = this.cards.filter(card => card.id === id)[0]
        if(card.flipped || this.lockMode){
            return false
        }

        if(!this.firstCard){
            this.firstCard = card
            this.firstCard.flipped = true
            return true
        }else{
            this.secondCard = card
            this.secondCard.flipped = true
            this.lockMode = true
            return true
        }
    },

    checkMatch: function(){
        if(!this.firstCard || !this.secondCard){
            return false
        }
        return this.firstCard.icon === this.secondCard.icon
    },

    clearCards: function(){
        this.firstCard = null
        this.secondCard = null
        this.lockMode = false
    },

    unflipCards: function(){
        this.firstCard.flipped = false
        this.secondCard.flipped = false
        this.clearCards()
    },

    checkGameOver: function(){
        return this.cards.filter(card => !card.flipped).length == 0
    },

    createCardsFromTechs: function (m){
    if(m == 1){
    this.cards = []
    
        for(tech of this.techsOne){
            this.cards.push(this.createPairFromTech(tech))
        }
    
        this.cards = this.cards.flatMap(pair => pair)
        this.shuffleCards()
        return this.cards
    }else if(m == 2){
        this.cards = []
    
        for(tech of this.techsTwo){
            this.cards.push(this.createPairFromTech(tech))
        }
    
        this.cards = this.cards.flatMap(pair => pair)
        this.shuffleCards()
        return this.cards
        }
        else{
            this.cards = []
    
            for(tech of this.techsThree){
                this.cards.push(this.createPairFromTech(tech))
            }
        
            this.cards = this.cards.flatMap(pair => pair)
            this.shuffleCards()
            return this.cards
        }
    },

    createPairFromTech: function (){
        return[{
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false
        },{
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false
        }]
    },    
    createIdWithTech: function(tech){
        return tech + parseInt(Math.random() * 1000)
    }, 
    shuffleCards: function(cards){
        let currentIndex = this.cards.length
        let randomIndex = 0
        while(currentIndex != 0){
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--
    
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
        }
    }
}
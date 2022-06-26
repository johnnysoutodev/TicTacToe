// app.js

const tic_tac_toe = {
    board: ['','','','','','','','',''],
    simbols: {
        options: ['X', 'O'],
        turn_index: 0,
        change: function(){
            this.turn_index = (this.turn_index === 0 ? 1 : 0);
        },
    },
    container_element: null,
    gameover: false,
    winning_sequences: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],

    init: function(container){
        this.container_element = container;
    },

    make_play: function(position){
        if (this.gameover) return false;
        if (this.board[position] === '' ) {
            this.board[position] = this.simbols.options [ this.simbols.turn_index ];
            this.draw();
            let winning_sequences_index = this.check_winning_sequences ( this.simbols.options [ this.simbols.turn_index ]);
            if (winning_sequences_index >= 0){
                this.game_is_over();
                this.stylize_winner_sequence(this.winning_sequences[winning_sequences_index]);
            } else {
                this.simbols.change();
            }
            return true;
        } else {
            return false;
        }

    },

    game_is_over: function(){
        this.gameover = true;
        console.log('Fim de jogo');
    },

    is_game_over: function() {
        return !this.board.includes('');
    },

    check_winning_sequences: function(simbol){
        for ( i in this.winning_sequences) {
            if (this.board [ this.winning_sequences[i][0] ] == simbol && 
                this.board [ this.winning_sequences[i][1] ] == simbol && 
                this.board [ this.winning_sequences[i][2] ] == simbol){
                    return i;
                    console.log('venceu');
                }
        }
        return -1;
    },

    stylize_winner_sequence(winner_sequence) {
        winner_sequence.forEach((position) => {
          this
            .container_element
            .querySelector(`div:nth-child(${position + 1})`)
            .classList.add('winner');
        });
      },

    draw: function(){
        this.container_element.innerHTML = this.board.map((element, index) => `<div onclick="tic_tac_toe.make_play('${index}')"> ${element} </div>`).reduce((content, current) => content + current);
    },

    start: function(){
        this.board.fill('');
        this.draw();
        this.gameover = false;
        console.log('Inicio do Jogo');
    },

    restart: function() {
        if (this.is_game_over() || this.gameover) {
            this.start();
        } else if (confirm('Jogo em andamento, quer mesmo Re-Iniciar?')) {
            this.start();
        }
    },

};
// import React from 'react';
// import ReactDOM from 'react-dom';
import * as React from 'react'; // TS wants this import
import * as ReactDOM from 'react-dom';
import { isPropertySignature } from 'typescript';
import './index.css';

// for other implementation of React Tic Tac Toe, see:
// https://github.com/yoskeoka/react-tic-tac-toe-ts/blob/master/src/index.tsx

// for TypeScript cheatsheets, etc.
// https://github.com/typescript-cheatsheets/react#reacttypescript-cheatsheets

// TL;DR from cheat sheet - use interface until you need type
// interfaces can be extended, so are good for public APIs
// tyoes are more constrained and as such good for Props and State
interface ISquareProps {
    value: string,
    onClick: () => void,
}
// Simple function implementation for simple component
function Square(props: ISquareProps): JSX.Element {
    return (
        <button 
            className="square"
            onClick={props.onClick}>{props.value}</button>
    )
}

type IBoardProps = {
    squares: string[],
    onClick: (i: number) => void,
};
  
class Board extends React.Component<IBoardProps> {   
    // example of how to document code in JS
    /**
     * Render a square of the board
     * @param {Number} i The index of the square to update
     * @returns 
     */
    renderSquare(i: number): JSX.Element {
        return (
            <Square 
                // these args are called "props" in ReactJS
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}/>);
                // onClick is a function that Square can call
    }

    render(): JSX.Element {
        return (
        <div>
            <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            </div>
            <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            </div>
            <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            </div>
        </div>
        );
    }
}


interface IGameProps {}

interface IGameState {
    history: { squares: string[] }[], // what is this syntax?
    stepNumber: number,
    xIsNext: boolean,
}

class Game extends React.Component<IGameProps, IGameState> {
    constructor(props: IGameProps) {    
        super(props);    
        this.state = {      
            history: [{        
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i: number) {
        // slice history in case of click, after going back in time
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice()
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            // concat doesn't mutate original array, unlike push()
            history: history.concat([{squares: squares,}]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step: number) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render(): JSX.Element {
        const history = this.state.history;
        // const current = history[history.length - 1]; // showing the last move
        const current = history[this.state.stepNumber]
        const winner = calculateWinner(current.squares);

        const moves = history.map((step: any, move: number) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
                return (
                    <li key={move}>
                        <button onClick={() => this.jumpTo(move)}>{desc}</button>
                    </li>
                );
        });


        let status;
        if (winner) {
            status = 'Winner' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
        }
        return (
        <div className="game">
            <div className="game-board">
                <Board 
                    squares={current.squares}
                    onClick={(i: number) => this.handleClick(i)}/>
            </div>
            <div className="game-info">
            <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
        );
    }
}

// ========================================

/**
 * Check any winning combination
 * @param {Array} squares Array containing state of each square of board
 * @returns The symbol of the winner
 */
function calculateWinner(squares: string[]): any {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      // === is strict equal value and equal type
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

// ========================================

ReactDOM.render(
<Game />,
document.getElementById('root')
);


import React, { Component } from 'react';
import Board from './Board';
import { selectWinner } from './utils';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xIsNext: true,
      stepNumber: 0,
      history: [{ squares: Array(9).fill(null) }]
    };
  }

  jumpTo = step => {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  };

  handleClick = index => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const winner = selectWinner(squares);
    if (winner || squares[index]) {
      return;
    }
    squares[index] = this.state.xIsNext ? 'X' : '0';
    this.setState({
      history: history.concat({
        squares
      }),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    });
  };

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = selectWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ? `Go to move no ${move}` : 'Start New Game';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    let status;
    if (winner) {
      status = `Winner is ${winner}`;
    } else {
      status = 'Next player is' + this.state.xIsNext ? 'X' : '0';
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            onClick={index => this.handleClick(index)}
            squares={current.squares}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ul className="info">{moves}</ul>
        </div>
      </div>
    );
  }
}

export default Game;

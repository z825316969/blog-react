import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Shopping extends React.Component {
//   render() {
//     const name = '132131'
//     return (
//       <div className="shopping-list">
//         <h1>购物list { name }</h1>
//         <ul>
//           <li>instagram</li>
//           <li>whatapp</li>
//           <li>眼</li>
//         </ul>
//       </div>
//     )
//   }
// }

function Square(props) {
  return (
    <button
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
    />
  }

  render() {
    console.log(this.props, 'this.propsvthis.props')
    return (
      <div>
        {/* <div className="status">{status}</div> */}
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

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      historyList: [
        {
          squares: Array(9).fill(null),
          key: 0
        }
      ],
      stepNumber: 0,
      isNextX: true
    }
  }

  handleClick(i) {
    const state = this.state
    const temSquares = state.historyList[state.historyList.length - 1].squares.slice()
    if (temSquares[i]) {
      alert('不可重复落子')
      return
    }
    if (calculateWinner(temSquares)) {
      alert('是否开始下一句')
      return
    }
    temSquares[i] = this.state.isNextX ? 'X' : 'O'
    const temItem = {
      squares: temSquares,
      key: state.stepNumber + 1
    }
    this.setState({
      historyList: state.historyList.concat(temItem),
      stepNumber: state.stepNumber + 1,
      isNextX: !state.isNextX
    })
  }

  jumpTo(squares, step) {
    const historyList = this.state.historyList.slice(0, step + 1)
    this.setState({
      historyList,
      stepNumber: historyList.length,
      isNextX: (step % 2) === 0
    })
  }

  render() {
    const state = this.state
    const current = state.historyList[state.historyList.length - 1]
    const winner = calculateWinner(current.squares)

    const moves = state.historyList.map((squares, step) => {
      const tip = step ? 'go to move' + step : 'go to game start'
      return (
        <li key={step}>
          <button onClick={() => this.jumpTo(squares, step)}>{tip}</button>
        </li>
      )
    })

    const status = winner 
      ? `winner is ${winner}`
      : `Next player: ${this.state.isNextX ? 'X' : 'O'}`

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
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

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)

function calculateWinner(squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

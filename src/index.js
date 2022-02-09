import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Square extends React.Component {
    render() {
        return (
            
                 /*{
                    this.props.x.map((e, index) => {
                        return (
                            <button
                                className="square"
                                onClick={() => this.props.onClick()}
                                key={index}

                            >
                                {index}
                            </button>
                        )

                    })
                } */
                <button className="square" onClick={() => this.props.onClick()}>
                    {this.props.value}
                </button>

         

        );
    }
}

class Board extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         squares: Array(9).fill(null),
    //         status: false
    //     };
    // }

    state = {
        x: Array(3).fill(0),
        y: Array(3).fill(0),
        data: 0,
    };

    renderSquare(i) {
        return (

            this.state.y.map((e, index) => {
                let temp = i * this.state.y.length + index;
                return (<Square
                    key={temp}
                    value={this.props.squares[temp]}
                    onClick={() => this.props.onClick(temp)}
                />)
            })
            
             /*<Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            /> */
        );
    }

    render() {
        return (
            <div>
                {this.state.x.map((element, index) => {
                    return (
                        <div className="board-row" key={index}>
                            {this.renderSquare(index)}
                        </div>)

                })}
                {/* <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div> */}
                {/* <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div> */}
            </div>
        );
    }
}

class Game extends React.Component {
    // state = {
    //     history: [{
    //         squares: Array(9).fill(null),
    //     }],
    //     status: false,
    //     stepNumber: 0,
    // }

    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                },
            ],
            status: false,
            stepNumber: 0,
        };
    }

    // React中自定义函数的3种写法之一。
    handleClick = (i) => {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        console.log("his: ", history);

        const current = history[history.length - 1];
        console.log("curr: ", current);

        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.status === true ? "😅" : "🤗";
        console.log("squares[i]: ", squares[i]);
        this.setState({
            history: history.concat([
                {
                    squares: squares,
                },
            ]),
            stepNumber: history.length,
            status: !this.state.status,
        });
    }

    // React中自定义函数的3种写法之一。
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            status: step % 2 === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ? "Go to move #" + move : "Go to game start";
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = "Winner: " + winner;
        } else {
            status = "Next player: " + (this.state.status ? "😅" : "🤗");
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={this.handleClick}
                    />
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

ReactDOM.render(<Game />, document.getElementById("root"));

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

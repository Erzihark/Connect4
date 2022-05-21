import {React, useState} from "react";

function Column({col, index, onClick}){
    const [hover, setHover] = useState(false);

    return(
        <div className={"column"} onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            {col.map((circle) => {
                let styleMap = {"Red": "radial-gradient(circle, rgba(145,12,12,1) 45%, rgba(36,0,0,1) 100%)",
                                "Yellow": "radial-gradient(circle, rgba(138,145,12,1) 45%, rgba(33,36,0,1) 100%)",
                                null:"white"}
                let opacity = hover ? "0.7" : "1";
                return <div style={{opacity: opacity, background: styleMap[circle]}} className={"circle"}></div>
            })}
        </div>
    )
}

function TurnDisplay({player}){
    let background = player.toLowerCase();
    let display = `${player}'s turn`;

    return(
        <div>
            <header style={{background: background}} className={"turn"}>{display}</header>
        </div>
    )
}

export default function Table(){

    let matrix = {};
    const [tableState, setTableState] = useState(matrix)
    const [player, setPlayer] = useState("Red")

    for (let i = 0; i < 7; i++){
        matrix[i] = ([null, null, null, null, null, null]);
    }

    const gameOver = () => {
        //checks win by columns
        for (let col = 0; col < 7; col ++){
            for (let row = 0; row < 3; row++){
                if (tableState[col][row] != null &&
                    tableState[col][row] === tableState[col][row + 1] &&
                    tableState[col][row] === tableState[col][row + 2] &&
                    tableState[col][row] === tableState[col][row + 3]){
                        return true
                }
            }
        }
        //checks win by rows
        for (let col = 0; col < 4; col ++){
            for (let row = 0; row < 6; row++){
                if (tableState[col][row] != null &&
                    tableState[col][row] === tableState[col + 1][row] &&
                    tableState[col + 1][row] === tableState[col + 2][row] &&
                    tableState[col + 2][row] === tableState[col + 3][row]){
                        return true
                }
            }
        }
        //checks win by up right diagonal
        for (let col = 0; col < 7; col ++){
            for (let row = 0; row < 6; row++){
                if (tableState[col][row] != null &&
                    tableState[col][row] === tableState[col + 1][row + 1] &&
                    tableState[col + 1][row + 1] === tableState[col + 2][row + 2] &&
                    tableState[col + 2][row + 2] === tableState[col + 3][row + 3]){
                        return true
                }
            }
        }
        //checks win by up left diagonal
        for (let col = 0; col < 7; col ++){
            //starts at 5 cus up left win can only be checked after 4th column
            for (let row = 5; row >= 3; row--){
                if (tableState[col][row] != null &&
                    tableState[col][row] === tableState[col + 1][row - 1] &&
                    tableState[col + 1][row - 1] === tableState[col + 2][row - 2] &&
                    tableState[col + 2][row - 2] === tableState[col + 3][row - 3]){
                        return true
                }
            }
        }
    }

    const insertDisk = (index) => { //gets called when clicking on a column
        let column = tableState[index];

        let position = column.indexOf(null);
        column[position] = player
        setTableState(
            {
                ...tableState,
                [index]: column
            }
        )
        setPlayer(player === "Red" ? "Yellow" : "Red")
        if (gameOver()){
            alert(`game over, ${player} wins`);
        }
    }

    return(
        <>
            <TurnDisplay player={player}></TurnDisplay>
            <div className={"table"}>
                {Object.entries(tableState).map(([key, column], x) => {
                    return <Column col={column} index={x} onClick={() => insertDisk(x)}/>
                })}
            </div>
        </>

    );
}
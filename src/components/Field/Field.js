import React from "react";
import "./FieldStyles.css";
import fieldUtils from "../../utils/FieldUtils";
import FlagsCounter from "../ControlPanel/FlagsCounter";
import Reset from "../ControlPanel/Reset";
import Timer from "../ControlPanel/Timer";

class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            field: [],
            flags: 10,
            stage: "init", // init, playing, ended, won
            firstMove: true,
        };
    }

    // Creates the initial field when the page is loaded
    componentDidMount() {
        this.setState((state) => ({
            field: fieldUtils.generateField(8, 9, 10),
        }));
    }

    // Handle left click (show content of cell)
    handleCellClick(cell, e) {
        e.preventDefault(); // May be redundant ?
        if (this.state.stage === "init") {
            this.setState((state) => ({
                stage: "playing",
            }));
            if (!this.state.firstMoveDone) {
                this.setState((state) => ({
                    firstMoveDone: true,
                }));
            }
        }
        if (
            cell.isOpened === false &&
            this.state.stage !== "ended" &&
            this.state.stage !== "won"
        ) {
            let tempArr = this.state.field;
            tempArr[cell.cellID].isOpened = true;
            if (cell.bombsAround === 0) {
                tempArr = fieldUtils.findEmptyCellsAroundCell(tempArr);
            }
            this.setState((state) => ({
                field: tempArr,
            }));
        }
        if (cell.containBomb) {
            if (!this.state.firstMoveDone) {
                this.handleReset();
            } else {
                let tempArr = this.state.field;
                this.setState((state) => ({
                    stage: "ended",
                }));
                tempArr.forEach((cell) => {
                    if (cell.containBomb) {
                        cell.isOpened = true;
                    }
                });
                this.setState((state) => ({
                    field: tempArr,
                }));
            }
        }
        if (fieldUtils.checkWin(this.state.field, this.state.flags)) {
            this.setState((state) => ({
                stage: "won",
            }));
        }
    }

    // Handle right click (mark cells)
    handleContext(cell, e) {
        e.preventDefault();
        if (this.state.stage === "init") {
            this.setState((state) => ({
                stage: "playing",
            }));
        }
        if (
            cell.isOpened === false &&
            this.state.stage !== "ended" &&
            this.state.stage !== "won"
        ) {
            let increment = cell.isFlagged ? 1 : -1;
            let flagsAfterIncrement = this.state.flags + increment;
            if (flagsAfterIncrement >= 0 && flagsAfterIncrement <= 10) {
                let tempArr = this.state.field;
                tempArr[cell.cellID].isFlagged = !cell.isFlagged;
                this.setState((state) => ({
                    field: tempArr,
                    flags: flagsAfterIncrement,
                }));
            }
        }
        if (fieldUtils.checkWin(this.state.field, this.state.flags)) {
            this.setState((state) => ({
                stage: "won",
            }));
        }
    }

    // Handle click on reset button
    handleReset() {
        // Reset field by creating a new one
        this.setState((state) => ({
            field: fieldUtils.generateField(8, 9, 10),
            flags: 10,
            stage: "init",
            firstMove: false,
        }));
    }

    generateStyle(cell) {
        if (cell.isOpened === false) {
            return cell.isFlagged ? "cell flagged" : "cell";
        } else {
            return cell.containBomb ? "cell fired" : "cell opened";
        }
    }

    generateContent(cell) {
        if (cell.isOpened && !cell.containBomb && cell.bombsAround > 0) {
            return cell.bombsAround;
        } else {
            return "";
        }
    }

    render() {
        return (
            <div>
                {/* Adds the control panel components */}
                <div className='control-panel'>
                    <FlagsCounter flags={this.state.flags} />
                    <Reset
                        stage={this.state.stage}
                        callback={this.handleReset.bind(this)}
                    />
                    <Timer stage={this.state.stage} />
                </div>
                <div className='field'>
                    {this.state.field.map((cell) => (
                        <div
                            className={this.generateStyle(cell)}
                            key={cell.cellID}
                            onClick={(e) => this.handleCellClick(cell, e)}
                            onContextMenu={(e) => this.handleContext(cell, e)}
                        >
                            {this.generateContent(cell)}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Field;

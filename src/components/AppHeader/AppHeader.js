import bomb from "../../images/bomb.svg";
import "./AppHeaderStyles.css"
import React from "react";

function AppHeader(props) {
    return (
        <header className="App-header">
            <div>Minesweeper <img src={bomb} className="App-logo" alt="logo" /></div>
        </header>
    )
}

export default AppHeader;

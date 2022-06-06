import "./AppFooterStyles.css"
import React from "react";

const repo = "https://github.com/dan-koller/React-Minesweeper";
const jetbrainsUrl = "https://www.jetbrains.com/academy/";
const githubUrl = "https://github.com/dan-koller";

function AppFooter(props) {
    return (
        <footer className="App-footer">
            <div>Idea by <a href={jetbrainsUrl}>JetBrains</a>, built by <a href={githubUrl}>Dan Koller</a></div>
            <br/>
            <div>Check the source code on <a href={repo}>GitHub</a></div>
        </footer>
    )
}

export default AppFooter;

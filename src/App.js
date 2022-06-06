import React from 'react';
import './App.css';
import AppHeader from "./components/AppHeader/AppHeader";
import Field from "./components/Field/Field";
import AppFooter from "./components/AppFooter/AppFooter";

function App() {
    return (
        <div className="App">
            <AppHeader/>
            <Field />
            <AppFooter />
        </div>
    );
}

export default App;

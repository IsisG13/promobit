import React from "react";
import Logo from '../logo.svg'
import { Link } from "react-router-dom";

function BarraLogo() {
    return (
        <div className="App">
            <div className="logo">
                <Link to="/">
                <img src={Logo} alt="logo"/>
                </Link>
            </div>
        </div>
    )
}

export default BarraLogo;
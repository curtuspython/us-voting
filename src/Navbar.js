import React from "react";

const Navbar = ({account}) =>{
    return(
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" >{account}</a>
            </nav>
        </div>
    )
}
export default Navbar
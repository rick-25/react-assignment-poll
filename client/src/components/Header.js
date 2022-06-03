import React from "react";

import '../css/header.css'

const Header = ({ title }) => {
    return (
        <div className="header">
            <div className="brand">
                {title}
            </div>
        </div>
    )
};

export default Header;
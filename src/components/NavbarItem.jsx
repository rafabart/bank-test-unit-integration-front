import React from 'react'


const navbarItem = (props) => 
    <li className="nav-item">
        <a className="nav-link" onClick={props.onClick} href={props.href}>{props.label}</a>
    </li>
    

export default navbarItem
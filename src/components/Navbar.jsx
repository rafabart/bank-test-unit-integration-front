import React from 'react'

import NavbarItem from './NavbarItem'


const navbar = () => 
    <div className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">

            <div className="collapse navbar-collapse" id="navbarResponsive">

                <ul className="navbar-nav">
                    <NavbarItem href="/home" label="Home" />
                    <NavbarItem href="/customers" label="Clientes" />
                    <NavbarItem href="/accounts" label="Contas" />
                </ul>

            </div>
        </div>
    </div>


export default navbar
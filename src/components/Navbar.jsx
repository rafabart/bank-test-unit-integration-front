import React from 'react'

import NavbarItem from './NavbarItem'


const navbar = () => 
    <div className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">

            <a href="/home" className="navbar-brand">IconeHome</a>

            <button className="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarResponsive" aria-controls="navbarResponsive"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarResponsive">

                <ul className="navbar-nav">
                    <NavbarItem href="/home" label="Home" />
                    <NavbarItem href="/customers" label="Clientes" />
                    <NavbarItem href="/accounts" label="Contas" />
                    <NavbarItem href="/deposit" label="Depositar" />
                    <NavbarItem href="/withdraw" label="Sacar" />
                </ul>

            </div>
        </div>
    </div>


export default navbar
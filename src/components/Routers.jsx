import React from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import AddEditAccount from '../views/account/AddEditAccount'
import AddEditCustomer from '../views/customer/AddEditCustomer'
import Home from '../views/Home'
import ListAccount from '../views/account/ListAccount'
import ListCustomer from '../views/customer/ListCustomer'
import NavBar from '../components/Navbar'
import NewDeposit from '../views/deposit/NewDeposit'
import NewWithdraw from '../views/withdraw/NewWithdraw'
import UrlException from '../views/exception/UrlException'



const router = () =>

    <BrowserRouter>
        <NavBar />
        <div className="container">
            <Switch>
                <Route path="/account/:id?" exact component={AddEditAccount} />
                <Route path="/accounts/:message?" exact component={ListAccount} />
                <Route path="/customer/:id?" exact component={AddEditCustomer} />
                <Route path="/customers/:message?" exact component={ListCustomer} />
                <Route path="/deposit/:id" exact component={NewDeposit} />
                <Route path="/home" exact component={Home} />
                <Route path="/withdraw/:id" exact component={NewWithdraw} />
                <Route path="*" component={UrlException} />
            </Switch>
        </div>
    </BrowserRouter>



export default router
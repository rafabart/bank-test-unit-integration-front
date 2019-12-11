import React from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import ListCustomer from '../views/customer/ListCustomer'
import AddEditCustomer from '../views/customer/AddEditCustomer'
import ListAccount from '../views/account/ListAccount'
import AddEditAccount from '../views/account/AddEditAccount'


const router = () =>

    <BrowserRouter>
        <Switch>
            <Route path="/customers" component={ListCustomer} />
            <Route path="/customer/:id?" component={AddEditCustomer} />
            <Route path="/accounts" component={ListAccount} />
            <Route path="/account/:id?" component={AddEditAccount} />
        </Switch>
    </BrowserRouter>



export default router
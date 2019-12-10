import React from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import ListCustomer from '../views/customer/ListCustomer'
import AddEditCustomer from '../views/customer/AddEditCustomer'


const router = () =>

    <BrowserRouter>
        <Switch>
            <Route path="/customer" component={AddEditCustomer} />
            <Route path="/customers" component={ListCustomer} />
        </Switch>
    </BrowserRouter>



export default router
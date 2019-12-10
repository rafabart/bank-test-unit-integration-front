import React from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import TableComponent from '../components/TableComponent'
import AddEditCustomer from '../views/customer/AddEditCustomer'


const router = () =>

    <BrowserRouter>
        <Switch>
            <Route path="/customers" component={TableComponent} />
            <Route path="/customer" component={AddEditCustomer} />
        </Switch>
    </BrowserRouter>



export default router
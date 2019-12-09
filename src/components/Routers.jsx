import React from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import TableComponent from '../components/TableComponent'


const router = () =>

    <BrowserRouter>
        <Switch>
            <Route path="/customers" component={TableComponent} />
        </Switch>
    </BrowserRouter>



export default router
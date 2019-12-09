import React, { Component } from 'react'

import Navbar from '../src/components/Navbar'
// import TableComponent from './components/TableComponent'
import Routers from './components/Routers'

import 'bootswatch/dist/darkly/bootstrap.css'


class App extends Component {

  state = {
    customer: [{ id: 1, cpf: '321.654.987-74', name: 'Rafael' },
    { id: 1, cpf: '321.654.987-74', name: 'Rafael' }]

  }


  render() {

    return (

      <>
        <Navbar />
        <div className="container">
          {/* <TableComponent list={this.state.customer} /> */}
          <Routers />
        </div>
      </>
    )
  }
}


export default App
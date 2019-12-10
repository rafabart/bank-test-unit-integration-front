import React, { Component } from 'react'

import Navbar from './components/Navbar'
import Routers from './components/Routers'

import 'primeicons/primeicons.css'
import 'bootswatch/dist/darkly/bootstrap.css'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/nova-light/theme.css'


class App extends Component {

  render() {

    return (

      <>
        <Navbar />
        <div className="container">
          <Routers />
        </div>
      </>
    )
  }
}


export default App
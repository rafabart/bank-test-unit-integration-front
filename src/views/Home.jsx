import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../components/Card'


class Home extends Component {

    render() {
        return (
            <Card title="Seja bem-vindo!">
                <h2>POC de sistema bancario</h2>
            </Card>
        )
    }

}

export default withRouter(Home)
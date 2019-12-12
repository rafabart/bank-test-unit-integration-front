import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../../components/Card'


class UrlException extends Component {

    render() {
        return (
            <Card title="Página não encontrada!">
            </Card>
        )
    }

}

export default withRouter(UrlException)
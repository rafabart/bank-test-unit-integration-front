import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { Growl } from 'primereact/growl'

import axios from "../../utils/httpClient"
import Card from '../../components/Card'
import FormGroup from '../../components/FormGroup'


class TerminalLogin extends Component {

    state = {
        account: {
            id: '',
            agency: '',
            numberAccount: '',
        }
    }


    handleFindAccount = () => {

        let { numberAccount, agency } = this.state.account

        let params = `/accounts/?numberAccount=${numberAccount}&agency=${agency}`

        axios.get(params)
            .then(({ data }) => (
                this.props.history.push(`/terminalOptions/${data[0].id}`)
            )).catch(error => {
                this.Growl.show({ severity: 'error', summary: 'Conta não encontrada!' })
            })

    }


    handleChange = (event) => {

        const value = event.target.value
        const attribute = event.target.name

        this.setState(({ account }) => ({
            account: {
                ...account,
                [attribute]: value
            }
        }))
    }

    render() {

        const { numberAccount, agency } = this.state.account

        return (
            <div className="container" style={{ width: '22vw' }}>
                <Card title="Autoatendimento">

                    <div className="row">
                        <div className="col-md-12">
                            <FormGroup id="inputAgency" label="Agencia: *">
                                <input id="inputAgency" type="text" name="agency"
                                    className="form-control"
                                    placeholder="Digite a agencia"
                                    value={agency}
                                    onChange={this.handleChange} />
                            </FormGroup>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-md-12">
                            <FormGroup id="inputNumberAccount" label="Conta: *">
                                <input id="inputNumberAccount" type="text" name="numberAccount"
                                    value={numberAccount}
                                    className="form-control"
                                    placeholder="Digite a conta"
                                    onChange={this.handleChange} />
                            </FormGroup>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12 ">
                            <button className="btn btn-success mr-3"
                                onClick={this.handleFindAccount}>
                                <i className="pi pi-lock"></i>Acessar Conta
                        </button>
                        </div>
                    </div>

                    <Growl ref={(el) => this.growl = el} />

                </Card >
            </div>
        )
    }
}

export default withRouter(TerminalLogin)
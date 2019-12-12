import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import axios from "../../utils/httpClient"
import { Growl } from 'primereact/growl'

import Card from '../../components/Card'
import FormGroup from '../../components/FormGroup'


class NewDeposit extends Component {

    state = {
        deposit: '',
        idAccount: '',

        account: {
            numberAccount: '',
            balance: '',
            limitAccount: '',
            customer: {
                name: ''
            }
        }
    }


    componentDidMount() {

        const params = this.props.match.params

        if (params.id) {
            axios.get(`/accounts/${params.id}`)
                .then(({ data }) => {                    
                    this.setState({
                        idAccount: data.id,
                        account: data
                    })
                })
                .catch(error => {
                    this.growl.show({ severity: 'error', summary: 'Conta não encontrada!' })
                })
        }
    }


    handleChange = (event) => {
        const value = event.target.value
        const attribute = event.target.name

        this.setState({ [attribute]: value })
    }


    handleCancel = () => {
        this.props.history.push('/accounts')
    }


    handleSubmitSave = (event) => {
        event.preventDefault()

        axios.post("/accounts/deposit", this.state)
            .then(() => {
                this.handleCancel()
            })
            .catch(({ response }) => {                
                let errors = response.data.errors

                errors.forEach((element) => {
                    this.growl.show({ severity: 'error', summary: element.defaultMessage })
                })
            })
    }


    render() {
        return (
            <Card title="Novo depósito">

                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputDeposit" label="Valor: *">
                            <input id="inputDeposit" type="text" name="deposit"
                                value={this.state.deposit}
                                className="form-control "
                                placeholder="Digite o valor do depósito"
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-3">
                        <FormGroup id="inputDeposit" label="Conta">
                            <input id="inputDeposit" type="text" disabled
                                className="form-control "
                                value={this.state.account.numberAccount} />
                        </FormGroup>
                    </div>
                    <div className="col-md-3">
                        <FormGroup id="inputDeposit" label="Cliente">
                            <input id="inputDeposit" type="text" disabled
                                className="form-control "
                                value={this.state.account.customer.name} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                    </div>
                    <div className="col-md-3">
                        <FormGroup id="inputBalance" label="Saldo">
                            <input id="inputBalance" type="text" disabled
                                className="form-control "
                                value={this.state.account.balance} />
                        </FormGroup>
                    </div>
                    <div className="col-md-3">
                        <FormGroup id="inputLimitAccount" label="Limite">
                            <input id="inputLimitAccount" type="text" disabled
                                className="form-control "
                                value={this.state.account.limitAccount} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <button className="btn btn-sm btn-success mr-3" onClick={this.handleSubmitSave}>
                            <i className="pi pi-save"></i>Depositar</button>
                        <button className="btn btn-sm btn-danger" onClick={this.handleCancel}>
                            <i className="pi pi-times"></i>Cancelar</button>
                    </div>
                </div>

                <Growl ref={(el) => this.growl = el} />

            </Card>
        )
    }
}

export default withRouter(NewDeposit)
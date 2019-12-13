import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { Growl } from 'primereact/growl'

import axios from "../../utils/httpClient"
import Card from '../../components/Card'
import FormGroup from '../../components/FormGroup'


class NewWithdraw extends Component {

    state = {
        withdraw: '',
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


    handleCancel = (message) => {
        this.props.history.push(`/accounts/${message}`)
    }


    handleSubmitSave = (event) => {
        event.preventDefault()

        axios.post("/accounts/withdraw", this.state)
            .then(() => {
                this.handleCancel('Saque realizado com sucesso')
            })
            .catch(({ response }) => {
                if (response.status === 500) {
                    this.growl.show({ severity: 'error', summary: response.data.message })
                } else {
                    let errors = response.data.errors

                    errors.forEach((element) => {
                        this.growl.show({ severity: 'error', summary: element.defaultMessage })
                    })
                }
            })
    }


    formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
            .format(value)
    }


    render() {

        const { withdraw } = this.state

        const { name } = this.state.account.customer

        const { numberAccount, balance, limitAccount } = this.state.account

        return (
            <Card title="Novo saque">

                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputWithdraw" label="Valor: *">
                            <input id="inputWithdraw" type="text" name="withdraw"
                                value={withdraw}
                                className="form-control"
                                placeholder="Digite o valor do saque"
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-3">
                        <FormGroup id="inputNumberAccount" label="Conta">
                            <input id="inputNumberAccount" type="text" disabled
                                className="form-control"
                                value={numberAccount} />
                        </FormGroup>
                    </div>
                    <div className="col-md-3">
                        <FormGroup id="inputCustomer" label="Cliente">
                            <input id="inputCustomer" type="text" disabled
                                className="form-control"
                                value={name} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                    </div>
                    <div className="col-md-3">
                        <FormGroup id="inputBalance" label="Saldo">
                            <input id="inputBalance" type="text" disabled
                                className={balance < 0 ? 'form-control text-danger' : 'form-control'}
                                value={this.formatCurrency(balance)} />
                        </FormGroup>
                    </div>
                    <div className="col-md-3">
                        <FormGroup id="inputLimitAccount" label="Limite">
                            <input id="inputLimitAccount" type="text" disabled
                                className="form-control"
                                value={this.formatCurrency(limitAccount)} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <button className="btn btn-sm btn-success mr-3" onClick={this.handleSubmitSave}>
                            <i className="pi pi-save"></i>Sacar</button>
                        <button className="btn btn-sm btn-danger" onClick={() => this.handleCancel("cancel")}>
                            <i className="pi pi-times"></i>Cancelar</button>
                    </div>
                </div>

                <Growl ref={(el) => this.growl = el} />

            </Card>
        )
    }
}

export default withRouter(NewWithdraw)
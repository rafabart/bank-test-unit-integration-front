import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import axios from "../../utils/httpClient"
import { Growl } from 'primereact/growl'

import Card from '../../components/Card'
import FormGroup from '../../components/FormGroup'
import SelectMenu from '../../components/SelectMenu'


class AddEditAccount extends Component {

    state = {
        account: {
            id: '',
            numberAccount: '',
            agency: '',
            balance: '',
            limitAccount: '',
            accountTypeString: '',
            idCustomer: ''
        },
        customers: []
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


    handleCancel = () => {
        this.props.history.push('/accounts')
    }


    handleSubmitSave = (event) => {
        event.preventDefault()

        axios.post("/accounts", this.state.customer)
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


    handleSubmitUpdate = (event) => {
        event.preventDefault()

        axios.put(`/accounts/${this.state.account.id}`, this.state.account)
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

    componentDidMount() {

        this.retrieveCustomers()

        const params = this.props.match.params

        if (params.id) {
            axios.get(`/accounts/${params.id}`)
                .then(({ data }) => {
                    this.setState({
                        account: data
                    })
                })
                .catch(error => {
                    this.growl.show({ severity: 'error', summary: 'Conta não encontrada!' })
                })
        }

    }


    listAccountType() {
        return [
            { label: 'Selecione...', value: '' },
            { label: 'Corrente', value: 'CHECKING' },
            { label: 'Poupança', value: 'SAVINGS' }
        ]
    }


    retrieveCustomers() {

        axios.get('/customers')
            .then(({ data }) =>
                this.setState({
                    customers: data
                })

            )
    }


    listCustomers() {

        const { customers } = this.state

        let customerList = []

        customers.map(customer => customerList.push({label: customer.name, value:customer.id}))

        return customerList
    }


    render() {
        return (
            <Card title={this.state.account.id ? 'Alterar Conta' : 'Cadastro de Conta'}>

                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputNumberAccount" label="Conta: *">
                            <input id="inputNumberAccount" type="text" name="numberAccount"
                                value={this.state.account.numberAccount}
                                className="form-control "
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>

                    <div className="col-md-6">
                        <FormGroup id="inputAgency" label="Agencia: *">
                            <input id="inputAgency" type="text" name="agency"
                                value={this.state.account.agency}
                                className="form-control"
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputBalance" label="Saldo: *">
                            <input id="inputBalance" type="text" name="balance"
                                value={this.state.account.balance}
                                className="form-control "
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>

                    <div className="col-md-6">
                        <FormGroup id="inputLimitAccount" label="Limite: *">
                            <input id="inputLimitAccount" type="text" name="limitAccount"
                                value={this.state.account.limitAccount}
                                className="form-control"
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">

                    <div className="col-md-6">
                        <FormGroup htmlFor="inputIdCustomer" label="Cliente:">
                            <SelectMenu className="form-control" name="idCustomer"
                                listData={this.listCustomers()}
                                value={this.state.account.idCustomer}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>

                    <div className="col-md-6">
                        <FormGroup htmlFor="inputAccountTypeString" label="Tipo:">
                            <SelectMenu className="form-control" name="accountTypeString"
                                listData={this.listAccountType()}
                                value={this.state.account.accountTypeString}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-12">

                        {/* Verifica qual botão renderizar, 'Salvar' ou  'Editar' */}
                        {
                            this.state.account.id ?
                                (
                                    <button className="btn btn-sm btn-success mr-3" onClick={this.handleSubmitUpdate}>
                                        <i className="pi pi-refresh"></i>Atualizar</button>
                                ) : (
                                    <button className="btn btn-sm btn-success mr-3" onClick={this.handleSubmitSave}>
                                        <i className="pi pi-save"></i>Salvar</button>
                                )
                        }

                        <button className="btn btn-sm btn-danger" onClick={this.handleCancel}>
                            <i className="pi pi-times"></i>Cancelar</button>
                    </div>
                </div>

                <Growl ref={(el) => this.growl = el} />

            </Card>
        )
    }
}

export default withRouter(AddEditAccount)
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { Growl } from 'primereact/growl'

import axios from "../../utils/httpClient"
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


    handleCancel = (message) => {
        this.props.history.push(`/accounts/${message}`)
    }


    handleSubmitSave = (event) => {
        event.preventDefault()

        axios.post("/accounts", this.state.account)
            .then(() => {
                this.handleCancel('Nova Conta adicionada com sucesso')
            })
            .catch(({ response }) => {

                let errors = response.data.errors

                errors.forEach((element) => {
                    this.growl.show({ severity: 'error', summary: element.defaultMessage })
                })
            })
    }


    handleCancel = (message) => {
        this.props.history.push(`/accounts/${message}`)
    }


    handleSubmitUpdate = (event) => {
        event.preventDefault()

        axios.put(`/accounts/${this.state.account.id}`, this.state.account)
            .then(() => {
                this.handleCancel('Alteração de Conta realizada com sucesso')
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
                    this.setState(({ account }) => ({
                        account: {
                            ...account,
                            idCustomer: data.customer.id
                        }
                    }))
                })
                .catch(error => {
                    this.growl.show({ severity: 'error', summary: 'Conta não encontrada!' })
                })
        }
    }


    selectListAccountType() {
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


    selectListCustomers() {

        const { customers } = this.state

        let customerList = [{ label: 'Selecione...', value: '' }]

        customers.map(customer => customerList.push({
            label: `${customer.id}  --  ${customer.name}`, value: customer.id
        }))

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
                                className="form-control"
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

                    <div className="col-md-4">
                        <FormGroup htmlFor="inputCustomer" label="Cliente:">
                            <SelectMenu className="form-control" name="idCustomer"
                                listData={this.selectListCustomers()}
                                value={this.state.account.idCustomer}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-2 align-self-center mt-3">
                        <button onClick={this.handleNewCustomer} className="btn btn-md btn-success">
                            <i className="pi pi-plus"></i>Novo</button>
                    </div>

                    <div className="col-md-6">
                        <FormGroup htmlFor="inputAccountTypeString" label="Tipo:">
                            <SelectMenu className="form-control" name="accountTypeString"
                                listData={this.selectListAccountType()}
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

                        <button className="btn btn-sm btn-danger" onClick={() => this.handleCancel("cancel")}>
                            <i className="pi pi-times"></i>Cancelar</button>
                    </div>
                </div>

                <Growl ref={(el) => this.growl = el} />

            </Card>
        )
    }
}

export default withRouter(AddEditAccount)
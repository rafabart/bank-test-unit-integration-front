import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { Growl } from 'primereact/growl'

import axios from "../../utils/httpClient"
import Card from '../../components/Card'
import FormGroup from '../../components/FormGroup'
import SelectMenu from '../../components/SelectMenu'

class ListAccount extends Component {

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
        accounts: [],
        showConfirmDialog: false
    }


    componentDidMount() {

        const params = this.props.match.params

        if (params.message !== "cancel" && params.message !== undefined) {
            this.growl.show({ severity: 'success', summary: params.message })
        }
        this.findAccounts()
    }


    selectlistAccountType() {
        return [
            { label: 'Selecione...', value: '' },
            { label: 'Corrente', value: 'CHECKING' },
            { label: 'Poupança', value: 'SAVINGS' }
        ]
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


    handleRemove = () => {

        this.handleCleanInput()

        axios.delete(`/accounts/${this.state.account.id}`)
            .then(() => this.findAccounts())
    }


    handleCleanInput = () => {

        const accountClear = {
            numberAccount: '',
            agency: '',
            balance: '',
            limitAccount: '',
            accountTypeString: '',
            idCustomer: ''
        }

        this.setState({ showConfirmDialog: false, account: accountClear })
    }



    handleNewItem = () => {
        this.props.history.push('/account')
    }


    handleEdit = (id) => {
        this.props.history.push(`/account/${id}`)
    }


    handleDeposit = (id) => {
        this.props.history.push(`/deposit/${id}`)
    }


    handleWithdraw = (id) => {
        this.props.history.push(`/withdraw/${id}`)
    }


    formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
            .format(value)
    }


    formatAccountTypeString = (value) => {
        return value === "CHECKING" ? "Corrente" : "Poupança"
    }


    handleShowDialog = (account) => {
        this.setState({ showConfirmDialog: true, account: account })
    }


    findAccounts = () => {

        let { numberAccount, agency, balance, limitAccount, accountTypeString, idCustomer } = this.state.account

        let params = `/accounts/?numberAccount=${numberAccount}&
                        agency=${agency}&
                        balance=${balance}&
                        limitAccount=${limitAccount}&
                        idCustomer=${idCustomer}&
                        accountTypeString=${accountTypeString}`

        axios.get(params)
            .then(({ data }) =>
                this.setState({
                    accounts: data
                })
            )
    }



    render() {

        const footer = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.handleRemove} className="btn btn-sm btn-primary mr-3" />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.handleCleanInput}
                    className="p-button-secondary" />
            </div>
        )

        return (
            <>
                <Card title="Consulta de Contas">

                    <div className="row">
                        <div className="col-lg-6">
                            <FormGroup htmlFor="inputNumberAccount" label="Conta:">
                                <input id="inputNumberAccount" type="text"
                                    name="numberAccount"
                                    className="form-control"
                                    placeholder="Digite a Conta"
                                    value={this.state.account.numberAccount}
                                    onChange={this.handleChange} />
                            </FormGroup>
                        </div>

                        <div className="col-lg-6">
                            <FormGroup htmlFor="inputAgency" label="Agencia:">
                                <input id="inputAgency" type="text"
                                    name="agency"
                                    className="form-control"
                                    placeholder="Digite a Agencia"
                                    value={this.state.account.agency}
                                    onChange={this.handleChange} />
                            </FormGroup>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <FormGroup htmlFor="inputLimitAccount" label="Limite:">
                                <input id="inputLimitAccount" type="text"
                                    name="limitAccount"
                                    className="form-control"
                                    placeholder="Digite o Limite"
                                    value={this.state.account.limitAccount}
                                    onChange={this.handleChange} />
                            </FormGroup>
                        </div>

                        <div className="col-lg-6">
                            <FormGroup htmlFor="inputAccountTypeString" label="Tipo:">
                                <SelectMenu className="form-control" name="accountTypeString"
                                    listData={this.selectlistAccountType()}
                                    value={this.state.account.accountTypeString}
                                    onChange={this.handleChange} />
                            </FormGroup>

                        </div>
                    </div>

                    <button onClick={this.findAccounts} className="btn btn-sm btn-primary mr-3">
                        <i className="pi pi-search"></i>Buscar</button>
                    <button onClick={this.handleNewItem} className="btn btn-sm btn-success">
                        <i className="pi pi-plus"></i>Cadastrar</button>
                </Card >

                <Card>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bs-component">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Conta</th>
                                            <th>Agencia</th>
                                            <th>Balanço</th>
                                            <th>Limite</th>
                                            <th>Tipo</th>
                                            <th>Cliente</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.accounts.map(account =>
                                            <tr key={account.id}
                                                className={account.balance < 0 ? 'text-danger' : ''}>

                                                <td>{account.numberAccount}</td>
                                                <td>{account.agency}</td>
                                                <td>{this.formatCurrency(account.balance)}</td>
                                                <td>{this.formatCurrency(account.limitAccount)}</td>
                                                <td>{this.formatAccountTypeString(account.accountTypeString)}</td>
                                                <td>{account.customer.name}</td>
                                                <td>
                                                    <button className="btn btn-sm btn-success mr-2" onClick={() => this.handleDeposit(account.id)}>
                                                        Depositar
                                                </button>
                                                    <button className="btn btn-sm btn-warning mr-2" onClick={() => this.handleWithdraw(account.id)}>
                                                        Sacar
                                                </button>
                                                    <button className="btn btn-sm btn-primary mr-2" onClick={() => this.handleEdit(account.id)}>
                                                        Editar
                                                </button>
                                                    <button className="btn btn-sm btn-danger mr-2" onClick={() => this.handleShowDialog(account)}>
                                                        Remover
                                                </button>
                                                </td>
                                            </tr>)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <Growl ref={(el) => this.growl = el} />

                    <div>
                        <Dialog header="Confirmação"
                            visible={this.state.showConfirmDialog}
                            style={{ width: '50vw' }}
                            footer={footer}
                            modal={true}
                            onHide={() => this.setState({ showConfirmDialog: false })}>
                            <p>Confirma a exclusão desta conta?</p>
                            <p>Conta: {this.state.account.numberAccount}</p>
                        </Dialog>
                    </div>

                </Card>
            </>
        )

    }

}
export default withRouter(ListAccount)
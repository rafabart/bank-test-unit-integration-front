import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from "../../utils/httpClient"

import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Growl } from 'primereact/growl'

import Card from '../../components/Card'
import FormGroup from '../../components/FormGroup'

class ListCustomer extends Component {

    state = {
        customer: {
            id: '',
            cpf: '',
            name: ''
        },
        customers: [],
        showConfirmDialog: false
    }


    componentDidMount() {

        const params = this.props.match.params

        if (params.message !== "cancel" && params.message !== undefined) {
            this.growl.show({ severity: 'success', summary: params.message })
        }

        this.findCustomers()
    }


    handleChange = (event) => {
        const value = event.target.value
        const attribute = event.target.name

        this.setState(({ customer }) => ({
            customer: {
                ...customer,
                [attribute]: value
            }
        }))
    }


    handleRemove = () => {

        this.handleCleanInput()

        axios.delete(`/customers/${this.state.customer.id}`)
            .then(() => this.findCustomers())
    }



    handleCleanInput = () => {

        const customerClear = {
            name: '',
            cpf: ''
        }

        this.setState({ showConfirmDialog: false, customer: customerClear })
    }



    handleNewCustomer = () => {
        this.props.history.push('/customer')
    }


    handleEdit = (id) => {
        this.props.history.push(`/customer/${id}`)
    }


    handleShowDialog = (customer) => {
        this.setState({ showConfirmDialog: true, customer: customer })
    }


    findCustomers = () => {

        let params = `/customers?name=${this.state.customer.name}&cpf=${this.state.customer.cpf}`

        axios.get(params)
            .then(({ data }) =>
                this.setState({
                    customers: data
                })
            )
    }


    render() {

        const { name, cpf } = this.state.customer

        const footer = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.handleRemove} className="btn btn-sm btn-primary mr-3" />
                <Button label="Cancelar" icon="pi pi-times" onClick={() => this.handleCleanInput()}
                    className="p-button-secondary" />
            </div>
        )

        return (
            <>
                <Card title="Consulta de Clientes">

                    <div className="row">
                        <div className="col-lg-6">
                            <FormGroup htmlFor="inputName" label="Nome:">
                                <input id="inputName" type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Digite o Nome"
                                    value={name}
                                    onChange={this.handleChange} />
                            </FormGroup>
                        </div>

                        <div className="col-lg-6">
                            <FormGroup htmlFor="inputCpf" label="CPF:">
                                <input id="inputCpf" type="text"
                                    name="cpf"
                                    className="form-control"
                                    placeholder="Digite o CPF"
                                    value={cpf}
                                    onChange={this.handleChange} />
                            </FormGroup>

                        </div>
                    </div>

                    <button onClick={this.findCustomers} className="btn btn-sm btn-primary mr-3">
                        <i className="pi pi-search"></i>Buscar</button>
                    <button onClick={this.handleNewCustomer} className="btn btn-sm btn-success">
                        <i className="pi pi-plus"></i>Cadastrar</button>
                </Card >

                <Card>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bs-component">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>CPF</th>
                                            <th>Nome</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.customers.map(customer => <tr key={customer.id}>
                                            <td>{customer.name}</td>
                                            <td>{customer.cpf}</td>
                                            <td>
                                                <button className="btn btn-sm btn-primary mr-2" onClick={() => this.handleEdit(customer.id)}>
                                                    Editar
                                                </button>
                                                <button className="btn btn-sm btn-danger mr-2" onClick={() => this.handleShowDialog(customer)}>
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
                            <p>Confirma a exclusão deste cliente?</p>
                            <p>Nome: {this.state.customer.name}</p>
                        </Dialog>
                    </div>
                </Card>
            </>
        )

    }

}
export default withRouter(ListCustomer)
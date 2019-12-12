import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from "../../utils/httpClient"

import { Growl } from 'primereact/growl'

import Card from '../../components/Card'
import FormGroup from '../../components/FormGroup'

class ListCustomer extends Component {

    state = {
        customer: {            
            cpf: '',
            name: ''
        },
        customers: []
    }


    componentDidMount() {
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


    handleRemove = (id) => {
        axios.delete(`/customers/${id}`)
            .then(() => this.findCustomers())
    }


    handleNewCustomer = () => {
        this.props.history.push('/customer')
    }


    handleEdit = (id) => {
        this.props.history.push(`/customer/${id}`)
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
                                    value={this.state.customer.name}
                                    onChange={this.handleChange} />
                            </FormGroup>
                        </div>

                        <div className="col-lg-6">
                            <FormGroup htmlFor="inputCpf" label="CPF:">
                                <input id="inputCpf" type="text"
                                    name="cpf"
                                    className="form-control"
                                    placeholder="Digite o CPF"
                                    value={this.state.customer.cpf}
                                    onChange={this.handleChange} />
                            </FormGroup>

                        </div>
                    </div>

                    <button onClick={this.findCustomers} className="btn btn-sm btn-success mr-3">
                        <i className="pi pi-search"></i>Buscar</button>
                    <button onClick={this.handleNewCustomer} className="btn btn-sm btn-danger">
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
                                                <button className="btn btn-sm btn-danger mr-2" onClick={() => this.handleRemove(customer.id)}>
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
                </Card>
            </>
        )

    }

}
export default withRouter(ListCustomer)
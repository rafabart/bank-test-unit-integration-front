import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import axios from "../../utils/httpClient"

import { Growl } from 'primereact/growl'

import Card from '../../components/Card'
import FormGroup from '../../components/FormGroup'

class ListCustomer extends Component {

    state = {
        customers: []
    }


    componentDidMount() {
        this.retrieveCustomers();
    }


    handleRemove = (id) => {
        axios.delete(`/customers/${id}`)
            .then(() => this.retrieveCustomers())
    }

    handleNewItem = () => {
        this.props.history.push('/customer')
    }


    retrieveCustomers() {
        axios.get("/customers")
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
                                    name="ano"
                                    className="form-control"
                                    placeholder="Digite o Nome"
                                    value={this.state.year}
                                    onChange={e => this.setState({ year: e.target.value })} />
                            </FormGroup>
                        </div>

                        <div className="col-lg-6">
                            <FormGroup htmlFor="inputCpf" label="CPF:">
                                <input id="inputCpf" type="text"
                                    name="cpf"
                                    className="form-control"
                                    placeholder="Digite o CPF"
                                    value={this.state.year}
                                    onChange={e => this.setState({ year: e.target.value })} />
                            </FormGroup>

                        </div>
                    </div>

                    <button onClick={this.buscar} className="btn btn-sm btn-success mr-3">
                        <i className="pi pi-search"></i>Buscar</button>
                    <button onClick={this.handleNewItem} className="btn btn-sm btn-danger">
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
                                                <button className="btn btn-sm btn-danger mr-2" onClick={() => this.handleRemove(customer.id)}>
                                                    Remover
                                                </button>
                                                <Link to={`/customers/edit/${customer.id}`} className="btn btn-sm btn-primary">
                                                    Alterar
                                                </Link>
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
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import axios from "../../utils/httpClient"
import { Growl } from 'primereact/growl'

import Card from '../../components/Card'
import FormGroup from '../../components/FormGroup'
import { element } from 'prop-types'


class AddEditCustomer extends Component {

    state = {
        customer: {
            id: '',
            cpf: '',
            name: ''
        }
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


    handleCancel = () => {
        this.props.history.push('/customers')
    }


    handleSubmit = (event) => {
        event.preventDefault()

        axios.post("/customers", this.state.customer)
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
            <Card title="Cadastro de Clientes">

                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputCpf" label="CPF: *">
                            <input id="inputCpf" type="text" name="cpf"
                                value={this.state.customer.cpf}
                                className="form-control "
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputName" label="Nome: *">
                            <input id="inputName" type="text" name="name"
                                value={this.state.customer.name}
                                className="form-control"
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">

                        {/* Verifica qual botão renderizar, 'Salvar' ou  'Editar' */}
                        {
                            this.state.customer.id ?
                                (
                                    <button className="btn btn-sm btn-success mr-3" onClick={this.atualizar}>
                                        <i className="pi pi-refresh"></i>Atualizar</button>
                                ) : (
                                    <button className="btn btn-sm btn-success mr-3" onClick={this.handleSubmit}>
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

export default withRouter(AddEditCustomer)
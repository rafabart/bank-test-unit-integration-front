import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { Growl } from 'primereact/growl'

import axios from "../../utils/httpClient"
import Card from '../../components/Card'
import FormGroup from '../../components/FormGroup'


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


    handleCancel = (message) => {
        this.props.history.push(`/customers/${message}`)
    }


    handleSubmitSave = (event) => {
        event.preventDefault()

        axios.post("/customers", this.state.customer)
            .then(() => {
                this.handleCancel('Novo Cliente adicionado com sucesso')
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

        axios.put(`/customers/${this.state.customer.id}`, this.state.customer)
            .then(() => {
                this.handleCancel('Alteração de Cliente realizada com sucesso')
            })
            .catch(({ response }) => {

                let errors = response.data.errors

                errors.forEach((element) => {
                    this.growl.show({ severity: 'error', summary: element.defaultMessage })
                })
            })
    }


    componentDidMount() {
        const params = this.props.match.params

        if (params.id) {
            axios.get(`/customers/${params.id}`)
                .then(({ data }) => {
                    this.setState({
                        customer: data
                    })
                })
                .catch(error => {
                    this.growl.show({ severity: 'error', summary: 'Cliente não encontrado!' })
                })
        }
    }


    render() {

        const { id, name, cpf } = this.state.customer

        return (
            <Card title={id ? 'Alterar Cliente' : 'Cadastro de Cliente'}>

                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputCpf" label="CPF: *">
                            <input id="inputCpf" type="text" name="cpf"
                                value={cpf}
                                className="form-control"
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputName" label="Nome: *">
                            <input id="inputName" type="text" name="name"
                                value={name}
                                className="form-control"
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">

                        {/* Verifica qual botão renderizar, 'Salvar' ou  'Editar' */}
                        {
                            id ?
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

export default withRouter(AddEditCustomer)
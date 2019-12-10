import React, { Component } from 'react'

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

        this.setState.customer({ [attribute]: value })
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
            </Card>
        )
    }
}

export default AddEditCustomer
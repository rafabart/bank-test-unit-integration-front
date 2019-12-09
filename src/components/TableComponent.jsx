import React from 'react'


export default (list) => {

    const rows = list.map(item => {
        return (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.cpf}</td>
                <td>{item.name}</td>
            </tr>
        )
    })


    return (
        <table className="table table-houver">
            <thead>
                <tr>
                    <th scope="col">Id:</th>
                    <th scope="col">CPF:</th>
                    <th scope="col">Nome:</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}


import React from 'react'


export default function SelectMenu(props) {

    const { listData } = props


    const options = listData.map((option, index) => {
        return (
            <option key={index} value={option.value}>{option.label}</option>
        )
    })
    
    return (
        <select className={props.className} name={props.name} onChange={props.onChange} value={props.value}>     
            {options}
        </select>
    )
}

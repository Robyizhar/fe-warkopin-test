import React from 'react'

const Button = ({property, icon, onAction, inner, text = 'click'}) => {
    return (
        <button onClick={onAction} title={text} type="button" className={property}><i className={icon}></i>{inner && inner}</button>
    )
}

export default Button
import React from 'react'

function Alert(props) {
    return (
        <div className='fixed-top' style={{height: '50px'}}>
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible`} >
                <strong>Alert!</strong> {props.alert.msg}
            </div>}
        </div>

    )
}

export default Alert

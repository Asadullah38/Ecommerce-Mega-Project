import React, { useState } from 'react'
import ReactAlert from "reactjs-alert";
const ReactAlerts = ({ error, type, title, quoteString }) => {
    
    const [status, setStatus] = useState(false)
    const options = {
        status: error, // true or false
        type: type, // success, warning, error, info
        title: title,
        quotes: true,
        quote: quoteString,
        color: "f4f4f4",
        button: "close",
    }
    return (
        <div>
            {error ? <ReactAlert
            {...options}
            Close={() => setStatus(false)} /> : null}</div>
    )
}

export default ReactAlerts
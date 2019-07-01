import React from 'react'

const Error = ( {err} ) => {
    console.log(err.error)
    return (
        <div>
            <h2 className="validation--errors--label">{err.error?'Validation errors':''}</h2>
            <div className="validation-errors">
                {
                    err.error ? 
                    <ul>
                        {err.error.map((err, i) => <li key={i}>{err}</li> )}
                    </ul> : ""
                }
            </div>
        </div>
    )
}

export default Error;
import React from 'react'

function Result(props) {
    return (
        <div className="col-md-8 card my-3">
            <h3>{props.question.title}</h3>
        </div>
    )
}

export default Result

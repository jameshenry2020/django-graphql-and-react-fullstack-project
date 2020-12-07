import React from 'react'

export const Question = (props) => {
    return ( 
            <div className="col-md-8 card mb-3">
               <h3 className="my-3 text-left question-1">{props.question.title}</h3>
               <span className="text-mute data-1">{props.question.createdAt}</span>
            </div>
        
    )
}

import React from 'react'


function Answer({ans}) {
   
    return (
        <div>
              <div className="mb-3">
                    <p className="mb-0">{ans.answer}</p>   
                    <span className="text-primary">@{ans.postedBy.username}</span>
                </div>
        </div>
    )
}

export default Answer

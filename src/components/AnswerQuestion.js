import React, { useState} from 'react'
import {gql, useMutation } from "@apollo/client"
import {SINGLE_QUESTION_QUERY} from "./QuestionDetail"

const CREATE_ANSWER_MUTATION=gql`
mutation AnswerQuestion($id:Int!, $answer:String){
    createAnswer(questionId:$id, answer:$answer){
              question{
               title
              }
             answer{
                 id
                 answer
             }
            
       }
}


`;


function AnswerQuestion(props) {
    const [answer, setAnswer]=useState('')

    const [createAnswer]=useMutation(CREATE_ANSWER_MUTATION,{
        refetchQueries:[ {query:SINGLE_QUESTION_QUERY,  variables: {
                            question_id: props.question_id,
                      } } ]
    })
       

     const _submitAnswer = async()=>{
       await createAnswer({
            variables:{
                id:props.question_id,
                answer:answer
            },
       
                    
         })
            
        
        setAnswer('')
    }

    
    return (
        <div>
             <textarea
             value={answer}
             onChange={(e)=>setAnswer(e.target.value)}
             className="form-control mb-3" rows="5" placeholder="provide an answer">

             </textarea>
             <button type="submit" className="btn btn-primary" onClick={()=>_submitAnswer()}>Submit</button>
        </div>
    )
}

export default AnswerQuestion

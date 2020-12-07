import React, {useState} from 'react'
import {gql, useMutation} from "@apollo/client"
import {useHistory} from "react-router-dom"

const UPDATE_QUESTION_MUTATION=gql`
mutation UpdateQuestion($id:ID!, $question:QuestionInput!){
    updateQuestion(questionId:$id, questionUpdate:$question){
      question{
        id
        title
        description
        
      }
    }
  }


`;



const UpdateForm = ({initial}) => {
     const id=initial.id
    const [questionData, setQuestionData]=useState({title:initial.title, description:initial.description})
    const history=useHistory()
    const[updateQuestion]=useMutation(UPDATE_QUESTION_MUTATION)
    const _submitUpdate= async ()=>{
         await updateQuestion({
             variables:{
                 id:id,
                 question:{
                     title:questionData.title,
                     description:questionData.description
                 }
             }
         })
         history.push('/questions')

        }
    return (
        <div>
           <div className="col-md-10 mx-auto">
                <h3 className="text-center">Edit your Question</h3>
                 <input type="text"
                 placeholder="What is your question"
                 className="form-control mb-3"
                 value={questionData.title}
                 
                 onChange={(e)=>setQuestionData({...questionData, title:e.target.value})}/>
                 
                 <textarea className="form-control mb-3"
                  placeholder="Explain your question in details, provide your code" 
                  value={questionData.description}
                  rows="4"
                  onChange={(e)=>setQuestionData({...questionData, description:e.target.value})} />

                <div>
                    <button type="submit" className="btn btn-primary" onClick={()=>_submitUpdate()}>Submit</button>
                </div>

            </div>
        </div>
    )
}

export default UpdateForm

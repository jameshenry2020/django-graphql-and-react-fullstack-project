import React,{useState} from 'react'
import {gql , useMutation} from "@apollo/client"
import {useHistory} from "react-router-dom"

const CREATE_QUESTION_MUTATION=gql`
        mutation CreateNewQuestion($title:String!, $description:String){
            createQuestion(title:$title, description:$description){
                    question{
                    id
                     title
                     postedBy{
                       username
                     }
                  }
               }
        }
`;



function CreateQuestion() {
    const [question, setQuestion]=useState({title:'', detail:''})
    const history=useHistory()
    const [addQuestion]=useMutation(CREATE_QUESTION_MUTATION)
    const _submitQuestion=()=>{
             addQuestion({
                 variables:{
                     title:question.title,
                     description:question.detail
                 }

             })
             history.push('/questions')
            }
    return (
        <div className="container my-5">
            <div className="col-md-10 mx-auto">
                <h3 className="text-center">Ask your Question</h3>
                 <input type="text"
                 placeholder="What is your question"
                 className="form-control mb-3"
                 value={question.title}
                 onChange={(e)=>setQuestion({...question, title:e.target.value})}/>
                 <textarea className="form-control mb-3"
                  placeholder="Explain your question in details, provide your code" 
                  value={question.detail}
                  rows="4"
                  onChange={(e)=>setQuestion({...question, detail:e.target.value})}/>

                <div>
                    <button type="submit" className="btn btn-primary" onClick={()=>_submitQuestion()}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default CreateQuestion

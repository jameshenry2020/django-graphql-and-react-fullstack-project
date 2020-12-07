import React from 'react'
import {gql, useMutation} from "@apollo/client"
import {useHistory} from "react-router-dom"
import {GET_ALL_QUESTIONS} from "./QuestionList"



const DELETE_QUESTION_MUTATION=gql`
  mutation DeleteQuestion($id:Int!){
    deletedQuestion(questionId:$id){
        question{
            id

        }
    }            
  }
`;
function DeleteQuestion({match}) {
    const history=useHistory()
    const [deleteQuestion]=useMutation(DELETE_QUESTION_MUTATION, {
        refetchQueries:[{query:GET_ALL_QUESTIONS}]
    })
    const id =match.params.id
    const _confirmDelete= async()=>{
       await deleteQuestion({
            variables:{
                id:id
            }
            
        
        })

      await  history.push("/questions")

    }
    return (
        <div className="container mt-4">
            <div className="card col-md-8 p-4">
            <p>Are you sure you want to delete this question?</p>

            <button className="btn btn-danger mt-3" onClick={()=>_confirmDelete()}>Confirm</button>
            </div>
        </div>
    )
}

export default DeleteQuestion

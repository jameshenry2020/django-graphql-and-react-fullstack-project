import React,{useState} from 'react'
import {gql, useQuery} from "@apollo/client"
import AnswerQuestion from './AnswerQuestion';
import Answer from './Answer';
import { DG_USER_ID} from "../constant"
import {Link } from "react-router-dom"

export const SINGLE_QUESTION_QUERY=gql`
 query GetSingleQuestion($question_id:Int!){
       singleQuestion(id:$question_id){
          id
          title
          description
          postedBy{
              id
           username
         }
         answers{
           id
           answer
           postedBy{
             username
           }
         }
      }
     }



`;


function QuestionDetail({match}) {
    const userid=localStorage.getItem(DG_USER_ID)
    const {loading, error, data}=useQuery(SINGLE_QUESTION_QUERY,{
        variables:{
            question_id:match.params.id
        }
    })

    if (loading) return null;
    if (error) return `Error! ${error}`;
    return (
        <div className="container p-4">
           <div className="col-md-8 card my-5">
           <h2 className="data-2 text-capitalize">{data.singleQuestion.title} ?</h2>

           <div className="card-body">
                <div className="jumbotron">
                     <h3>Description</h3>
                     <p className="text-mute">{data.singleQuestion.description}</p>

                     <div>
                       {data.singleQuestion.postedBy.id===userid ?<Link to={`/question/update/${data.singleQuestion.id}`}><button className="btn btn-info my-2 btn-sm">edit question</button></Link>  : "" }
                       {data.singleQuestion.postedBy.id===userid ?<Link to={`/question/delete/${data.singleQuestion.id}`}><button className="btn btn-danger ml-2 my-2 btn-sm">Delete question</button></Link>  : "" }
                    </div>

                </div>
    <h3 className="mt-3 text-uppercase">Answers ({data.singleQuestion.answers.length})</h3>
                  <div>
                        {data.singleQuestion.answers.map(ans =>(
                            <Answer ans={ans} key={ans.id}/>
                        ))}
                 </div>

                <div className="mt-4">
                    <h3>Your Answer</h3>
                    <AnswerQuestion question={data.singleQuestion} question_id={data.singleQuestion.id}/>
                </div> 
           </div>

           </div>
        </div>
    )
}

export default QuestionDetail

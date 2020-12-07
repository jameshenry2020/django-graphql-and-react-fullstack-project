import React from 'react'
import {useQuery, gql} from "@apollo/client"
import { Question } from './Question';
import {Link} from "react-router-dom"



export const GET_ALL_QUESTIONS=gql`
  query AllQuestionQuery{
      questions{
          id
          title
          createdAt
      }
  }

`;

const QuestionList = () => {
    
    const {loading, error, data}=useQuery(GET_ALL_QUESTIONS)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>An Error occured:(</p>;   
    return (
        <div className="container">
            
            <h1>Top Questions</h1>       
               <div>
                {data.questions.map(result =>(
                    <Link to={`/question/${result.id}`}  key={result.id}>
                       <Question question={result}/>
                    </Link>
                ))}
               </div>
             
            
             
        </div>
    )
}

export default QuestionList

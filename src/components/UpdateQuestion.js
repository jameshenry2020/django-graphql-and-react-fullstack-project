import React,{} from 'react'
import {useQuery} from "@apollo/client"
import {SINGLE_QUESTION_QUERY} from "./QuestionDetail"
import UpdateForm from "./UpdateForm"


const UpdateQuestion = ({match}) => { 
    const {error, loading, data}=useQuery(SINGLE_QUESTION_QUERY,{
        variables:{
            question_id:match.params.id
        }
    })

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

     
        return (
            <div className="container my-5">
                {data ? <UpdateForm initial={data.singleQuestion} /> : "Loading" }                     
                                           
            </div>
        )
        
    
    
   
   
    
}

export default UpdateQuestion

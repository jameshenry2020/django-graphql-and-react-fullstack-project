import React, {useState} from 'react'
import Result from "./Result"
import {Link } from "react-router-dom"
import {gql, useApolloClient } from "@apollo/client"


const QUESTION_SEARCH_QUERY=gql`
  query AllQuestionSearchQuery($searchText:String){
    questions(search:$searchText){
        id
        title 
        createdAt 
      }
    }  
`;


function SearchPage(props) {
    const [searchResult, setSearchResult]=useState([])
    const [searchText, setSearchText]=useState('')
    const client=useApolloClient()

    const _executeSearch= async()=>{
         
        const result=await client.query({
            query:QUESTION_SEARCH_QUERY,
            variables:{
              searchText:searchText
            }
        })
        const questions=result.data.questions
         setSearchResult({questions})
         
    }
    console.log(searchResult.questions)
    return (
        <div className=" container w-100">
            <main role="main" className="h-100 p-5  d-flex flex-column">
            <div className="form-inline ml-auto my-2 my-lg-0 w-75">
                    <input className="form-control mr-sm-2 w-75"
                     type="search" 
                     placeholder="Search" 
                     value={searchText}
                     onChange={(e)=>setSearchText(e.target.value)}/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={()=>_executeSearch()}>Search</button>
            </div>
            </main>
            
                {searchResult.questions !==undefined ? 
                  searchResult.questions.map(result => (
                    <Link to={`/question/${result.id}`}  key={result.id}>
                            <Result question={result} /> </Link> ))    :  ""}
           
        </div>
    )
}

export default SearchPage

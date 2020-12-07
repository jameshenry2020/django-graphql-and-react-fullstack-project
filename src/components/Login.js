import React,{useState} from 'react'
import {gql , useMutation} from "@apollo/client"
import {useHistory } from "react-router-dom"
import { DG_USER_ID, DG_USER_TOKEN }  from "../constant"



const CREATE_USER_MUTATION=gql`
   mutation CreateNewUser($username:String! $email:String!, $password:String! ){
        createUser(username:$username,email:$email, password:$password){
            user{
                id
                username
            }
        }
        tokenAuth(username:$username, password:$password){
            token
        }
   }



`;

const SIGNIN_USER_MUTATION=gql`
  mutation  LoginUser($username:String!, $password:String!){
    tokenAuth(username:$username, password:$password){
        token
        user{
            id
        }
        }
  }

`;



const _saveUserData=(id, token)=>{
    localStorage.setItem(DG_USER_ID, id)
    localStorage.setItem(DG_USER_TOKEN, token)
}

const Login = () => {
    const [user, setUser]=useState({
        login:true,
        email:'',
        username:'',
        password:'',
    })
    let history=useHistory()
    const [createNewUser]=useMutation(CREATE_USER_MUTATION, {
        onCompleted(data){
            const id=data.createUser.user.id
            const token=data.tokenAuth.token
            _saveUserData(id, token)
        }
    })

    const [signinUser]=useMutation(SIGNIN_USER_MUTATION, {
        onCompleted(data){
            const id=data.tokenAuth.user.id
            const token=data.tokenAuth.token
            _saveUserData(id, token)
            
        }
    })

    const _confirm = async ()=>{
        if(user.login){
         await signinUser({
                variables:{
                    username:user.username,
                    password:user.password
                },
                ignoreResults:false,
                
            })
            
        }else{
             
             await createNewUser({
                 variables:{
                 username:user.username,
                 email:user.email,
                 password:user.password

                 },
                 ignoreResults:false,
             })
               
     }
     history.push('/questions')
}
    return (
        <div className="container my-4">
             <h4>{user.login ? 'Login':'Sign Up'}</h4> 
           <div className="card col-md-6 mx-auto p-4">
                {!user.login && 
                   <input type="email"
                    placeholder="enter a valid email"
                    className='form-control mb-3'
                    value={user.email} 
                    onChange={(e)=> setUser({...user, email:e.target.value})}/>
                }
                <input type='text'
                placeholder='enter your username'
                className='form-control mb-3'
                value={user.username}
                onChange={(e)=> setUser({...user, username:e.target.value})}/>
                 
                <input type='password'
                placeholder='enter your password'
                className='form-control mb-3'
                value={user.password}
                onChange={(e)=> setUser({...user, password:e.target.value})}/>

                <div className="d-flex justify-content-center align-items-center py-3">
                    <div className="mt-3 mr-2">
                    <button type='submit' className="btn btn-secondary" onClick={()=>_confirm()}>
                        {user.login ? 'Login':'Create Account'}
                    </button>
                    </div>
                    <div className="mt-3">
                        <button type="submit" className="btn btn-warning" onClick={()=> setUser({login:!user.login})}>
                            {user.login ? 'create an account': 'already has account? login'}
                        </button>
                    </div>
                </div>
           </div>

            
        </div>
    )
}

export default Login




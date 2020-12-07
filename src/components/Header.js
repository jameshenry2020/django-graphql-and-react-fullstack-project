import React, {Fragment} from 'react'
import {Link } from "react-router-dom"
import { withRouter, useHistory} from "react-router-dom"
import { DG_USER_ID,DG_USER_TOKEN} from "../constant"


 const Header = () => {
    const history=useHistory();
    const userid=localStorage.getItem(DG_USER_ID)
    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                 <Link to="/" className="navbar-brand" >CodingStack</Link>

               <div className="collapse navbar-collapse" id="navbarTogglerDemo03">                
               <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
               
                    {  userid && 
                     <div className="custom-nav">
                        <li className="nav-item"><Link to="/search" className="nav-link">Search</Link></li>
                        <li className="nav-item"><Link to="/questions" className="nav-link">Questions</Link></li>
                        <li className="nav-item"><Link to="/create_question" className="nav-link">Ask Question</Link></li>
                        
                    </div>
                      }
                   <li className="nav-item">
                       {userid ? 
                        <button className="btn btn-danger nav-link" onClick={()=>{
                            localStorage.removeItem(DG_USER_ID)
                            localStorage.removeItem(DG_USER_TOKEN)
                            history.push('/')
                        }}>
                            logout
                        </button>
                        :
                        <Link to="/login" className="nav-link">Login</Link>
                     } 
                     </li> 
                </ul>
              </div>
            </nav>
        </Fragment>
    
    )
}

export default withRouter(Header)













   


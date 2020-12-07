import React from "react"
import './App.css';
import  Header  from './components/Header';
import { Home } from './components/Home';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Login from "./components/Login"
import QuestionList from "./components/QuestionList"
import CreateQuestion from './components/CreateQuestion';
import QuestionDetail from './components/QuestionDetail';
import UpdateQuestion from './components/UpdateQuestion';
import DeleteQuestion from "./components/DeleteQuestion";
import SearchPage from "./components/SearchPage";

function App() {

  
  return (
    <Router>
    <div className="App">
      <Header/>
      <Switch>
       <Route exact path="/" component={Home}/>
       <Route exact path="/login" component={Login}/>
       <Route exact path="/questions" component={QuestionList}/>
       <Route exact path="/create_question" component={CreateQuestion}/>
       <Route exact path="/question/:id" component={QuestionDetail}/>
       <Route exact path="/search" component={SearchPage}/>
       <Route exact path="/question/update/:id" component={UpdateQuestion} />
       <Route exact path="/question/delete/:id" component={DeleteQuestion}/>
      </Switch>
      
    </div>
    </Router>
  );
}

export default App;

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import EditUser from './components/EditUser'
import UserList from './components/UserList'
import React from 'react'
import ReactDOM from 'react-dom'
import GlobalState from './GlobalState'

//css
import 'bootstrap/dist/css/bootstrap.min.css';
import './users.css'


function Index (){
  return (
    <div>
      <Router>
         <Switch>
             <Route exact path="/" component={Home} />
             <Route path="/register" component={Register} />
             <Route path="/edit/:id" component={EditUser} />
             <Route path="/userList" component={UserList} />
         </Switch>
      </Router>
    </div>
  )
}

ReactDOM.render(<Index/>, document.getElementById('root'))
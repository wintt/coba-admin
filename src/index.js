import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import EditUser from './components/EditUser'
import UserList from './components/UserList'
import ForgotPassword from './components/ForgotPassword'
import ChangePassword from './components/ChangePassword'
import React from 'react'
import ReactDOM from 'react-dom'

//css
import 'bootstrap/dist/css/bootstrap.min.css';
import './users.css'


function Index (){
  return (
    <div>
        {/* <header className="navbar-fixed-top cbp-af-header">
        <nav>
        </nav>
        <button>Login</button>
       </header> */}
      <Router>
         <Switch>
             <Route exact path="/" component={Home} />
             <Route path="/register" component={Register} />
             <Route path="/edit/:id" component={EditUser} />
             <Route path="/userList" component={UserList} />
              <Route path="/forgotPassword/:id" component={ForgotPassword} />
              <Route path="/changePassword/:id" component={ChangePassword} />
         </Switch>
      </Router>
    </div>
  )
}

ReactDOM.render(<Index/>, document.getElementById('root'))
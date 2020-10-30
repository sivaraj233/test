import { Switch } from "@material-ui/core"
import {
    BrowserRouter as Router,
    Route,
  } from "react-router-dom";

import TaskManagement from './component/TaskManagement'
import Login from './component/Login'

const Routes = () => {
    return (
        <Router>
            <Route path="/" component={Login} />
            <Route path="/home" component={TaskManagement} />

        </Router>
    )
}
export default Routes
import React, { } from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Layout from './hoc/Layout/Layout';
import TaskLogger from './Container/TaskLogger/TaskLogger';
import Auth from './Container/Auth/Auth';
import Logout from './Container/Auth/Logout/Logout';
import { connect } from 'react-redux';

const app = props => {

  let routes = (
    <Switch>
      <Route path="/auth" render={() => <Auth />} />
      <Route path="/" exact render={() => <TaskLogger />} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuth) {
    routes = (
      <Switch>
        <Route path="/auth" render={() => <Auth />} />
        <Route path="/logout" render={() => <Logout />} />
        <Route path="/" exact render={() => <TaskLogger />} />
        <Redirect to="/" />
      </Switch>
    );
  }



  return (
    <Layout>
      {routes}
    </Layout>
  );

}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(withRouter(app));

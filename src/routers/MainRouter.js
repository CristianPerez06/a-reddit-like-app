import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { PostDetailsMobile, Posts } from '../scenes/Posts'

const MainRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path='/posts' name='Posts' exact component={Posts} />
        <Route path='/posts/:postId' name='Post details' render={(props) => <PostDetailsMobile {...props} />} />
        <Route exact path='/'>
          <Redirect to='/posts' />
        </Route>
      </Switch>
    </Router>
  )
}

export default MainRouter

import React, {Component} from 'react'

import Login from './components/containers/logIn/Login'
export default class App extends Component {
  render() {
    console.log('Zapp props', this.props)
    return <Login />
  }
}

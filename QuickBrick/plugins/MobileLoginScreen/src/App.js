import React, {Component} from 'react'
import {connectToStore} from '@applicaster/zapp-react-native-redux'

const storeConnector = connectToStore(state => {
  const values = Object.values(state.rivers)
  const screenData = values.find(
    ({type}) => type === 'quick_brick_screen_login',
  )
  return {screenData}
})

// Components
import Login from './components/containers/logIn/Login'

class App extends Component {
  render() {
    const {screenData, callback, payload} = this.props
    const loginProps = {
      screenData,
      callback,
      payload,
    }
    return <Login {...loginProps} />
  }
}

export default storeConnector(App)

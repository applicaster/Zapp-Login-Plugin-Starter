/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react'
import propTypes from 'prop-types'
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native'
import {pathOr} from 'ramda'
import colors from '../../../style/color'

// Components
import InputField from '../../commons/inputField/InputField'
import RoundedButton from '../../commons/roundedButton/RoundedButton'

// Action
import {loginRequest} from '../../../actions/authAPI'

// Helpers
import {validateEmail, validateNotEmpty} from '../../../helper/validations'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }

  static propTypes = {
    screenData: propTypes.object,
    callback: propTypes.func,
    payload: propTypes.object,
  }

  updateForm = (value, label) => {
    this.setState({
      [label]: value,
    })
  }

  isLoginButtonEnable = () => {
    const {email, password} = this.state
    return validateEmail(email) === '' && validateNotEmpty(password) === ''
  }

  requestLoginAPI = () => {
    const {callback, payload, screenData} = this.props
    const isTesting = pathOr(false, ['general', 'is_testing'], screenData)
    loginRequest('/TEST_URL', this.state, isTesting) // THIS IS IN TEST MODE !!!!
      .then(res => {
        callback({
          success: true,
          payload,
        })
      })
    /***
     ***** ADD YOUR CUSTOM LOGIC HERE !!!! *****
    ex: save on localStorage token received from API
    ***/
  }

  render() {
    const {screenData} = this.props
    const isEnabled = this.isLoginButtonEnable()

    // Customizable layoout
    const appColorBackground = pathOr(
      colors.darkblue,
      ['general', 'app_bgcolor'],
      screenData,
    )
    const appFontColor = pathOr(
      colors.black,
      ['general', 'font_color'],
      screenData,
    )

    return (
      <KeyboardAvoidingView
        style={{...styles.wrapper, backgroundColor: appColorBackground}}
        behavior="padding">
        <View style={styles.scrollViewWrapper}>
          <ScrollView style={styles.avoidView}>
            <Image
              style={styles.logo}
              source={require('../../../style/images/applicaster_logo.png')}
            />
            <Text style={{...styles.loginHeader, color: appFontColor}}>
              Screen Login Plugin
            </Text>
            <InputField
              labelText="EMAIL ADDRESS"
              labelTextSize={14}
              labelColor={colors.white}
              textColor={colors.white}
              borderBottomColor={colors.white}
              inputType="email"
              customStyle={{marginBottom: 30}}
              inputValidation={validateEmail}
              onUpdateValue={this.updateForm}
            />
            <InputField
              labelText="PASSWORD"
              labelTextSize={14}
              labelColor={colors.white}
              textColor={colors.white}
              borderBottomColor={colors.white}
              inputType="password"
              customStyle={{marginBottom: 30}}
              inputValidation={validateNotEmpty}
              onUpdateValue={this.updateForm}
            />
            <RoundedButton
              text="Login"
              isEnabled={isEnabled}
              action={this.requestLoginAPI}
            />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flex: 1,
  },
  scrollViewWrapper: {
    marginTop: 20,
    flex: 1,
  },
  avoidView: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    flex: 1,
  },
  logo: {
    width: '100%',
    height: 50,
    marginTop: 10,
    marginBottom: 40,
  },
  loginHeader: {
    fontSize: 28,
    fontWeight: '300',
    marginBottom: 40,
  },
})

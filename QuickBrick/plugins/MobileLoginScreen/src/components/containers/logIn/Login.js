/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react'
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native'
import colors from '../../../style/color'

// Components
import InputField from '../../commons/inputField/InputField'
import RoundedButton from '../../commons/roundedButton/RoundedButton'

// Helpers
import {validateEmail, validateNotEmpty} from '../../../helper/validations'

export default class Login extends Component {
  render() {
    return (
      <KeyboardAvoidingView style={styles.wrapper} behavior="padding">
        <View style={styles.scrollViewWrapper}>
          <ScrollView style={styles.avoidView}>
            <Image
              style={styles.logo}
              source={require('../../../style/images/applicaster_logo.png')}
            />
            <Text style={styles.loginHeader}>Screen Login Plugin</Text>
            <InputField
              labelText="EMAIL ADDRESS"
              labelTextSize={14}
              labelColor={colors.white}
              textColor={colors.white}
              borderBottomColor={colors.white}
              inputType="email"
              customStyle={{marginBottom: 30}}
              inputValidation={validateEmail}
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
            />
            <RoundedButton text="Login" />
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
    backgroundColor: colors.orange,
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
    color: colors.black,
    fontWeight: '300',
    marginBottom: 40,
  },
})

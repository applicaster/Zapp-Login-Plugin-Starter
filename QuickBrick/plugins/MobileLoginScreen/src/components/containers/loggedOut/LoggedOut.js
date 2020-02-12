import React, {Component} from 'react'
import {StyleSheet, Text, View, Image} from 'react-native'
import colors from '../../../style/color'

// Components
import RoundedButton from '../../commons/roundedButton/RoundedButton'

export default class LoggedOut extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.welcomeWrapper}>
          <Image
            style={styles.logo}
            source={require('../../../style/images/applicaster_logo.png')}
          />
          <Text style={styles.welcomeText}>Login Screen Plugin</Text>
          <RoundedButton text="Go To Login" />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: 'flex',
    backgroundColor: colors.grey,
  },
  welcomeWrapper: {
    flex: 1,
    display: 'flex',
    marginTop: 30,
    padding: 20,
  },
  logo: {
    width: '100%',
    height: 50,
    marginTop: 50,
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 30,
    color: colors.black,
    fontWeight: '300',
    marginBottom: 40,
  },
})

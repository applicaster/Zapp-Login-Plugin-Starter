import React, {Component} from 'react'
import propTypes from 'prop-types'
import {Text, TouchableHighlight, StyleSheet} from 'react-native'
import colors from '../../../style/color'

export default class RoundedButton extends Component {
  static propTypes = {
    text: propTypes.string,
    isEnabled: propTypes.bool,
    action: propTypes.func,
  }

  callActionIfEnabled = () => {
    const {isEnabled, action} = this.props
    if (isEnabled) {
      action()
    }
  }

  render() {
    const {text, isEnabled} = this.props
    const bgColor = isEnabled ? styles.isEnabled : styles.isDisabled
    return (
      <TouchableHighlight
        style={[styles.wrapper, bgColor]}
        onPress={this.callActionIfEnabled}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableHighlight>
    )
  }
}
RoundedButton.propTypes = {
  text: propTypes.string.isRequired,
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 15,
    display: 'flex',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: colors.black,
  },
  isDisabled: {
    backgroundColor: colors.grey,
  },
  isEnabled: {
    backgroundColor: colors.green,
  },
  buttonText: {
    fontSize: 16,
    width: '100%',
    textAlign: 'center',
  },
})

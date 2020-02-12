import React, {Component} from 'react'
import propTypes from 'prop-types'
import {Text, View, TouchableHighlight, StyleSheet} from 'react-native'
import colors from '../../../style/color'

export default class RoundedButton extends Component {
  render() {
    const {text} = this.props
    return (
      <TouchableHighlight style={styles.wrapper}>
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
    backgroundColor: colors.grey,
  },
  buttonText: {
    fontSize: 16,
    width: '100%',
    textAlign: 'center',
  },
})

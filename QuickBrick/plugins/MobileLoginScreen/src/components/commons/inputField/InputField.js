import React, {Component} from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import colors from '../../../style/color'

class InputField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      secureInput: !(props.inputType === 'text' || props.inputType === 'email'),
      isValid: true,
    }
  }

  toggleShowPassword = () => {
    this.setState({secureInput: !this.state.secureInput})
  }

  validateInput = event => {
    const {inputValidation} = this.props
    if (inputValidation) {
      event.persist()
      const value = event.nativeEvent.text
      console.log('event', event)
      console.log('value : ', inputValidation(value), value)
      console.log('control !!', inputValidation(value) === '')
      this.setState({isValid: inputValidation(value) === ''})
    }
  }

  updateCallback = event => {
    const {onUpdateValue, inputType} = this.props
    event.persist()
    console.log('event on change', event)
    const value = event.nativeEvent.text
    onUpdateValue(value, inputType)
  }

  resetAsValidInput = () => {
    this.setState({isValid: true})
  }

  render() {
    const {
      labelText,
      labelTextSize,
      labelColor,
      labelErrorColor,
      textColor,
      borderBottomColor,
      inputType,
      customStyle,
    } = this.props

    const {secureInput, isValid} = this.state

    const color = labelColor || colors.white
    const errorColor = labelErrorColor || colors.red
    const fontSize = labelTextSize || 14
    const inputColor = textColor || colors.white
    const borderBottom = borderBottomColor || 'transparent'

    console.log('isValid', isValid)
    const validationColor = isValid ? color : errorColor

    return (
      <View style={[customStyle, styles.wrapper]}>
        <Text style={[{color: validationColor, fontSize}, styles.label]}>
          {labelText}
        </Text>
        {inputType === 'password' && (
          <TouchableOpacity
            style={styles.showButton}
            onPress={this.toggleShowPassword}>
            <Text style={styles.showButtonText}>
              {secureInput ? 'Show' : 'Hide'}
            </Text>
          </TouchableOpacity>
        )}
        <TextInput
          autoCorrect={false}
          style={[
            {color: inputColor, borderBottomColor: borderBottom},
            styles.inputField,
          ]}
          secureTextEntry={secureInput}
          onFocus={this.resetAsValidInput}
          onEndEditing={this.validateInput}
          onChange={this.updateCallback}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
  },
  label: {fontWeight: '700', marginBottom: 10},
  inputField: {
    borderBottomWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
  },
  showButton: {
    position: 'absolute',
    right: 0,
  },
  showButtonText: {
    color: colors.white,
    fontWeight: '700',
  },
})
export default InputField

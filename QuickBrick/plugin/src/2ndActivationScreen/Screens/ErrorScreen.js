import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';
import ButtonComponent from '../../Common/Components/Button';
import Layout from '../../Common/Components/Layout';

const { height, width } = Dimensions.get('window');

export default function ErrorScreenComponent(props) {
  const {
    onTryAgain,
    onClose
  } = props;

  return (
    <Layout backgroundColor={'#4A4A4A'}>
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Error description
        </Text>
        <ButtonComponent
          label='Try Again'
          callback={onTryAgain}
          buttonStyle={styles.buttonTryAgain}
          textStyle={styles.buttonTryAgainText}
        />
        <ButtonComponent
          label='Close'
          callback={onClose}
          buttonStyle={styles.buttonClose}
          textStyle={styles.buttonCloseText}
        />
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -250,
    height,
    width
  },
  errorText: {
    fontSize: 30,
    marginBottom: 90,
    color: '#fff'
  },
  buttonTryAgain: {
    backgroundColor: '#D8D8D8',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#979797',
    width: 676,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  buttonTryAgainText: {
    fontSize: 41,
    fontWeight: 'normal',
    color: '#545A5C'
  },
  buttonClose: {
    backgroundColor: '#D8D8D8',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#979797',
    width: 450,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonCloseText: {
    fontSize: 41,
    fontWeight: 'normal',
    color: '#545A5C'
  }
});

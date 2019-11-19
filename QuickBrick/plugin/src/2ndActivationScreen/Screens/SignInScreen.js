import React, {useState, useEffect} from "react";
import {View, Text, ActivityIndicator} from "react-native";
import {localStorage} from "@applicaster/zapp-react-native-bridge/ZappStorage/LocalStorage";
// import { trackEvent, identifyUser } from "../analytics/segment/index";
import QRCode from "../Components/QRCode";
import Layout from "../../Common/Components/Layout";

function SignInScreen(props) {
  console.log(props, 'here we are');

  const [loading, setLoading] = useState(true);
  const [pinCode, setPincode] = useState('');

  useEffect(() => signIn());

  const signIn = () => {
    // your sighnIn function code here
  };

  const getSignInStatus = () => {
    // your cheking of signIn status code here
  };

  return (
    <Layout backgroundColor={'#D5D5D5'}>
      <View style={styles.container}>
        <Text
          style={styles.title}
          numberOfLines={2}
          ellipsizeMode={'tail'}
        >
          SIGN IN INTO YOUR OLYMPIC CHANNEL ACCOUNT
        </Text>
        <View style={styles.columnsContainer}>
          <View style={styles.leftColumn}>
            <Text
              style={styles.text}
              adjustsFontSizeToFit
              numberOfLines={1}
              ellipsizeMode={'tail'}
            >
              Go to:
            </Text>
            <Text
              style={{...styles.text, ...styles.url}}
              adjustsFontSizeToFit
            >
              account.olympicchannel.com
            </Text>
            <Text
              style={{...styles.text, marginBottom: 30}}
              numberOfLines={2}
              ellipsizeMode={'tail'}
            >
              Enter the activation code below
            </Text>
            {
              loading
                ? <View style={styles.pinCodeSpinner}>
                    <ActivityIndicator size="small" color="#525A5C"/>
                  </View>
                : <Text style={styles.pinCode} adjustsFontSizeToFit>
                    {pinCode}
                  </Text>
            }
          </View>
          <View style={styles.rightColumn}>
            {
              loading
                ? <View style={styles.loadContainer}>
                    <ActivityIndicator size="large" color="#525A5C"/>
                  </View>
                : <QRCode url={``}/>
            }
          </View>
        </View>
        <View style={styles.bottomText}>
          <Text
            style={styles.text}
            numberOfLines={2}
            ellipsizeMode={'tail'}
          >
            If you need support, please visit
            <Text style={{...styles.text, color: '#525A5C', marginLeft: 32}}>
              http://olympicchannel.com/signin/support
            </Text>
          </Text>
        </View>
      </View>
    </Layout>
  );
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    color: "#525A5C",
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 110
  },
  text: {
    color: "#525A5C",
    fontSize: 32,
    marginBottom: 20,
  },
  url: {
    fontWeight: 'bold',
    fontSize: 36,
    marginBottom: 60,
    color: '#525A5C'
  },
  columnsContainer: {
    maxWidth: 1110,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 30
  },
  bottomText: {
    maxWidth: 1110,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 150
  },
  leftColumn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRightColor: '#979797',
    borderRightWidth: 2,
    minHeight: 330
  },
  rightColumn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderLeftColor: '#979797',
    borderLeftWidth: 2,
    minHeight: 330
  },
  loadContainer: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pinCode: {
    fontSize: 72,
    color: "#525A5C",
    fontWeight: 'bold'
  },
  pinCodeSpinner: {
    width: 500,
    alignItems: 'center',
    justifyContent: 'center'
  }
};

SignInScreen.displayName = 'SignInScreen';
export default SignInScreen;

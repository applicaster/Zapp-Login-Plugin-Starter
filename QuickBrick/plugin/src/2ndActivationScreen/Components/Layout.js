import React, { Component } from 'react';
import { Dimensions, View, Image } from "react-native";

const { height } = Dimensions.get('window');

class Layout extends Component {
  render() {
    return (
      <View style={{...styles.container, backgroundColor: this.props.isPrehook ? '#f1f1f1' : 'transparent'}}>
        { this.props.isPrehook &&
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              resizeMode="contain"
              source={{ uri: "https://assets-production.applicaster.com/static/olympic-channel/images/oc-logo.png" }}
            />
          </View>
        }
        <View style={styles.subContainer}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    height,
    alignItems: 'center',
  },
  logoContainer: {
    width: 150,
    height: 150,
    paddingLeft: 100,
    paddingTop: 50,
    alignSelf: 'flex-start',
  },
  subContainer: {
    flex: 1,
    width: 1390,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  logo: {
    width: 150,
    height: 150,
  }
};

Layout.displayName = 'Layout';
export default Layout;
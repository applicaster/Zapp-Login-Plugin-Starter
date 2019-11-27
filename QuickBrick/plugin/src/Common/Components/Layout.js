import React from 'react';
import { Dimensions, View, Image } from 'react-native';
import { TVEventHandlerComponent } from '@applicaster/zapp-react-native-tvos-ui-components/Components/TVEventHandlerComponent';
import ErrorComponent from '../../LoginScreen/Components/ErrorComponent';

const { height } = Dimensions.get('window');

function Layout(props) {
  const {
    backgroundColor,
    error,
    children,
    closeHook
  } = props;

  const playerRemoteHandler = (component, event) => {
    const { eventType } = event;
    if (eventType === 'menu') {
      closeHook({
        success: false
      });
    }
  };

  return (
    <TVEventHandlerComponent tvEventHandler={playerRemoteHandler}>
      <View style={{ ...styles.container, backgroundColor }}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={{ uri: 'https://assets-production.applicaster.com/static/olympic-channel/images/oc-logo.png' }}
          />
        </View>
        {
          error ? <ErrorComponent error={error} /> : null
        }
        <View style={styles.subContainer}>
          {children}
        </View>
      </View>
    </TVEventHandlerComponent>
  );
}

const styles = {
  container: {
    flex: 1,
    height,
    alignItems: 'center'
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

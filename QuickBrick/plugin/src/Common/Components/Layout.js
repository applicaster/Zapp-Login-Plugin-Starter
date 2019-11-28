import React from 'react';
import { View, Image, ImageBackground } from 'react-native';
import { TVEventHandlerComponent } from '@applicaster/zapp-react-native-tvos-ui-components/Components/TVEventHandlerComponent';
import ErrorComponent from '../../LoginScreen/Components/ErrorComponent';


function Layout(props) {
  const {
    backgroundColor = '',
    backgroundUri = '',
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
      <ImageBackground
        source={{ uri: backgroundUri }}
        style={{ backgroundColor, ...styles.container }}
      >
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={{ uri: 'activation_screen_logo_asset.png' }}
          />
        </View>
        {
          error ? <ErrorComponent error={error} /> : null
        }
        <View style={styles.subContainer}>
          {children}
        </View>
      </ImageBackground>
    </TVEventHandlerComponent>
  );
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '100%'
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

import React from 'react';
import { View, Image, ImageBackground } from 'react-native';
import { TVEventHandlerComponent } from '@applicaster/zapp-react-native-tvos-ui-components/Components/TVEventHandlerComponent';
import ErrorComponent from '../../LoginScreen/Components/ErrorComponent';


function Layout(props) {
  const {
    backgroundColor = '',
    backgroundUri = '',
    errorBackground = '',
    logo,
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
            source={{ uri: logo }}
          />
        </View>
        {
          error && <ErrorComponent error={error} errorBackground={errorBackground} />
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
    alignSelf: 'flex-start',
    marginLeft: '2.6%',
    marginTop: '5.2%',
    marginBottom: '5.2%'
  },
  subContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: '12%',
    paddingLeft: '12%'
  },
  logo: {
    width: 350,
    height: 100,
  }
};

export default Layout;

import * as React from "react";
import {
  ActivityIndicator,
  Dimensions,
  View
} from "react-native";

const {width, height} = Dimensions.get('window');

function LoadingScreen(props) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color='#525A5C'/>
    </View>
  );
}

const styles = {
  container: {
    width,
    height,
    backgroundColor: "#E2E2E2", //TODO: from Config???
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
};

// LoadingScreen.displayName = 'LoadingScreen';
export default LoadingScreen;

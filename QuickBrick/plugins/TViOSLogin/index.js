import { withNavigator } from '@applicaster/zapp-react-native-ui-components/Decorators/Navigator/';
import LoginPluginComponent from './src';

const plugin = withNavigator(LoginPluginComponent);


const LoginPlugin = {
  Component: plugin,
  isFlowBlocker: () => true,
  presentFullScreen: true,
  hasPlayerHook: true
};

export default LoginPlugin;


import LoginPluginComponent from './src';

const LoginPlugin = {
  Component: LoginPluginComponent,
  isFlowBlocker: () => true,
  presentFullScreen: true
};

export default LoginPlugin;

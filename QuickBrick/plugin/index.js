import LoginPluginComponent from './src';

const LoginPlugin = {
  Component: LoginPluginComponent,
  isFlowBlocker: () => true,
  presentFullScreen: true,
  hasPlayerHook: true
};

export default LoginPlugin;

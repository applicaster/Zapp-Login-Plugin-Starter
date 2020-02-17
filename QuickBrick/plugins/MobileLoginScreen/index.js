import Component from './src/App'

export default {
  isFlowBlocker: () => true,
  presentFullScreen: true,
  skipHook: () => false,
  Component,
}

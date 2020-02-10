import * as R from 'ramda';
import { localStorage as storage } from '@applicaster/zapp-react-native-bridge/ZappStorage/LocalStorage/index';
import { fontsize, fontcolor } from '../Config/DefaultStyles';

export function getPluginData(screenData) {
  let pluginData = {};

  if (screenData && screenData.general) {
    pluginData = { ...pluginData, ...screenData.general };
  }

  return pluginData;
}

export function createActivationCodeUrl(screenData) {
  const {
    activation_code_parameter: codeParameter = true,
    activation_code_parameter_name: codeParameterName = '',
    activation_code_endpoint: codeEndpoint = ''
  } = getPluginData(screenData);

  return codeParameter ? `${codeEndpoint}?${codeParameterName}=` : codeEndpoint;
}

export async function setToLocalStorage(key, value) {
  return storage.setItem(key, value);
}

export async function getFromLocalStorage(key) {
  return storage.getItem(key);
}

function validateStyles(pluginData) {
  const keys = Object.keys(pluginData);
  keys.forEach((key) => {
    const type = key.split('_').pop();
    if (type === 'fontsize' || type === 'fontcolor') {
      validateKey(type, key, pluginData);
    }
  });
}

function validateKey(type, key, pluginData) {
  const keysValidation = {
    fontsize: validateFontsize,
    fontcolor: validateFontcolor
  };

  return keysValidation[type](key, pluginData);
}

const validateFontsize = (key, pluginData) => {
  const value = pluginData[key];
  const keyname = R.replace('_fontsize', '', key);

  const num = Number(value);
  pluginData[key] = Number.isFinite(num) ? num : fontsize[keyname];
};

const validateFontcolor = (key, pluginData) => {
  const value = pluginData[key];
  const keyname = R.replace('_fontcolor', '', key);

  pluginData[key] = (value !== undefined && value !== null) ? value : fontcolor[keyname];
};

export const isHomeScreen = (navigator, homeScreen) => {
  const homeScreenPath = `/river/${homeScreen.id}`;
  return navigator.currentRoute === homeScreenPath;
};

export const isPlayerHook = (payload) => R.pathSatisfies(
  (value) => value === 'video',
  ['type', 'value'],
  payload
);

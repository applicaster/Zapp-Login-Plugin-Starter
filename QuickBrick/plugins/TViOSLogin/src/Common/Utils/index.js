import { localStorage as storage } from '@applicaster/zapp-react-native-bridge/ZappStorage/LocalStorage/index';

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

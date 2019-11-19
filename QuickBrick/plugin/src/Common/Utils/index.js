const getPluginData = (key, configuration, screenData) => {
  if (configuration && configuration[key]) {
    return configuration[key];
  }
  if (screenData && screenData.general && screenData.general[key]) {
    return screenData.general[key];
  }
};

export default getPluginData;

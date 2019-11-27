import { postAnalyticEvent } from '@applicaster/zapp-react-native-utils/analyticsUtils/manager';

export default function trackEvent(event, props) {
  try {
    const data = getAnalyticsData(props);
    const timestamp = Date.now();

    return postAnalyticEvent(event, {
      ...data,
      timestamp
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function getAnalyticsData(props) {
  const {
    payload,
    screenData
  } = props;

  let contentType = '';
  let contentName = '';
  let pluginProvider = '';

  if (payload && payload.type && payload.type.value) {
    contentType = payload.type.value;
    contentName = payload.title;
  }

  if (payload.home && payload.home === true) {
    contentName = 'App';
  }

  if (screenData && screenData.type) {
    pluginProvider = screenData.type;
  }

  return {
    contentType,
    contentName,
    pluginProvider
  };
}

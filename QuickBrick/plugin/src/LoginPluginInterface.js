import axios from 'axios';

/*
Use HEARBEAT_INTERVAL value to set interval
 for checking SignIn Status for 2nd Activation Screen
 */

export const HEARBEAT_INTERVAL = 5000;

/*
Use getPincode method to retrieve device pincode
from server for 2nd Activation Screen
*/

export const getPinCode = async () => {
  try {
    const {
      data: {
        devicePinCode = ''
      }
    } = await axios.post('activationCodeUrl',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });

    return devicePinCode;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/*
Use getAccessToken method to retrieve accessToken
from server for 2nd Activation Screen using heartbeatService, pinCode

Use getAccessToken method to retrieve accessToken
from server for Login Screen using username, password
*/

export const getAccessToken = async (heartbeatService, pinCode) => {
  try {
    const response = await axios.get(`${heartbeatService}/${pinCode}`,
      {
        headers: {
          Accept: 'application/json'
        }
      });

    return response.data.access_token ? response.data.access_token : null;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

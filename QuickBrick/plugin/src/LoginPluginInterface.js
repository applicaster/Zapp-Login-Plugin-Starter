/**
 * Sets interval for checking SignIn Status.
 */

export const HEARBEAT_INTERVAL = 5000;

/**
 * Retrieves device pincode from server for 2nd Activation Screen
 * @param activationCodeUrl
 * @returns devicePinCode
 */


export const getPinCode = async () => {
  try {

    // Your code here

  } catch (err) {
    console.log(err);
    throw err;
  }
};


/**
 * Retrieves device accessToken from server
 *
 * For 2nd Activation Screen:
 * @param heartbeatService
 * @param pinCode
 * @returns accessToken || null
 *
 * For Login Screen:
 * @param username
 * @param password
 * @returns accessToken || null
 */

export const getAccessToken = async () => {
  try {

    // Your code here

  } catch (err) {
    console.log(err);
    throw err;
  }
};

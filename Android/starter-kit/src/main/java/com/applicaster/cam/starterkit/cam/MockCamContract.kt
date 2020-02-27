package com.applicaster.cam.starterkit.cam

import android.os.Handler
import com.android.billingclient.api.Purchase
import com.applicaster.cam.*
import com.applicaster.cam.starterkit.ContentAccessService
import com.applicaster.cam.starterkit.cam.mocks.AnalyticsDataProviderMock

/**
 *  Mock implementation of [ICamContract]
 *
 * [ICamContract] is a general interface that content access manager framework will use to obtain
 * necessary information such plugin config and relevant params like [CamFlow]
 *
 *  Also this class need to handle action requests from CAM, for example [login] / [signUp] / [onItemPurchased]
 *  To continue CAM workflow callback from params *always* should be invoked
 */
class MockCamContract(private val contentAccessService: ContentAccessService) : ICamContract {

    /**
     * This call will be triggered by CAM when user will fill all mandatory auth fields on login screen and
     * click action button
     * @param authFieldsInput contains pair of auth field key and value
     * Sample of the map that will be passed with default auth fields config:
     * {"password" = "testPwd123", "email" = "user@test.test"}
     * For more info see Authentication Fields Configuration documentation:
     * https://github.com/applicaster/applicaster-cam-framework/wiki/Authentication-Fields-Configuration
     * and default config sample:
     * https://github.com/applicaster/applicaster-cam-framework/blob/master/authentication_fields_sample.json
     * @param callback: CAM action callback. Callback MUST be executed to continue flow handling
     */
    override fun login(authFieldsInput: HashMap<String, String>, callback: LoginCallback) {
        /**
         * TODO: add login implementation, such as server communication with login request,
         *  parsing answer, saving user object and executing callback with 2 possible states:
         *  onActionSuccess() or on onFailure("String error message that CAM will display")
         */
        simulateMockEventForSuccessScenario(actionCallback = callback)
    }

    /**
     * This call will be triggered by CAM when user will fill all mandatory auth fields on sign up screen and
     * click action button
     * @param authFieldsInput contains pair of auth field key and value
     * Sample of the map that will be passed with default auth fields config:
     * {"phone" = "123456789", "password" = "testPwd123", "email" = "user@test.test"}
     * For more info see Authentication Fields Configuration documentation:
     * https://github.com/applicaster/applicaster-cam-framework/wiki/Authentication-Fields-Configuration
     * and default config sample:
     * https://github.com/applicaster/applicaster-cam-framework/blob/master/authentication_fields_sample.json
     * @param callback: CAM action callback. Callback MUST be executed to continue flow handling
     */
    override fun signUp(authFieldsInput: HashMap<String, String>, callback: SignUpCallback) {
        /**
         * TODO: add sign up implementation such as server communication and result handling
         */
        simulateMockEventForSuccessScenario(actionCallback = callback)
    }

    /**
     * This call will be triggered by CAM when user will fill all mandatory fields on password reset screen
     * and click action button
     * @param authFieldsInput contains pair of auth field key and value
     * Sample of the map that will be passed with default auth fields config:
     * {"email" = "user@test.test"}
     * For more info see Authentication Fields Configuration documentation:
     * https://github.com/applicaster/applicaster-cam-framework/wiki/Authentication-Fields-Configuration
     * and default config sample:
     * https://github.com/applicaster/applicaster-cam-framework/blob/master/authentication_fields_sample.json
     * @param callback: CAM action callback. Callback MUST be executed to continue flow handling
     */
    override fun resetPassword(authFieldsInput: HashMap<String, String>, callback: PasswordResetCallback) {
        /**
         * TODO: add reset password implementation such as server communication and result handling
         */
        simulateMockEventForSuccessScenario(actionCallback = callback)
    }

    /**
     * [updatePassword] & [sendPasswordActivationCode] is alternative flow for [resetPassword], i.e.
     * based on plugin configurations update password flow will replace reset flow
     *
     * @param authFieldsInput contains pair of auth field key and value
     * Sample of the map that will be passed with default auth fields config:
     * {"email" = "user@test.test"}
     * For more info see Authentication Fields Configuration documentation:
     * https://github.com/applicaster/applicaster-cam-framework/wiki/Authentication-Fields-Configuration
     * and default config sample:
     * https://github.com/applicaster/applicaster-cam-framework/blob/master/authentication_fields_sample.json
     * @param callback: CAM action callback. Callback MUST be executed to continue flow handling
     */
    override fun updatePassword(
        authFieldsInput: HashMap<String, String>,
        callback: PasswordUpdateCallback
    ) {
        simulateMockEventForSuccessScenario(actionCallback = callback)
    }


    /**
     * [updatePassword] & [sendPasswordActivationCode] is alternative flow for [resetPassword], i.e.
     * based on plugin configurations update password flow will replace reset flow
     *
     * @param authFieldsInput contains pair of auth field key and value
     * Sample of the map that will be passed with default auth fields config:
     * {"email" = "user@test.test"}
     * For more info see Authentication Fields Configuration documentation:
     * https://github.com/applicaster/applicaster-cam-framework/wiki/Authentication-Fields-Configuration
     * and default config sample:
     * https://github.com/applicaster/applicaster-cam-framework/blob/master/authentication_fields_sample.json
     * @param callback: CAM action callback. Callback MUST be executed to continue flow handling
     */
    override fun sendPasswordActivationCode(
        authFieldsInput: HashMap<String, String>,
        callback: SendPasswordActivationCodeCallback
    ) {
        simulateMockEventForSuccessScenario(activationCodeCallback = callback)
    }

    override fun loginWithFacebook(email: String, id: String, callback: FacebookAuthCallback) {
        /**
         * TODO: add login via facebook implementation such as server communication and result handling
         */
        simulateMockEventForSuccessScenario(fbCallback = callback)
    }

    override fun signupWithFacebook(email: String, id: String, callback: FacebookAuthCallback) {
        /**
         * TODO: add sign up via facebook implementation such as server communication and result handling
         */
        simulateMockEventForSuccessScenario(fbCallback = callback)
    }

    override fun loadEntitlements(callback: EntitlementsLoadCallback) {
        /**
         * TODO: load purchasable items data, wrap each item in
         *  [com.applicaster.cam.params.billing.BillingOffer] and pass in callback as list
         */
        simulateMockEventForSuccessScenario(entitlementsCallback = callback)
    }

    override fun onItemPurchased(purchase: List<Purchase>, callback: PurchaseCallback) {
        /**
         * TODO: handle successfully purchased items, for example save in db / report to server / validate
         */
        simulateMockEventForSuccessScenario(callback)
    }

    override fun onPurchasesRestored(purchases: List<Purchase>, callback: RestoreCallback) {
        /**
         * TODO: handle successfully restored items, for example save in db / report to server / validate
         */
        simulateMockEventForSuccessScenario(callback)
    }

    /**
     * User performed action on Logout dialog
     * @param isConfirmedByUser: if positive (i.e. "Okay") button click pass true, false otherwise
     *
     */
    override fun logout(isConfirmedByUser: Boolean) {
        /**
         * TODO: handle logout if necessary
         */
    }

    /**
     * [activateAccount] & [sendAuthActivationCode] is optional flow for user auth.
     * This flow can be triggered based on plugin configurations and [isUserActivated] status after
     * performing login or sign-up
     *
     * @param authFieldsInput contains pair of auth field key and value
     * Sample of the map that will be passed with default auth fields config:
     * {"email" = "user@test.test"}
     * For more info see Authentication Fields Configuration documentation:
     * https://github.com/applicaster/applicaster-cam-framework/wiki/Authentication-Fields-Configuration
     * and default config sample:
     * https://github.com/applicaster/applicaster-cam-framework/blob/master/authentication_fields_sample.json
     * @param callback: CAM action callback. Callback MUST be executed to continue flow handling
     */
    override fun activateAccount(
        authFieldsInput: HashMap<String, String>,
        callback: AccountActivationCallback
    ) {
        simulateMockEventForSuccessScenario(actionCallback = callback)
    }

    /**
     * [activateAccount] & [sendAuthActivationCode] is optional flow for user auth.
     * This flow can be triggered based on plugin configurations and [isUserActivated] status after
     * performing login or sign-up
     *
     * @param authFieldsInput contains pair of auth field key and value
     * Sample of the map that will be passed with default auth fields config:
     * {"email" = "user@test.test"}
     * For more info see Authentication Fields Configuration documentation:
     * https://github.com/applicaster/applicaster-cam-framework/wiki/Authentication-Fields-Configuration
     * and default config sample:
     * https://github.com/applicaster/applicaster-cam-framework/blob/master/authentication_fields_sample.json
     * @param callback: CAM action callback. Callback MUST be executed to continue flow handling
     */
    override fun sendAuthActivationCode(
        authFieldsInput: HashMap<String, String>,
        callback: SendAuthActivationCodeCallback
    ) {
        simulateMockEventForSuccessScenario(activationCodeCallback = callback)
    }


    /**
     * Passing plugin configuration. For more info see [com.applicaster.cam.starterkit.cam.mocks.MockPluginConfigurator]
     * and [com.applicaster.cam.starterkit.SampleLoginPlugin.executeHook]
     */
    override fun getPluginConfig() = contentAccessService.pluginConfig

    /**
     * TODO :  Call should reflect actual user status (logged or not)
     */
    override fun isUserLogged() = false

    /**
     * TODO :  Call should reflect actual item status
     */
    override fun isPurchaseRequired() = true

    /**
     * TODO :  Call should reflect actual user status (activated or not if activation is required)
     */
    override fun isUserActivated(): Boolean = true

    /**
     * TODO :  Call should reflect flow status
     * For example if there is no need in Storefront screen for current user flow can be updated
     * based on third-party params and set as [CamFlow.AUTHENTICATION] or [CamFlow.EMPTY]
     *
     * To see all possible values refer to [CamFlow]
     */
    override fun getCamFlow(): CamFlow = CamFlow.AUTH_AND_STOREFRONT

    override fun onCamFinished() {
        /**
         * TODO: handle CAM finish if it is necessary
         */
    }

    /**
     * Set up data provider for obtaining plugin analytics info
     */
    override fun getAnalyticsDataProvider(): IAnalyticsDataProvider {
        return AnalyticsDataProviderMock()
    }

    /**
     * Mock callback execution for development process only
     *
     * Simulate Success event for any type of events after certain amount of time
     */
    private fun simulateMockEventForSuccessScenario(actionCallback: ActionCallback? = null,
                                                    fbCallback: FacebookAuthCallback? = null,
                                                    entitlementsCallback: EntitlementsLoadCallback? = null,
                                                    activationCodeCallback: ActivationCodeCallback? = null) {
        Handler().postDelayed({
            actionCallback?.onActionSuccess()
            fbCallback?.onFacebookAuthSuccess()
            entitlementsCallback?.onSuccess(arrayListOf())
            activationCodeCallback?.onCodeSendingSuccess()
        }, 1250)
    }
}
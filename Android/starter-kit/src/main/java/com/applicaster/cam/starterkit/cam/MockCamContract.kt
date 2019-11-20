package com.applicaster.cam.starterkit.cam

import android.os.Handler
import com.android.billingclient.api.Purchase
import com.applicaster.cam.*
import com.applicaster.cam.starterkit.ContentAccessService
import com.applicaster.cam.starterkit.cam.mocks.AnalyticsDataProviderMock

class MockCamContract(private val contentAccessService: ContentAccessService) : ICamContract {
    override fun login(authFieldsInput: HashMap<String, String>, callback: LoginCallback) {
        Handler().postDelayed({ callback.onActionSuccess() }, 1250)
    }

    override fun signUp(authFieldsInput: HashMap<String, String>, callback: SignUpCallback) {
        Handler().postDelayed({ callback.onActionSuccess() }, 1250)
    }

    override fun resetPassword(authFieldsInput: HashMap<String, String>, callback: PasswordResetCallback) {
        Handler().postDelayed({ callback.onActionSuccess() }, 1250)
    }

    override fun loginWithFacebook(email: String, id: String, callback: FacebookAuthCallback) {
        Handler().postDelayed({ callback.onFacebookAuthSuccess() }, 1250)
    }

    override fun signupWithFacebook(email: String, id: String, callback: FacebookAuthCallback) {
        Handler().postDelayed({ callback.onFacebookAuthSuccess() }, 1250)
    }

    override fun loadEntitlements(callback: EntitlementsLoadCallback) {
        Handler().postDelayed({ callback.onSuccess(arrayListOf()) }, 1250)
    }

    override fun onItemPurchased(purchase: List<Purchase>, callback: PurchaseCallback) {
        Handler().postDelayed({ callback.onActionSuccess() }, 1250)
    }

    override fun onPurchasesRestored(purchases: List<Purchase>, callback: RestoreCallback) {
        Handler().postDelayed({ callback.onActionSuccess() }, 1250)
    }

    override fun isUserLogged() = false

    override fun isPurchaseRequired() = true

    override fun getPluginConfig() = contentAccessService.pluginConfig

    override fun isRedeemActivated(): Boolean = false

    override fun getCamFlow(): CamFlow = CamFlow.AUTH_AND_STOREFRONT

    override fun onCamFinished() {}

    override fun activateRedeemCode(redeemCode: String, callback: RedeemCodeActivationCallback) {
        TODO("not implemented")
    }

    override fun getAnalyticsDataProvider(): IAnalyticsDataProvider {
        return AnalyticsDataProviderMock()
    }
}
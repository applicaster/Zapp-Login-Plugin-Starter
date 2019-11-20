package com.applicaster.cam.starterkit

import android.content.Context
import android.support.v4.app.Fragment
import android.util.Log
import com.applicaster.cam.starterkit.cam.mocks.MockPluginConfigurator
import com.applicaster.hook_screen.HookScreen
import com.applicaster.hook_screen.HookScreenListener
import com.applicaster.plugin_manager.hook.HookListener
import com.applicaster.plugin_manager.login.LoginContract
import com.applicaster.plugin_manager.playersmanager.Playable
import com.applicaster.plugin_manager.screen.PluginScreen
import com.google.gson.Gson
import java.io.Serializable

/**
 * Sample of Applicaster login plugin which is added as plugin screen and hook screen
 * Instance of this class will be created and called by the Applicaster SDK
 * Implemented behaviour is just sample of CAM usage, inheritance and interfaces can be modified or
 * removed
 */
class SampleLoginPlugin : LoginContract, PluginScreen, HookScreen {

    private val contentAccessService = ContentAccessService()

    private val TAG = SampleLoginPlugin::class.java.simpleName

    override var hook: HashMap<String, String?> = hashMapOf()
        get() = field
        set(value) {
            field = value
        }

    /**
     *  Called when login plugin will be triggered as hook (trigger will be executed by the Applicaster SDK)
     *  @param hookProps will contain datasource info including information about item (for example Playable)
     *
     *
     *  IMPORTANT:
     *
     *  This sample method contains request for the mocked plugin config which is created from json in assets.
     *  See [MockPluginConfigurator]
     *  IT IS MADE ONLY FOR THE DEVELOPMENT PURPOSES
     *
     *  For the published Applicaster plugin this config will be provided by the SDK (based on Zapp UI Builder config)
     *  and passed via hook or other calls.  See [getPluginConfiguration]
     */
    override fun executeHook(context: Context, hookListener: HookScreenListener, hookProps: Map<String, Any>?) {
        val pluginConfig = MockPluginConfigurator.getPluginConfiguration(context) // mock impl
//            val pluginConfig = getPluginConfiguration() // prod impl
        contentAccessService.pluginConfig = pluginConfig
        contentAccessService.launchCam(context)
    }

    /**
     * Login with playable
     */
    override fun login(context: Context?, playable: Playable?, additionalParams: MutableMap<Any?, Any?>?, callback: LoginContract.Callback?) {
        TODO("Handle login logic")
    }

    /**
     * Login without playable
     */
    override fun login(
            context: Context?,
            additionalParams: MutableMap<Any?, Any?>?,
            callback: LoginContract.Callback?
    ) {
        TODO("Handle login logic if it will be necessary")
    }

    /**
     * Handling user token
     */
    override fun isTokenValid(): Boolean {
        TODO(" Add user token handling ")
    }

    /**
     * Handling user token
     */
    override fun setToken(token: String?) {
        TODO(" Add user token handling ")
    }

    /**
     * Handling user token
     */
    override fun getToken(): String {
        TODO(" Add user token handling ")
    }

    /**
     * Check whether item locked or not
     */
    override fun isItemLocked(model: Any?): Boolean {
        TODO("Handle purchasable/locked items")
    }

    /**
     * Called on the application startup
     *
     */
    override fun executeOnStartup(context: Context?, listener: HookListener?) {
        TODO("Handle application startup if necessary")
    }

    override fun setPluginConfigurationParams(params: MutableMap<Any?, Any?>?) {
        TODO("handle plugin configuration params if necessary")
    }

    override fun handlePluginScheme(context: Context?, data: MutableMap<String, String>?): Boolean {
        TODO("handle plugin scheme params if necessary")
    }

    override fun executeOnApplicationReady(context: Context?, listener: HookListener?) {
        TODO("handle app ready execution if necessary")
    }

    override fun logout(context: Context?, additionalParams: MutableMap<Any?, Any?>?, callback: LoginContract.Callback?) {
        TODO("handle logout")
    }

    override fun generateFragment(screenMap: HashMap<String, Any>?, dataSource: Serializable?): Fragment? =
            null

    override fun present(
            context: Context?,
            screenMap: HashMap<String, Any>?,
            dataSource: Serializable?,
            isActivity: Boolean
    ) {
        Log.i(TAG, "Present screen")
    }

    override fun getListener(): HookScreenListener {
        TODO("handle hook listener")
    }

    override fun isFlowBlocker(): Boolean = true

    override fun isRecurringHook(): Boolean = true

    override fun shouldPresent(): Boolean = true

    override fun hookDismissed() {
        // empty
    }

    /**
     * Obtain Map with plugin configuration from hook
     */
    private fun getPluginConfiguration(): Map<String, String>? {
        val fullPluginConfig =
                Gson().fromJson(hook["screenMap"].orEmpty(), Map::class.java) as? Map<String, Any>
        val generalConfig: MutableMap<Any?, Any?>? =
                fullPluginConfig?.get("general") as? MutableMap<Any?, Any?>

        //transform MutableMap<Any?, Any?>? to Map<String, String>?
        return generalConfig?.entries?.associate { entry ->
            entry.key.toString() to entry.value.toString()
        }
    }
}
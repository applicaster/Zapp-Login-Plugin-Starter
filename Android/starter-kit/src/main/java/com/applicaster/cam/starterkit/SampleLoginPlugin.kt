package com.applicaster.cam.starterkit

import android.content.Context
import android.support.v4.app.Fragment
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
 * Generally this class is entry-point to Login plugin and communication bridge between Applicaster
 * SDK and login plugin
 *
 * Implemented behaviour is just sample of CAM usage, inheritance and interfaces can be modified or
 * removed
 */
class SampleLoginPlugin : LoginContract, PluginScreen, HookScreen {

    private val contentAccessService = ContentAccessService()

    override var hook: HashMap<String, String?> = hashMapOf()
        get() = field
        set(value) {
            field = value
        }

    /**
     *  Called when login plugin will be triggered as hook (trigger will be executed by the Applicaster SDK)
     *  @param hookProps: will contain datasource info including information about item (for example Playable)
     *  @param hookListener: sdk callback. Login plugin/Player play may not work properly if this callback will
     *  not be executed
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
     * Obtain Map with plugin configuration from hook
     * @return Map<String, String> with all configurations set on Zapp
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

    /**
     * Methods below required and can be called by the Applicaster SDK
     *
     * Methods implementation do not strictly required for content access manager, but
     * may be required for integration with third-party plugins
     */

    //region Applicaster SDK interface methods
    /**
     * Check whether item locked or not
     * @param model: data item, generally [Playable] item
     */
    override fun isItemLocked(model: Any?): Boolean {
//        TODO("Handle purchasable/locked items")
        return false
    }

    /**
     * Called on the application startup
     *  @param listener: sdk callback. Login plugin/Player play may not work properly if this callback will
     */
    override fun executeOnStartup(context: Context?, listener: HookListener?) {
        //Handle application startup if necessary
        listener?.onHookFinished()
    }

    override fun isTokenValid(): Boolean {
        //Add user token handling if necessary
        return false
    }

    override fun setToken(token: String?) {
        //Add user token handling if necessary
    }

    override fun getToken(): String {
        //Add user token handling if necessary
        return ""
    }

    override fun logout(context: Context?, additionalParams: MutableMap<Any?, Any?>?, callback: LoginContract.Callback?) {
        //handle logout if necessary
        callback?.onResult(true)
    }

    override fun isFlowBlocker(): Boolean = true

    override fun isRecurringHook(): Boolean = true

    override fun shouldPresent(): Boolean = true

    override fun hookDismissed() {
        // empty
    }

    override fun getListener(): HookScreenListener {
        //handle hook listener if necessary
        return object : HookScreenListener {
            override fun hookCompleted(hookProps: MutableMap<String, Any>?) {
            }

            override fun hookFailed(hookProps: MutableMap<String, Any>?) {
            }
        }
    }

    override fun login(context: Context?, playable: Playable?, additionalParams: MutableMap<Any?, Any?>?, callback: LoginContract.Callback?) {
        // handle login if necessary
        callback?.onResult(true)
    }

    override fun login(context: Context?, additionalParams: MutableMap<Any?, Any?>?, callback: LoginContract.Callback?) {
        // handle login if necessary
        callback?.onResult(true)
    }

    override fun setPluginConfigurationParams(params: MutableMap<Any?, Any?>?) {
        //handle plugin configuration params if necessary
    }

    override fun handlePluginScheme(context: Context?, data: MutableMap<String, String>?): Boolean {
        //handle plugin scheme params if necessary
        return false
    }

    override fun executeOnApplicationReady(context: Context?, listener: HookListener?) {
        // handle app ready execution if necessary
    }

    override fun generateFragment(screenMap: HashMap<String, Any>?, dataSource: Serializable?): Fragment? =
            null

    override fun present(
            context: Context?,
            screenMap: HashMap<String, Any>?,
            dataSource: Serializable?,
            isActivity: Boolean
    ) {
    }
    //endregion
}
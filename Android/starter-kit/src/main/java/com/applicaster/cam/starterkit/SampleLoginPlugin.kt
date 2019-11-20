package com.applicaster.cam.starterkit

import android.content.Context
import android.support.v4.app.Fragment
import android.util.Log
import com.applicaster.cam.starterkit.cam.MockPluginConfiguration
import com.applicaster.cam.starterkit.screenmetadata.ScreensDataLoader
import com.applicaster.hook_screen.HookScreen
import com.applicaster.hook_screen.HookScreenListener
import com.applicaster.plugin_manager.hook.HookListener
import com.applicaster.plugin_manager.login.LoginContract
import com.applicaster.plugin_manager.playersmanager.Playable
import com.applicaster.plugin_manager.screen.PluginScreen
import kotlinx.coroutines.experimental.android.UI
import kotlinx.coroutines.experimental.launch
import java.io.Serializable

/**
 * Sample of Applicaster login plugin which is added as plugin screen and hook screen
 * Instance of this class will be created and called by the Applicaster SDK
 * Implemented behaviour is just sample of CAM usage, inheritance and interfaces can be modified or
 * removed
 */
class SampleLoginPlugin: LoginContract, PluginScreen, HookScreen {

    private val contentAccessService = ContentAccessService()

    private val TAG = SampleLoginPlugin::class.java.simpleName
    private val screenLoader: ScreensDataLoader by lazy { ScreensDataLoader() }

    override fun login(
            context: Context?,
            additionalParams: MutableMap<Any?, Any?>?,
            callback: LoginContract.Callback?
    ) {
        // Empty body
    }

    /**
     * Login with playable
     */
    override fun login(context: Context?, playable: Playable?, additionalParams: MutableMap<Any?, Any?>?, callback: LoginContract.Callback?) {
        TODO("Handle login logic")
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
        launch(UI) {
            screenLoader.loadScreensData()?.let { loadAuthConfigJson(it) }
        }
    }

    fun mockExecuteOnStartup(context: Context?) {
        context?.let {
            val mockPluginConfigFromAssets = MockPluginConfiguration.getPluginConfiguration(it)
            contentAccessService.pluginConfig = mockPluginConfigFromAssets
            contentAccessService.launchCam(it)
        }
    }

    private suspend fun loadAuthConfigJson(pluginConfig: Map<String, String>?) {
        val key = "authentication_input_fields"
        if (pluginConfig?.containsKey(key) == true) {
            val authConfigLink = pluginConfig[key]
            authConfigLink?.let {
                val authFields = screenLoader.loadAuthFieldsJson(it)
                val mutableConfig = pluginConfig.toMutableMap()
                mutableConfig[key] = authFields
                contentAccessService.pluginConfig = mutableConfig
            }
        }
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


    override fun hookDismissed() {
        // empty
    }

    override var hook: HashMap<String, String?> = hashMapOf()
        get() = field
        set(value) {
            field = value
        }

    override fun executeHook(context: Context, hookListener: HookScreenListener, hookProps: Map<String, Any>?) {
        TODO("handle plugin trigger from hook")
    }

    override fun getListener(): HookScreenListener {
        TODO("handle hook listener")
    }

    override fun isFlowBlocker(): Boolean = true

    override fun isRecurringHook(): Boolean = true

    override fun shouldPresent(): Boolean = true
}
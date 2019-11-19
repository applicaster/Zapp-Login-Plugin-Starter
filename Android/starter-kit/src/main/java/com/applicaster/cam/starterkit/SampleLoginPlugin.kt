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

    override fun login(context: Context?, playable: Playable?, additionalParams: MutableMap<Any?, Any?>?, callback: LoginContract.Callback?) {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun isTokenValid(): Boolean {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun setToken(token: String?) {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun isItemLocked(model: Any?): Boolean {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

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

    override fun getToken(): String {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun setPluginConfigurationParams(params: MutableMap<Any?, Any?>?) {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun handlePluginScheme(context: Context?, data: MutableMap<String, String>?): Boolean {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun executeOnApplicationReady(context: Context?, listener: HookListener?) {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun logout(context: Context?, additionalParams: MutableMap<Any?, Any?>?, callback: LoginContract.Callback?) {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
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
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun getListener(): HookScreenListener {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun isFlowBlocker(): Boolean = true

    override fun isRecurringHook(): Boolean = true

    override fun shouldPresent(): Boolean = true
}
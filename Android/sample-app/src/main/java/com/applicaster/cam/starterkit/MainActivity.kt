package com.applicaster.cam.starterkit

import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import com.applicaster.hook_screen.HookScreenListener
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        mock_start_btn.setOnClickListener { triggerCAMStartManually() }
    }

    /**
     * For published Applicaster plugin there is no need to create plugin instance manually
     * Plugin instance will be created and call by the Applicaster SDK, for example as hook
     * For more info see [SampleLoginPlugin] class and comments, especially [SampleLoginPlugin.executeHook]
     */
    private fun triggerCAMStartManually() {
        val sampleLoginPlugin = SampleLoginPlugin()
        sampleLoginPlugin.executeHook(this, mockHookListener(), mapOf())
    }

    private fun mockHookListener() = object : HookScreenListener {
        override fun hookCompleted(hookProps: MutableMap<String, Any>?) {
        }

        override fun hookFailed(hookProps: MutableMap<String, Any>?) {
        }
    }
}

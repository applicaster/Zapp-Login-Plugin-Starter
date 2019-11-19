package com.applicaster.cam.starterkit

import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import com.applicaster.cam.ContentAccessManager
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        mock_start_btn.setOnClickListener { triggerCAMStartManually() }
    }

    private fun triggerCAMStartManually() {
        ContentAccessManager.onProcessStarted(MockCamContract(this), this)
    }
}

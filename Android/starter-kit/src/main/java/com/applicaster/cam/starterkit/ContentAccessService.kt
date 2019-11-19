package com.applicaster.cam.starterkit

import android.content.Context
import com.applicaster.cam.ContentAccessManager
import com.applicaster.cam.starterkit.cam.MockCamContract

class ContentAccessService {

    var pluginConfig: Map<String, String> = emptyMap()

    var camContract: MockCamContract = MockCamContract(this)

    fun launchCam(context: Context) {
        ContentAccessManager.onProcessStarted(camContract, context)
    }
}
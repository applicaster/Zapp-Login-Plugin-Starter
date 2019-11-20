package com.applicaster.cam.starterkit

import android.content.Context
import com.applicaster.cam.ContentAccessManager
import com.applicaster.cam.ICamContract
import com.applicaster.cam.starterkit.cam.MockCamContract

/**
 * Sample class that is responsive for communication between login plugin (see [SampleLoginPlugin])
 * and [ICamContract]
 * Can hold information that is related to the current session such as plugin configuration & so on
 */
class ContentAccessService {

    var pluginConfig: Map<String, String> = emptyMap()

    var camContract: MockCamContract = MockCamContract(this)

    fun launchCam(context: Context) {
        ContentAccessManager.onProcessStarted(camContract, context)
    }
}
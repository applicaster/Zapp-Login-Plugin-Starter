package com.applicaster.cam.starterkit.screenmetadata

import com.applicaster.zapp.model.APAppMetaData

class MetaData(
    val scheme: String,
    val accountsPath: String,
    val accountId: String,
    val appsPath: String,
    private val appMetaData: APAppMetaData
) {
    val baseUrl: String
    val zappPath: String
    val riversPath: String

    val bundleId: String
        get() = appMetaData.bundle_identifier

    val appStore: String
        get() = appMetaData.store.toString()

    val appVersion: String
        get() = appMetaData.version

    init {
        this.baseUrl = BASE_URL
        this.zappPath = ZAP_PATH
        this.riversPath = RIVERS
    }

    companion object {

        private val ZAP_PATH = "zapp"
        private val RIVERS = "rivers"
        private val BASE_URL = "assets-secure.applicaster.com"
    }
}
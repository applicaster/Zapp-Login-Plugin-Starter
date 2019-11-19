package com.applicaster.cam.starterkit.screenmetadata

import android.net.Uri

class ScreenUrlBuilder(private val metaData: MetaData?) {

    val baseUrl: String
        get() {
            val uriBuilder = Uri.Builder()
            metaData?.let {
                uriBuilder.scheme(it.scheme).authority(it.baseUrl)
            }
            return uriBuilder.toString()
        }

    val path: String
        get() {
            val uriBuilder = Uri.Builder()
            metaData?.let {
                uriBuilder.appendPath(it.zappPath)
                        .appendPath(it.accountsPath)
                        .appendPath(it.accountId)
                        .appendPath(it.appsPath)
                        .appendPath(it.bundleId)
                        .appendPath(it.appStore)
                        .appendPath(it.appVersion)
                        .appendPath(it.riversPath)
            }
            uriBuilder.appendPath(DEFAULT + JSON_EXTENSION)
            return uriBuilder.toString()
        }

    companion object {

        private val CONFIG_KEY = "rivers_configuration_id"
        private val DEFAULT = "rivers"
        private val JSON_EXTENSION = ".json"
    }

}
package com.applicaster.cam.starterkit.cam.mocks

import android.content.Context
import com.applicaster.cam.starterkit.R
import com.google.gson.Gson
import java.io.IOException
import java.nio.charset.Charset

/**
 *  This class contains request for the mocked plugin config which is created from json in assets.
 *  IT IS MADE ONLY FOR THE DEVELOPMENT PURPOSES
 *
 *  For the published Applicaster plugin this config will be provided by the SDK (based on Zapp UI Builder config)
 */
object MockPluginConfigurator {

    fun getPluginConfiguration(context: Context): Map<String, String> =
            Gson().fromJson(getConfigFromAssets(context), Map::class.java) as Map<String, String>

    private fun getConfigFromAssets(context: Context): String {
        val inputStream =
                context.resources.openRawResource(R.raw.mock_config)
        val size = inputStream.available()

        val json: String?

        try {
            val buffer = ByteArray(size)
            inputStream.read(buffer)
            inputStream.close()

            json = String(buffer, Charset.forName("UTF-8"))
        } catch (e: IOException) {
            e.printStackTrace()
            return ""
        }

        return json
    }
}
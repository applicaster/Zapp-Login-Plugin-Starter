package com.applicaster.cam.starterkit

import android.content.Context
import com.google.gson.Gson
import java.io.IOException
import java.nio.charset.Charset


object MockPluginConfiguration {

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
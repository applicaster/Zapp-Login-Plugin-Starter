package com.applicaster.cam.starterkit.screenmetadata

import android.util.Log
import com.applicaster.loader.APLoaderRequestsHelper
import com.applicaster.loader.LoadersConstants
import com.applicaster.loader.json.APAccountLoader
import com.applicaster.util.AppData
import com.google.gson.GsonBuilder
import com.google.gson.JsonObject
import com.jakewharton.retrofit2.adapter.kotlin.coroutines.experimental.CoroutineCallAdapterFactory
import kotlinx.coroutines.experimental.Deferred
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.GET
import retrofit2.http.Url
import java.net.URL


interface ScreenMetaDataService {
    @GET
    fun loadScreensJson(@Url url: String): Deferred<Response<List<ScreenData>>>
}

interface AuthConfigLoaderService {
    @GET
    fun loadAuthInputFieldsJson(@Url url: String): Deferred<Response<JsonObject>>
}

class ScreensDataLoader {

    private val TAG = ScreensDataLoader::class.java.canonicalName
    private val cleengCamScreenType = "cleeng"

    private lateinit var retrofit: Retrofit
    private val httpClient: OkHttpClient.Builder = OkHttpClient.Builder()
    private var retrofitBuilder: Retrofit.Builder = Retrofit.Builder()

    private var screenMetadataService: ScreenMetaDataService? = null
    private var authInputFieldsLoaderService: AuthConfigLoaderService? = null

    private fun <S> createRetrofitService(baseUrl: String, serviceClass: Class<S>): S {
        retrofit = retrofitBuilder.apply {
            baseUrl(baseUrl)
            addConverterFactory(GsonConverterFactory.create(GsonBuilder().create()))
            addCallAdapterFactory(CoroutineCallAdapterFactory())
            client(getHttpClient())
        }.build()
        return retrofit.create(serviceClass)
    }

    private fun getHttpClient(): OkHttpClient {
        val loggingInterceptor = HttpLoggingInterceptor()
        loggingInterceptor.level = HttpLoggingInterceptor.Level.BODY
        httpClient.apply {
            addInterceptor(loggingInterceptor)
        }
        return httpClient.build()
    }

    private fun parseScreenConfig(config: Map<String, Any>?): Map<String, String>? {
        //transform MutableMap<Any?, Any?>? to Map<String, String>?
        return config?.entries?.associate { entry ->
            //do not remove ? save calls - incorrect transform will occur
            entry?.key to entry?.value?.toString()
        }
    }

    suspend fun loadScreensData(): Map<String, String>? {
        val metaData = APAccountLoader.createMetaData()
        val urlScheme = APLoaderRequestsHelper.getUriScheme()
        val accountsPath = LoadersConstants.ACCOUNTS_PATH
        val accountId = AppData.getCrossDomainAccountId()
        val appsPath = LoadersConstants.APPS_PATH
        val zappMetaData = MetaData(
            urlScheme,
            accountsPath,
            accountId,
            appsPath,
            metaData
        )
        val builder = ScreenUrlBuilder(zappMetaData)
        val baseUrl = "${builder.baseUrl}/"
        screenMetadataService = createRetrofitService(baseUrl, ScreenMetaDataService::class.java)

        try {
            val response = screenMetadataService?.loadScreensJson(builder.path)?.await()
            val screensDataList: List<ScreenData>? = response?.body()
            screensDataList?.forEach {
                if (it.type?.contains(cleengCamScreenType, ignoreCase = true) == true) {
                    return parseScreenConfig(it.general as? Map<String, Any>)
                }
            }

        } catch (t: Throwable) {
            Log.e(TAG, t.message)
        }
        return mapOf()
    }

    suspend fun loadAuthFieldsJson(url: String): String {
        //recreate service to load auth_input_fields_config
        val decodedUrl = URL(url)
        val baseUrl = "${decodedUrl.protocol}://${decodedUrl.host}"
        authInputFieldsLoaderService = createRetrofitService(baseUrl, AuthConfigLoaderService::class.java)
        var result = ""
        try {
            val response = authInputFieldsLoaderService?.loadAuthInputFieldsJson(url)?.await()
            if (response?.isSuccessful == true) {
                result =  response.body()?.toString() ?: ""
            }

        } catch (t: Throwable) {
            Log.e(TAG, t.message)
        }
        return result
    }
}

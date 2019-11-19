package com.applicaster.cam.starterkit.screenmetadata


import com.google.gson.annotations.SerializedName

data class ScreenData(
    @SerializedName("general")
    val general: Any?,

    @SerializedName("type")
    val type: String?
)
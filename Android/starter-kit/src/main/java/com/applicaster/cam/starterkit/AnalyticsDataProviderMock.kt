package com.applicaster.cam.starterkit

import com.applicaster.cam.IAnalyticsDataProvider
import com.applicaster.cam.PurchaseData
import com.applicaster.cam.Trigger

class AnalyticsDataProviderMock : IAnalyticsDataProvider {

    override var entityType: String = ""
        get() = field
        set(value) { field = value }

    override var entityName: String = ""
        get() = field
        set(value) { field = value }

    override var trigger: Trigger = Trigger.OTHER
        get() = field
        set(value) { field = value }

    override val isUserSubscribed: Boolean
        get() = false

    override var purchaseData: MutableList<PurchaseData> = arrayListOf()
        get() = field
        set(value) { field = value }
}
//
//  AnalyticsStorage.swift
//  CAMStarterKit
//
//  Created by Roman Karpievich on 11/19/19.
//

import Foundation
import CAM
import ZappPlugins

public class AnalyticsStorage: AnalyticsStorageProtocol {
    public var trigger: Trigger = .appLaunch
    private(set) public var itemName: String = Bundle.main.object(forInfoDictionaryKey: "CFBundleDisplayName") as? String ?? ""
    private(set) public var itemType: String = "App"
    private(set) public var purchasesProperties: [String: PurchaseProperties] = [:]
    
    func updateProperties(from playableItem: ZPPlayable) {
        itemName = playableItem.playableName()
        
        if let isPlaylist = playableItem.isPlaylist, isPlaylist == true {
            itemType = "Feed"
        } else {
            itemType = "Video"
        }
    }
}

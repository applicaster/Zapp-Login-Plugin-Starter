//
//  CleengLoginPlugin.swift
//  CAMStarterKit
//
//  Created by Roman Karpievich on 11/19/19.
//

import ZappPlugins
import ZappLoginPluginsSDK
import CAM
import ComponentsSDK

@objc public class CAMStarterKitLoginPlugin: NSObject, ZPLoginProviderUserDataProtocol, ZPAppLoadingHookProtocol, ZPScreenHookAdapterProtocol, ZPPluggableScreenProtocol {
    
    private let analytics = AnalyticsStorage()
    
    private var flow: CAMFlow = .authAndStorefront
    
    private var pluginConfiguration: [String: Any] = [:]
    lazy private var camConfiguration: [String: String] = {
        var result: [String: String] = [:]
        
        for (key, value) in pluginConfiguration {
            switch value {
            case let string as String:
                result[key] = string
            case let bool as Bool:
                result[key] = bool.description
            default:
                break
            }
        }
        
        if let authFieldsURLString = pluginConfiguration[CAMKeys.authFields.rawValue] as? String,
            let authFieldsURL = URL(string: authFieldsURLString),
            let authFieldsData = try? Data(contentsOf: authFieldsURL),
            let authFieldsStringData = String(data: authFieldsData, encoding: .utf8) {
            result[CAMKeys.authFields.rawValue] = authFieldsStringData
        }

        return result
    }()
    
    // MARK: - ZPAdapterProtocol
    
    public var configurationJSON: NSDictionary?

    public required override init() {
        super.init()
        
        assert(false, "Unexpected call of initialiizer")
    }
    
    public required init(configurationJSON: NSDictionary?) {
        super.init()
        
        self.configurationJSON = configurationJSON
        self.pluginConfiguration = ZLComponentsManager.screenComponentForPluginID("Cleeng")?.general ?? [:]
    }
    
    // MARK: - ZPUIBuilderPluginsProtocol
    
    public required init?(pluginModel: ZPPluginModel, screenModel: ZLScreenModel, dataSourceModel: NSObject?) {
        super.init()
        self.pluginConfiguration = screenModel.general
        
        if let playableItems = dataSourceModel as? [ZPPlayable],
            let playableItem = playableItems.first {
            analytics.updateProperties(from: playableItem)
        }
    }
    
    // MARK: - ZPScreenHookAdapterProtocol
    
    public var isFlowBlocker: Bool {
        return true
    }
    
    public required init?(pluginModel: ZPPluginModel, dataSourceModel: NSObject?) {
        super.init()
        
        assert(false, "Unexpected call of initialiizer")
    }
    
    public func requestScreenPluginPresentation(completion: @escaping (Bool) -> Void) {
        completion(false)
    }
    
    public func executeHook(presentationIndex: NSInteger,
                            dataDict: [String: Any]?,
                            taskFinishedWithCompletion: @escaping (Bool, NSError?, [String: Any]?) -> Void) {
        analytics.trigger = .tapCell
        login(nil) { (operationStatus) in
            switch operationStatus {
            case .completedSuccessfully:
                taskFinishedWithCompletion(true, nil, nil)
            case .failed, .cancelled:
                taskFinishedWithCompletion(false, nil, nil)
            }
        }
    }
    
    // MARK: - ZPAppLoadingHookProtocol
    
    public func executeAfterAppRootPresentation(displayViewController: UIViewController?,
                                                completion: (() -> Swift.Void)?) {

        executeTriggerOnAppLaunchFlow(displayViewController: displayViewController, completion: completion)
    }
    
    private func executeTriggerOnAppLaunchFlow(displayViewController: UIViewController?,
                                               completion: (() -> Swift.Void)?) {
        analytics.trigger = .appLaunch
        if flow != .no {
            guard let controller = displayViewController else {
                completion?()
                return
            }
            let contentAccessManager = ContentAccessManager(rootViewController: controller,
                                                            camDelegate: self,
                                                            camFlow: flow,
                                                            completion: { _ in completion?() })
            contentAccessManager.startFlow()
        } else {
            completion?()
        }
    }
    
    // MARK: - ZPLoginProviderUserDataProtocol
 
    public func isUserComply(policies: [String: NSObject]) -> Bool {
        return false
    }
    
    public func isUserComply(policies: [String: NSObject], completion: @escaping (Bool) -> Void) {
        completion(false)
    }
    
    // MARK: - ZPLoginProviderProtocol
    
    public func login(_ additionalParameters: [String: Any]?,
                      completion: @escaping ((ZPLoginOperationStatus) -> Void)) {
    
        guard let controller = UIViewController.topmostViewController() else {
            assert(false, "No topmost controller")
            completion(.failed)
            return
        }
        
        var flow = self.flow
        
        if let _ = additionalParameters?["UserAccountTrigger"] as? Bool {
            analytics.trigger = .userAccountComponent
        }
        
        let contentAccessManager = ContentAccessManager(rootViewController: controller,
                                                        camDelegate: self,
                                                        camFlow: flow) { (isCompleted) in
            (isCompleted == true) ? completion(.completedSuccessfully) : completion(.failed)
        }
        contentAccessManager.startFlow()
    }
    
    public func logout(_ completion: @escaping ((ZPLoginOperationStatus) -> Void)) {
        APAuthorizationManager.sharedInstance()?.updateAuthorizationTokens(withAuthorizationProviders: [])
        completion(.completedSuccessfully)
    }
    
    public func isAuthenticated() -> Bool {
        return false
    }
    
    public func isPerformingAuthorizationFlow() -> Bool {
        return false

    }
    
    public func getUserToken() -> String {
        return ""
    }

    // MARK: - ZPPluggableScreenProtocol
    
    public weak var screenPluginDelegate: ZPPlugableScreenDelegate?
    
    public func createScreen() -> UIViewController {
        return UIViewController()
    }
}

// MARK: - CAMDelegate

extension CAMStarterKitLoginPlugin: CAMDelegate {
    
    public func getPluginConfig() -> [String: String] {
        return camConfiguration
    }
    
    public func isPurchaseNeeded() -> Bool {
        return true
    }
    
    public func isUserLoggedIn() -> Bool {
        return isAuthenticated()
    }
    
    public func facebookLogin(userData: (email: String, userId: String),
                              completion: @escaping (Result<Void, Error>) -> Void) {
        
    }
    
    public func facebookSignUp(userData: (email: String, userId: String),
                               completion: @escaping (Result<Void, Error>) -> Void) {
        
    }
    
    public func login(authData: [String: String], completion: @escaping (Result<Void, Error>) -> Void) {

    }
    
    public func signUp(authData: [String: String], completion: @escaping (Result<Void, Error>) -> Void) {

    }
    
    public func resetPassword(data: [String: String], completion: @escaping (Result<Void, Error>) -> Void) {
        
    }
    
    public func availableProducts(completion: @escaping (Result<[String], Error>) -> Void) {
        
    }
    
    public func itemPurchased(purchasedItem: PurchasedProduct, completion: @escaping (Result<Void, Error>) -> Void) {
        
    }
    
    public func itemsRestored(restoredItems: [PurchasedProduct],
                              completion: @escaping (Result<Void, Error>) -> Void) {
        
    }
    
    public func analyticsStorage() -> AnalyticsStorageProtocol {
        return analytics
    }
}

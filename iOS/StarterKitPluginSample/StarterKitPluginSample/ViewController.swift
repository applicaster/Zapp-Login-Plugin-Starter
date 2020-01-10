//
//  ViewController.swift
//  StarterKitPluginSample
//
//  Created by Roman Karpievich on 11/19/19.
//  Copyright © 2019 Roman Karpievich. All rights reserved.
//

import UIKit
import CAMStarterKit
import ZappPlugins

class ViewController: UIViewController {
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        ZAAppConnector.sharedInstance().genericDelegate = self
        ZAAppConnector.sharedInstance().analyticsDelegate = self
        ZAAppConnector.sharedInstance().identityDelegate = self
        ZAAppConnector.sharedInstance().pluginsDelegate = self
        ZAAppConnector.sharedInstance().layoutsStylesDelegate = self
        ZAAppConnector.sharedInstance().urlDelegate = self
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
    }
    
    @IBAction func login(_ sender: Any) {
        let mockedLoginPlugin = CAMStarterKitLoginPlugin.init(configurationJSON: nil)
        mockedLoginPlugin.login(nil, completion: { result in
            
        })
    }
    
    @IBAction func logout(_ sender: Any) {
        let mockedLoginPlugin = CAMStarterKitLoginPlugin.init(configurationJSON: nil)
        let completion: (ZPLoginOperationStatus) -> Void = { _ in
            
        }
        mockedLoginPlugin.logout(completion)
    }
    
    
    //Mocked function for retrieve ZLScreenModel
    func screenModelForPluginID(pluginID: String?, dataSource: NSObject?) -> ZLScreenModel? {
        var model: ZLScreenModel? = nil
        
        if let path = Bundle.main.path(forResource: "mock_config", ofType: "json") {
            do {
                  let data = try Data(contentsOf: URL(fileURLWithPath: path), options: .mappedIfSafe)
                  let jsonResult = try JSONSerialization.jsonObject(with: data, options: .mutableLeaves)
                  if let jsonResult = jsonResult as? [String: Any] {
                    model = ZLScreenModel(object: jsonResult)
                  }
              } catch {
                   fatalError()
              }
        }
        return model
    }
}

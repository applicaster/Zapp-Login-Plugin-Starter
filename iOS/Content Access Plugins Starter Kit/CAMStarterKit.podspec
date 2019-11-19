Pod::Spec.new do |s|
  s.name         = 'CAMStarterKit'
  s.version      = '0.0.1'
  s.summary      = 'CAMStarterKitPlugin'
  s.license      = 'MIT'
  s.homepage     = 'https://github.com/applicaster/Zapp-Login-Plugin-Starter'
  s.author       = {"Brel Egor" => "brel@scand.com"}
  s.ios.deployment_target = '10.0'
  s.swift_version = '5.0'
  s.source       = { :git => "https://github.com/applicaster/Zapp-Login-Plugin-Starter", :tag => 'ios-' + s.version.to_s }
  s.source_files = 'Classes/**/*.{swift,h,m}'
  s.requires_arc = true
  s.static_framework = true
  s.dependency 'ZappPlugins'
  s.dependency 'ZappLoginPluginsSDK', '= 8.0.3'
  s.dependency 'Alamofire'
  s.dependency 'CAM', '1.1.0'
  s.dependency 'ComponentsSDK', '= 12.1.3'
  s.xcconfig =  { 'CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES' => 'YES',
    'ENABLE_BITCODE' => 'YES',
    'SWIFT_VERSION' => '5.0'
  }
end

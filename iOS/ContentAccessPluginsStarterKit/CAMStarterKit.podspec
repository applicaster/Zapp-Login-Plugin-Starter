Pod::Spec.new do |s|
  s.name         = 'CAMStarterKit'
  s.version      = '2.0.0'
  s.summary      = 'CAMStarterKitPlugin'
  s.license      = 'MIT'
  s.homepage     = 'https://github.com/applicaster/Zapp-Login-Plugin-Starter'
  s.author       = {"Brel Egor" => "brel@scand.com"}
  s.ios.deployment_target = '10.0'
  s.swift_version = '5.1'
  s.source       = { :git => "https://github.com/applicaster/Zapp-Login-Plugin-Starter", :tag => 'ios-' + s.version.to_s }
  s.source_files = 'Classes/**/*.{swift,h,m}'
  s.requires_arc = true
  s.static_framework = true
  s.dependency 'ZappPlugins'
  s.dependency 'Alamofire'
  s.dependency 'CAM', '~> 2.0.0'
  s.xcconfig =  {
    'CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES' => 'YES',
    'ENABLE_BITCODE' => 'YES',
    'SWIFT_VERSION' => '5.1'
  }
end

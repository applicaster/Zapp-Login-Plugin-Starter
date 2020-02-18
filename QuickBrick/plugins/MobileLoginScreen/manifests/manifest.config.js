const baseManifest = {
  api: {},
  dependency_repository_url: [],
  dependency_name: '@applicaster/quick-brick-screen-login',
  author_name: 'Enzo Donofrio',
  author_email: 'e.donofrio@applicaster.com',
  name: 'QuickBrick Screen Login',
  description: 'Quick Brick screen login plugin',
  type: 'general',
  screen: true,
  react_native: true,
  identifier: 'quick_brick_screen_login',
  ui_builder_support: true,
  whitelisted_account_ids: ['14af1289-ff7d-46d0-a101-7cb957577208'],
  deprecated_since_zapp_sdk: '',
  unsupported_since_zapp_sdk: '',
  preload: true,
  general: {
    fields: [
      {
        type: 'switch',
        key: 'is_testing',
        tooltip: 'Enable Test the login with fake credential',
        initial_value: false,
      },
      {
        group: true,
        label: 'Layout Settings',
        tooltip: 'These fields Allow to set color and basic style on the login',
        folded: true,
        fields: [
          {
            key: 'app_bgcolor',
            type: 'color_picker',
            label_tooltip: 'BackGround Color for Main.',
            initial_value: '#2132B3ff',
          },
          {
            key: 'font_color',
            type: 'color_picker',
            label_tooltip: 'Color for the main font.',
            initial_value: '#000000ff',
          },
        ],
      },
    ],
  },
  custom_configuration_fields: [],
  ui_frameworks: ['quickbrick'],
  targets: ['mobile'],
}

const min_zapp_sdk = {
  ios: '20.0.0-Dev',
  android: '11.3.1',
}

module.exports = function({platform, version}) {
  const manifest = {
    ...baseManifest,
    platform,
    dependency_version: version,
    manifest_version: version,
    min_zapp_sdk: min_zapp_sdk[platform],
  }

  return manifest
}

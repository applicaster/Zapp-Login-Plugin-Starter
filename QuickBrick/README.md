# Quick Brick plugins

This workspace contains the Quick brick plugins.

## publish a plugin

In order to publish a plugin, 4 steps are required:

1. committing all your changes
2. publish the package to npm
3. update the manifests with the new npm version
4. push the manifests to zapp

Steps 2-4 can be achieved easily for all platforms at once by using the zapplicaster-cli tool.
Once your changes are done and committed, you can run this command from the root of the workspace

```bash
PLUGIN_PATH=plugins/<PluginFolder> yarn publish_plugin -v x.y.z
```

This script will take care of everything, publish the version to the npm registry, update the manifest, and publish the manifests to zapp
When this script runs, it will create a commit with the generated manifests, and the version change in package.json. Don't forget to push this !

Last but not least, you can now manage your manifest in a single place for all the platforms, via the file `manifests/manifest.config.js`
this file exports a function which takes the platform and the version of the manifest, and should return the proper json value. By default, you want to let the script handle the platform and versions properties of the manifests, but if you need to have specific settings for each platforms, it is very easy to amend the return value of this function so that it produces the manifests you want.

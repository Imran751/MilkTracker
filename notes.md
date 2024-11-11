"react-native-reanimated": "^3.16.1",

Some dependencies are incompatible with the installed expo package version:
 - react-native-gesture-handler - expected version: ~2.16.1 - actual version installed: 2.20.2
 - react-native-reanimated - expected version: ~3.10.1 - actual version installed: 3.10.0
 - react-native-safe-area-context - expected version: 4.10.5 - actual version installed: 4.14.0
 - react-native-screens - expected version: 3.31.1 - actual version installed: 4.0.0
Your project may not work correctly until you install the correct versions of the packages.
To install the correct versions of these packages, please run: expo doctor --fix-dependencies,
or install individual packages by running expo install [package-name ...]
› Stopped server
The following packages should be updated for best compatibility with the installed expo version:
  react-native-gesture-handler@2.20.2 - expected version: ~2.16.1
  react-native-reanimated@3.10.0 - expected version: ~3.10.1
  react-native-safe-area-context@4.14.0 - expected version: 4.10.5
  react-native-screens@4.0.0 - expected version: 3.31.1
Your project may not work correctly until you install the expected versions of the packages.
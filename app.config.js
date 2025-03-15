export default {
  expo: {
    name: "BorderlessVPN",
    slug: "borderless-vpn",
    owner: "venihost",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      bundleIdentifier: "com.venihost.borderlessvpn",
      supportsTablet: true
    },
    android: {
      package: "com.venihost.borderlessvpn",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF"
      }
    },
    versionCode: 1,
    permissions: [],
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      eas: {
        projectId: "fe1d67ac-6bbc-4ba6-9704-94aef1e82ee7" // This should be updated with the actual project ID from eas init
      }
    }
  }
};
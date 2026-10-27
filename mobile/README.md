# SPARK mobile foundation

This folder hosts the **existing SPARK React/Vite application** inside Android and iOS using Capacitor 8. The GitHub Pages website stays unchanged.

## Requirements

- Node.js 22 or newer
- Android Studio and Android SDK to build Android
- macOS with Xcode to build iOS
- Existing SPARK web dependencies installed with `npm ci`
- Native dependencies installed once using `npm install --prefix mobile`

## Android from Windows, macOS or Linux

From the repository root:

```sh
npm ci
npm install --prefix mobile
npm run mobile:build
cd mobile
npm run android:init
npm run android:open
```

Once the Android project exists, for every subsequent web change run from the repository root:

```sh
npm run mobile:build
npm --prefix mobile run android:sync
```

Open Android Studio to run an emulator or connect a phone. Commit the generated `mobile/android` project after checking app ID, signing configuration and files. Do not commit signing keys, local SDK paths or secrets.

## iPhone (requires macOS/Xcode)

Run the web build and dependency installation as above, then:

```sh
cd mobile
npm run ios:init
npm run ios:open
```

After further web changes, run `npm run mobile:build` and `npm --prefix mobile run ios:sync` from the repository root. Commit the generated `mobile/ios` project after review.

## Why the extra web build?

The ordinary Vite build uses `/sparkcxc/` for GitHub Pages. `npm run mobile:build` sets `PUBLIC_URL=./` only for its child build process. Native assets therefore load locally from the packaged WebView. Capacitor's `webDir` points at `../build`. Never set Capacitor `server.url` to the production SPARK website for distribution.

## Current scope and release blockers

- Existing login, courses, exams, Supabase, and V2 grading are reused without server migrations.
- Browser service-worker/Web Push is disabled in native apps. Native notifications require Android FCM, iOS APNs, Capacitor Push Notifications, and a protected token registration/delivery backend before launch.
- Validate account recovery, OAuth/email redirects, external payment links, Android hardware back button, device safe areas, file uploads, diagrams, graph tools and exam timers before store release.
- Supabase Auth needs approved app deep-link redirect URLs before native OAuth/email callbacks work. Never embed a service-role key in either native app.
- Use a separate test Supabase project or test users for mobile QA. Browser and native local storage are separate, even for the same account.
- Generate and commit `mobile/package-lock.json` after installing dependencies so native builds become reproducible.
- Store signing credentials in a protected secrets store, not the repo. App Store and Play Store review, age/privacy declarations and billing compliance are later release tasks.

## Smoke checks

Run `npm run mobile:build`; verify `build/index.html` references relative assets and not `/sparkcxc/assets/`. From `mobile`, run `npm run android:init` and `npm run android:sync`, then test in Android Studio.

The mobile work is intentionally isolated. No native store build has been signed or published by adding these files.

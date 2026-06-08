# Studentbrev (React Native + Expo)

Starter iPhone app project using React Native (Expo) and TypeScript.

## Current status

- Project scaffolded with `blank-typescript` template.
- Dependencies installed.
- TypeScript check ran successfully once in terminal.
- VS Code task created in `.vscode/tasks.json`.

## Run on iPhone Simulator

1. Make sure Xcode is installed.
2. From project root, run:
   - `npm run ios`

## Environment note

A local Node runtime issue was detected when running VS Code tasks:

- `dyld: Library not loaded ... libicui18n.74.dylib`

If this appears on your machine, fix Homebrew Node/ICU and retry, for example by reinstalling `node` and `icu4c`, then reopening VS Code.

## Next steps

- Add navigation (`expo-router` or `@react-navigation/native`).
- Create screens: onboarding, home, profile.
- Add API layer and state management.

## Deploy to Vercel

This Expo app can be deployed as a static web export.

1. Build web export:
   - `npm run build:web`
2. Deploy with Vercel:
   - `npx vercel`
3. For production deployment:
   - `npx vercel --prod`

Configured files:

- [vercel.json](vercel.json)
- [package.json](package.json) script `build:web`

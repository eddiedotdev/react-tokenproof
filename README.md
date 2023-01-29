Eduardo SanMarco
8:13 AM (0 minutes ago)
to me

# React-Tokenproof

This package is to be used when authenticating with Tokenproof in a React environment.

## Quick Features

-   Context provider for configuring keys
-   Utility methods provided from TokenProof: `login`, `logout`, `close`, `loginButton`

## Installation

```
# npm
npm install react-tokenproof

# yarn
yarn add react-tokenproof

# pnpm
pnpm install react-rokenproof
```

### `React` environment

In order to use `react-tokenproof` you will need to have a `React` environment setup.

-   [Add react to a site](https://beta.reactjs.org/learn/add-react-to-a-website)
-   [Setup React with Vite](https://vitejs.dev/guide/)

## Setup

The current version of this package leverages a `TokenProofProvider` to inject a config object:

```
<TokenProofProvider config={{
    appId: 'my-app-id',
    webhook: 'https://my-webhook.com',
}}>
    <App />
</TokenProofProvider>

```

## Usage

After adding & configuring the `TokenProofProvider`, pull in the `useTokenProof`. You can use the following methods:

`const { login, logout, close, loginButton, setEvents } = useTokenProof();`

Set the `onNonce` and/or `onVerify` callbacks using `setEvents` on load of the component

```
useEffect(() => {
    setEvents({
        onNonce: (nonceEvent) => console.log("onNonce:", nonceEvent),
        onVerify: (verifyEvent) => console.log("onVerify:", verifyEvent),
    })
}, []);
```

Now you can authenticate/login and utilize the Tokenproof utility methods.

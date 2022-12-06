Eduardo SanMarco
8:13 AM (0 minutes ago)
to me

# React-Tokenproof

This package is to be used when authenticating with Tokenproof in a React environment.

## Quick Features

- Context provider for configuring keys
- Utility methods provided from TokenProof: `login`, `logout`, `close`, `loginButton`

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

- [Add react to a site](https://beta.reactjs.org/learn/add-react-to-a-website)
- [Setup React with Vite](https://vitejs.dev/guide/)

## Setup

The current version of this package leverages a `TokenProofProvider` to inject a config object as well as 2 event handlers:

```
<TokenProvider
    config={{
        appId: 'my-app-id',
        webhook: 'https://my-webhook.com',
        env: 'development'
    }}
    onNonce={nonce => console.log(nonce)}
    onToken={token => console.log(token)}
>
    <App />
</TokenProvider>

```

## Usage

After adding & configuring the `TokenProofProvider`, pull in the `useTokenProof` hook:

`const { login, logout, close, loginButton } = useTokenProof();`

Now you can authenticate/login and utilize the Tokenproof utility methods.

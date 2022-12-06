import React, { createContext, useContext, useEffect } from "react";
import { Helmet } from "react-helmet";

declare global {
  interface Window {
    tokenproof: any;
  }
}

export interface TokenProviderActions {
  login: () => void;
  logout: () => void;
  loginButton: () => void;
  close: () => void;
}

const defaultValueProvider = {
  login: () => {},
  logout: () => {},
  loginButton: () => {},
  close: () => {},
};

export interface Config {
  appId: null | string;
  webhook: null | string;
  env: "development" | string;
}

interface TokenProofProviderProps {
  children: React.ReactNode;
  cdnLink: string;
  config: Config;
  onNonce: (nonce: any) => void;
  onVerify: (token: any) => void;
}

const TokenProofContext =
  createContext<TokenProviderActions>(defaultValueProvider);

export const TokenProofProvider = ({
  onNonce,
  onVerify,
  config,
  children,
  cdnLink,
}: TokenProofProviderProps) => {
  useEffect(() => {
    if (window.tokenproof) {
      window.tokenproof.on("nonce", (e: any) => onNonce(e));
      window.tokenproof.on("verify", (e: any) => onVerify(e));

      return () => {
        window.tokenproof.off("nonce", onNonce);
        window.tokenproof.off("verify", onVerify);
      };
    }
  }, [window.tokenproof]);

  const login = () => {
    if (window.tokenproof) {
      window.tokenproof.login(config);
    }
  };

  const logout = () => {
    if (window.tokenproof) {
      window.tokenproof.logout(config);
    }
  };

  const loginButton = () => {
    if (window.tokenproof) {
      window.tokenproof.loginButton(config);
    }
  };

  const close = () => {
    if (window.tokenproof) {
      window.tokenproof.close(config);
    }
  };

  return (
    <TokenProofContext.Provider value={{ login, logout, loginButton, close }}>
      <Helmet>
        <script src={cdnLink}></script>
      </Helmet>
      {children}
    </TokenProofContext.Provider>
  );
};

export const useTokenProof = () => {
  return useContext(TokenProofContext);
};

import React, { createContext, useContext, useEffect, useRef } from "react";
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
	setEventRefs: (onNonce: any, onVerify: any) => void;
}

const defaultValueProvider = {
	login: () => {},
	logout: () => {},
	loginButton: () => {},
	close: () => {},
	setEventRefs: () => {},
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
}

const TokenProofContext =
	createContext<TokenProviderActions>(defaultValueProvider);

export const TokenProofProvider = ({
	config,
	children,
	cdnLink,
}: TokenProofProviderProps) => {
	const onNonceRef = useRef(null);
	const onVerifyRef = useRef(null);

	useEffect(() => {
		if (onNonceRef && onVerifyRef && window.tokenproof) {
			const onNonce = onNonceRef.current as any;
			const onVerify = onVerifyRef.current as any;

			window.tokenproof.on("nonce", (e: any) => onNonce(e));
			window.tokenproof.on("nonce", (e: any) => onVerify.current(e));

			return () => {
				window.tokenproof.close("nonce");
				window.tokenproof.close("verify");
			};
		}
	}, [window.tokenproof, onNonceRef, onVerifyRef]);

	const setEventRefs = (onNonce: any, onVerify: any) => {
		onNonceRef.current = onNonce;
		onVerifyRef.current = onVerify;
	};

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
		<TokenProofContext.Provider
			value={{ login, logout, loginButton, close, setEventRefs }}
		>
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

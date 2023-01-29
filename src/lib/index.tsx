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
	setEvents: (onNonce: any, onVerify: any) => void;
}

const defaultValueProvider = {
	login: () => {},
	logout: () => {},
	loginButton: () => {},
	close: () => {},
	setEvents: () => {},
};

export interface Config {
	appId: null | string;
	webhook: null | string;
}

interface TokenProofProviderProps {
	children: React.ReactNode;
	config: Config;
}

const TokenProofContext =
	createContext<TokenProviderActions>(defaultValueProvider);

export const TokenProofProvider = ({
	config,
	children,
}: TokenProofProviderProps) => {
	const onNonceRef = useRef<any>(null);
	const onVerifyRef = useRef<any>(null);

	const internalConfig = {
		...config,
		env: process.env.NODE_ENV ?? "development",
	};

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

	const setEvents = ({
		onNonce,
		onVerify,
	}: {
		onNonce: (data: any) => any;
		onVerify: (data: any) => any;
	}) => {
		onNonceRef.current = onNonce;
		onVerifyRef.current = onVerify;
	};

	const login = () => {
		if (window.tokenproof) {
			window.tokenproof.login(internalConfig);
		}
	};

	const logout = () => {
		if (window.tokenproof) {
			window.tokenproof.logout(internalConfig);
		}
	};

	const loginButton = () => {
		if (window.tokenproof) {
			window.tokenproof.loginButton(internalConfig);
		}
	};

	const close = () => {
		if (window.tokenproof) {
			window.tokenproof.close(internalConfig);
		}
	};

	return (
		<TokenProofContext.Provider
			value={{ login, logout, loginButton, close, setEvents }}
		>
			<Helmet>
				<script src="https://cdn.tokenproof.xyz/js/tokenproof-oa-widget-v1.0.js"></script>
			</Helmet>
			{children}
		</TokenProofContext.Provider>
	);
};

export const useTokenProof = () => {
	return useContext(TokenProofContext);
};

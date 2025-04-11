"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<NextThemesProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
			enableColorScheme
		>
			{children}
		</NextThemesProvider>
	);
}

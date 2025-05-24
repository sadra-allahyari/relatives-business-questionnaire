"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Provides theme context to the application using `next-themes`.
 *
 * Wrap your application root with this component to enable automatic theme switching
 * based on system preferences or user selection.
 *
 * @param {!React.ComponentProps<typeof NextThemesProvider>} props
 *   Props forwarded to the underlying `NextThemesProvider`, including children.
 * @returns {JSX.Element} The wrapped application with theme support.
 */
export default function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>): React.JSX.Element {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

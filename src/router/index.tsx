import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { PageRoute } from "../types";

interface RouterContextType {
  currentPath: string;
  navigate: (to: string, options?: { replace?: boolean }) => void;
}

const RouterContext = createContext<RouterContextType>({
  currentPath: "/",
  navigate: () => {},
});

export const VALID_ROUTES: string[] = [
  "/",
  "/our-vision",
  "/services",
  "/route-schedule",
  "/the-hub",
  "/partnership",
  "/our-team",
  "/contact",
  "/about",
  "/dashboard",
];

export function RouterProvider({ children }: { children: ReactNode }) {
  // Initialize from current URL pathname
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window === "undefined") return "/";
    const path = window.location.pathname || "/";
    // Canonical alias redirect
    if (path === "/about") return "/our-vision";
    return path;
  });

  useEffect(() => {
    // Listen to browser Back and Forward buttons
    const handlePopState = () => {
      let path = window.location.pathname || "/";
      if (path === "/about") path = "/our-vision";
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (to: string, options?: { replace?: boolean }) => {
    let target = to;
    if (target === "/about") target = "/our-vision";

    if (options?.replace) {
      window.history.replaceState({}, "", target);
    } else {
      window.history.pushState({}, "", target);
    }
    setCurrentPath(target);
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Focus main region for accessible screen reader announcement
    const mainEl = document.querySelector("main");
    if (mainEl) {
      mainEl.setAttribute("tabindex", "-1");
      mainEl.focus({ preventScroll: true });
    }
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
}

export function Link({
  to,
  children,
  className = "",
  activeClassName = "",
  onClick,
  ...rest
}: LinkProps) {
  const { currentPath, navigate } = useRouter();
  const normalizedTo = to === "/about" ? "/our-vision" : to;
  const isActive =
    currentPath === normalizedTo ||
    (normalizedTo !== "/" && currentPath.startsWith(normalizedTo));

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);

    // Support standard modifier clicks (Cmd, Ctrl, Shift, Alt) for opening in new tab
    if (
      !e.defaultPrevented &&
      e.button === 0 &&
      !e.metaKey &&
      !e.ctrlKey &&
      !e.shiftKey &&
      !e.altKey &&
      (!rest.target || rest.target === "_self")
    ) {
      e.preventDefault();
      if (currentPath !== normalizedTo) {
        navigate(normalizedTo);
      }
    }
  };

  return (
    <a
      href={normalizedTo}
      onClick={handleClick}
      className={`${className} ${isActive ? activeClassName : ""}`}
      aria-current={isActive ? "page" : undefined}
      {...rest}
    >
      {children}
    </a>
  );
}

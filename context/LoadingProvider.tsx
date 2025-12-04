"use client";

import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from "react";
import { usePathname } from "next/navigation";
import Loading from "../components/Loading";

interface LoadingType {
    isLoading: boolean;
    setIsLoading: (state: boolean) => void;
    setLoading: (percent: number) => void;
}

export const LoadingContext = createContext<LoadingType | null>(null);

export const LoadingProvider = ({ children }: PropsWithChildren) => {
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(0);
    const [hasShownLoading, setHasShownLoading] = useState(false);

    useEffect(() => {
        // Only show loading on the home page and only once per session
        if (pathname === "/" && !hasShownLoading) {
            setIsLoading(true);
            setHasShownLoading(true);
        }
    }, [pathname, hasShownLoading]);

    const value = {
        isLoading,
        setIsLoading,
        setLoading,
    };

    useEffect(() => { }, [loading]);

    return (
        <LoadingContext.Provider value={value as LoadingType}>
            {isLoading && <Loading percent={loading} />}
            <main className="main-body">{children}</main>
        </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error("useLoading must be used within a LoadingProvider");
    }
    return context;
};

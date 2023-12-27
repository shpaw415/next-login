"use client";
import { useEffect, useTransition } from "react";
export function useServerAction(callback, call) {
    const [intransition, setTransition] = useTransition();
    useEffect(() => {
        if (call)
            setTransition(async () => callback());
    }, [call]);
}

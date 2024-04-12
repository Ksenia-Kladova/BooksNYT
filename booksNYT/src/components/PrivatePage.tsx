import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import type { ReactNode } from "react";

type Props = {
    children: ReactNode
}

export const PrivatePage = ({ children }: Props) => {
    const { isAuth } = useAuth();

    if (!isAuth) {
        return (
            <Navigate to="/" />
        )
    } else {
        return children
    }
};
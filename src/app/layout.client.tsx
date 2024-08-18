"use client";
import { FC, ReactNode } from "react";
import ReduxProvider from "@/providers/ReduxProvider";
interface LayoutClientProps {
	children: ReactNode;
}
const LayoutClient: FC<LayoutClientProps> = ({ children }) => {
	return (
		<>
			<ReduxProvider>{children}</ReduxProvider>
		</>
	);
};

export default LayoutClient;

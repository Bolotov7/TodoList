import { FC, ReactNode } from "react";
import LayoutAuth from "@/appPages/auth/components/layout/LayoutAuth";
interface LayoutProps {
	children: ReactNode;
}
const layout: FC<LayoutProps> = ({ children }) => (
	<LayoutAuth>{children}</LayoutAuth>
);
export default layout;

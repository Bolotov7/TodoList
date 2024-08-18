import { FC, ReactNode } from "react";
import LayoutSite from "@/appPages/site/components/layout/LayoutSite";
interface LayoutProps {
	children: ReactNode;
}
const layout: FC<LayoutProps> = ({ children }) => (
	<LayoutSite>{children}</LayoutSite>
);
export default layout;

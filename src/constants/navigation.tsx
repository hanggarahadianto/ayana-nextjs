// src/constants/navigation.ts
import { AiOutlineDashboard } from "react-icons/ai";
import { HiOutlineCash } from "react-icons/hi";
import { ReactNode } from "react"; // Import ReactNode untuk tipe icon
import { FaPeopleGroup } from "react-icons/fa6";
import { MdOutlineAccountCircle } from "react-icons/md";
import { FaProjectDiagram, FaCog, FaNewspaper, FaShoppingBag, FaIdeal, FaMoneyBill, FaWallet } from "react-icons/fa";

interface MenuItem {
  label: string;
  icon: ReactNode;
  href: string;
  condition?: (company: any) => boolean;
}

// src/constants/navigation.ts
export const mainMenuItems: MenuItem[] = [
  { label: "Dashboard", icon: <AiOutlineDashboard />, href: "/admin/sidebar/dashboard" },
  // { label: "Feed", icon: <FaNewspaper />, href: "/admin/sidebar/feed" },
  { label: "Product", icon: <FaShoppingBag />, href: "/admin/sidebar/product" },
  { label: "Marketing", icon: <FaIdeal />, href: "/admin/sidebar/marketing" },
  { label: "Payin", icon: <HiOutlineCash />, href: "/admin/sidebar/payin" },
  { label: "Payout", icon: <FaMoneyBill />, href: "/admin/sidebar/payout" },
  { label: "Finance", icon: <FaWallet />, href: "/admin/sidebar/finance" },
  // { label: "Project", icon: <FaProjectDiagram />, href: "/admin/sidebar/project" },
  {
    label: "Project",
    icon: <FaProjectDiagram />,
    href: "/admin/sidebar/project",
    condition: (company) => company?.has_project === true,
  },
  { label: "HR", icon: <FaPeopleGroup />, href: "/admin/sidebar/hr" },
  // { label: "Setting", icon: <FaCog />, href: "/admin/sidebar/setting" },
];

export const userMenuItem: MenuItem = {
  label: "Account",
  icon: <MdOutlineAccountCircle />,
  href: "/admin/sidebar/account",
};

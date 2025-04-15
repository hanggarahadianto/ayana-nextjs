// src/constants/navigation.ts
import { FaTasks, FaProjectDiagram, FaUser, FaCog, FaNewspaper, FaShoppingBag, FaIdeal, FaMoneyBill, FaWallet } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { TbTransactionDollar } from "react-icons/tb";
import { HiOutlineCash } from "react-icons/hi";
import { ReactNode } from "react"; // Import ReactNode untuk tipe icon

interface MenuItem {
  label: string;
  icon: ReactNode;
  href: string;
}

export const menuItems: MenuItem[] = [
  { label: "Dashboard", icon: <AiOutlineDashboard />, href: "/admin/sidebar/dashboard" },
  { label: "News", icon: <FaNewspaper />, href: "/admin/sidebar/news" },
  { label: "Task", icon: <FaTasks />, href: "/admin/sidebar/task" },
  { label: "Product", icon: <FaShoppingBag />, href: "/admin/sidebar/product" },
  { label: "Marketing", icon: <FaIdeal />, href: "/admin/sidebar/marketing" },
  { label: "Finance", icon: <FaWallet />, href: "/admin/sidebar/finance" },
  { label: "Payin", icon: <HiOutlineCash />, href: "/admin/sidebar/payin" },
  { label: "Payout", icon: <FaMoneyBill />, href: "/admin/sidebar/payout" },
  { label: "Project", icon: <FaProjectDiagram />, href: "/admin/sidebar/project" },
  { label: "Transaction", icon: <TbTransactionDollar />, href: "/admin/sidebar/transaaction" },
  { label: "Profile", icon: <FaUser />, href: "/admin/sidebar/profile" },
  { label: "Setting", icon: <FaCog />, href: "/admin/sidebar/setting" },
];

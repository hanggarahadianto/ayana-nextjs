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
  { label: "Dashboard", icon: <AiOutlineDashboard />, href: "/internal/sidebar/dashboard" },
  { label: "News", icon: <FaNewspaper />, href: "/internal/sidebar/news" },
  { label: "Task", icon: <FaTasks />, href: "/internal/sidebar/task" },
  { label: "Product", icon: <FaShoppingBag />, href: "/internal/sidebar/product" },
  { label: "Marketing", icon: <FaIdeal />, href: "/internal/sidebar/marketing" },
  { label: "Finance", icon: <FaWallet />, href: "/internal/sidebar/finance" },
  { label: "Payin", icon: <HiOutlineCash />, href: "/internal/sidebar/payin" },
  { label: "Payout", icon: <FaMoneyBill />, href: "/internal/sidebar/payout" },
  { label: "Project", icon: <FaProjectDiagram />, href: "/internal/sidebar/project" },
  { label: "Transaction", icon: <TbTransactionDollar />, href: "/internal/sidebar/transaaction" },
  { label: "Profile", icon: <FaUser />, href: "/internal/sidebar/profile" },
  { label: "Setting", icon: <FaCog />, href: "/internal/sidebar/setting" },
];

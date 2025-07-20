import { isAdmin } from "../config/isAdmin";
import AdminLayout from "./AdminLayout";
import SellerLayout from "./SellerLayout";
import MainLayout from "./MainLayout";

export const Layout = isAdmin ? AdminLayout : MainLayout;
//export const SellerLayout = isAdmin ? MainLayout : SellerLayout;
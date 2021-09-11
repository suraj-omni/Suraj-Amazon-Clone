import React from "react";
/* import Image from "next/image";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline"; */
import { signIn, signOut, useSession } from "next-auth/client";
import { selectItems } from "../slices/cartSlice";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

function Header() {
  const [session] = useSession();
  const url = "https://ebuy.lk/wp-content/uploads/2021/amazon_PNG11.png";
  const router = useRouter();
  const items = useSelector(selectItems);
  return (
   <div>Header</div>
  );
}

export default Header;

import React from "react";
import HomePage from "@/components/Homepage";

export default async function Home() {
  const getProducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products");

    return res.json();
  };

  const data = await getProducts();
  return <HomePage products={data} />;
}

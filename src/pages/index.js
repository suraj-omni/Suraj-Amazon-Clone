import Head from "next/head";
import Banner from "../components/Banner";
import ACHeader from "../components/ACHeader";
import ProductFeed from "../components/ProductFeed";
import { getSession } from "next-auth/client";

export default function Home({ products }) {
  return (
    <div className="bg-gray-100 flex flex-col h-screen">
      <Head>
        <title>Suraj's Amazon Clone</title>
      </Head>

      {/* Header */}
      <ACHeader />

      {/* ---- Main Area Banner and Product Feeds ---- */}
      <main className="max-w-screen-2xl mx-auto flex-1 overflow-y-auto">
        {/* Banner */}
        <Banner />
        {/* product feed */}
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );

  return {
    props: { products, session },
  };
}

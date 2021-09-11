import Header from "../components/Header";
import CheckoutProduct from "../components/CheckoutProduct";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectedItemsTotal, selectItems } from "../slices/cartSlice";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/client";

function Checkout() {
  const items = useSelector(selectItems);
  const total = useSelector(selectedItemsTotal);
  const [session] = useSession();
  return (
    <div className="bg-gray-100">
      <Header />
      <div className="mx-1 mb-1 max-w-screen-2xl mx-auto">
        <Image
          src="https://ebuy.lk/wp-content/uploads/2021/Amazon-Prime-Banner.jpg"
          width={1020}
          height={250}
          objectFit="contain"
        />
      </div>
      <main className="lg:flex max-w-screen-2xl mx-auto m-2">
        {/* Left Section */}

        <div className="flex-grow m-5 shadow-sm">
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? "Your Shopping Cart is empty"
                : "Shopping Basket."}
            </h1>
            {items.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
              />
            ))}
          </div>
        </div>
        {/* Right Section */}

        {items.length > 0 && (
          <>
            <div className="flex flex-col bg-white p-5 m-5 shadow-md">
              <h2 className="whitespace-nowrap">
                Sub Total ({items.length} items)
                <span className="font-bold">
                  {" "}
                  <Currency quantity={total} currency="LKR" />
                </span>
              </h2>
              <button
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {!session ? "Sign in to Checkout" : "Proceed to Checkout"}
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Checkout;

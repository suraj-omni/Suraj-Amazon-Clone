import ACHeader from "../components/ACHeader";
import CheckoutProduct from "../components/CheckoutProduct";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectedItemsTotal, selectItems } from "../slices/cartSlice";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/client";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const stripePromise = loadStripe(process.env.stripe_public_key);
function Checkout() {
  const items = useSelector(selectItems);
  const total = useSelector(selectedItemsTotal);
  const [session] = useSession();

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    //create a stripe session
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: items,
      email: session.user.email,
    });

    //Redirect User to Stripe Checkout Page
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) {
      alert(result.error.message);
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col h-screen">
      <ACHeader />
      <main className="max-w-screen-2xl m-2 mx-auto flex-1 overflow-y-auto">
        <Image
          src="https://ebuy.lk/wp-content/uploads/2021/AmazonPrimeBanner.jpg"
          width={1020}
          height={250}
          objectFit="contain"
        />
        <div className="lg:flex  flex-grow m-5 shadow-sm">
          {/* Left Section */}
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
          {/* Right Section */}

          {items.length > 0 && (
            <>
              <div className="flex flex-col bg-white p-5 shadow-md">
                <h2 className="whitespace-nowrap">
                  Sub Total ({items.length} items)
                  <span className="font-bold">
                    {" "}
                    <Currency quantity={total} currency="LKR" />
                  </span>
                </h2>
                <button
                  role="link"
                  onClick={createCheckoutSession}
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
        </div>
      </main>
    </div>
  );
}

export default Checkout;

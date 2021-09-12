import { CheckCircleIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import ACHeader from "../components/ACHeader";

function Ordersuccess() {
  const router = useRouter();
  return (
    <div className="bg-gray-100 h-screen">
      <ACHeader />
      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center space-x-2 mb-5">
            <CheckCircleIcon className="text-green-500 h-10" />
            <h1>Thank you, Your Order is successfully completed. </h1>
          </div>
          <p>
            Thank you for shopping with us. We will call you once order is ready
            to deliver. You have recieved an email with details of the Order.
          </p>
          <button
            onClick={() => router.push("/myorders")}
            className="button mt-8"
          >
            My Orders
          </button>
        </div>
      </main>
    </div>
  );
}

export default Ordersuccess;

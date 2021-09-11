import Image from "next/image";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../slices/cartSlice";

function CheckoutProduct({
  key,
  id,
  title,
  price,
  description,
  category,
  image,
}) {
  const dispatch = useDispatch();
  const addItemstocart = () => {
    const product = { id, title, price, description, category, image };
    //Add item to Redux Cart in cart Slice
    dispatch(addToCart(product));
  };

  const removeItemsfromcart = () => {
    //remove item to Redux Cart in cart Slice
    dispatch(removeFromCart({ id }));
  };

  return (
    <div className="grid grid-cols-5">
      <Image src={image} height={200} width={200} objectFit="contain" />
      {/* description area */}
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <p>
          <Currency quantity={price} currency="LKR" />
        </p>
      </div>

      {/* add/remove buttons */}
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button onClick={addItemstocart} className="button">
          Add to Cart
        </button>
        <button onClick={removeItemsfromcart} className="button">
          Delete from Cart
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;

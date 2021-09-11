import Image from "next/image";
import { useState } from "react";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";
function Product({ key, id, title, price, description, category, image }) {
  const dispatch = useDispatch();
  const addItemstocart = () => {
    const product = { id, title, price, description, category, image };
    //Add item to Redux Cart in cart Slice
    dispatch(addToCart(product));
  };

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      <Image src={image} height={200} width={200} objectFit="contain" />
      <h4 className="my-3">{title}</h4>
      <p className="text-xs my-2 line-clamp-2">{description}</p>
      <div>
        <Currency quantity={price} currency="LKR" />
      </div>
      <button onClick={addItemstocart} className="mt-auto button">
        Add to Cart
      </button>
    </div>
  );
}

export default Product;

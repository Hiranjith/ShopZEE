import React from 'react';
import { useSelector } from 'react-redux';


const CartCount = () => {

    const {cartItems} = useSelector((state) => state.cart)

    // const cartCount = cartItems.reduce((acc, item) => acc + item.qnty, 0)

    
    return (
        <div className="absolute top-9">
        {cartItems.length > 0 && (
          <span>
            <span className="px-1 py-0 text-sm text-white bg-blue-500 rounded-full">
              {cartItems.reduce((a, c) => a + c.qnty, 0)}
            </span>
          </span>
        )}
      </div>

    );
}

export default CartCount;

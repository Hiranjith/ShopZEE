const numDecimals = (num) => {
    return Math.round(num*100) / 100
}

export const updateCart = (state) => {
    state.itemsPrice = numDecimals(state.cartItems.reduce((acc, item) => acc + item.price*item.qnty, 0))

    state.shippingFee = numDecimals(state.itemsPrice > 500 ? 0 : 20)

    state.itemGST = numDecimals(0.18 * state.itemsPrice )

    state.totalPrice = numDecimals(
        state.itemsPrice + state.shippingFee + state.itemGST
    );

    localStorage.setItem('cart', JSON.stringify(state))

    return state;
}
import { ADD_COUNTER, ADD_TO_CART } from "./mutations-types"

// mutations唯一目的就是修改state中的状态
// mutations中的每个方法尽可能完成的事件比较单一一点
export default {
  // addCart(state, payload) {
  //   state.cartList.push(payload)
  //   console.log(this.state.cartList);
  // }
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}


import { configureStore,persistStore } from "@reduxjs/toolkit";
import logger from 'redux-logger'
import cart from './cartSlice'
import expandSidebar from './ExpandSlice'
import dialogSlice from './DialogSlice';



const reducer = { cart, expandSidebar, dialogSlice};
const preloadedState = {
  cart: 
    {
      name: "cart",
      initialState: "hello",
      reducers: {},
    },
 
    dialogSlice: {
      show: false,
      header: "",
      msgs: [],
      link: {
        link: "",
        link_text: "",
      }, 
    },
    expandSidebar: {
      expandSidebar: true
    }
}
const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
  
});

export default store;





import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import { store } from "./store/store";
import Home from "./component/Home";
import Header from "./component/Header";
import Products from "./component/Products";
import About from "./component/About";
import ShowProduct from "./component/ShowProduct";
import OrderProduct from "./component/OrderProduct";
import Cart from "./component/Cart";

function App() {
  return (
    <div className="mainContainer">
      <Header />
      <Provider store={store}>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/" element={<Products />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/ShowProduct/:id" element={<ShowProduct />} />
          <Route path="/OrderProduct/:id" element={<OrderProduct />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;

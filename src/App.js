import Footer from "./components/Footer";
import Header from "./components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
Sentry.init({
  dsn: "https://c564626926f948cb81e9ea7bc365b8c0@o4504826449100800.ingest.sentry.io/4504826451197952",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});
function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <main>
        <div className="container-fluid">
          <Routes>
            <Route path='/' element={<HomeScreen />} exact/>
            <Route path='/cart/:id' element={<CartScreen />} />
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/order/:id' element={<OrderScreen />} />
            <Route path='/admin/userlist' element={<UserListScreen />} />
            <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
            <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
            <Route path='/admin/productlist' element={<ProductListScreen exact />} />
            <Route path='/admin/productlist/:pageNumber' element={<ProductListScreen />} />
            <Route path='/admin/orderlist' element={<OrderListScreen />} />
            <Route path='/search/:keyword' element={<HomeScreen />}  />
            <Route path='/page/:pageNumber' element={<HomeScreen />}  />
            <Route path='search/:keyword/page/:pageNumber' element={<HomeScreen />}  />

          </Routes>
        </div>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

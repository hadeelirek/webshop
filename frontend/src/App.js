import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  SignupPage,
  LoginPage,
  ProductsPage,
  ForgotPassword,
  UpdateAccount,
  Vouchers,
  CartPage,
  AboutUs,
  History,
  NavBar,
} from './Pages';

function App() {
  const savedUserId = localStorage.getItem('customerId');
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="vouchers" element={<Vouchers />} />
        <Route path="about-us" element={<AboutUs />} />
        {savedUserId && <>
          <Route path="manage-account" element={<UpdateAccount />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="history" element={<History />} />
        </>}
        <Route path="*" element={<div>
          <NavBar />
          <p style={{
            margin: "60px 20px",
          }}>
            Page not found, or you need to login to view it!
          </p>
        </div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

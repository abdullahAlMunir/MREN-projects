import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductByBrand from './pages/ProductByBrand';
import ProductByKeyword from './pages/ProductByKeyword';
import ProductByCategory from './pages/ProductByCategory';
import ProductdetailsPage from './pages/ProductDetailsPage';
import AboutPage from './pages/AboutPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import HowToBuyPage from './pages/HowToBuyPage';
import ContactPage from './pages/ContactPage';
import ComplainPage from './pages/ComplainPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import VerifyRegistration from './pages/VerifyRegistration';
import ProfilePage from './pages/ProfilePage';
import WishPage from './pages/WishPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import InvoicePage from './pages/InvoicePage';

const AppContent = () => {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/byBrand/:id' element={<ProductByBrand />}></Route>
        <Route path='/byCategory/:id' element={<ProductByCategory />}></Route>
        <Route path='/byKeyword/:Keyword' element={<ProductByKeyword />}></Route>
        <Route path='/details/:id' element={<ProductdetailsPage />}></Route>

        <Route path='/about' element={<AboutPage />}></Route>
        <Route path='/refund' element={<RefundPolicyPage />}></Route>
        <Route path='/privacy' element={<PrivacyPolicyPage />}></Route>
        <Route path='/terms' element={<TermsPage />}></Route>
        <Route path='/howToBuy' element={<HowToBuyPage />}></Route>
        <Route path='/contact' element={<ContactPage />}></Route>
        <Route path='/complain' element={<ComplainPage />}></Route>

        <Route path='/register' element={<RegistrationPage />}></Route>
        
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/verifyRegistration' element={<VerifyRegistration />}></Route>
        <Route path='/Profile' element={<ProfilePage />}></Route>

        <Route path='/cartList' element={<CartPage />}></Route>
        <Route path='/wishList' element={<WishPage />}></Route>
        <Route path='/orders' element={<OrderPage />}></Route>
        <Route path='/invoice/:id' element={<InvoicePage />}></Route>
        <Route path='/admin/login' element={<InvoicePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  return (

    <AppContent />

  );
};

export default App;

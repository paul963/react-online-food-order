import { useState } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
import Products from './pages/Products';
import NotFound from './pages/404';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';

const routeDefinitions = createRoutesFromElements(
  <Route>
    <Route index element={<Home /> }/>
    <Route path='/:productCategory/:productLink' element={<Products /> }/>
    <Route path='*' element={<NotFound /> }/>
  </Route>
)

const router = createBrowserRouter(routeDefinitions);

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <RouterProvider router={router} />
        {/* <Meals /> */}
      </main>
    </CartProvider>
  );
}

export default App;

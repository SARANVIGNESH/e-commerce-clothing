// import React, { createContext, useState, useEffect, useContext } from 'react';
// import { AuthContext } from './AuthContext'; // Import AuthContext

// export const CartContext = createContext();

// const CartProvider = ({children}) => {
//   const { user } = useContext(AuthContext); // Access user data from AuthContext

//   const [cart, setCart] = useState([]);
//   const [itemAmount, setItemAmount] = useState(0);
//   const [total, setTotal] = useState(0);

//   // Load cart from localStorage when user is authenticated
//   useEffect(() => {
//     if (user) {
//       const storedCart = JSON.parse(localStorage.getItem(`cart_${user.uid}`)); // Load cart for the user
//       if (storedCart) {
//         setCart(storedCart);
//       }
//     } else {
//       setCart([]); // Clear cart if user is not logged in
//     }
//   }, [user]);

//   // Store cart in localStorage whenever cart changes and user is authenticated
//   useEffect(() => {
//     if (user) {
//       localStorage.setItem(`cart_${user.uid}`, JSON.stringify(cart)); // Store cart for the user
//     }
//   }, [cart, user]);

//   // Calculate the total price of items in the cart
//   useEffect(() => {
//     const total = cart.reduce((accumulator, currentItem) => {
//       return accumulator + currentItem.price * currentItem.amount;
//     }, 0);
//     setTotal(total);
//   }, [cart]);

//   // Calculate the total number of items in the cart
//   useEffect(() => {
//     if (cart) {
//       const amount = cart.reduce((accumulator, currentItem) => {
//         return accumulator + currentItem.amount;
//       }, 0);
//       setItemAmount(amount);
//     }
//   }, [cart]);

//   const addToCart = (product, id) => {
//     const newItem = { ...product, amount: 1 };
//     const cartItem = cart.find(item => item.id === id);

//     if (cartItem) {
//       const newCart = [...cart].map((item) => {
//         if (item.id === id) {
//           return { ...item, amount: cartItem.amount + 1 };
//         } else {
//           return item;
//         }
//       });
//       setCart(newCart);
//     } else {
//       setCart([...cart, newItem]);
//     }
//   };

//   const removeFromCart = (id) => {
//     const newCart = cart.filter(item => item.id !== id);
//     setCart(newCart);
//   };

//   const clearCart = () => {
//     setCart([]);
//   };

//   const increaseAmount = (id) => {
//     const cartItem = cart.find((item) => item.id === id);
//     addToCart(cartItem, id);
//   };

//   const decreaseAmount = (id) => {
//     const cartItem = cart.find((item) => item.id === id);
//     if (cartItem) {
//       const newCart = cart.map((item) => {
//         if (item.id === id) {
//           return { ...item, amount: cartItem.amount - 1 };
//         } else {
//           return item;
//         }
//       });
//       setCart(newCart);
//     }
//     if (cartItem.amount < 2) {
//       removeFromCart(id);
//     }
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, increaseAmount, decreaseAmount, itemAmount, total }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export default CartProvider;


import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext'; // Import AuthContext
import Snackbar from '@mui/material/Snackbar'; // Import Snackbar
import Alert from '@mui/material/Alert'; // Import Alert

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext); // Access user data from AuthContext

  const [cart, setCart] = useState([]);
  const [itemAmount, setItemAmount] = useState(0);
  const [total, setTotal] = useState(0);

  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar open/close
  const [snackbarMessage, setSnackbarMessage] = useState(''); // State for Snackbar message

  // Load cart from localStorage when user is authenticated
  useEffect(() => {
    if (user) {
      const storedCart = JSON.parse(localStorage.getItem(`cart_${user.uid}`)); // Load cart for the user
      if (storedCart) {
        setCart(storedCart);
      }
    } else {
      setCart([]); // Clear cart if user is not logged in
    }
  }, [user]);

  // Store cart in localStorage whenever cart changes and user is authenticated
  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.uid}`, JSON.stringify(cart)); // Store cart for the user
    }
  }, [cart, user]);

  // Calculate the total price of items in the cart
  useEffect(() => {
    const total = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.amount;
    }, 0);
    setTotal(total);
  }, [cart]);

  // Calculate the total number of items in the cart
  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0);
      setItemAmount(amount);
    }
  }, [cart]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const addToCart = (product, id) => {
    const newItem = { ...product, amount: 1 };
    const cartItem = cart.find(item => item.id === id);

    if (cartItem) {
      const newCart = [...cart].map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount + 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }

    // Show success message in Snackbar
    setSnackbarMessage(`Item added to cart!`);
    setSnackbarOpen(true);
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const increaseAmount = (id) => {
    const cartItem = cart.find((item) => item.id === id);
    addToCart(cartItem, id);
  };

  const decreaseAmount = (id) => {
    const cartItem = cart.find((item) => item.id === id);
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount - 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    }
    if (cartItem.amount < 2) {
      removeFromCart(id);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, increaseAmount, decreaseAmount, itemAmount, total }}>
      {children}

      {/* Snackbar for success message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </CartContext.Provider>
  );
};

export default CartProvider;
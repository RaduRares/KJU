// reducer.js
export const initialState = {
    basket: [],
  };
  
  export const getBasketTotal = (basket) => 
    basket?.reduce((amount, item) => item.price * item.quantity + amount, 0);
    const basketReducer = (state, action) => {
      switch (action.type) {
        case 'ADD_TO_BASKET': {
          // Check if the item is already in the basket
          const index = state.basket.findIndex(
            (basketItem) => basketItem.id === action.item.id
          );
    
          let newBasket = [...state.basket];
          
          if (index >= 0) {
            // Item exists in basket, update the quantity
            newBasket[index].quantity += action.item.quantity;
          } else {
            // Item is new, set quantity to action.item.quantity
            newBasket.push(action.item);
          }
          
          return {
            ...state,
            basket: newBasket,
          };
        }
    
        case 'REMOVE_FROM_BASKET': {
          // Logic to remove the item from the basket
          const newBasket = state.basket.filter((item) => item.id !== action.id);
          return {
            ...state,
            basket: newBasket,
          };
        }
    
        case 'INCREMENT_QUANTITY': {
          // Logic to increment the quantity of the item
          const newBasket = state.basket.map((item) => {
            if (item.id === action.id) {
              return { ...item, quantity: item.quantity + 1 }; // Add 1 to the quantity
            } else {
              return item;
            }
          });
          return {
            ...state,
            basket: newBasket,
          };
        }
    
        // ... handle other actions
      
        default:
          return state;
      }
    };
    

    
  
  export default basketReducer;
  
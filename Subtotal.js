import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";

function Subtotal() {
    // Destructure basket from global state
    const [{ basket }, dispatch] = useStateValue();

    // Calculate the total number of items, accounting for quantities
    const totalItems = basket.reduce((total, item) => total + (item.quantity || 1), 0);

    return (
        <div className="subtotal"> 
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            {/* Display the total number of items */}
                            Subtotal ({totalItems} items): <strong>{value}</strong>  
                        </p>
                    </>
                )}
                decimalScale={2}
                // Calculate the total cost of the basket
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"RON "}
            />
            <button>Proceed to Checkout</button>
        </div>
    );
}

export default Subtotal;

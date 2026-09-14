import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/formatCurrency";
import {
  calculateDeliveryFee,
  getDeliveryTime,
} from "../utils/delivery";

export default function Cart() {
  const {
    items,
    dispatch,
    subtotal,
  } = useCart();

  if (items.length === 0) {
    return (
      <main className="page">
        <div className="container empty-state">

          <div className="empty-icon">🛒</div>

          <h1>Your cart is empty</h1>

          <p>
            Add some delicious food from our menu.
          </p>

          <Link to="/menu" className="btn">
            Browse Menu
          </Link>

        </div>
      </main>
    );
  }

  const deliveryFee = calculateDeliveryFee("Bole");
  const total = subtotal + deliveryFee;

  return (
    <main className="page">
      <div className="container">

        <div className="page-heading compact">
          <span className="eyebrow">YOUR ORDER</span>
          <h1>Shopping Cart</h1>
        </div>

        <div className="cart-layout">

          <section className="cart-items">

            {items.map((item) => (
              <article
                className="cart-item"
                key={item.id}
              >

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="cart-item-info">
                  <h3>{item.name}</h3>

                  <p>
                    {formatCurrency(item.price)}
                  </p>

                  <div className="quantity-control">

                    <button
                      onClick={() =>
                        dispatch({
                          type: "DECREASE",
                          payload: item.id,
                        })
                      }
                      aria-label={`Decrease ${item.name}`}
                    >
                      −
                    </button>

                    <strong>{item.quantity}</strong>

                    <button
                      onClick={() =>
                        dispatch({
                          type: "INCREASE",
                          payload: item.id,
                        })
                      }
                      aria-label={`Increase ${item.name}`}
                    >
                      +
                    </button>

                  </div>
                </div>

                <div className="cart-item-right">

                  <strong>
                    {formatCurrency(
                      item.price * item.quantity
                    )}
                  </strong>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE",
                        payload: item.id,
                      })
                    }
                  >
                    Remove
                  </button>

                </div>

              </article>
            ))}

            <button
              className="clear-cart"
              onClick={() =>
                dispatch({ type: "CLEAR" })
              }
            >
              Clear cart
            </button>

          </section>

          <aside className="cart-summary">

            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <strong>
                {formatCurrency(subtotal)}
              </strong>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <strong>
                {formatCurrency(deliveryFee)}
              </strong>
            </div>

            <div className="summary-row">
              <span>Estimated time</span>
              <strong>
                {getDeliveryTime("Bole")}
              </strong>
            </div>

            <hr />

            <div className="summary-total">
              <span>Total</span>
              <strong>
                {formatCurrency(total)}
              </strong>
            </div>

            <Link
              to="/checkout"
              className="btn checkout-btn"
            >
              Proceed to Checkout →
            </Link>

          </aside>

        </div>

      </div>
    </main>
  );
}
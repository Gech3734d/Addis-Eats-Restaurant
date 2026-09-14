import { useState } from "react";
import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/formatCurrency";

export default function Orders() {
  const { dispatch } = useCart();

  const [orders] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("addis-eats-orders")
      ) || [];
    } catch {
      return [];
    }
  });

  function reorder(order) {
    order.items.forEach((item) => {
      dispatch({
        type: "ADD_TO_CART",
        payload: item,
      });
    });
  }

  if (orders.length === 0) {
    return (
      <main className="page">
        <div className="container empty-state">

          <div className="empty-icon">📋</div>

          <h1>No orders yet</h1>

          <p>
            Your completed orders will appear here.
          </p>

          <Link to="/menu" className="btn">
            Order Something Delicious
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="container">

        <div className="page-heading compact">
          <span className="eyebrow">
            ORDER HISTORY
          </span>

          <h1>📋 My Orders</h1>

          <p>
            View your previous orders and reorder
            your favorites quickly.
          </p>
        </div>

        <div className="orders-list">

          {orders.map((order) => (
            <article
              className="order-card"
              key={order.id}
            >

              <div className="order-header">
                <div>
                  <span className="order-label">
                    ORDER
                  </span>

                  <h3>{order.id}</h3>
                </div>

                <span className="order-status">
                  ✓ Completed
                </span>
              </div>

              <div className="order-date">
                {new Date(order.date).toLocaleString(
                  "en-US",
                  {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }
                )}
              </div>

              <div className="order-info-grid">

                <div>
                  <span>👤 Customer</span>
                  <strong>
                    {order.customer?.name}
                  </strong>
                </div>

                <div>
                  <span>📞 Phone</span>
                  <strong>
                    {order.customer?.phone}
                  </strong>
                </div>

                <div>
                  <span>📍 Area</span>
                  <strong>
                    {order.area}
                  </strong>
                </div>

                <div>
                  <span>🚚 Delivery</span>
                  <strong>
                    {order.deliveryTime}
                  </strong>
                </div>

              </div>

              <div className="order-items">

                <h4>Items</h4>

                {order.items.map((item) => (
                  <div
                    className="order-item"
                    key={item.id}
                  >

                    <div>
                      <strong>
                        {item.name}
                      </strong>

                      <span>
                        × {item.quantity}
                      </span>
                    </div>

                    <strong>
                      {formatCurrency(
                        item.price *
                          item.quantity
                      )}
                    </strong>

                  </div>
                ))}

              </div>

              {order.instructions && (
                <div className="order-note">
                  <strong>
                    📝 Special Instructions
                  </strong>

                  <p>
                    {order.instructions}
                  </p>
                </div>
              )}

              <div className="order-footer">

                <div>
                  <span>Total</span>

                  <strong>
                    {formatCurrency(order.total)}
                  </strong>
                </div>

                <button
                  className="btn"
                  onClick={() =>
                    reorder(order)
                  }
                >
                  🔄 Reorder
                </button>

              </div>

            </article>
          ))}

        </div>

      </div>
    </main>
  );
}
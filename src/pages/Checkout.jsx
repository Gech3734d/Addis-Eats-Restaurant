import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

import { formatCurrency } from "../utils/formatCurrency";
import {
  calculateDeliveryFee,
  getDeliveryTime,
} from "../utils/delivery";

const PHONE_REGEX = /^(09\d{8}|\+2519\d{8})$/;

const areas = [
  "Bole",
  "Kazanchis",
  "Piassa",
  "CMC",
  "Saris",
];

export default function Checkout() {
  const { user, login } = useAuth();
  const { items, subtotal, dispatch } = useCart();

  const [signedName, setSignedName] = useState("");
  const [signedPhone, setSignedPhone] = useState("");
  const [signInError, setSignInError] = useState("");

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    area: "",
    instructions: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // -----------------------------
  // SIGN IN
  // -----------------------------
  function handleSignIn(event) {
    event.preventDefault();

    if (!signedName.trim()) {
      setSignInError("Please enter your name.");
      return;
    }

    if (!PHONE_REGEX.test(signedPhone.trim())) {
      setSignInError(
        "Enter a valid Ethiopian phone number."
      );
      return;
    }

    login(
      signedName.trim(),
      signedPhone.trim()
    );

    setForm((current) => ({
      ...current,
      name: signedName.trim(),
      phone: signedPhone.trim(),
    }));

    setSignInError("");
  }

  // -----------------------------
  // FORM CHANGE
  // -----------------------------
  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  }

  // -----------------------------
  // VALIDATION
  // -----------------------------
  function validate() {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!PHONE_REGEX.test(form.phone.trim())) {
      newErrors.phone =
        "Use 09XXXXXXXX or +2519XXXXXXXX.";
    }

    if (!form.area) {
      newErrors.area =
        "Please select your delivery area.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  // -----------------------------
  // SUBMIT ORDER
  // -----------------------------
  function handleSubmit(event) {
    event.preventDefault();

    if (!validate()) return;

    const deliveryFee = calculateDeliveryFee(form.area);

    const order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),

      customer: {
        name: form.name.trim(),
        phone: form.phone.trim(),
      },

      area: form.area,

      instructions: form.instructions.trim(),

      items: items.map((item) => ({
        ...item,
      })),

      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,

      deliveryTime: getDeliveryTime(form.area),
    };

    const previousOrders = JSON.parse(
      localStorage.getItem("addis-eats-orders") || "[]"
    );

    localStorage.setItem(
      "addis-eats-orders",
      JSON.stringify([
        order,
        ...previousOrders,
      ])
    );

    dispatch({ type: "CLEAR" });

    setSubmitted(true);
  }

  // -----------------------------
  // EMPTY CART
  // -----------------------------
  if (!items.length && !submitted) {
    return (
      <main className="page">
        <div className="container empty-state">
          <div className="empty-icon">🛒</div>

          <h1>Your cart is empty</h1>

          <p>
            Add dishes before going to checkout.
          </p>

          <Link to="/menu" className="btn">
            Browse Menu
          </Link>
        </div>
      </main>
    );
  }

  // -----------------------------
  // ORDER SUCCESS
  // -----------------------------
  if (submitted) {
    return (
      <main className="page">
        <div className="container">
          <div className="success-card">
            <div className="success-icon">
              🎉
            </div>

            <h1>Order Confirmed!</h1>

            <p>
              Thank you for ordering from Addis Eats.
            </p>

            <p>
              Your order has been saved successfully.
            </p>

            <div className="success-actions">
              <Link
                to="/orders"
                className="btn"
              >
                View My Orders
              </Link>

              <Link
                to="/menu"
                className="btn btn-secondary"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // -----------------------------
  // SIGN-IN SCREEN
  // -----------------------------
  if (!user) {
    return (
      <main className="page">
        <div className="container">
          <div className="auth-card">
            <div className="auth-icon">
              🔐
            </div>

            <h1>Sign in to Checkout</h1>

            <p>
              Enter your name and phone number
              to continue.
            </p>

            <form
              onSubmit={handleSignIn}
              className="checkout-form"
            >
              <label>
                Full Name

                <input
                  type="text"
                  value={signedName}
                  onChange={(e) =>
                    setSignedName(e.target.value)
                  }
                  placeholder="Your full name"
                  autoComplete="name"
                />
              </label>

              <label>
                Phone Number

                <input
                  type="tel"
                  value={signedPhone}
                  onChange={(e) =>
                    setSignedPhone(e.target.value)
                  }
                  placeholder="09XXXXXXXX"
                  autoComplete="tel"
                />
              </label>

              {signInError && (
                <p className="form-error">
                  {signInError}
                </p>
              )}

              <button
                type="submit"
                className="btn"
              >
                Sign In & Continue
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  // -----------------------------
  // CHECKOUT
  // -----------------------------
  const deliveryFee = calculateDeliveryFee(
    form.area
  );

  const total = subtotal + deliveryFee;

  return (
    <main className="page">
      <div className="container">
        <div className="page-heading compact">
          <span className="eyebrow">
            CHECKOUT
          </span>

          <h1>Complete Your Order</h1>

          <p>
            Almost there! Enter your delivery
            information.
          </p>
        </div>

        <div className="checkout-layout">
          {/* FORM */}
          <form
            className="checkout-form"
            onSubmit={handleSubmit}
          >
            <div className="form-section">
              <h2>👤 Customer Information</h2>

              <label>
                Full Name

                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                />

                {errors.name && (
                  <span className="form-error">
                    {errors.name}
                  </span>
                )}
              </label>

              <label>
                Phone Number

                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="09XXXXXXXX"
                />

                {errors.phone && (
                  <span className="form-error">
                    {errors.phone}
                  </span>
                )}
              </label>
            </div>

            <div className="form-section">
              <h2>📍 Delivery Information</h2>

              <label>
                Delivery Area

                <select
                  name="area"
                  value={form.area}
                  onChange={handleChange}
                >
                  <option value="">
                    Select your area
                  </option>

                  {areas.map((area) => (
                    <option
                      key={area}
                      value={area}
                    >
                      {area}
                    </option>
                  ))}
                </select>

                {errors.area && (
                  <span className="form-error">
                    {errors.area}
                  </span>
                )}
              </label>

              <label>
                Special Instructions
                <span className="optional">
                  Optional
                </span>

                <textarea
                  name="instructions"
                  value={form.instructions}
                  onChange={handleChange}
                  placeholder="Example: Please call when you arrive..."
                  rows="4"
                />
              </label>
            </div>

            <button
              type="submit"
              className="btn checkout-submit"
            >
              Place Order • {formatCurrency(total)}
            </button>
          </form>

          {/* SUMMARY */}
          <aside className="checkout-summary">
            <h2>Order Summary</h2>

            {items.map((item) => (
              <div
                className="checkout-item"
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
                    item.price * item.quantity
                  )}
                </strong>
              </div>
            ))}

            <hr />

            <div className="summary-row">
              <span>Subtotal</span>

              <strong>
                {formatCurrency(subtotal)}
              </strong>
            </div>

            <div className="summary-row">
              <span>Delivery</span>

              <strong>
                {form.area
                  ? formatCurrency(deliveryFee)
                  : "Select area"}
              </strong>
            </div>

            {form.area && (
              <div className="delivery-info">
                🚚 Estimated delivery:
                <strong>
                  {getDeliveryTime(form.area)}
                </strong>
              </div>
            )}

            <div className="summary-total">
              <span>Total</span>

              <strong>
                {formatCurrency(total)}
              </strong>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
import React, { useState } from "react";

const products = [
  { id: 1, name: "Laptop", price: 1000, img: "https://via.placeholder.com/150" },
  { id: 2, name: "Phone", price: 600, img: "https://via.placeholder.com/150" },
  { id: 3, name: "Headphones", price: 120, img: "https://via.placeholder.com/150" },
];

// Main App Component
export default function App() {
  const [page, setPage] = useState("login"); // login, register, catalog, cart
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ email: "", password: "" });
  const [cart, setCart] = useState([]);

  // Mock registration/login - not secure!
  function handleAuthSubmit(e) {
    e.preventDefault();
    setUser(form.email);
    setForm({ email: "", password: "" });
    setPage("catalog");
  }

  function addToCart(product) {
    setCart((cart) => {
      const found = cart.find((item) => item.id === product.id);
      return found
        ? cart.map((item) =>
            item.id === product.id
              ? { ...item, qty: item.qty + 1 }
              : item
          )
        : [...cart, { ...product, qty: 1 }];
    });
  }

  function removeFromCart(product) {
    setCart((cart) =>
      cart
        .map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  }

  function logout() {
    setUser(null);
    setCart([]);
    setPage("login");
  }

  // Pages
  return (
    <div>
      <style>{`
body {
  font-family: Arial, sans-serif;
  background: #fafafa;
}
.navbar {
  display: flex;
  justify-content: space-around;
  background: #333;
  padding: 1em;
  margin-bottom: 2em;
}
.navbar a, .navbar button {
  color: white;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1em;
}
.form {
  max-width: 400px;
  margin: 2em auto;
  padding: 2em;
  background: white;
  display: grid;
  gap: 1em;
  border-radius: 10px;
}
.catalog {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2em;
  padding: 2em;
}
.product-card {
  background: white;
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 1px 8px #ccc;
}
.product-card img {
  width: 100px;
  margin-bottom: 1em;
}
.cart {
  max-width: 600px;
  margin: 2em auto;
  background: white;
  padding: 2em;
  border-radius: 10px;
}
.cart-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
}
@media (max-width: 600px) {
  .catalog {
    grid-template-columns: 1fr;
    padding: 1em;
  }
  .form, .cart {
    padding: 1em;
  }
}
      `}</style>
      <nav className="navbar">
        <button onClick={() => setPage("catalog")}>Catalog</button>
        <button onClick={() => setPage("cart")}>Cart ({cart.reduce((a, c) => a + c.qty, 0)})</button>
        {!user ? (
          <>
            <button onClick={() => setPage("login")}>Login</button>
            <button onClick={() => setPage("register")}>Register</button>
          </>
        ) : (
          <span>
            {user} | <button onClick={logout}>Logout</button>
          </span>
        )}
      </nav>

      {page === "register" && (
        <form className="form" onSubmit={handleAuthSubmit}>
          <h2>Register</h2>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm((f) => ({ ...f, email: e.target.value }))
            }
            placeholder="Email"
            required
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm((f) => ({ ...f, password: e.target.value }))
            }
            placeholder="Password"
            required
          />
          <button type="submit">Register</button>
        </form>
      )}

      {page === "login" && (
        <form className="form" onSubmit={handleAuthSubmit}>
          <h2>Login</h2>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm((f) => ({ ...f, email: e.target.value }))
            }
            placeholder="Email"
            required
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm((f) => ({ ...f, password: e.target.value }))
            }
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
      )}

      {page === "catalog" && (
        <div className="catalog">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.img} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      )}

      {page === "cart" && (
        <div className="cart">
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <p>Cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <span>
                  {item.name} x {item.qty}
                </span>
                <span>${item.price * item.qty}</span>
                <button onClick={() => removeFromCart(item)}>Remove</button>
              </div>
            ))
          )}
          <hr />
          <p>
            <strong>Total:</strong> $
            {cart.reduce((a, c) => a + c.price * c.qty, 0)}
          </p>
        </div>
      )}
    </div>
  );
}

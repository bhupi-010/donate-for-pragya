import { useState } from "react";
import "./App.css";

function App() {
  const [amount, setAmount] = useState("");
  const [donated, setDonated] = useState(false);

  const handleDonate = () => {
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    setDonated(true);
  };

  return (
    <div className="container">
      <div className={`donation-card ${donated ? "success-mode" : ""}`}>
        {!donated ? (
          <>
            <h1 className="title">Donate for Pragya</h1>
            <p className="subtitle">
              Every contribution brings hope and support 💛
            </p>

            {/* Amount Field */}
            <div className="amount-field">
              <span className="currency">NPR</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
              {/* <label>Enter Donation Amount</label> */}
            </div>

            {/* Suggested amounts */}
            <div className="amount-grid">
              {[100, 500, 1000, 2000].map((value) => (
                <button
                  key={value}
                  className={`amount-card ${
                    amount == value ? "active" : ""
                  }`}
                  onClick={() => setAmount(value)}
                >
                  NPR {value}
                </button>
              ))}
            </div>

            <button className="donate-btn" onClick={handleDonate}>
              Continue to Donate
            </button>
          </>
        ) : (
          <div className="success-container">
            <div className="checkmark">
              <span>✓</span>
            </div>

            <h2 className="success-title">Donation Successful</h2>
            <p className="success-text">
              Thank you for donating <strong>NPR {amount}</strong>
            </p>

            <button
              className="donate-btn"
              onClick={() => {
                setAmount("");
                setDonated(false);
              }}
            >
              Donate Again
            </button>

            <div className="confetti">
              {[...Array(25)].map((_, i) => (
                <span key={i}></span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

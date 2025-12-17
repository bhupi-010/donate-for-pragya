import { useState, useEffect } from "react";
import { db } from "./firebase";
import { ref, get, runTransaction, set } from "firebase/database";
import "./App.css";

function App() {
  const [amount, setAmount] = useState("");
  const [donated, setDonated] = useState(false);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");
  const MAX_AMOUNT = 100;
  const TARGET_AMOUNT = 1000; // Target donation

  // Fetch total donations on load
  useEffect(() => {
    const totalRef = ref(db, "totalDonated");
    get(totalRef).then((snapshot) => {
      if (snapshot.exists()) setTotal(snapshot.val());
    });
  }, []);

  const handleDonate = () => {
    const numAmount = Number(amount);

    // Basic validation
    if (!numAmount || numAmount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (numAmount > MAX_AMOUNT) {
      setError(`Maximum donation amount is NPR ${MAX_AMOUNT}`);
      return;
    }

    // Check if donation would exceed target
    if (total + numAmount > TARGET_AMOUNT) {
      setError(
        `Cannot donate NPR ${numAmount}. Only NPR ${
          TARGET_AMOUNT - total
        } needed to reach the target`
      );
      return;
    }

    const totalRef = ref(db, "totalDonated");
    runTransaction(totalRef, (current) => (current || 0) + numAmount).then(
      () => {
        setDonated(true);
        setTotal((prev) => prev + numAmount);
        setError("");
      }
    );
  };

  const handleAmountChange = (value) => {
    setAmount(value);
    setError(""); // Clear error on input change
  };

  const handleResetCampaign = () => {
    const totalRef = ref(db, "totalDonated");
    set(totalRef, 0).then(() => {
      setTotal(0);
      setDonated(false);
      setAmount("");
      setError("");
    });
  };

  const targetReached = total >= TARGET_AMOUNT;

  return (
    <div className="container">
      {targetReached ? (
        <div className="target-celebration">
          <h1 className="celebration-title">🎉 Congratulations! 🎉</h1>
          <p className="celebration-text">
            We reached our donation target of{" "}
            <strong>NPR {TARGET_AMOUNT}</strong>!
          </p>
          <p className="celebration-text">
            Total donations collected: <strong>NPR {total}</strong>
          </p>

          <button
            className="donate-btn reset-btn"
            onClick={handleResetCampaign}
          >
            Reset Campaign
          </button>

          <div className="confetti-target">
            {[...Array(100)].map((_, i) => (
              <span key={i}></span>
            ))}
          </div>
        </div>
      ) : (
        <div className={`donation-card ${donated ? "success-mode" : ""}`}>
          {!donated ? (
            <>
              <h1 className="title">Donate for Pragya ❤️</h1>
              <p className="total-collected">
                Total donations collected: <strong>NPR {total}</strong>
              </p>
              <p className="target-amount">
                Target donation: <strong>NPR {TARGET_AMOUNT}</strong>
              </p>

              <div className="amount-field">
                <span className="currency">NPR</span>
                <input
                  type="number"
                  placeholder={`Enter amount (max ${MAX_AMOUNT})`}
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  required
                />
              </div>

              {/* Inline error message */}
              {error && <p className="error-message">{error}</p>}

              <div className="amount-grid">
                {[10, 20, 50, 100].map((value) => (
                  <button
                    key={value}
                    className={`amount-card ${amount == value ? "active" : ""}`}
                    onClick={() => handleAmountChange(value)}
                  >
                    NPR {value}
                  </button>
                ))}
              </div>

              <button className="donate-btn" onClick={handleDonate}>
                Donate Now
              </button>
            </>
          ) : (
            <div className="success-container">
              <div className="checkmark">
                <span>✓</span>
              </div>

              <h2 className="success-title">Donation Successful</h2>
              <p className="success-text">
                You donated <strong>NPR {amount}</strong>.
              </p>
              <p className="success-text">
                Total donations collected: <strong>NPR {total}</strong>
              </p>

              <button
                className="donate-btn"
                onClick={() => {
                  setAmount("");
                  setDonated(false);
                  setError("");
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
      )}
    </div>
  );
}

export default App;

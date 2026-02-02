import { useState, useMemo, useEffect } from "react";
import "./CreditCardForm.css";

const CreditCardForm = ({
  defaultNumber = "",
  defaultHolder = "",
  defaultMonth = "",
  defaultYear = "",
  defaultCVV = "",
  maskMiddle = true,
  ring1 = "#ff6be7",
  ring2 = "#7288ff",
  showSubmit = true,
  onChange,
  onSubmit,
  className = "",
}) => {
  const [number, setNumber] = useState(clampDigits(defaultNumber, 19));
  const [holder, setHolder] = useState(defaultHolder.toUpperCase());
  const [month, setMonth] = useState(defaultMonth);
  const [year, setYear] = useState(defaultYear);
  const [cvv, setCVV] = useState(clampDigits(defaultCVV, 4));
  const [focusField, setFocusField] = useState(null);

  const flip = focusField === "cvv";
  const years = useMemo(() => {
    const start = new Date().getFullYear();
    return Array.from({ length: 10 }, (_, i) => String(start + i));
  }, []);

  function formatNumberSpaces(num) {
    return num.replace(/\s+/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");
  }

  function clampDigits(value, maxLen) {
    return value.replace(/\D/g, "").slice(0, maxLen);
  }

  // Validation
  const validity = useMemo(() => {
    const nValidLength = number.length >= 13;
    const numberValid = nValidLength;
    const holderValid = holder.trim().length >= 2;
    const monthValid = !!month && +month >= 1 && +month <= 12;
    const yearValid = !!year && +year >= new Date().getFullYear();
    const cvvValid = /^\d{3,4}$/.test(cvv);
    return {
      number: numberValid,
      holder: holderValid,
      month: monthValid,
      year: yearValid,
      cvv: cvvValid,
      allValid:
        numberValid && holderValid && monthValid && yearValid && cvvValid,
    };
  }, [number, holder, month, year, cvv]);

  // Notify parent on change
  useEffect(() => {
    onChange?.({ number, holder, month, year, cvv }, validity);
  }, [number, holder, month, year, cvv, validity, onChange]);

  const displayDigits = useMemo(() => number.slice(0, 16).split(""), [number]);

  const displayedSlots = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 16; i++) {
      let content = "#";
      if (i < displayDigits.length) {
        const d = displayDigits[i];
        const shouldMask = maskMiddle && i >= 4 && i <= 11;
        content = shouldMask ? "*" : d;
      }
      arr.push({ textTop: content, filed: i < displayDigits.length });
    }
    return arr;
  }, [displayDigits, maskMiddle]);

  const highlightClass = (() => {
    switch (focusField) {
      case "number":
        return "highlight__number";
      case "holder":
        return "highlight__holder";
      case "expire":
        return "highlight__expire";
      case "cvv":
        return "highlight__cvv";
      default:
        return "hidden";
    }
  })();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({ number, holder, month, year, cvv }, validity);
  };

  return (
    <section className={`ccp ${className}`}>
      <div className="wrap">
        {/* CARD */}
        <section id="card" className={`card ${flip ? "flip" : ""}`}>
          <div id="highlight" className={highlightClass} />

          {/* FRONT */}
          <section
            className="card__front"
            style={{ "--ring1": ring1, "--ring2": ring2 }}
          >
            <div className="card__header">
              <div className="text-xl font-bold">CreditCard</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40"
                width="60"
                viewBox="-96 -98.908 832 593.448"
              >
                <path
                  fill="#ff5f00"
                  d="M224.833 42.298h190.416v311.005H224.833z"
                />
                <path
                  d="M244.446 197.828a197.448 197.448 0 0175.54-155.475 197.777 197.777 0 100 311.004 197.448 197.448 0 01-75.54-155.53z"
                  fill="#eb001b"
                />
                <path
                  d="M621.101 320.394v-6.372h2.747v-1.319h-6.537v1.319h2.582v6.373zm12.691 0v-7.69h-1.978l-2.307 5.493-2.308-5.494h-1.977v7.691h1.428v-5.823l2.143 5h1.483l2.143-5v5.823z"
                  fill="#f79e1b"
                />
                <path
                  d="M640 197.828a197.777 197.777 0 01-320.015 155.474 197.777 197.777 0 000-311.004A197.777 197.777 0 01640 197.773z"
                  fill="#f79e1b"
                />
              </svg>
            </div>

            {/* Number slots with slide animation */}
            <div
              id="card_number"
              className="card__number"
              aria-label="Card number"
            >
              {displayedSlots.map((slot, idx) => (
                <span key={idx} className="slot">
                  <span className={`digit ${slot.filed ? "filed" : ""}`}>
                    <span className="row placeholder">#</span>
                    <span className="row value">{slot.textTop}</span>
                  </span>
                </span>
              ))}
            </div>

            <div className="card__footer">
              <div className="card__holder">
                <div className="card__section__title">Card Holder</div>
                <div id="card_holder" className="font-mono tracking-wider">
                  {holder || "NAME ON CARD"}
                </div>
              </div>
              <div className="card__expires">
                <div className="card__section__title">Expires</div>
                <div className="font-mono">
                  <span id="card_expires_month">{month || "MM"}</span>/
                  <span id="card_expires_year">
                    {year ? year.slice(-2) : "YY"}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* BACK */}
          <section
            className="card__back"
            style={{ "--ring1": ring1, "--ring2": ring2 }}
          >
            <div className="card__hide_line" />
            <div className="card_cvv">
              <span>CVV</span>
              <div id="card_cvv_field" className="card_cvv_field">
                {"*".repeat(cvv.length)}
              </div>
            </div>
          </section>
        </section>

        {/* FORM */}
        <form className="form" onSubmit={handleSubmit} noValidate>
          <div className="space-y-1">
            <label
              htmlFor="number"
              className="text-sm font-medium text-gray-700"
            >
              Card Number
            </label>
            <input
              id="number"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="1234 5678 9012 3456"
              value={formatNumberSpaces(number)}
              onChange={(e) => setNumber(clampDigits(e.target.value, 19))}
              onFocus={() => setFocusField("number")}
              onBlur={() => setFocusField(null)}
              aria-invalid={!validity.number}
            />
            {!validity.number && number.length >= 13 && (
              <small className="err text-red-500 text-xs mt-1">
                Card number looks invalid
              </small>
            )}
          </div>

          <div className="space-y-1">
            <label
              htmlFor="holder"
              className="text-sm font-medium text-gray-700"
            >
              Card Holder
            </label>
            <input
              id="holder"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              type="text"
              autoComplete="cc-name"
              placeholder="JANE DOE"
              value={holder}
              onChange={(e) => setHolder(e.target.value.toUpperCase())}
              onFocus={() => setFocusField("holder")}
              onBlur={() => setFocusField(null)}
              aria-invalid={!validity.holder}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Expiration Date
              </label>
              <div className="flex gap-2">
                <select
                  id="expiration_month"
                  className="w-full px-2 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-white"
                  value={month || ""}
                  onChange={(e) => setMonth(e.target.value)}
                  onFocus={() => setFocusField("expire")}
                  onBlur={() => setFocusField(null)}
                  aria-invalid={!validity.month}
                >
                  <option value="" disabled>
                    MM
                  </option>
                  {Array.from({ length: 12 }, (_, i) =>
                    String(i + 1).padStart(2, "0"),
                  ).map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <select
                  id="expiration_year"
                  className="w-full px-2 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-white"
                  value={year || ""}
                  onChange={(e) => setYear(e.target.value)}
                  onFocus={() => setFocusField("expire")}
                  onBlur={() => setFocusField(null)}
                  aria-invalid={!validity.year}
                >
                  <option value="" disabled>
                    YY
                  </option>
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y.slice(-2)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="cvv"
                className="text-sm font-medium text-gray-700"
              >
                CVV
              </label>
              <input
                id="cvv"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                inputMode="numeric"
                autoComplete="cc-csc"
                placeholder="***"
                value={cvv}
                onChange={(e) => setCVV(clampDigits(e.target.value, 4))}
                onFocus={() => setFocusField("cvv")}
                onBlur={() => setFocusField(null)}
                aria-invalid={!validity.cvv}
              />
            </div>
          </div>

          {showSubmit && (
            <button
              className={`w-full mt-4 py-3 rounded-lg font-bold transition-all ${
                validity.allValid
                  ? "bg-secondary text-white hover:bg-primary shadow-lg"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              type="submit"
              disabled={!validity.allValid}
            >
              {validity.allValid
                ? "Complete Registration"
                : "Fill all card details"}
            </button>
          )}
        </form>
      </div>
    </section>
  );
};

export default CreditCardForm;

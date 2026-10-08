import { useState } from "react";
import { Activity, ArrowRight, CheckCircle2, HeartPulse, RotateCcw, ShieldAlert, Sparkles } from "lucide-react";

const initialForm = {
  age: 55,
  education: 2,
  cigsPerDay: 10,
  totChol: 220,
  sysBP: 140,
  diaBP: 90,
  BMI: 28.5,
  heartRate: 75,
  glucose: 100,
  male: 1,
  currentSmoker: 1,
  BPMeds: 0,
  prevalentStroke: 0,
  prevalentHyp: 1,
  diabetes: 0,
};

const fields = [
  ["age", "Age", "years", "number"],
  ["education", "Education level", "1–4", "number"],
  ["cigsPerDay", "Cigarettes / day", "0–100", "number"],
  ["totChol", "Total cholesterol", "mg/dL", "number"],
  ["sysBP", "Systolic BP", "mmHg", "number"],
  ["diaBP", "Diastolic BP", "mmHg", "number"],
  ["BMI", "BMI", "kg/m²", "number"],
  ["heartRate", "Heart rate", "bpm", "number"],
  ["glucose", "Glucose", "mg/dL", "number"],
];

const yesNoFields = [
  ["male", "Sex", "Male"],
  ["currentSmoker", "Current smoker", "Yes"],
  ["BPMeds", "BP medication", "Yes"],
  ["prevalentStroke", "Previous stroke", "Yes"],
  ["prevalentHyp", "Hypertension", "Yes"],
  ["diabetes", "Diabetes", "Yes"],
];

function NumberField({ name, label, unit, value, onChange }) {
  return (
    <label className="field">
      <span>{label}</span>
      <div className="input-wrap">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          required
        />
        <small>{unit}</small>
      </div>
    </label>
  );
}

function ChoiceField({ name, label, value, onChange, positiveLabel }) {
  const negativeLabel = name === "male" ? "Female" : "No";
  return (
    <label className="field">
      <span>{label}</span>
      <select value={value} onChange={(e) => onChange(name, Number(e.target.value))}>
        <option value={0}>{negativeLabel}</option>
        <option value={1}>{positiveLabel}</option>
      </select>
    </label>
  );
}

function App() {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: ["age", "education", "cigsPerDay", "totChol", "sysBP", "diaBP", "BMI", "heartRate", "glucose"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Prediction failed.");
      }

      setResult(data);
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    } catch (err) {
      setError(
        `${err.message} Make sure the FastAPI backend is running and the model file is in backend/models/.`
      );
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setForm(initialForm);
    setResult(null);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app">
      <header className="nav">
        <div className="brand">
          <div className="brand-icon"><HeartPulse size={21} /></div>
          <div>
            <strong>CardioRisk</strong>
            <span>ML</span>
          </div>
        </div>
        <div className="nav-pill"><Activity size={15} /> 10-year CHD risk</div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={15} /> MACHINE LEARNING HEALTH DEMO</div>
            <h1>Understand your <em>cardiovascular risk.</em></h1>
            <p>
              Enter demographic, lifestyle and clinical risk factors to generate
              an ML-based 10-year coronary heart disease risk estimate.
            </p>
            <div className="hero-stats">
              <div><b>15</b><span>Risk factors</span></div>
              <div><b>LR</b><span>Tuned model</span></div>
              <div><b>0.55</b><span>Decision threshold</span></div>
            </div>
          </div>
          <div className="hero-art">
            <div className="pulse-ring"><HeartPulse size={72} strokeWidth={1.5} /></div>
            <div className="orb-card">
              <span>MODEL</span>
              <strong>Logistic Regression</strong>
              <small>Optimized for CHD detection</small>
            </div>
          </div>
        </section>

        <section className="form-shell">
          <form onSubmit={submit}>
            <div className="section-heading">
              <div className="section-number">01</div>
              <div>
                <h2>Patient profile</h2>
                <p>Basic demographic information</p>
              </div>
            </div>

            <div className="grid three">
              {fields.slice(0, 3).map(([name, label, unit]) => (
                <NumberField key={name} name={name} label={label} unit={unit} value={form[name]} onChange={update} />
              ))}
            </div>

            <div className="section-heading spaced">
              <div className="section-number">02</div>
              <div>
                <h2>Clinical measurements</h2>
                <p>Enter the latest available measurements</p>
              </div>
            </div>

            <div className="grid three">
              {fields.slice(3).map(([name, label, unit]) => (
                <NumberField key={name} name={name} label={label} unit={unit} value={form[name]} onChange={update} />
              ))}
            </div>

            <div className="section-heading spaced">
              <div className="section-number">03</div>
              <div>
                <h2>Medical & lifestyle history</h2>
                <p>Select the option that best matches the patient</p>
              </div>
            </div>

            <div className="grid three">
              {yesNoFields.map(([name, label, positiveLabel]) => (
                <ChoiceField key={name} name={name} label={label} value={form[name]} positiveLabel={positiveLabel} onChange={update} />
              ))}
            </div>

            {error && (
              <div className="error-box"><ShieldAlert size={19} /><span>{error}</span></div>
            )}

            <div className="form-footer">
              <p><span className="dot" /> All 15 inputs are used by the ML pipeline.</p>
              <button className="primary-btn" type="submit" disabled={loading}>
                {loading ? "Calculating..." : "Calculate risk"} <ArrowRight size={19} />
              </button>
            </div>
          </form>
        </section>

        {result && (
          <section className={`result ${result.prediction ? "higher" : "lower"}`}>
            <div className="result-top">
              <div>
                <div className="eyebrow">PREDICTION COMPLETE</div>
                <h2>10-year CHD risk estimate</h2>
              </div>
              <button className="reset-btn" onClick={reset}><RotateCcw size={16} /> New assessment</button>
            </div>

            <div className="result-grid">
              <div className="score-card">
                <div className="score-label">Predicted probability</div>
                <div className="score">{result.risk_percentage}<small>%</small></div>
                <div className="meter"><span style={{ width: `${Math.min(result.risk_percentage, 100)}%` }} /></div>
                <div className="threshold-note">Classification threshold: {result.threshold}</div>
              </div>

              <div className="decision-card">
                {result.prediction ? <ShieldAlert size={28} /> : <CheckCircle2 size={28} />}
                <span className="decision-label">ML classification</span>
                <h3>{result.risk_level}</h3>
                <p>
                  The tuned Logistic Regression model classified this input using
                  the optimized threshold selected from training-data OOF predictions.
                </p>
                <div className="model-tag">Tuned Logistic Regression</div>
              </div>
            </div>

            <div className="disclaimer">
              <strong>Academic project notice</strong>
              <span>This result is a machine-learning prediction for demonstration and research purposes. It is not a medical diagnosis and should not replace professional medical advice.</span>
            </div>
          </section>
        )}
      </main>

      <footer>
        <span>CardioRisk ML</span>
        <span>10-Year Cardiovascular Disease Risk Prediction</span>
      </footer>
    </div>
  );
}

export default App;

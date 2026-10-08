# CardioRisk ML

## Cardiovascular Disease Risk Prediction Using Machine Learning

CardioRisk ML is a machine learning project focused on predicting the **10-year risk of coronary heart disease (CHD)** using patient-level clinical and demographic features.

The project explores multiple machine learning approaches, including **Logistic Regression and XGBoost**, with an emphasis on handling class imbalance, model evaluation, threshold optimization, and model interpretability.

> **Note:** This project is intended for educational and research purposes only. Model predictions should not be considered medical diagnoses or a substitute for professional medical advice.

---

## 🎯 Objectives

The main objectives of CardioRisk ML are:

- Predict the likelihood of 10-year CHD risk.
- Compare linear and nonlinear machine learning models.
- Handle missing values using leakage-safe preprocessing.
- Address class imbalance in the target variable.
- Tune model hyperparameters using cross-validation.
- Optimize classification thresholds based on model performance.
- Evaluate models using appropriate classification metrics.
- Analyze feature importance to improve model interpretability.
- Build a foundation for deploying the trained model through a web application.

---

## 📊 Dataset

The project uses the **Framingham Cardiovascular Disease Dataset**.

The dataset contains patient-level demographic, behavioral, and clinical attributes.

### Features

| Feature | Description |
|---|---|
| `male` | Gender |
| `age` | Age of the patient |
| `education` | Education level |
| `currentSmoker` | Current smoking status |
| `cigsPerDay` | Cigarettes smoked per day |
| `BPMeds` | Blood pressure medication status |
| `prevalentStroke` | Previous stroke |
| `prevalentHyp` | Prevalent hypertension |
| `diabetes` | Diabetes status |
| `totChol` | Total cholesterol |
| `sysBP` | Systolic blood pressure |
| `diaBP` | Diastolic blood pressure |
| `BMI` | Body Mass Index |
| `heartRate` | Heart rate |
| `glucose` | Glucose level |

### Target

`TenYearCHD`

- `0` → No CHD event within 10 years
- `1` → CHD event within 10 years

The dataset contains **4,238 patient records and 16 columns**, including the target variable.

---

## 🧠 Machine Learning Pipeline

The project follows the following workflow:

```text
Dataset
   │
   ▼
Exploratory Data Analysis
   │
   ▼
Missing Value Analysis
   │
   ▼
Train/Test Split
   │
   ▼
Leakage-Safe Preprocessing
   │
   ├───────────────┐
   ▼               ▼
Logistic          Random Forest
Regression
   │               │
   └───────┬───────┘
           ▼
   Hyperparameter Tuning
           │
           ▼
   Model Evaluation
           │
           ▼
 Threshold Optimization
           │
           ▼
 Feature Importance
           │
           ▼
 Final Model Comparison

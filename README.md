# CardioRisk ML

## Cardiovascular Disease Risk Prediction Using Machine Learning

CardioRisk ML is a machine learning project focused on predicting the **10-year risk of coronary heart disease (CHD)** using patient-level clinical, demographic, and behavioral features.

The project explores **Logistic Regression and Random Forest** models, with emphasis on leakage-safe preprocessing, handling class imbalance, hyperparameter tuning, threshold optimization, model evaluation, and model interpretability.

> **Note:** This project is intended for educational and research purposes only. Model predictions should not be considered medical diagnoses or a substitute for professional medical advice.

---

## 🎯 Objectives

The main objectives of CardioRisk ML are:

- Predict the likelihood of a patient developing coronary heart disease within 10 years.
- Perform exploratory data analysis on the cardiovascular dataset.
- Identify and handle missing values.
- Apply leakage-safe preprocessing.
- Address class imbalance in the target variable.
- Train and compare Logistic Regression and Random Forest models.
- Tune model hyperparameters using cross-validation.
- Optimize classification thresholds based on model performance.
- Evaluate models using multiple classification metrics.
- Analyze feature importance to improve model interpretability.
- Provide a foundation for deploying the trained model through a web application.

---

## 📊 Dataset

The project uses the **Framingham Cardiovascular Disease Dataset**.

The dataset contains demographic, behavioral, and clinical information about patients and is used to predict whether a patient is likely to experience coronary heart disease within the next 10 years.

### Dataset Statistics

- **Number of patient records:** 4,238
- **Number of columns:** 16
- **Target variable:** `TenYearCHD`

### Input Features

| Feature | Description |
|---|---|
| `male` | Gender of the patient |
| `age` | Age of the patient |
| `education` | Education level |
| `currentSmoker` | Whether the patient currently smokes |
| `cigsPerDay` | Number of cigarettes smoked per day |
| `BPMeds` | Whether the patient takes blood pressure medication |
| `prevalentStroke` | Whether the patient has previously experienced a stroke |
| `prevalentHyp` | Whether the patient has hypertension |
| `diabetes` | Whether the patient has diabetes |
| `totChol` | Total cholesterol level |
| `sysBP` | Systolic blood pressure |
| `diaBP` | Diastolic blood pressure |
| `BMI` | Body Mass Index |
| `heartRate` | Heart rate |
| `glucose` | Blood glucose level |

### Target Variable

The target variable is:

`TenYearCHD`

| Value | Meaning |
|---|---|
| `0` | No CHD event within 10 years |
| `1` | CHD event within 10 years |

---

## 🧠 Machine Learning Pipeline

The project follows the following machine learning workflow:

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
                ┌──────┴──────┐
                ▼             ▼
        Logistic Regression  Random Forest
                │             │
                └──────┬──────┘
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
```

---

## 🔍 Exploratory Data Analysis

Exploratory Data Analysis (EDA) is performed to understand the structure and characteristics of the dataset.

The analysis includes:

- Dataset dimensions and structure.
- Data types.
- Missing value analysis.
- Distribution of numerical features.
- Distribution of categorical/binary features.
- Target variable distribution.
- Identification of potential class imbalance.
- Relationship between important features and the target variable.

EDA helps identify data-quality issues before model training.

---

## 🧹 Data Preprocessing

Data preprocessing is performed before training the machine learning models.

The preprocessing pipeline includes:

- Separating input features from the target variable.
- Splitting the dataset into training and testing sets.
- Handling missing values.
- Applying appropriate preprocessing to features.
- Preventing data leakage between training and testing data.

### Leakage-Safe Preprocessing

Preprocessing operations are fitted using the training data rather than the complete dataset.

This ensures that information from the test set does not influence the training process.

The workflow is:

```text
Complete Dataset
      │
      ▼
 Train/Test Split
      │
      ├───────────────┐
      ▼               ▼
 Training Data      Test Data
      │               │
      ▼               │
Fit Preprocessing    │
      │               │
      ▼               ▼
Transform Training  Transform Test
```

This provides a more reliable estimate of model performance.

---

## ⚖️ Class Imbalance

The target variable is not evenly distributed between the two classes.

In a cardiovascular risk prediction problem, incorrectly classifying a patient who is actually at risk can be particularly important.

Therefore, the project considers class imbalance during model development and evaluation rather than relying only on accuracy.

Metrics such as:

- Precision
- Recall
- F1-score
- ROC-AUC

are considered along with accuracy.

---

## 🤖 Machine Learning Models

### 1. Logistic Regression

Logistic Regression is used as a baseline classification model.

It estimates the probability that a patient belongs to the positive class:

```text
TenYearCHD = 1
```

Advantages include:

- Simple and interpretable.
- Efficient to train.
- Provides probability estimates.
- Useful as a baseline for comparison.

---

### 2. Random Forest

Random Forest is an ensemble learning algorithm consisting of multiple decision trees.

Each tree learns patterns from the training data, and the predictions from the trees are combined to produce the final prediction.

Random Forest can capture nonlinear relationships and interactions between patient features.

Advantages include:

- Handles nonlinear relationships.
- Captures feature interactions.
- Provides feature importance.
- Generally robust to different feature patterns.

---

## ⚙️ Hyperparameter Tuning

Hyperparameter tuning is performed to identify suitable model configurations.

The project uses **cross-validation** to evaluate different hyperparameter combinations.

The goal is to find a model configuration that provides good generalization to unseen data.

---

## 🎚️ Threshold Optimization

Binary classification models commonly use a default probability threshold to convert predicted probabilities into class predictions.

Instead of relying only on the default threshold, this project investigates different classification thresholds.

For example:

```text
Predicted Probability
        │
        ▼
   Classification
        │
   ┌────┴────┐
   ▼         ▼
Class 0    Class 1
```

Changing the threshold can affect:

- Precision
- Recall
- F1-score
- False positives
- False negatives

Threshold optimization is therefore used to identify a suitable operating point for the model.

---

## 📈 Model Evaluation

The models are evaluated using multiple classification metrics.

### Accuracy

Measures the proportion of predictions that are correct.

```text
Accuracy =
Correct Predictions / Total Predictions
```

### Precision

Measures how many of the patients predicted as high risk actually belong to the high-risk class.

```text
Precision =
True Positives / (True Positives + False Positives)
```

### Recall

Measures how many of the actual high-risk patients are correctly identified.

```text
Recall =
True Positives / (True Positives + False Negatives)
```

### F1-Score

F1-score provides a balance between precision and recall.

```text
F1 =
2 × (Precision × Recall) /
(Precision + Recall)
```

### ROC-AUC

ROC-AUC measures the model's ability to distinguish between the two classes across different classification thresholds.

### Confusion Matrix

A confusion matrix is used to analyze:

- True Positives
- True Negatives
- False Positives
- False Negatives

---

## 🔎 Model Interpretability

Model interpretability is used to understand which features have a stronger influence on the model's predictions.

Feature importance is particularly useful for the Random Forest model.

Understanding feature importance can help identify which patient characteristics are most relevant to the model's decision-making process.

---

## 📁 Project Structure

```text
CardioRisk-ML/
│
├── backend/
│   └── Backend application files
│
├── frontend/
│   └── Frontend application files
│
├── CardioRisk_ML.ipynb
│   └── Machine learning analysis and model development
│
├── README.md
│   └── Project documentation
│
└── .gitignore
```

---

## 🛠️ Technologies Used

### Programming Language

- Python

### Machine Learning

- Scikit-learn
- Random Forest
- Logistic Regression

### Data Processing

- Pandas
- NumPy

### Data Visualization

- Matplotlib
- Seaborn

### Development Environment

- Jupyter Notebook

### Application

- Frontend
- Backend

---

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed:

- Python 3.x
- Git
- Jupyter Notebook

---

### 1. Clone the Repository

```bash
git clone https://github.com/Prathyush172/CardioRisk-ML.git
```

Navigate to the project directory:

```bash
cd CardioRisk-ML
```

---

### 2. Create a Virtual Environment

Windows:

```bash
python -m venv venv
```

Activate the environment:

```bash
venv\Scripts\activate
```

For macOS/Linux:

```bash
python3 -m venv venv
source venv/bin/activate
```

---

### 3. Install Dependencies

Install the required Python libraries:

```bash
pip install pandas numpy matplotlib seaborn scikit-learn jupyter
```

---

### 4. Run the Jupyter Notebook

Start Jupyter Notebook:

```bash
jupyter notebook
```

Open:

```text
CardioRisk_ML.ipynb
```

Run the notebook cells sequentially to reproduce the analysis and model development process.

---

## 💻 Application

The repository also contains:

```text
backend/
frontend/
```

These components provide the foundation for integrating the trained machine learning model into a web-based prediction application.

The general workflow is:

```text
User Input
    │
    ▼
Frontend
    │
    ▼
Backend
    │
    ▼
Trained ML Model
    │
    ▼
Risk Prediction
    │
    ▼
Result Displayed to User
```

---

## 📋 Results

The performance of Logistic Regression and Random Forest is evaluated using multiple metrics.

The final model selection is based on the overall evaluation rather than accuracy alone.

The evaluation considers:

- Accuracy
- Precision
- Recall
- F1-score
- ROC-AUC
- Confusion Matrix

This is particularly important because cardiovascular risk prediction involves an imbalanced target variable.

---


## 🔮 Future Enhancements

Possible future improvements include:

- Evaluating additional machine learning algorithms.
- Improving feature engineering.
- Testing the model on larger and more diverse datasets.
- Further optimizing classification thresholds.
- Improving model explainability.
- Deploying the model as a complete web application.
- Adding real-time prediction functionality.
- Improving the frontend user experience.
- Conducting additional validation on independent datasets.

---

## 📌 Conclusion

CardioRisk ML demonstrates the application of machine learning to **10-year coronary heart disease risk prediction** using demographic, behavioral, and clinical patient information.

The project compares **Logistic Regression and Random Forest**, incorporates leakage-safe preprocessing, considers class imbalance, performs hyperparameter tuning, evaluates multiple classification metrics, and explores threshold optimization and feature importance.

The project provides a foundation for developing a machine learning-based cardiovascular risk prediction application for educational and research purposes.

---

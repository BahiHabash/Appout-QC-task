# Phase 1 & 3: Manual Testing & Reporting

This directory contains the core manual testing strategy and the final defect reports generated during the SauceDemo QA Internship. 

---

## 📋 Manual Testing

The manual testing phase involved designing **100+ scenarios** to cover the application's entire functional surface while permuting across the four primary user types. 

| Deliverable | Description | Link |
| :--- | :--- | :--- |
| **Test Scenarios** | JSON structure containing 100+ high-level design cases. | [test-scenarios.json](test-scenarios.json) |
| **Test Plan** | Detailed step-by-step matrix with recorded Pass/Fail status. | [test-plan.csv](test-plan.csv) |
| **Live Test Plan** | Dynamic Google Sheet for easier viewing. | **[Google Sheet](https://docs.google.com/spreadsheets/d/13JBKaxw35hOFgV09x8cmpsXTEF1JRztwAcrlVkC5GxA/edit?gid=187292589#gid=187292589)** |

### Key Strategy Components:
- **Equivalence Partitioning (EP):** Dividing inputs into valid (e.g., standard_user) and invalid (e.g., locked_out_user) partitions.
- **Boundary Value Analysis (BVA):** Testing checkout fields with 1-character vs. 100-character inputs.
- **Permutation:** Executing the end-to-end flow for `standard`, `problem`, `error`, and `performance_glitch` users.

---

## 🐞 Reporting

Based on exploratory and automated testing, **30 bugs** were identified. This exceeds the project requirement of 25 defects.

| Deliverable | Description | Link |
| :--- | :--- | :--- |
| **Bug Report (JSON)** | Machine-readable defect logs for integration with tracking tools. | [bug-reports.json](bug-reports.json) |
| **Bug Report (CSV)** | Formatted for manual review and spreadsheet import. | [bug-reports.csv](bug-reports.csv) |
| **Live Defect Tracker** | Bug report sheet with severity and priority assessments. | **[Google Sheet](https://docs.google.com/spreadsheets/d/1wZeAjCRCGQ-Z7vnrZqVDGmOj7POVef6kLREahrloR84/edit?usp=sharing)** |

### Severity Distribution:
- **Critical/Blocker:** Functional failures in `problem_user` (sorting/images).
- **High:** Validation logic errors in `error_user` (cart manipulation).
- **Medium/Low:** Cosmetic and UI inconsistencies in `visual_user` (footer/alignment).

---

[← Back to Root](../README.md)

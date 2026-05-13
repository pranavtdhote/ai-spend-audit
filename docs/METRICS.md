# Metrics & Analytics Tracking Plan

To optimize the NeuralCost funnel, we must track specific user behaviors from landing to consultation booking. We use PostHog for event tracking and session replay.

## 1. Top of Funnel (Acquisition & Activation)
- **Metric**: `landing_page_view`
- **Metric**: `audit_started` (Fired when user clicks "Start Free Audit")
- **KPI: Activation Rate**: `audit_started` / `landing_page_view`
  - *Target*: > 25%

## 2. Middle of Funnel (Engagement & Completion)
- **Metric**: `tool_added` (Properties: `tool_id`, `plan_id`)
  - *Why*: Tells us which tools are most popular in the market.
- **Metric**: `audit_generated` (Properties: `total_spend`, `potential_savings`)
  - *Why*: Crucial for understanding the total volume of money moving through our calculator.
- **KPI: Completion Rate**: `audit_generated` / `audit_started`
  - *Target*: > 60% (If lower, the form is too long or toolDatabase is missing key tools).

## 3. Bottom of Funnel (Conversion)
- **Metric**: `recommendation_expanded` (Properties: `rule_id`)
  - *Why*: Tells us which financial reasoning users care about most.
- **Metric**: `share_link_generated`
  - *Why*: Measures the viral coefficient (K-factor) of the product.
- **Metric**: `consultation_cta_clicked` (Properties: `savings_amount`)
  - *Why*: The ultimate business objective.
- **KPI: Lead Conversion Rate**: `consultation_cta_clicked` / `audit_generated`
  - *Target*: > 8% for audits showing >$500 in savings.

## 4. Health Metrics
- **Metric**: `api_summary_failed`
  - *Why*: Tracks how often the Resend/OpenAI integrations fail, forcing the graceful fallback.
- **Metric**: `time_to_completion`
  - *Why*: If it takes > 3 minutes, we need to simplify the UI. The promise is "60 seconds".

SELECT *
    ,row_number() OVER (order by "period" asc,minutes_remaining desc) as minute
FROM
(
SELECT 
"period",
minute as minutes_remaining,
min(case when predictor_tag_simple = 'somepredictors' then metric_rate else null end) as metric_rate_somepredictors,
min(case when predictor_tag_simple = 'severalpredictors' then metric_rate else null end) as metric_rate_severalpredictors,
min(case when predictor_tag_simple = 'manypredictors' then metric_rate else null end) as metric_rate_manypredictors
FROM
(
SELECT 
metric_tag,
predictor_tag,
predictor_tag_simple,
sex,
age,
"period",
minute,
(CASE 
WHEN '{{selectedMetric}}' = 'accuracy' then accuracy 
WHEN '{{selectedMetric}}' = 'true positive rate' then true_positive_rate 
WHEN '{{selectedMetric}}' = 'true negative rate' then true_negative_rate 
WHEN '{{selectedMetric}}' = 'positive predictive value' then positive_predictive_value 
WHEN '{{selectedMetric}}' = 'negative predictive value' then negative_predictive_value 
WHEN '{{selectedMetric}}' = 'false positive rate' then false_positive_rate 
WHEN '{{selectedMetric}}' = 'false negative rate' then false_negative_rate 
WHEN '{{selectedMetric}}' = 'false discovery rate' then false_discovery_rate 
WHEN '{{selectedMetric}}' = 'r2' then r2 
ELSE null end) as metric_rate
-- accuracy,
-- true_positive_rate,
-- true_negative_rate,
-- positive_predictive_value,
-- negative_predictive_value,
-- false_positive_rate,
-- false_negative_rate,
-- false_discovery_rate
FROM fiba_europe_alg_comps
WHERE age = '{{selectedAge}}'
and sex = '{{selectedSex}}'
and metric_tag = '{{selectedTarget}}'
) as s1
GROUP BY 1,2
) as s2
order by "period" asc,minutes_remaining desc


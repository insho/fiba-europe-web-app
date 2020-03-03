SELECT *
    ,row_number() OVER (order by "period" asc,minutes_remaining desc) as minute
FROM
(
SELECT 
"period",
minute as minutes_remaining,
avg(case when predictor_tag_simple = '{{selectedPredictor}}' and age_sex = 'adult male' then metric_rate else null end) as metric_rate_adult_male,
avg(case when predictor_tag_simple = '{{selectedPredictor}}' and age_sex = 'adult female' then metric_rate else null end) as metric_rate_adult_female,
avg(case when predictor_tag_simple = '{{selectedPredictor}}' and age_sex = 'youth male' then metric_rate else null end) as metric_rate_youth_male,
avg(case when predictor_tag_simple = '{{selectedPredictor}}' and age_sex = 'youth female' then metric_rate else null end) as metric_rate_youth_female
-- min(case when predictor_tag_simple = 'somepredictors' then metric_rate else null end) as metric_rate_somepredictors,
-- min(case when predictor_tag_simple = 'severalpredictors' then metric_rate else null end) as metric_rate_severalpredictors,
-- min(case when predictor_tag_simple = 'manypredictors' then metric_rate else null end) as metric_rate_manypredictors
FROM
(
SELECT 
metric_tag,
predictor_tag,
predictor_tag_simple,

(case when lower(competition_name) like '%women%' then 'female' else 'male' end) as sex,
(case when lower(competition_name) like '%u16%' OR 
 lower(competition_name) like '%u18%' OR 
 lower(competition_name) like '%u20%' then 'youth' else 'adult' end) as age,

(case when lower(competition_name) like '%u16%' OR 
 lower(competition_name) like '%u18%' OR 
 lower(competition_name) like '%u20%' then 'youth' else 'adult' end)|| ' ' || (case when lower(competition_name) like '%women%' then 'female' else 'male' end) as age_sex,


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
FROM fiba_europe_alg_comps_x_competition
-- WHERE age = '{{selectedAge}}'
-- and sex = '{{selectedSex}}'
WHERE metric_tag = '{{selectedTarget}}'
) as s1
GROUP BY 1,2
) as s2
order by "period" asc,minutes_remaining desc;


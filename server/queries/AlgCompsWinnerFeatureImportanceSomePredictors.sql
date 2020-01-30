/**
 manypredictors       | 0.752475629520728
 severalpredictors    | 0.749966066824499
 somepredictors       | 0.726536570155409
*/

SELECT 'p' || "period" || '-' ||'m' || minute as period_minute
        , max(current_score_hometeam) as current_score_hometeam
        ,max(current_score_awayteam) as current_score_awayteam
FROM fiba_europe_alg_feature_importances_somepredictors
WHERE age = '{{selectedAge}}'
and sex = '{{selectedSex}}'
and metric_tag = '{{selectedTarget}}'
and cast("period" as integer) = cast('{{period}}' as integer)
and cast(minute as integer) = cast('{{minute}}' as integer)
Group by 1
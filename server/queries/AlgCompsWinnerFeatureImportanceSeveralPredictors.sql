/**
 manypredictors       | 0.752475629520728
 severalpredictors    | 0.749966066824499
 somepredictors       | 0.726536570155409
*/

SELECT 'p' || "period" || '-' ||'m' || minute as period_minute
        , max(current_score_hometeam) as current_score_hometeam
        ,max(current_score_awayteam) as current_score_awayteam

        ,max(two_point_shots_made_hometeam) as two_point_shots_made_hometeam
        ,max(two_point_shots_missed_hometeam) as two_point_shots_missed_hometeam
        ,max(three_point_shots_made_hometeam) as three_point_shots_made_hometeam
        ,max(three_point_shots_missed_hometeam) as three_point_shots_missed_hometeam
        ,max(free_throw_shots_made_hometeam) as free_throw_shots_made_hometeam
        ,max(free_throw_shots_missed_hometeam) as free_throw_shots_missed_hometeam
        ,max(two_point_shots_made_awayteam) as two_point_shots_made_awayteam
        ,max(two_point_shots_missed_awayteam) as two_point_shots_missed_awayteam
        ,max(three_point_shots_made_awayteam) as three_point_shots_made_awayteam
        ,max(three_point_shots_missed_awayteam) as three_point_shots_missed_awayteam
        ,max(free_throw_shots_made_awayteam) as free_throw_shots_made_awayteam
        ,max(free_throw_shots_missed_awayteam) as free_throw_shots_missed_awayteam

FROM fiba_europe_alg_feature_importances_severalpredictors
WHERE age = '{{selectedAge}}'
and sex = '{{selectedSex}}'
and metric_tag = '{{selectedTarget}}'
and cast("period" as integer) = cast('{{period}}' as integer)
and cast(minute as integer) = cast('{{minute}}' as integer)
Group by 1





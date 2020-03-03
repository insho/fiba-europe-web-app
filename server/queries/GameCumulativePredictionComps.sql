SELECT match.*
-- ,final_score_combined_lower
-- ,final_score_combined_prediction
-- ,final_score_combined_upper
-- ,ending_lead_final_hometeam_lower
-- ,ending_lead_final_hometeam_prediction
-- ,ending_lead_final_hometeam_upper
-- ,winner_hometeam_lower
-- ,winner_hometeam_prediction
-- ,winner_hometeam_upper
,final_score_hometeam_lower_some
,final_score_hometeam_prediction_some
,final_score_hometeam_upper_some
,final_score_hometeam_lower_several
,final_score_hometeam_prediction_several
,final_score_hometeam_upper_several
,final_score_hometeam_lower_many
,final_score_hometeam_prediction_many
,final_score_hometeam_upper_many


,winner_hometeam
,coalesce(winner_hometeam_prediction_some,(case when final_score_hometeam_prediction_some>=final_score_awayteam then 1 else -1 end)) as winner_hometeam_prediction_some
,coalesce(winner_hometeam_prediction_several,(case when final_score_hometeam_prediction_several>=final_score_awayteam then 1 else -1 end)) as winner_hometeam_prediction_several
,coalesce(winner_hometeam_prediction_many,(case when final_score_hometeam_prediction_many>=final_score_awayteam then 1 else -1 end)) as winner_hometeam_prediction_many

-- ,winner_hometeam_prediction_several
-- ,winner_hometeam_prediction_many

FROM 
(

SELECT *
        ,row_number() OVER (order by row_number asc) as minute
FROM (
         SELECT row_number
                ,match_id
              , period
              , minutes_remaining_in_period
        --       , full_text
        --       , stat_action_hometeam
        --       , scoring_stat_hometeam_full
        --       , points_scored_subtype_hometeam
        --       , points_scored_subtype_hometeam

              ----- stats to use
            ,current_score_hometeam
            ,current_score_awayteam
            , current_score_hometeam + current_score_awayteam as combined_score
            ,final_score_hometeam
            ,final_score_awayteam
            ,(case when final_score_hometeam>=final_score_awayteam then 1 else -1 end) as winner_hometeam

              , row_number()
                over (partition by period, minutes_remaining_in_period order by row_number desc) as last_event_in_minute_rank

         FROM fiba_europe_games_master
         where match_id = '{{matchId}}'
         and minutes_remaining_in_period <> 10
     ) as  s1
WHERE last_event_in_minute_rank = 1

    ) as match
LEFT JOIN
(
SELECT  match_id
        ,period
        ,minute as minutes_remaining_in_period
        -- ,min(case when metric_tag = 'final_score_combined' then lower else null end) as final_score_combined_lower
        -- ,min(case when metric_tag = 'final_score_combined' then prediction else null end) as final_score_combined_prediction
        -- ,min(case when metric_tag = 'final_score_combined' then upper else null end) as final_score_combined_upper

        -- ,min(case when metric_tag = 'ending_lead_final_hometeam' then lower else null end) as ending_lead_final_hometeam_lower
        -- ,min(case when metric_tag = 'ending_lead_final_hometeam' then prediction else null end) as ending_lead_final_hometeam_prediction
        -- ,min(case when metric_tag = 'ending_lead_final_hometeam' then upper else null end) as ending_lead_final_hometeam_upper

        -- ,min(case when metric_tag = 'winner_hometeam' then lower else null end) as winner_hometeam_lower
        -- ,min(case when metric_tag = 'winner_hometeam' then prediction else null end) as winner_hometeam_prediction
        -- ,min(case when metric_tag = 'winner_hometeam' then upper else null end) as winner_hometeam_upper


        ,min(case when predictor_tag = 'somepredictorsA' and metric_tag = 'final_score_hometeam' then lower else null end) as final_score_hometeam_lower_some
        ,min(case when predictor_tag = 'somepredictorsA' and  metric_tag = 'final_score_hometeam' then prediction else null end) as final_score_hometeam_prediction_some
        ,min(case when predictor_tag = 'somepredictorsA' and  metric_tag = 'final_score_hometeam' then upper else null end) as final_score_hometeam_upper_some

        ,min(case when predictor_tag = 'severalpredictorsA' and metric_tag = 'final_score_hometeam' then lower else null end) as final_score_hometeam_lower_several
        ,min(case when predictor_tag = 'severalpredictorsA' and  metric_tag = 'final_score_hometeam' then prediction else null end) as final_score_hometeam_prediction_several
        ,min(case when predictor_tag = 'severalpredictorsA' and  metric_tag = 'final_score_hometeam' then upper else null end) as final_score_hometeam_upper_several

        ,min(case when predictor_tag = 'manypredictorsA' and metric_tag = 'final_score_hometeam' then lower else null end) as final_score_hometeam_lower_many
        ,min(case when predictor_tag = 'manypredictorsA' and  metric_tag = 'final_score_hometeam' then prediction else null end) as final_score_hometeam_prediction_many
        ,min(case when predictor_tag = 'manypredictorsA' and  metric_tag = 'final_score_hometeam' then upper else null end) as final_score_hometeam_upper_many


        ,min(case when predictor_tag = 'somepredictorsA' and  metric_tag = 'winner_hometeam' then (case when prediction>=.5 then 1 else -1 end) else null end) as winner_hometeam_prediction_some
        ,min(case when predictor_tag = 'severalpredictorsA' and  metric_tag = 'winner_hometeam' then (case when prediction>=.5 then 1 else -1 end) else null end) as winner_hometeam_prediction_several
        ,min(case when predictor_tag = 'manypredictorsA' and  metric_tag = 'winner_hometeam' then (case when prediction>=.5 then 1 else -1 end) else null end) as winner_hometeam_prediction_many




        -- ,row_number() OVER (partition by match_id,period,minute order by 1) as safe_rank

FROM fiba_europe_predictions
WHERE match_id = '{{matchId}}'
and ',,' || '{{tagsString}}' || ',,' like '%,,' || cast(predictor_tag as text) || ',,%'
and minute <> 10
group by 1,2,3

    ) as predictions
    on match.match_id = predictions.match_id
    and match.period = predictions.period
    and match.minutes_remaining_in_period = predictions.minutes_remaining_in_period
-- and predictions.safe_rank = 1
order by row_number


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
              , current_score_hometeam
              , current_score_awayteam
              , current_score_hometeam - current_score_awayteam as  current_lead_hometeam
              , (case   WHEN current_score_hometeam >= current_score_awayteam then current_score_hometeam - current_score_awayteam
                        ELSE NULL END) as current_lead_hometeam_pos
              , (case   WHEN current_score_hometeam < current_score_awayteam then current_score_hometeam - current_score_awayteam
                        ELSE NULL END) as current_lead_hometeam_neg
              

              , two_point_shots_made_hometeam
              , three_point_shots_made_hometeam
              , free_throw_shots_made_hometeam

              , 2 * two_point_shots_made_hometeam as                                                two_point_shots_cumulative_score_hometeam
              , 3 * three_point_shots_made_hometeam as                                              three_point_shots_cumulative_score_hometeam
              , free_throw_shots_made_hometeam as                                                   three_point_shots_cumulative_score_hometeam


              , shot_blocked_hometeam

              , free_throw_shots_missed_hometeam
              , two_point_shots_missed_hometeam
              , three_point_shots_missed_hometeam

              ,count(case when stat_action_assist_hometeam = 'Defensive Rebound' then 1 else null end) OVER (partition by match_id order by row_number) as defensive_rebounds_hometeam
              ,-1*count(case when stat_action_assist_awayteam = 'Defensive Rebound' then 1 else null end) OVER (partition by match_id order by row_number) as defensive_rebounds_awayteam
              , row_number()
                over (partition by period, minutes_remaining_in_period order by row_number desc) as last_event_in_minute_rank

         FROM fiba_europe_games_master
         where match_id = '{{matchId}}'
          and minutes_remaining_in_period <> 10
     ) s1
WHERE last_event_in_minute_rank = 1
order by row_number
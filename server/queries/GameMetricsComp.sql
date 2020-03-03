
         SELECT team_name_hometeam as team
             ,1 as team_rank
              , max(two_point_shots_made_hometeam) as  two_point_shots_made
              , max(three_point_shots_made_hometeam) as  three_point_shots_made
              , max(free_throw_shots_made_hometeam) as free_throw_shots_made

              ,max( free_throw_shots_missed_hometeam) as free_throw_shots_missed
              ,max( two_point_shots_missed_hometeam) as two_point_shots_missed
              ,max( three_point_shots_missed_hometeam) as three_point_shots_missed

              , max(two_point_shots_made_hometeam)  + max( two_point_shots_missed_hometeam) as  two_point_shots_attempted
              , max(three_point_shots_made_hometeam) + max( three_point_shots_missed_hometeam)  as  three_point_shots_attempted
              , max(free_throw_shots_made_hometeam) + max( free_throw_shots_missed_hometeam) as free_throw_shots_attempted

                ---- field goal pct: total shots made / total shots
              ,(CASE WHEN max((coalesce(two_point_shots_made_hometeam,0) 
                        + coalesce(three_point_shots_made_hometeam,0)
                        + coalesce(two_point_shots_missed_hometeam,0)
                        + coalesce(three_point_shots_missed_hometeam,0)))  > 0 then 
                max((coalesce(two_point_shots_made_hometeam,0)
                        + coalesce(three_point_shots_made_hometeam,0))) / cast(max((coalesce(two_point_shots_made_hometeam,0)
                        + coalesce(three_point_shots_made_hometeam,0)
                        + coalesce(two_point_shots_missed_hometeam,0)
                        + coalesce(three_point_shots_missed_hometeam,0))) as float) else 0 end) as field_goal_pct

              ,(CASE WHEN max((coalesce(three_point_shots_made_hometeam,0) 
                        + coalesce(three_point_shots_missed_hometeam,0)))  > 0 then 
                max(coalesce(three_point_shots_made_hometeam,0)) / cast(max((coalesce(three_point_shots_made_hometeam,0)
                        + coalesce(three_point_shots_missed_hometeam,0))) as float) else 0 end) as three_point_pct
              
              ,(CASE WHEN max((coalesce(two_point_shots_made_hometeam,0) 
                        + coalesce(two_point_shots_missed_hometeam,0)))  > 0 then 
                max(coalesce(two_point_shots_made_hometeam,0)) / cast(max((coalesce(two_point_shots_made_hometeam,0)
                        + coalesce(two_point_shots_missed_hometeam,0)))  as float) else 0 end) as two_point_pct
              

              ,(CASE WHEN max((coalesce(free_throw_shots_made_hometeam,0)
                        + coalesce(free_throw_shots_missed_hometeam,0)))  > 0 then
                max(coalesce(free_throw_shots_made_hometeam,0)) / cast(max((coalesce(free_throw_shots_made_hometeam,0)
                        + coalesce(free_throw_shots_missed_hometeam,0))) as float) else 0 end) as free_throw_pct


              ,count( shot_blocked_hometeam) as shot_blocked
              ,count(case when stat_action_assist_hometeam = 'Defensive Rebound' then 1 else null end) as defensive_rebounds
              ,count(case when stat_action_assist_hometeam = 'Offensive Rebound' then 1 else null end) as offensive_rebounds
              ,max(cumulative_player_personal_fouls_hometeam) as personal_fouls_committed
              ,max(team_fouls_committed_hometeam) as team_fouls_committed
             ,count(case when stat_action_assist_hometeam = 'Assist' then 1 else null end) as assists

            ,count(case when stat_action_hometeam = 'Steal' or ((stat_action_hometeam is null or stat_action_hometeam = 'nan') and  stat_action_awayteam = 'Turnover Committed' and full_text like '% steal %') then 1 else null end) as steals



         FROM fiba_europe_games_master
         where match_id = '{{matchId}}'
         group by 1

UNION

         SELECT team_name_awayteam as team
                ,2 as team_rank
              , max(two_point_shots_made_awayteam) as  two_point_shots_made
              , max(three_point_shots_made_awayteam) as  three_point_shots_made
              , max(free_throw_shots_made_awayteam) as free_throw_shots_made

              ,max( free_throw_shots_missed_awayteam) as free_throw_shots_missed
              ,max( two_point_shots_missed_awayteam) as two_point_shots_missed
              ,max( three_point_shots_missed_awayteam) as three_point_shots_missed


              , max(two_point_shots_made_awayteam)  + max( two_point_shots_missed_awayteam) as  two_point_shots_attempted
              , max(three_point_shots_made_awayteam) + max( three_point_shots_missed_awayteam)  as  three_point_shots_attempted
              , max(free_throw_shots_made_awayteam) + max( free_throw_shots_missed_awayteam) as free_throw_shots_attempted


                ---- field goal pct: total shots made / total shots
              ,(CASE WHEN max((coalesce(two_point_shots_made_awayteam,0)
                        + coalesce(three_point_shots_made_awayteam,0)
                        + coalesce(two_point_shots_missed_awayteam,0)
                        + coalesce(three_point_shots_missed_awayteam,0)))  > 0 then
                max((coalesce(two_point_shots_made_awayteam,0)
                        + coalesce(three_point_shots_made_awayteam,0))) / cast(max((coalesce(two_point_shots_made_awayteam,0)
                        + coalesce(three_point_shots_made_awayteam,0)
                        + coalesce(two_point_shots_missed_awayteam,0)
                        + coalesce(three_point_shots_missed_awayteam,0))) as float) else 0 end) as field_goal_pct

              ,(CASE WHEN max((coalesce(three_point_shots_made_awayteam,0)
                        + coalesce(three_point_shots_missed_awayteam,0)))  > 0 then
                max(coalesce(three_point_shots_made_awayteam,0)) / cast(max((coalesce(three_point_shots_made_awayteam,0)
                        + coalesce(three_point_shots_missed_awayteam,0))) as float) else 0 end) as three_point_pct

              ,(CASE WHEN max((coalesce(two_point_shots_made_awayteam,0)
                        + coalesce(two_point_shots_missed_awayteam,0)))  > 0 then
                max(coalesce(two_point_shots_made_awayteam,0)) / cast(max((coalesce(two_point_shots_made_awayteam,0)
                        + coalesce(two_point_shots_missed_awayteam,0)))  as float) else 0 end) as two_point_pct


              ,(CASE WHEN max((coalesce(free_throw_shots_made_awayteam,0)
                        + coalesce(free_throw_shots_missed_awayteam,0)))  > 0 then
                max(coalesce(free_throw_shots_made_awayteam,0)) / cast(max((coalesce(free_throw_shots_made_awayteam,0)
                        + coalesce(free_throw_shots_missed_awayteam,0))) as float) else 0 end) as free_throw_pct


              ,count( shot_blocked_awayteam) as shot_blocked
              ,count(case when stat_action_assist_awayteam = 'Defensive Rebound' then 1 else null end) as defensive_rebounds
              ,count(case when stat_action_assist_awayteam = 'Offensive Rebound' then 1 else null end) as offensive_rebounds
              ,max(cumulative_player_personal_fouls_awayteam) as personal_fouls_committed
              ,max(team_fouls_committed_awayteam) as team_fouls_committed
             ,count(case when stat_action_assist_awayteam = 'Assist' then 1 else null end) as assists

            ,count(case when stat_action_awayteam = 'Steal' or ((stat_action_awayteam is null or stat_action_awayteam = 'nan') and  stat_action_hometeam = 'Turnover Committed' and full_text like '% steal %') then 1 else null end) as steals



         FROM fiba_europe_games_master
         where match_id = '{{matchId}}'
         Group by 1
         order by 2 asc
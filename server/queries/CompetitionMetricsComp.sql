SELECT team_rank,
        (case when team_rank = 1 then 'home' else 'away' end ) as team,
              avg(two_point_shots_made) as two_point_shots_made,
              avg(three_point_shots_made) as three_point_shots_made,
              avg(free_throw_shots_made) as free_throw_shots_made,

              avg(free_throw_shots_missed) as free_throw_shots_missed,
              avg(two_point_shots_missed) as two_point_shots_missed,
              avg(three_point_shots_missed) as three_point_shots_missed,

              avg(two_point_shots_attempted) as two_point_shots_attempted,
              avg(three_point_shots_attempted) as three_point_shots_attempted,
              avg(free_throw_shots_attempted) as free_throw_shots_attempted,

              avg(field_goal_pct) as field_goal_pct,

              avg(three_point_pct) as three_point_pct,
              
              avg(two_point_pct) as two_point_pct,
              

              avg(free_throw_pct) as free_throw_pct,


              avg(shot_blocked) as shot_blocked,
              avg(defensive_rebounds) as defensive_rebounds,
              avg(offensive_rebounds) as offensive_rebounds,
              avg(personal_fouls_committed) as personal_fouls_committed,
              avg(team_fouls_committed) as team_fouls_committed,
             avg(assists) as assists,
            avg(steals) as steals

FROM
(
         SELECT team_name_hometeam as team
             ,1 as team_rank
             ,match_id
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



         FROM fiba_europe_games_master gmaster 
         INNER JOIN 
         (
                 SELECT DISTINCT match_id as comp_match_id from fiba_europe_game_xref WHERE metadata_competition_name = '{{selectedCompetition}}'
         ) as comp
         on gmaster.match_id::integer = comp.comp_match_id::integer
         group by 1,3

UNION

         SELECT team_name_awayteam as team
                ,2 as team_rank
                ,match_id
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



         FROM fiba_europe_games_master gmaster
                  INNER JOIN 
         (
                 SELECT DISTINCT match_id as comp_match_id from fiba_europe_game_xref WHERE metadata_competition_name = '{{selectedCompetition}}'
         ) as comp
         on gmaster.match_id::integer = comp.comp_match_id::integer
         Group by 1,3         
) as s1
group by 1,2
order by 1,2


	SELECT core.match_id
		, coalesce(schedule_date,'Unknown') as schedule_date
		,team_name_hometeam
,team_name_awayteam
,(case when final_score_hometeam>= final_score_awayteam then 1 else 0 end) as winner_hometeam
,final_score_hometeam || ' - ' || final_score_awayteam as final_score_homeaway
,to_char(field_goal_pct_hometeam*100,'999D99%') || ' - ' || to_char(field_goal_pct_awayteam*100,'999D99%') as field_goal_pct_homeaway
,to_char(three_point_pct_hometeam*100,'999D99%') || ' - ' || to_char(three_point_pct_awayteam*100,'999D99%') as three_point_pct_homeaway
,(defensive_rebounds_hometeam+offensive_rebounds_hometeam) || ' - ' || (defensive_rebounds_awayteam+offensive_rebounds_awayteam) as total_rebounds_homeaway
,assists_hometeam|| ' - ' || assists_awayteam as assists_homeaway

 	-- 		,field_goal_pct_hometeam
        --       ,three_point_pct_hometeam              
        --       ,two_point_pct_hometeam            
        --       ,free_throw_pct_hometeam
        --       ,shot_blocked_hometeam
        --       ,defensive_rebounds_hometeam
        --       ,offensive_rebounds_hometeam
        --       ,personal_fouls_committed_hometeam
        --       ,team_fouls_committed_hometeam
        --      ,assists_hometeam
        --     ,steals_hometeam


 	-- 		,field_goal_pct_awayteam
        --       ,three_point_pct_awayteam              
        --       ,two_point_pct_awayteam            
        --       ,free_throw_pct_awayteam
        --       ,shot_blocked_awayteam
        --       ,defensive_rebounds_awayteam
        --       ,offensive_rebounds_awayteam
        --       ,personal_fouls_committed_awayteam
        --       ,team_fouls_committed_awayteam
        --      ,assists_awayteam
        --     ,steals_awayteam

FROM 
(
SELECT a.match_id
,to_char(min(schedule_date),'YYYY-MM-DD') as schedule_date
,team_name_hometeam
,team_name_awayteam
-- ,min(schedule_date) as schedule_date
,max(ending_score_period4_hometeam) as final_score_hometeam
,max(ending_score_period4_awayteam) as final_score_awayteam

FROM fiba_europe_game_xref a inner join (
                SELECT DISTINCT match_id from fiba_europe_games_master
        ) b on (a.match_id)::bigint = (b.match_id)::bigint
WHERE metadata_competition_name = '{{selectedCompetition}}'
group by 1,3,4

) as core
LEFT JOIN 
(

         SELECT match_id
            --   , max(two_point_shots_made_hometeam) as  two_point_shots_made
            --   , max(three_point_shots_made_hometeam) as  three_point_shots_made
            --   , max(free_throw_shots_made_hometeam) as free_throw_shots_made

            --   ,max( free_throw_shots_missed_hometeam) as free_throw_shots_missed
            --   ,max( two_point_shots_missed_hometeam) as two_point_shots_missed
            --   ,max( three_point_shots_missed_hometeam) as three_point_shots_missed

            --   , max(two_point_shots_made_hometeam)  + max( two_point_shots_missed_hometeam) as  two_point_shots_attempted
            --   , max(three_point_shots_made_hometeam) + max( three_point_shots_missed_hometeam)  as  three_point_shots_attempted
            --   , max(free_throw_shots_made_hometeam) + max( free_throw_shots_missed_hometeam) as free_throw_shots_attempted

                ---- field goal pct: total shots made / total shots
              ,(CASE WHEN max((coalesce(two_point_shots_made_hometeam,0) 
                        + coalesce(three_point_shots_made_hometeam,0)
                        + coalesce(two_point_shots_missed_hometeam,0)
                        + coalesce(three_point_shots_missed_hometeam,0)))  > 0 then 
                max((coalesce(two_point_shots_made_hometeam,0)
                        + coalesce(three_point_shots_made_hometeam,0))) / cast(max((coalesce(two_point_shots_made_hometeam,0)
                        + coalesce(three_point_shots_made_hometeam,0)
                        + coalesce(two_point_shots_missed_hometeam,0)
                        + coalesce(three_point_shots_missed_hometeam,0))) as float) else 0 end) as field_goal_pct_hometeam

              ,(CASE WHEN max((coalesce(three_point_shots_made_hometeam,0) 
                        + coalesce(three_point_shots_missed_hometeam,0)))  > 0 then 
                max(coalesce(three_point_shots_made_hometeam,0)) / cast(max((coalesce(three_point_shots_made_hometeam,0)
                        + coalesce(three_point_shots_missed_hometeam,0))) as float) else 0 end) as three_point_pct_hometeam
              
              ,(CASE WHEN max((coalesce(two_point_shots_made_hometeam,0) 
                        + coalesce(two_point_shots_missed_hometeam,0)))  > 0 then 
                max(coalesce(two_point_shots_made_hometeam,0)) / cast(max((coalesce(two_point_shots_made_hometeam,0)
                        + coalesce(two_point_shots_missed_hometeam,0)))  as float) else 0 end) as two_point_pct_hometeam
              

              ,(CASE WHEN max((coalesce(free_throw_shots_made_hometeam,0)
                        + coalesce(free_throw_shots_missed_hometeam,0)))  > 0 then
                max(coalesce(free_throw_shots_made_hometeam,0)) / cast(max((coalesce(free_throw_shots_made_hometeam,0)
                        + coalesce(free_throw_shots_missed_hometeam,0))) as float) else 0 end) as free_throw_pct_hometeam


              ,count( shot_blocked_hometeam) as shot_blocked_hometeam
              ,count(case when stat_action_assist_hometeam = 'Defensive Rebound' then 1 else null end) as defensive_rebounds_hometeam
              ,count(case when stat_action_assist_hometeam = 'Offensive Rebound' then 1 else null end) as offensive_rebounds_hometeam
              ,max(cumulative_player_personal_fouls_hometeam) as personal_fouls_committed_hometeam
              ,max(team_fouls_committed_hometeam) as team_fouls_committed_hometeam
             ,count(case when stat_action_assist_hometeam = 'Assist' then 1 else null end) as assists_hometeam
            ,count(case when stat_action_hometeam = 'Steal' or ((stat_action_hometeam is null or stat_action_hometeam = 'nan') and  stat_action_awayteam = 'Turnover Committed' and full_text like '% steal %') then 1 else null end) as steals_hometeam



 ,(CASE WHEN max((coalesce(two_point_shots_made_awayteam,0) 
                        + coalesce(three_point_shots_made_awayteam,0)
                        + coalesce(two_point_shots_missed_awayteam,0)
                        + coalesce(three_point_shots_missed_awayteam,0)))  > 0 then 
                max((coalesce(two_point_shots_made_awayteam,0)
                        + coalesce(three_point_shots_made_awayteam,0))) / cast(max((coalesce(two_point_shots_made_awayteam,0)
                        + coalesce(three_point_shots_made_awayteam,0)
                        + coalesce(two_point_shots_missed_awayteam,0)
                        + coalesce(three_point_shots_missed_awayteam,0))) as float) else 0 end) as field_goal_pct_awayteam

              ,(CASE WHEN max((coalesce(three_point_shots_made_awayteam,0) 
                        + coalesce(three_point_shots_missed_awayteam,0)))  > 0 then 
                max(coalesce(three_point_shots_made_awayteam,0)) / cast(max((coalesce(three_point_shots_made_awayteam,0)
                        + coalesce(three_point_shots_missed_awayteam,0))) as float) else 0 end) as three_point_pct_awayteam
              
              ,(CASE WHEN max((coalesce(two_point_shots_made_awayteam,0) 
                        + coalesce(two_point_shots_missed_awayteam,0)))  > 0 then 
                max(coalesce(two_point_shots_made_awayteam,0)) / cast(max((coalesce(two_point_shots_made_awayteam,0)
                        + coalesce(two_point_shots_missed_awayteam,0)))  as float) else 0 end) as two_point_pct_awayteam
              

              ,(CASE WHEN max((coalesce(free_throw_shots_made_awayteam,0)
                        + coalesce(free_throw_shots_missed_awayteam,0)))  > 0 then
                max(coalesce(free_throw_shots_made_awayteam,0)) / cast(max((coalesce(free_throw_shots_made_awayteam,0)
                        + coalesce(free_throw_shots_missed_awayteam,0))) as float) else 0 end) as free_throw_pct_awayteam


              ,count( shot_blocked_awayteam) as shot_blocked_awayteam
              ,count(case when stat_action_assist_awayteam = 'Defensive Rebound' then 1 else null end) as defensive_rebounds_awayteam
              ,count(case when stat_action_assist_awayteam = 'Offensive Rebound' then 1 else null end) as offensive_rebounds_awayteam
              ,max(cumulative_player_personal_fouls_awayteam) as personal_fouls_committed_awayteam
              ,max(team_fouls_committed_awayteam) as team_fouls_committed_awayteam
             ,count(case when stat_action_assist_awayteam = 'Assist' then 1 else null end) as assists_awayteam
            ,count(case when stat_action_awayteam = 'Steal' or ((stat_action_awayteam is null or stat_action_awayteam = 'nan') and  stat_action_hometeam = 'Turnover Committed' and full_text like '% steal %') then 1 else null end) as steals_awayteam






         FROM fiba_europe_games_master aa 
		 inner join 
		 (
                SELECT DISTINCT match_id AS md from fiba_europe_game_xref
        ) b on (aa.match_id)::bigint = (b.md)::bigint
		WHERE metadata_competition_name = '{{selectedCompetition}}'
         group by 1

) as game_detail
on (core.match_id)::integer = (game_detail.match_id)::integer
order by schedule_date,team_name_hometeam,team_name_awayteam
SELECT home_away  
      ,team_name
      ,player
,total_points_scored
,shots_made
,shots_attempted

,free_throws_made
,free_throws_attempted

,two_pointers_made
,two_pointers_attempted

,three_pointers_made
,three_pointers_attempted

,field_goals_made
,field_goals_attempted

,(case when field_goals_attempted > 0 then field_goals_made/cast(field_goals_attempted as float) else null end) as field_goal_pct
-- ,(case when field_goals_attempted > 0 then to_char(100*(field_goals_made/cast(field_goals_attempted as float)),'999D99%') else '' end) AS field_goal_pct_text
,(case when field_goals_attempted > 0 then cast(field_goals_made as text) || '/' || cast(field_goals_attempted as text) else null end) as field_goal_text

,scoring_type_free_throws_made
,scoring_type_lay_ups_made
,scoring_type_jump_shots_made
,scoring_type_dunks_made
,scoring_type_three_pointers_made
,scoring_type_tip_ins_made
,scoring_type_hook_shots_made
,scoring_type_put_backs_made
,scoring_type_alley_oops_made

,scoring_type_free_throws_attempted
,scoring_type_lay_ups_attempted
,scoring_type_jump_shots_attempted
,scoring_type_dunks_attempted
,scoring_type_three_pointers_attempted
,scoring_type_tip_ins_attempted
,scoring_type_hook_shots_attempted
,scoring_type_put_backs_attempted
,scoring_type_alley_oops_attempted

,defensive_rebounds
,offensive_rebounds
,scoring_assists
,fouls_committed
,fouls_drawn
,shots_blocked
,steals
,minutes_played
,percent_rank() over (order by (case when field_goals_attempted > 0 then (field_goals_made/cast(field_goals_attempted as float)) else 0 end) asc) as field_goal_pct_rank
FROM 
(
SELECT home_away
      ,(case when home_away = 'home' then team_name_hometeam else team_name_awayteam end) as team_name
      ,player

,sum(coalesce(total_points_scored,0)) as total_points_scored
,sum(coalesce(shots_made,0)) as shots_made
,sum(coalesce(shots_made,0)) + sum(coalesce(shots_missed,0))  as shots_attempted

,sum(coalesce(free_throws_made,0)) as free_throws_made
,sum(coalesce(free_throws_made,0)) + sum(coalesce(free_throws_missed,0))  as free_throws_attempted

,sum(coalesce(two_pointers_made,0)) as two_pointers_made
,sum(coalesce(two_pointers_made,0)) + sum(coalesce(two_pointers_missed,0))  as two_pointers_attempted

,sum(coalesce(three_pointers_made,0)) as three_pointers_made
,sum(coalesce(three_pointers_made,0)) + sum(coalesce(three_pointers_missed,0))  as three_pointers_attempted

,sum(coalesce(two_pointers_made,0) + coalesce(three_pointers_made,0)) as field_goals_made
,sum(coalesce(two_pointers_made,0) + coalesce(three_pointers_made,0) + coalesce(two_pointers_missed,0) + coalesce(three_pointers_missed,0)) as field_goals_attempted

,sum(coalesce(scoring_type_free_throws_made,0)) as scoring_type_free_throws_made
,sum(coalesce(scoring_type_lay_ups_made,0)) as scoring_type_lay_ups_made
,sum(coalesce(scoring_type_jump_shots_made,0)) as scoring_type_jump_shots_made
,sum(coalesce(scoring_type_dunks_made,0)) as scoring_type_dunks_made
,sum(coalesce(scoring_type_three_pointers_made,0)) as scoring_type_three_pointers_made
,sum(coalesce(scoring_type_tip_ins_made,0)) as scoring_type_tip_ins_made
,sum(coalesce(scoring_type_hook_shots_made,0)) as scoring_type_hook_shots_made
,sum(coalesce(scoring_type_put_backs_made,0)) as scoring_type_put_backs_made
,sum(coalesce(scoring_type_alley_oops_made,0)) as scoring_type_alley_oops_made

,sum(coalesce(scoring_type_free_throws_made,0)) + sum(coalesce(scoring_type_free_throws_missed,0)) as scoring_type_free_throws_attempted
,sum(coalesce(scoring_type_lay_ups_made,0)) + sum(coalesce(scoring_type_lay_ups_missed,0)) as scoring_type_lay_ups_attempted
,sum(coalesce(scoring_type_jump_shots_made,0)) + sum(coalesce(scoring_type_jump_shots_missed,0)) as scoring_type_jump_shots_attempted
,sum(coalesce(scoring_type_dunks_made,0)) + sum(coalesce(scoring_type_dunks_missed,0)) as scoring_type_dunks_attempted
,sum(coalesce(scoring_type_three_pointers_made,0)) + sum(coalesce(scoring_type_three_pointers_missed,0)) as scoring_type_three_pointers_attempted
,sum(coalesce(scoring_type_tip_ins_made,0)) + sum(coalesce(scoring_type_tip_ins_missed,0)) as scoring_type_tip_ins_attempted
,sum(coalesce(scoring_type_hook_shots_made,0)) + sum(coalesce(scoring_type_hook_shots_missed,0)) as scoring_type_hook_shots_attempted
,sum(coalesce(scoring_type_put_backs_made,0)) + sum(coalesce(scoring_type_put_backs_missed,0)) as scoring_type_put_backs_attempted
,sum(coalesce(scoring_type_alley_oops_made,0)) + sum(coalesce(scoring_type_alley_oops_missed,0)) as scoring_type_alley_oops_attempted

,sum(coalesce(defensive_rebounds,0)) as defensive_rebounds
,sum(coalesce(offensive_rebounds,0)) as offensive_rebounds
,sum(coalesce(scoring_assists,0)) as scoring_assists
,sum(coalesce(fouls_committed,0)) as fouls_committed
,sum(coalesce(fouls_drawn,0)) as fouls_drawn
,sum(coalesce(shots_blocked,0)) as shots_blocked
,sum(coalesce(steals,0)) as steals
,sum(coalesce(minutes_played,0)) as minutes_played
-- from fiba_europe_boxscores_manual_version 
from fiba_europe_boxscores_master
xx left join (
    SELECT distinct match_id
                    ,team_name_hometeam
                    ,team_name_awayteam
    from fiba_europe_games_master
    where match_id = '{{matchId}}'
    ) as team_names on xx.match_id = team_names.match_id
where xx.match_id = '{{matchId}}'
and ',,' || '{{periodsString}}' || ',,' like '%,,' || cast(xx.period as text) || ',,%'
group by 1,2,3
) as s1
order by 1,2, 4 desc

;
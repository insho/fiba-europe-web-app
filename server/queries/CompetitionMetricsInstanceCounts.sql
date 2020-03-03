
         SELECT period
              ,avg( shot_blocked_hometeam) as shot_blocked_hometeam
              ,avg(defensive_rebounds_hometeam) as defensive_rebounds_hometeam
              ,avg(offensive_rebounds_hometeam) as offensive_rebounds_hometeam
              ,avg(steals_hometeam) as steals_hometeam 

              ,avg( shot_blocked_awayteam) as shot_blocked_awayteam
              ,avg(defensive_rebounds_awayteam) as defensive_rebounds_awayteam
              ,avg(offensive_rebounds_awayteam) as offensive_rebounds_awayteam
              ,avg(steals_awayteam) as steals_awayteam 


from
(

         SELECT period
              ,match_id
                -- ,minutes_remaining_in_period
                -- ,row_number() OVER (order by period asc,minutes_remaining_in_period desc) as minute
              ,count( shot_blocked_hometeam) as shot_blocked_hometeam
              ,count(case when stat_action_assist_hometeam = 'Defensive Rebound' then 1 else null end) as defensive_rebounds_hometeam
              ,count(case when stat_action_assist_hometeam = 'Offensive Rebound' then 1 else null end) as offensive_rebounds_hometeam
              ,count(case when stat_action_hometeam = 'Steal' or ((stat_action_hometeam is null or stat_action_hometeam = 'nan') and  stat_action_awayteam = 'Turnover Committed' and full_text like '% steal %') then 1 else null end) as steals_hometeam

              ,count( shot_blocked_awayteam) as shot_blocked_awayteam
              ,count(case when stat_action_assist_awayteam = 'Defensive Rebound' then 1 else null end) as defensive_rebounds_awayteam
              ,count(case when stat_action_assist_awayteam = 'Offensive Rebound' then 1 else null end) as offensive_rebounds_awayteam
              ,count(case when stat_action_awayteam = 'Steal' or ((stat_action_awayteam is null or stat_action_awayteam = 'nan') and  stat_action_hometeam = 'Turnover Committed' and full_text like '% steal %') then 1 else null end) as steals_awayteam


         FROM fiba_europe_games_master gmaster 
         INNER JOIN 
         (
                 SELECT DISTINCT match_id as comp_match_id from fiba_europe_game_xref WHERE metadata_competition_name = '{{selectedCompetition}}'
         ) as comp
         on gmaster.match_id::integer = comp.comp_match_id::integer
         group by 1,2
         ) as s1
         group by 1

         order by 1 asc
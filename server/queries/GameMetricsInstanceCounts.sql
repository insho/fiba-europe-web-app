


         SELECT period
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


         FROM fiba_europe_games_master
         where match_id = '{{matchId}}'
         group by 1

         order by 1 asc
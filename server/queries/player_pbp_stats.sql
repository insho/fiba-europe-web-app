
SELECT players.team
      ,players.player
      ,period
      ,minutes_remaining_in_period
      ,row_number

      -- points
      ,(case when points_scored_player = players.match_player then points_scored_type else null end) as points_scored_type
      ,(case when points_scored_player = players.match_player then points_scored_subtype else null end) as points_scored_subtype
      ,(case when points_scored_player = players.match_player then points_scored_by_player else null end) as points_scored_by_player
      ,(case when points_scored_player = players.match_player then scoring_event_points_scored else null end) as scoring_event_points_scored

       

      ,coalesce(max((case when points_scored_player = players.match_player then points_scored_by_player else null end)) over (partition by match_id,players.team,players.player order by row_number),0) as cumulative_points_scored

      -- assists
--       ,

FROM
(
  SELECT distinct team
                  ,player
                  ,trim(lower(player)) as match_player
  from joe.fiba_europe_boxscores_import
  where match_id = '324' and player in ('A. Ben Chimol')
) as players
left join
(
SELECT match_id
      ,period
      ,minutes_remaining_in_period
       ,row_number
      ,scoring_stat_hometeam_full
      ,stat_action_hometeam as stat_action
      ,substitution_player_in_hometeam as substitution_player_in
      ,substitution_player_out_hometeam as substitution_player_out

      ,shot_missed_player_hometeam as shot_missed_player
      ,shot_missed_type_hometeam as shot_missed_type

      ,stat_action_assist_hometeam as stat_action_assist

      ,offensive_rebound_player_hometeam as offensive_rebound_player
      ,offensive_rebounds_by_player_hometeam as offensive_rebounds_by_player
      ,trim(lower(points_scored_player_hometeam)) as points_scored_player
      ,points_scored_type_hometeam as points_scored_type
      ,points_scored_by_player_hometeam as points_scored_by_player
      ,turnover_committed_player_hometeam as turnover_committed_player
      ,turnover_committed_type_hometeam as turnover_committed_type
      ,foul_committed_player_hometeam as foul_committed_player
      ,team_fouls_committed_hometeam as team_fouls_committed
      ,player_personal_fouls_committed_hometeam as player_personal_fouls_committed
      ,points_scored_subtype_hometeam as points_scored_subtype
      ,scoring_assist_player_hometeam as scoring_assist_player
      ,scoring_assists_by_player_hometeam as scoring_assists_by_player
      ,defensive_rebound_player_hometeam as defensive_rebound_player
      ,defensive_rebounds_by_player_hometeam as defensive_rebounds_by_player
      ,foul_drawn_player_hometeam as foul_drawn_player
      ,(case when trim(points_scored_type_hometeam) = 'free throw' then 1
              when points_scored_type_hometeam like '%2pt%' then 2
            when points_scored_type_hometeam like '%3pt%' then 3 else null end) as scoring_event_points_scored
FROM joe.fiba_europe_games_import
where match_id = '324'

order by row_number
) as matches_hometeam
on (matches_hometeam.scoring_stat_hometeam_full like '%' || players.player || '%') and players.team = 'hometeam'

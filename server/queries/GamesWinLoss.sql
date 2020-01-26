

SELECT team
      ,count(*) as total
      ,count(wins) as wins
      ,count(losses) as losses
      ,count(ties) as ties

      ,count(wins)/cast(count(*)as float) as win_rate

FROM
(
SELECT match_id
              ,team_name_hometeam as team
--               ,team_name_awayteam
--               ,max(current_score_hometeam) as score_hometeam
--               ,max(current_score_awayteam) as score_awayteam
              ,(CASE WHEN max(current_score_hometeam) > max(current_score_awayteam) then 1 else null end) as wins
              ,(CASE WHEN max(current_score_hometeam) < max(current_score_awayteam) then 1 else null end) as losses
              ,(CASE WHEN max(current_score_hometeam) = max(current_score_awayteam) then 1 else null end) as ties

FROM joe.fiba_europe_games_master games_master inner join (
SELECT DISTINCT match_id as inner_match_id
FROM joe.fiba_europe_game_xref
WHERE page_header_text = '2009 EuroBasket'
) as limitor on games_master.match_id = limitor.inner_match_id
Group by 1,2

UNION

SELECT match_id
              ,team_name_awayteam as team
              ,(CASE WHEN max(current_score_awayteam) > max(current_score_hometeam) then 1 else null end) as wins
              ,(CASE WHEN max(current_score_awayteam) < max(current_score_hometeam) then 1 else null end) as losses
              ,(CASE WHEN max(current_score_awayteam) = max(current_score_hometeam) then 1 else null end) as ties

FROM joe.fiba_europe_games_master games_master inner join (
SELECT DISTINCT match_id as inner_match_id
FROM joe.fiba_europe_game_xref
WHERE page_header_text = '2009 EuroBasket'
) as limitor on games_master.match_id = limitor.inner_match_id

Group by 1,2
  ) s1
Group by 1
order by count(wins) desc

SELECT games.metadata_competition_name as competition_name
      ,games.matches_count
      ,unique_team_counts.teams_count
      ,games.metadata_competition_name as label
      ,games.metadata_competition_name as value
FROM
  (
SELECT metadata_competition_name
      ,count(distinct match_id) as matches_count
FROM joe.fiba_europe_games_import
group by 1
  ) as games
inner join (

     SELECT metadata_competition_name
            ,count(distinct team_name) as teams_count
    FROM
    (
    SELECT DISTINCT metadata_competition_name,team_name_hometeam as team_name
    FROM joe.fiba_europe_games_import
    where metadata_competition_name is not null and team_name_hometeam is not null
    UNION
    SELECT DISTINCT metadata_competition_name,team_name_awayteam as team_name
    FROM joe.fiba_europe_games_import
    where metadata_competition_name is not null and team_name_awayteam is not null
    ) team_list
  GROUP BY 1
) as unique_team_counts
ON games.metadata_competition_name = unique_team_counts.metadata_competition_name
order by 1
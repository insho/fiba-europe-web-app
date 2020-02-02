SELECT DISTINCT x.metadata_competition_name as label
                ,x.metadata_competition_name as value
        -- ,row_numbeR() OVER (partition by metadata_competition_name order by insert_date desc) as safe_rank
FROM fiba_europe_competition_xref x inner join 
(
        SELECT distinct metadata_competition_name
        FROM fiba_europe_game_xref a inner join (
                SELECT DISTINCT match_id from fiba_europe_games_master
        ) b on a.match_id::bigint = b.match_id::bigint
) y on x.metadata_competition_name = y.metadata_competition_name
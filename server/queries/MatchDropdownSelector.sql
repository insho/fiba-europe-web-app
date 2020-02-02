-- SELECT DISTINCT x.metadata_competition_name as label
--                 ,x.metadata_competition_name as value
--         -- ,row_numbeR() OVER (partition by metadata_competition_name order by insert_date desc) as safe_rank
-- FROM fiba_europe_competition_xref x inner join 
-- (
--         SELECT distinct metadata_competition_name
--         FROM fiba_europe_game_xref a inner join (
--                 SELECT DISTINCT match_id from fiba_europe_games_master
--         ) b on a.match_id::bigint = b.match_id::bigint
-- ) y on x.metadata_competition_name = y.metadata_competition_name


SELECT      a.match_id::bigint as value
                ,team_vs_text as label
FROM
(
SELECT  metadata_competition_name
,a.match_id
,to_char(schedule_date,'YYYY-MM-DD') as schedule_date_text
,team_name_hometeam
,team_name_awayteam
{label: ',to_char(schedule_date,'YYYY-MM-DD') value:value: ' ' value:value: team_name_hometeam value:value: ' vs ' value:value:', team_name_awayteam as team_vs_text},
,row_number() OVER (partition by a.match_id order by (case when team_name_hometeam is not null then 1 else 2 end)) as safe_rank
        FROM fiba_europe_game_xref a inner join (
                SELECT DISTINCT match_id from fiba_europe_games_master
        ) b on a.match_id::bigint = b.match_id::bigint
) as s1
where safe_rank = 1  
and metadata_competition_name = '{{competitionName}}'
and team_vs_text is not null and BTRIM(team_vs_text) <> ''
order by team_vs_text asc



SELECT      match_id::bigint as value
                ,team_vs_text as label
FROM
(
SELECT  metadata_competition_name
,a.match_id
,to_char(schedule_date,'YYYY-MM-DD') as schedule_date_text
,team_name_hometeam
,team_name_awayteam
,to_char(schedule_date,'YYYY-MM-DD') || ' ' || team_name_hometeam || ' vs ' || team_name_awayteam as team_vs_text
,row_number() OVER (partition by a.match_id order by (case when team_name_hometeam is not null then 1 else 2 end)) as safe_rank
FROM fiba_europe_game_xref a inner join (
                SELECT DISTINCT match_id from fiba_europe_games_master
        ) b on a.match_id::bigint = b.match_id::bigint
) as s1
where safe_rank = 1  
and metadata_competition_name = '{{selectedCompetition}}'
and team_vs_text is not null and BTRIM(team_vs_text) <> ''
order by team_vs_text asc





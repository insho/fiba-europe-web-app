


-- SELECT competition_group as competition 
SELECT s2.*
	,teams
FROM
(
	SELECT schedule_year
	,count(distinct match_id) as matches
	,median(final_score_hometeam) as med_final_score_hometeam
	-- ,coalesce(max(win_pct),count(distinct case when final_score_awayteam < final_score_hometeam then match_id else null end)/cast(count(distinct match_id) as float)) as win_pct_hometeam
,count(distinct case when final_score_awayteam < final_score_hometeam then match_id else null end)/cast(count(distinct match_id) as float) as win_pct_hometeam
	,to_char(min(schedule_date),'YYYY-MM-DD') as from_date
	,to_char(max(schedule_date),'YYYY-MM-DD') as to_date

FROM 
(
SELECT a.match_id
,to_char(min(schedule_date),'YYYY') as schedule_year
,min(schedule_date) as schedule_date
,max(ending_score_period4_hometeam) as final_score_hometeam
,max(ending_score_period4_awayteam) as final_score_awayteam
FROM fiba_europe_game_xref a inner join (
                SELECT DISTINCT match_id from fiba_europe_games_master
        ) b on a.match_id::bigint = b.match_id::bigint
WHERE metadata_competition_name = '{{selectedCompetition}}'
group by 1	

) as core
group by 1
) as s2
LEFT JOIN (
SELECT schedule_year,count(distinct team_name) as teams
FROM
(SELECT a.match_id
,to_char(min(schedule_date),'YYYY') as schedule_year
,team_name_hometeam as team_name
FROM fiba_europe_game_xref a inner join (
                SELECT DISTINCT match_id from fiba_europe_games_master
        ) b on a.match_id::bigint = b.match_id::bigint
WHERE metadata_competition_name = '{{selectedCompetition}}'
Group by 1,3
UNION
SELECT a.match_id
,to_char(min(schedule_date),'YYYY') as schedule_year
,team_name_hometeam as team_name
FROM fiba_europe_game_xref a inner join (
                SELECT DISTINCT match_id from fiba_europe_games_master
        ) b on a.match_id::bigint = b.match_id::bigint
WHERE metadata_competition_name = '{{selectedCompetition}}'
Group by 1,3
) as xx
group by 1
) as team_names
on s2.schedule_year = team_names.schedule_year
order by s2.schedule_year asc



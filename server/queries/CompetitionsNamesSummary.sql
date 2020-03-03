
SELECT competition_group
			,competition_name
			,min(schedule_date) as from_date
			,max(schedule_date) as to_date
			,min(competition_name_age) as competition_name_age
			,min(competition_name_sex) as competition_name_sex
			,count(distinct match_id) as match_count
FROM fiba_europe_game_xref
WHERE competition_name_sex = '{{leagueSex}}'
AND competition_name_age = '{{leagueAge}}'
Group by 1,2
order by 1,3
SELECT *
     ,  row_number() OVER (order by competition_group asc) as row_rank
     ,  row_number() OVER (order by competition_group asc) as competition_group_id
FROM
(
    SELECT  competition_group
			,min(schedule_date) as from_date
			,max(schedule_date) as to_date
            ,count(distinct competition_name) as event_count 
            
			,count(distinct match_id) as match_count
			,min(competition_name_age) as competition_name_age
			,min(competition_name_sex) as competition_name_sex
			
FROM fiba_europe_game_xref_final
WHERE competition_name_sex = '{{competitionGroupSex}}'
AND competition_name_age = '{{competitionGroupAge}}'
Group by 1
) as s1
order by 1

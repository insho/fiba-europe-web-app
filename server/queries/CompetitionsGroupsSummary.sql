SELECT *
     ,  row_number() OVER (order by competition_group asc) as row_rank
     ,  row_number() OVER (order by competition_group asc) as competition_group_id
	,(case when lower(competition_group) like '%women%' then 'female' else 'male' end ) as sex
	,(case when (lower(competition_group) like '%u16%' or lower(competition_group) like '%u18%' or lower(competition_group) like '%u20%') then 'youth' else 'adult' end ) as age

FROM
(
    SELECT  competition_group
			,to_char(min(schedule_date),'YYYY-MM-DD') as from_date
			,to_char(max(schedule_date),'YYYY-MM-DD') as to_date
            ,count(distinct competition_name) as event_count 
            
			,count(distinct a.match_id) as match_count
			,min(competition_group_age) as competition_group_age
			,min(competition_group_sex) as competition_group_sex
			
FROM fiba_europe_game_xref a inner join (
    SELECT DISTINCT match_id from fiba_europe_games_master
) b on a.match_id::bigint = b.match_id::bigint


-- WHERE competition_group_sex = '{{competitionGroupSex}}'
-- AND competition_group_age = '{{competitionGroupAge}}'
Group by 1
) as s1
order by 	
(case when (lower(competition_group) like '%u16%' or lower(competition_group) like '%u18%' or lower(competition_group) like '%u20%') then 'youth' else 'adult' end ) asc,
(case when lower(competition_group) like '%women%' then 'female' else 'male' end ) asc,
competition_group asc 

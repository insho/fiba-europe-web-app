-- CREATE OR REPLACE FUNCTION _final_median(NUMERIC[])
--    RETURNS NUMERIC AS
-- $$
--    SELECT AVG(val)
--    FROM (
--      SELECT val
--      FROM unnest($1) val
--      ORDER BY 1
--      LIMIT  2 - MOD(array_upper($1, 1), 2)
--      OFFSET CEIL(array_upper($1, 1) / 2.0) - 1
--    ) sub;
-- $$
-- LANGUAGE 'sql' IMMUTABLE;
 
-- CREATE OR REPLACE AGGREGATE median(NUMERIC) (
--   SFUNC=array_append,
--   STYPE=NUMERIC[],
--   FINALFUNC=_final_median,
--   INITCOND='{}'
-- );

WITH core as (
SELECT metadata_competition_name
,a.match_id
,(case when lower(metadata_competition_name) like '%women%' then 'female' else 'male' end ) as sex
,(case when (lower(metadata_competition_name) like '%u16%' or lower(metadata_competition_name) like '%u18%' or lower(metadata_competition_name) like '%u20%') then 'youth' else 'adult' end ) as age
,min(schedule_date) as schedule_date
,max(ending_score_period4_hometeam) as final_score_hometeam
,max(ending_score_period4_awayteam) as final_score_awayteam
FROM fiba_europe_game_xref a inner join (
                SELECT DISTINCT match_id from fiba_europe_games_master
        ) b on a.match_id::bigint = b.match_id::bigint
-- INNER JOIN (
-- SELECT distinct competition_group,competition_name,match_id
-- from fiba_europe_game_xref_final
-- ) c on a.match_id::bigint = c.match_id::bigint
group by 1,2,3,4	
)

-- SELECT competition_group as competition 
SELECT *
	,row_number() OVER (order by age,sex,competition) as row_rank
	,lower(replace(competition,' ','_')) as competition_group_id
FROM
(
	SELECT metadata_competition_name as competition
	,age
	,sex
	,age || ' ' || sex as age_sex
	,dense_rank() OVER (order by age,sex)-1 as color_number

	,count(distinct match_id) as matches
	,median(final_score_hometeam) as med_final_score_hometeam
	,count(distinct (case when age = 'adult' and sex = 'male' then match_id else null end)) as matches_adult_male
	,count(distinct (case when age = 'youth' and sex = 'male' then match_id else null end)) as matches_youth_male
	,count(distinct (case when age = 'adult' and sex = 'female' then match_id else null end)) as matches_adult_female
	,count(distinct (case when age = 'youth' and sex = 'female' then match_id else null end)) as matches_youth_female
	,coalesce(max(win_pct),count(distinct case when final_score_awayteam < final_score_hometeam then match_id else null end)/cast(count(distinct match_id) as float)) as win_pct_hometeam
	,to_char(min(schedule_date),'YYYY-MM-DD') as from_date
	,to_char(max(schedule_date),'YYYY-MM-DD') as to_date

FROM core left join fiba_europe_comp_winpct pct on core.metadata_competition_name = pct.competition_name
-- WHERE (case when lower('{{selectedAge}}') = 'all' then 'all' else age end) = lower('{{selectedAge}}')
-- and  (case when lower('{{selectedSex}}') = 'all' then 'all' else sex end) = lower('{{selectedSex}}')
group by 1,2,3,4
) as ss
order by 2,3,1;


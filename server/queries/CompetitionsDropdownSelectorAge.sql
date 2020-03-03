-- SELECT DISTINCT competition_name_age as value
-- 							,competition_name_age as label
-- ,(case when competition_name_age = 'Adult' then 1 else 2 end) as boo
-- FROM fiba_europe_game_xref_final
-- order by (case when competition_name_age = 'Adult' then 1 else 2 end),competition_name_age desc

SELECT *
FROM 
(
SELECT 'Adult' as value, 'Adult' as label UNION
SELECT 'U20' as value, 'U20' as label UNION
SELECT 'U18' as value, 'U18' as label UNION
SELECT 'U16' as value, 'U16' as label
) as core
order by (case when value = 'Adult' then 1 else 2 end),value desc
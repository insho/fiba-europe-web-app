
-- SELECT DISTINCT competition_name_sex as value
-- 							,competition_name_sex as label
-- ,(case when competition_name_sex = 'female' then 1 else 2 end) as boo
-- FROM fiba_europe_game_xref_final
-- -- FROM fiba_europe_game_xref
-- order by (case when competition_name_sex = 'female' then 1 else 2 end),competition_name_sex desc

SELECT *
FROM 
(
SELECT 'male' as value, 'male' as label UNION
SELECT 'female' as value, 'female' as label
) as core
order by value asc
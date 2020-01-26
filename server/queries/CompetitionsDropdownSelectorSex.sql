
SELECT DISTINCT competition_name_sex as value
							,competition_name_sex as label
,(case when competition_name_sex = 'female' then 1 else 2 end) as boo
FROM joe.fiba_europe_game_xref_final
order by (case when competition_name_sex = 'female' then 1 else 2 end),competition_name_sex desc
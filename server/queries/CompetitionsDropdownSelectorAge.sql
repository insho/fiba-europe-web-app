SELECT DISTINCT competition_name_age as value
							,competition_name_age as label
,(case when competition_name_age = 'Adult' then 1 else 2 end) as boo
FROM joe.fiba_europe_game_xref_final
order by (case when competition_name_age = 'Adult' then 1 else 2 end),competition_name_age desc
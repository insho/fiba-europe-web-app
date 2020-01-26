-- SELECT *
-- FROM 
-- (
SELECT DISTINCT metadata_competition_name as label
                ,metadata_competition_name as value
        -- ,row_numbeR() OVER (partition by metadata_competition_name order by insert_date desc) as safe_rank
FROM joe.fiba_europe_competition_xref
-- ) as s1
-- where safe_rank = 1
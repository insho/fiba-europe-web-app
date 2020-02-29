SELECT match_id
    ,minute
    ,win_pct
    -- ,win_pct_somepredictors
    -- ,win_pct_severalpredictors
    -- ,win_pct_manypredictors
    ,(case when ',,' || '{{tagsString}}' || ',,' like '%,,' || 'somepredictorsA' || ',,%' then  win_pct_somepredictors else null end) as win_pct_somepredictors 
,(case when ',,' || '{{tagsString}}' || ',,' like '%,,' || 'severalpredictorsA' || ',,%' then  win_pct_severalpredictors else null end) as win_pct_severalpredictors 
,(case when ',,' || '{{tagsString}}' || ',,' like '%,,' || 'manypredictorsA' || ',,%' then  win_pct_manypredictors else null end) as win_pct_manypredictors 

    ,final_winner_hometeam
FROM fiba_europe_alg_match_win_pct_x_minute
where match_id = '{{matchId}}'
order by minute


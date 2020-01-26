
WITH scores as (SELECT ending_score_period1_hometeam
                     , ending_score_period1_awayteam
                     , ending_score_period2_hometeam
                     , ending_score_period2_awayteam
                     , ending_score_period3_hometeam
                     , ending_score_period3_awayteam
                     , ending_score_period4_hometeam
                     , ending_score_period4_awayteam
                     , final_score_awayteam
                     , final_score_hometeam
,team_name_hometeam
,team_name_awayteam
                FROM fiba_europe_game_xref
                where match_id = '{{matchId}}'
)
SELECT  ending_score_period1_hometeam as score_hometeam
        ,ending_score_period1_awayteam as score_awayteam
        ,'P1' as period
        ,1 as period_number
FROM scores
UNION
SELECT  ending_score_period2_hometeam - ending_score_period1_hometeam as score_hometeam
        ,ending_score_period2_awayteam - ending_score_period1_awayteam as score_awayteam
        ,'P2' as period
        ,2 as period_number
FROM scores
UNION
SELECT  ending_score_period3_hometeam - ending_score_period2_hometeam as score_hometeam
        ,ending_score_period3_awayteam - ending_score_period2_awayteam as score_awayteam
        ,'P3' as period
        ,3 as period_number
FROM scores
UNION
SELECT  ending_score_period4_hometeam - ending_score_period3_hometeam  as score_hometeam
        ,ending_score_period4_awayteam - ending_score_period3_awayteam  as score_awayteam
        ,'P4' as period
        ,4 as period_number
FROM scores
UNION
SELECT final_score_hometeam - ending_score_period4_hometeam  as score_hometeam
        ,final_score_awayteam - ending_score_period4_awayteam as score_awayteam
        ,'P5' as period
        ,5 as period_number
FROM scores
WHERE final_score_hometeam > ending_score_period4_hometeam
or final_score_awayteam > ending_score_period4_awayteam
order by period_number

;


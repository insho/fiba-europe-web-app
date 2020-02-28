
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
SELECT  team_name_hometeam as team_name
        ,ending_score_period1_hometeam as period1
        ,ending_score_period2_hometeam - ending_score_period1_hometeam as period2
        ,ending_score_period3_hometeam - ending_score_period2_hometeam as period3
        ,ending_score_period4_hometeam - ending_score_period3_hometeam  as period4
        ,final_score_hometeam - ending_score_period4_hometeam as period5
        ,final_score_hometeam as final
        ,1 as team_rank
FROM scores
UNION

SELECT  team_name_awayteam as team_name
        ,ending_score_period1_awayteam as period1
        ,ending_score_period2_awayteam - ending_score_period1_awayteam as period2
        ,ending_score_period3_awayteam - ending_score_period2_awayteam as period3
        ,ending_score_period4_awayteam - ending_score_period3_awayteam  as period4
        ,final_score_awayteam - ending_score_period4_awayteam as period5
        ,final_score_awayteam as final
        ,2 as team_rank
FROM scores

;

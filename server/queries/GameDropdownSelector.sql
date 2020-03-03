        SELECT value,label
        FROM 
        (
        SELECT DISTINCT a.match_id as value
        ,coalesce(to_char(schedule_date,'YYYY-MM-DD'),'Unknown') as schedule_date
        ,team_name_hometeam
        ,team_name_awayteam
        ,coalesce(to_char(schedule_date,'YYYY-MM-DD'),'Unknown') || ' ' || team_name_hometeam || ' vs ' || team_name_awayteam as label
        ,metadata_competition_name
         
        FROM fiba_europe_game_xref a inner join (
                SELECT DISTINCT match_id from fiba_europe_games_master
        ) b on a.match_id::bigint = b.match_id::bigint
        WHERE metadata_competition_name = '{{selectedCompetition}}'
        ) as s1
        order by schedule_date

        

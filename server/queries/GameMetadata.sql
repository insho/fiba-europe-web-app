SELECT match_id
        ,metadata_competition_name
        ,page_header_text as metadata_competition_name_detail
        ,match_location
        ,schedule_date
        ,to_char(schedule_date,'MON DD, YYYY') as schedule_date_text
        ,boxscore_url
        ,schedule_page_id

        ,logo_url_competition

        ,team_name_hometeam
        ,logo_url_hometeam
        ,hometeam_photo_pbp

        ,team_name_awayteam
        ,logo_url_awayteam
        ,awayteam_photo_pbp

        ,final_score_hometeam
        ,final_score_awayteam
        ,winner_hometeam

        ,ending_score_period1_hometeam
        ,ending_score_period1_awayteam
        ,ending_score_period2_hometeam
        ,ending_score_period2_awayteam
        ,ending_score_period3_hometeam
        ,ending_score_period3_awayteam
        ,ending_score_period4_hometeam
        ,ending_score_period4_awayteam

FROM fiba_europe_game_xref
where match_id = '{{matchId}}'

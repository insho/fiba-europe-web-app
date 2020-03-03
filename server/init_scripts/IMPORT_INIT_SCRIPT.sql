

--- PART 1 - CREATE MASTER GAMES TABLE IF NECESSARY, AND ADD TO IT SHIT FROM IMPORT TABLE

create table if not exists fiba_europe_games_master
(
	match_id text,
	row_number bigint,
	period bigint,
	current_team_performing_stat_action bigint,
	scoring_stat_hometeam_full text,
	scoring_stat_awayteam_full text,
	full_text text,
	time_remaining_in_period text,
	minutes_remaining_in_period bigint,
	current_score_hometeam double precision,
	current_score_awayteam double precision,
	hometeam_photo_pbp text,
	awayteam_photo_pbp text,
	stat_action_hometeam text,
	substitution_player_in_hometeam text,
	stat_action_awayteam text,
	substitution_player_in_awayteam text,
	substitution_player_out_awayteam text,
	substitution_player_out_hometeam text,
	metadata_competition_name text,
	competition_round text,
	team_name_hometeam text,
	team_name_awayteam text,
	logo_url_competition text,
	logo_url_hometeam text,
	logo_url_awayteam text,
	ending_score_period1_hometeam double precision,
	ending_score_period1_awayteam double precision,
	ending_score_period2_hometeam double precision,
	ending_score_period2_awayteam double precision,
	ending_score_period3_hometeam double precision,
	ending_score_period3_awayteam double precision,
	ending_score_period4_hometeam double precision,
	ending_score_period4_awayteam double precision,
	ending_score_period5_hometeam double precision,
	ending_score_period5_awayteam double precision,
	starting_five_hometeam text,
	starting_five_awayteam text,
	shot_missed_player_hometeam text,
	shot_missed_type_hometeam text,
	stat_action_assist_hometeam text,
	offensive_rebound_player_hometeam text,
	offensive_rebounds_by_player_hometeam double precision,
	points_scored_player_hometeam text,
	points_scored_type_hometeam text,
	points_scored_by_player_hometeam double precision,
	points_scored_player_awayteam text,
	points_scored_type_awayteam text,
	points_scored_by_player_awayteam double precision,
	stat_action_assist_awayteam text,
	scoring_assist_player_awayteam text,
	scoring_assists_by_player_awayteam double precision,
	turnover_committed_player_hometeam text,
	turnover_committed_type_hometeam text,
	turnover_committed_by_player_count_hometeam double precision,
	shot_missed_player_awayteam text,
	shot_missed_type_awayteam text,
	foul_committed_player_hometeam text,
	team_fouls_committed_hometeam double precision,
	player_personal_fouls_committed_hometeam double precision,
	foul_drawn_player_awayteam text,
	points_scored_subtype_hometeam text,
	scoring_assist_player_hometeam text,
	scoring_assists_by_player_hometeam double precision,
	defensive_rebound_player_hometeam text,
	defensive_rebounds_by_player_hometeam double precision,
	defensive_rebound_player_awayteam text,
	defensive_rebounds_by_player_awayteam double precision,
	offensive_rebound_player_awayteam text,
	offensive_rebounds_by_player_awayteam double precision,
	foul_drawn_player_hometeam text,
	foul_committed_player_awayteam text,
	team_fouls_committed_awayteam double precision,
	player_personal_fouls_committed_awayteam double precision,
	turnover_committed_player_awayteam text,
	turnover_committed_type_awayteam text,
	turnover_committed_by_player_count_awayteam double precision,
	points_scored_subtype_awayteam text,
	shot_blocked_hometeam text,
	shot_block_detail text,
	shot_blocked_awayteam text,
	avg_time_between_scoring_events_overall_hometeam double precision,
	avg_time_between_scoring_events_quarter_hometeam double precision,
	avg_time_between_scoring_events_overall double precision,
	avg_time_between_scoring_events_quarter double precision,
	avg_time_between_scoring_events_overall_awayteam double precision,
	avg_time_between_scoring_events_quarter_awayteam double precision,
	current_lead_hometeam double precision,
	cumulative_lead_changes_game double precision,
	cumulative_avg_abs_size_of_lead_game double precision,
	cumulative_max_abs_size_of_lead_game double precision,
	cumulative_max_size_of_lead_game_hometeam double precision,
	cumulative_max_size_of_lead_game_awayteam double precision,
	cumulative_lead_changes_quarter double precision,
	avg_abs_size_of_lead_quarter double precision,
	cumulative_avg_abs_size_of_lead_quarter double precision,
	cumulative_max_abs_size_of_lead_quarter double precision,
	cumulative_max_size_of_lead_quarter_hometeam double precision,
	cumulative_max_size_of_lead_quarter_awayteam double precision,
	cumulative_possessions_overall_hometeam double precision,
	cumulative_possessions_overall_awayteam double precision,
	cumulative_possessions_quarter_hometeam double precision,
	cumulative_possessions_quarter_awayteam double precision,
	starting_five_in_play_hometeam double precision,
	top_five_scorers_in_play_hometeam double precision,
	points_scored_by_players_in_play_hometeam double precision,
	percent_of_total_points_scored_by_players_in_play_hometeam double precision,
	top_five_players_in_play_hometeam double precision,
	total_stat_count_players_in_play_hometeam double precision,
	percent_of_total_stat_count_by_players_in_play_hometeam double precision,
	starting_five_in_play_awayteam double precision,
	top_five_scorers_in_play_awayteam double precision,
	points_scored_by_players_in_play_awayteam double precision,
	percent_of_total_points_scored_by_players_in_play_awayteam double precision,
	top_five_players_in_play_awayteam double precision,
	total_stat_count_players_in_play_awayteam double precision,
	percent_of_total_stat_count_by_players_in_play_awayteam double precision,
	insert_date timestamp
);

alter table fiba_europe_games_master owner to joe;



/*

SELECT safe_rank,count(*) as xcount
FROM (
  SELECT *
      ,row_number() OVER (partition by match_id,row_number order by natural_order_rank asc) as safe_rank
  FROM (
    SELECT *
        ,row_number() OVER () as natural_order_rank
    FROM fiba_europe_games_import
  ) s1
) s2
WHERE safe_rank = 1
;
*/

-- SELECT *
-- ,now()
-- FROM fiba_europe_games_import
-- ;



DELETE FROM fiba_europe_games_master where match_id in (
    SELECT match_id FROM fiba_europe_games_import where match_id is not null
    );

INSERT INTO fiba_europe_games_master

SELECT match_id
	,row_number
	,period
	,current_team_performing_stat_action
	,scoring_stat_hometeam_full
	,scoring_stat_awayteam_full
	,full_text
	,time_remaining_in_period
	,minutes_remaining_in_period
	,current_score_hometeam
	,current_score_awayteam
	,hometeam_photo_pbp
	,awayteam_photo_pbp
	,stat_action_hometeam
	,substitution_player_in_hometeam
	,stat_action_awayteam
	,substitution_player_in_awayteam
	,substitution_player_out_awayteam
	,substitution_player_out_hometeam
	,metadata_competition_name
	,competition_round
	,team_name_hometeam
	,team_name_awayteam
	,logo_url_competition
	,logo_url_hometeam
	,logo_url_awayteam
	,ending_score_period1_hometeam
	,ending_score_period1_awayteam
	,ending_score_period2_hometeam
	,ending_score_period2_awayteam
	,ending_score_period3_hometeam
	,ending_score_period3_awayteam
	,ending_score_period4_hometeam
	,ending_score_period4_awayteam
	,ending_score_period5_hometeam
	,ending_score_period5_awayteam
	,starting_five_hometeam
	,starting_five_awayteam
	,shot_missed_player_hometeam
	,shot_missed_type_hometeam
	,stat_action_assist_hometeam
	,offensive_rebound_player_hometeam
	,offensive_rebounds_by_player_hometeam
	,points_scored_player_hometeam
	,points_scored_type_hometeam
	,points_scored_by_player_hometeam
	,points_scored_player_awayteam
	,points_scored_type_awayteam
	,points_scored_by_player_awayteam
	,stat_action_assist_awayteam
	,scoring_assist_player_awayteam
	,scoring_assists_by_player_awayteam
	,turnover_committed_player_hometeam
	,turnover_committed_type_hometeam
	,turnover_committed_by_player_count_hometeam
	,shot_missed_player_awayteam
	,shot_missed_type_awayteam
	,foul_committed_player_hometeam
	,team_fouls_committed_hometeam
	,player_personal_fouls_committed_hometeam
	,foul_drawn_player_awayteam
	,points_scored_subtype_hometeam
	,scoring_assist_player_hometeam
	,scoring_assists_by_player_hometeam
	,defensive_rebound_player_hometeam
	,defensive_rebounds_by_player_hometeam
	,defensive_rebound_player_awayteam
	,defensive_rebounds_by_player_awayteam
	,offensive_rebound_player_awayteam
	,offensive_rebounds_by_player_awayteam
	,foul_drawn_player_hometeam
	,foul_committed_player_awayteam
	,team_fouls_committed_awayteam
	,player_personal_fouls_committed_awayteam
	,turnover_committed_player_awayteam
	,turnover_committed_type_awayteam
	,turnover_committed_by_player_count_awayteam
	,points_scored_subtype_awayteam
	,shot_blocked_hometeam
	,shot_block_detail
	,shot_blocked_awayteam
	,avg_time_between_scoring_events_overall_hometeam
	,avg_time_between_scoring_events_quarter_hometeam
	,avg_time_between_scoring_events_overall
	,avg_time_between_scoring_events_quarter
	,avg_time_between_scoring_events_overall_awayteam
	,avg_time_between_scoring_events_quarter_awayteam
	,current_lead_hometeam
	,cumulative_lead_changes_game
	,cumulative_avg_abs_size_of_lead_game
	,cumulative_max_abs_size_of_lead_game
	,cumulative_max_size_of_lead_game_hometeam
	,cumulative_max_size_of_lead_game_awayteam
	,cumulative_lead_changes_quarter
	,avg_abs_size_of_lead_quarter
	,cumulative_avg_abs_size_of_lead_quarter
	,cumulative_max_abs_size_of_lead_quarter
	,cumulative_max_size_of_lead_quarter_hometeam
	,cumulative_max_size_of_lead_quarter_awayteam
	,cumulative_possessions_overall_hometeam
	,cumulative_possessions_overall_awayteam
	,cumulative_possessions_quarter_hometeam
	,cumulative_possessions_quarter_awayteam
	,starting_five_in_play_hometeam
	,top_five_scorers_in_play_hometeam
	,points_scored_by_players_in_play_hometeam
	,percent_of_total_points_scored_by_players_in_play_hometeam
	,top_five_players_in_play_hometeam
	,total_stat_count_players_in_play_hometeam
	,percent_of_total_stat_count_by_players_in_play_hometeam
	,starting_five_in_play_awayteam
	,top_five_scorers_in_play_awayteam
	,points_scored_by_players_in_play_awayteam
	,percent_of_total_points_scored_by_players_in_play_awayteam
	,top_five_players_in_play_awayteam
	,total_stat_count_players_in_play_awayteam
	,percent_of_total_stat_count_by_players_in_play_awayteam
	,now() as insert_date
 FROM (
  SELECT *
      ,row_number() over (partition by match_id,row_number) as safe_rank
  FROM fiba_europe_games_import
) as s1
where safe_rank = 1
order by match_id,row_number
;



--- PART 2 - CREATE METADATA DICTIONARY OF COMPETITIONS, AND WHAT SEX/AGE GROUP THEY BELONG TO

DROP TABLE IF EXISTS fiba_europe_league_sex;

CREATE TABLE fiba_europe_league_sex as (

SELECT 'women' as search_term, 'female' as league_sex UNION
SELECT 'Women' as search_term, 'female' as league_sex UNION
SELECT 'female' as search_term, 'female' as league_sex UNION
SELECT 'ladies' as search_term, 'female' as league_sex UNION
SELECT 'Female' as search_term, 'female' as league_sex UNION
SELECT 'Ladies' as search_term, 'female' as league_sex UNION
SELECT 'lady' as search_term, 'female' as league_sex UNION
SELECT 'Lady' as search_term, 'female' as league_sex UNION
SELECT 'Feminin' as search_term, 'female' as league_sex UNION
SELECT 'feminin' as search_term, 'female' as league_sex UNION
SELECT 'girl' as search_term, 'female' as league_sex UNION
SELECT 'Girl' as search_term, 'female' as league_sex UNION
SELECT 'femmin' as search_term, 'female' as league_sex UNION
SELECT 'Femmin' as search_term, 'female' as league_sex UNION
SELECT 'Femen' as search_term, 'female' as league_sex UNION
SELECT 'femen'          as search_term, 'female' as league_sex UNION
SELECT 'Woman' as search_term, 'female' as league_sex UNION
SELECT 'woman' as search_term, 'female' as league_sex UNION
SELECT 'Femen' as search_term, 'female' as league_sex UNION
SELECT 'femen' as search_term, 'female' as league_sex UNION
SELECT 'Damen' as search_term, 'female' as league_sex UNION
SELECT 'damen' as search_term, 'female' as league_sex UNION
SELECT 'U22W' as search_term, 'female' as league_sex UNION
SELECT 'U21W' as search_term, 'female' as league_sex UNION
SELECT 'U20W' as search_term, 'female' as league_sex UNION
SELECT 'U19W'                as search_term, 'female' as league_sex UNION
SELECT 'U18W' as search_term, 'female' as league_sex UNION
SELECT 'U16W' as search_term, 'female' as league_sex UNION
SELECT 'U15W' as search_term, 'female' as league_sex UNION
SELECT 'U14W' as search_term, 'female' as league_sex UNION
SELECT 'U13W' as search_term, 'female' as league_sex UNION
SELECT 'U12W' as search_term, 'female' as league_sex UNION
SELECT 'U11W' as search_term, 'female' as league_sex UNION
SELECT 'U10W' as search_term, 'female' as league_sex UNION
SELECT 'U22w' as search_term, 'female' as league_sex UNION
SELECT 'U21w' as search_term, 'female' as league_sex UNION
SELECT 'U20w' as search_term, 'female' as league_sex UNION
SELECT 'U19w'                as search_term, 'female' as league_sex UNION
SELECT 'U18w' as search_term, 'female' as league_sex UNION
SELECT 'U16w' as search_term, 'female' as league_sex UNION
SELECT 'U15w' as search_term, 'female' as league_sex UNION
SELECT 'U14w' as search_term, 'female' as league_sex UNION
SELECT 'U13w' as search_term, 'female' as league_sex UNION
SELECT 'U12w' as search_term, 'female' as league_sex UNION
SELECT 'U11w' as search_term, 'female' as league_sex UNION
SELECT 'U10w' as search_term, 'female' as league_sex UNION
SELECT '22 W' as search_term, 'female' as league_sex UNION
SELECT '21 W' as search_term, 'female' as league_sex UNION
SELECT '20 W' as search_term, 'female' as league_sex UNION
SELECT '19 W'                as search_term, 'female' as league_sex UNION
SELECT '18 W' as search_term, 'female' as league_sex UNION
SELECT '16 W' as search_term, 'female' as league_sex UNION
SELECT '15 W' as search_term, 'female' as league_sex UNION
SELECT '14 W' as search_term, 'female' as league_sex UNION
SELECT '13 W' as search_term, 'female' as league_sex UNION
SELECT '12 W' as search_term, 'female' as league_sex UNION
SELECT '11 W' as search_term, 'female' as league_sex UNION
SELECT '10 W' as search_term, 'female' as league_sex UNION
SELECT '22 w' as search_term, 'female' as league_sex UNION
SELECT '21 w' as search_term, 'female' as league_sex UNION
SELECT '20 w' as search_term, 'female' as league_sex UNION
SELECT '19 w'                as search_term, 'female' as league_sex UNION
SELECT '18 w' as search_term, 'female' as league_sex UNION
SELECT '16 w' as search_term, 'female' as league_sex UNION
SELECT '15 w' as search_term, 'female' as league_sex UNION
SELECT '14 w' as search_term, 'female' as league_sex UNION
SELECT '13 w' as search_term, 'female' as league_sex UNION
SELECT '12 w' as search_term, 'female' as league_sex UNION
SELECT '11 w' as search_term, 'female' as league_sex UNION
SELECT '10 w'     as search_term, 'female' as league_sex UNION
SELECT '22W' as search_term, 'female' as league_sex UNION
SELECT '21W' as search_term, 'female' as league_sex UNION
SELECT '20W' as search_term, 'female' as league_sex UNION
SELECT '19W'                as search_term, 'female' as league_sex UNION
SELECT '18W' as search_term, 'female' as league_sex UNION
SELECT '16W' as search_term, 'female' as league_sex UNION
SELECT '15W' as search_term, 'female' as league_sex UNION
SELECT '14W' as search_term, 'female' as league_sex UNION
SELECT '13W' as search_term, 'female' as league_sex UNION
SELECT '12W' as search_term, 'female' as league_sex UNION
SELECT '11W' as search_term, 'female' as league_sex UNION
SELECT '10W' as search_term, 'female' as league_sex UNION
SELECT '22w' as search_term, 'female' as league_sex UNION
SELECT '21w' as search_term, 'female' as league_sex UNION
SELECT '20w' as search_term, 'female' as league_sex UNION
SELECT '19w'                as search_term, 'female' as league_sex UNION
SELECT '18w' as search_term, 'female' as league_sex UNION
SELECT '16w' as search_term, 'female' as league_sex UNION
SELECT '15w' as search_term, 'female' as league_sex UNION
SELECT '14w' as search_term, 'female' as league_sex UNION
SELECT '13w' as search_term, 'female' as league_sex UNION
SELECT '12w' as search_term, 'female' as league_sex UNION
SELECT '11w' as search_term, 'female' as league_sex UNION
SELECT '10w'               as search_term, 'female' as league_sex UNION
SELECT 'γυναίκες' as search_term, 'female' as league_sex UNION
SELECT 'Γυναίκα' as search_term, 'female' as league_sex UNION
SELECT 'γυνή' as search_term, 'female' as league_sex UNION
SELECT 'Γυναίκες' as search_term, 'female' as league_sex UNION
SELECT 'Dames' as search_term, 'female' as league_sex UNION
SELECT 'dames' as search_term, 'female' as league_sex UNION
SELECT 'Dámské' as search_term, 'female' as league_sex UNION
SELECT 'dámské' as search_term, 'female' as league_sex UNION
SELECT 'Kobiet' as search_term, 'female' as league_sex UNION
SELECT 'kobiet' as search_term, 'female' as league_sex UNION
SELECT 'ženy' as search_term, 'female' as league_sex UNION
SELECT 'Wom ' as search_term, 'female' as league_sex UNION
SELECT 'Dziewcząt' as search_term, 'female' as league_sex UNION
SELECT 'Γυναικών' as search_term, 'female' as league_sex UNION
SELECT 'djevojčice' as search_term, 'female' as league_sex UNION
SELECT 'Sub-16 Fem' as search_term, 'female' as league_sex UNION
SELECT 'Γυναικών' as search_term, 'female' as league_sex UNION
SELECT 'ŽENE' as search_term, 'female' as league_sex UNION
SELECT ' Ž' as search_term, 'female' as league_sex UNION
SELECT ' Ž' as search_term, 'female' as league_sex
);

-- SELECT count(*) FROM fiba_europe_league_sex;


INSERT INTO fiba_europe_league_sex
SELECT 'men' as search_term, 'male' as league_sex UNION
SELECT 'Men' as search_term, 'male' as league_sex UNION
SELECT 'Male' as search_term, 'male' as league_sex UNION
SELECT 'male' as search_term, 'male' as league_sex UNION
SELECT 'man' as search_term, 'male' as league_sex UNION
SELECT 'Man' as search_term, 'male' as league_sex UNION
SELECT 'gentle' as search_term, 'male' as league_sex UNION
SELECT 'Gentle' as search_term, 'male' as league_sex UNION
SELECT 'Mascul' as search_term, 'male' as league_sex UNION
SELECT 'mascul' as search_term, 'male' as league_sex UNION
SELECT 'boy' as search_term, 'male' as league_sex UNION
SELECT 'Boy' as search_term, 'male' as league_sex UNION
SELECT 'Herre' as search_term, 'male' as league_sex UNION
SELECT 'herre' as search_term, 'male' as league_sex UNION
SELECT 'homme' as search_term, 'male' as league_sex UNION
SELECT 'Homme' as search_term, 'male' as league_sex UNION
SELECT 'Mężczyzn' as search_term, 'male' as league_sex UNION
SELECT 'Ανδρών' as search_term, 'male' as league_sex UNION
SELECT 'Mężczyzn' as search_term, 'male' as league_sex UNION
SELECT 'Chłopców' as search_term, 'male' as league_sex UNION
SELECT 'Heren' as search_term, 'male' as league_sex UNION
SELECT 'heren' as search_term, 'male' as league_sex UNION
SELECT 'deild karla' as search_term, 'male' as league_sex UNION
SELECT 'dječake' as search_term, 'male' as league_sex UNION
SELECT 'Varonil' as search_term, 'male' as league_sex UNION
SELECT 'varonil' as search_term, 'male' as league_sex UNION
SELECT 'Mężczyzn' as search_term, 'male' as league_sex
    ;

DROP TABLE IF EXISTS fiba_europe_league_age;

CREATE TABLE fiba_europe_league_age as (

SELECT 'U8' as search_term, 'U8' as age UNION
SELECT 'Under 8' as search_term, 'U8' as age UNION
SELECT 'under 8' as search_term, 'U8' as age UNION
SELECT 'u8' as search_term, 'U8' as age UNION
SELECT 'U-8' as search_term, 'U8' as age UNION
SELECT 'u-8' as search_term, 'U8' as age UNION
SELECT 'Sub 8' as search_term, 'U8' as age UNION
SELECT 'Sub-8' as search_term, 'U8' as age UNION
SELECT 'sub 8' as search_term, 'U8' as age UNION
SELECT 'sub-8' as search_term, 'U8' as age UNION

SELECT 'U9' as search_term, 'U9' as age UNION
SELECT 'Under 9' as search_term, 'U9' as age UNION
SELECT 'under 9' as search_term, 'U9' as age UNION
SELECT 'u9' as search_term, 'U9' as age UNION
SELECT 'U-9' as search_term, 'U9' as age UNION
SELECT 'u-9' as search_term, 'U9' as age UNION
SELECT 'Sub 9' as search_term, 'U9' as age UNION
SELECT 'Sub-9' as search_term, 'U9' as age UNION
SELECT 'sub 9' as search_term, 'U9' as age UNION
SELECT 'sub-9' as search_term, 'U9' as age UNION


SELECT 'U10' as search_term, 'U10' as age UNION
SELECT 'Under 10' as search_term, 'U10' as age UNION
SELECT 'under 10' as search_term, 'U10' as age UNION
SELECT 'u10' as search_term, 'U10' as age UNION
SELECT 'U-10' as search_term, 'U10' as age UNION
SELECT 'u-10' as search_term, 'U10' as age UNION
SELECT 'Sub 10' as search_term, 'U10' as age UNION
SELECT 'Sub-10' as search_term, 'U10' as age UNION
SELECT 'sub 10' as search_term, 'U10' as age UNION
SELECT 'sub-10' as search_term, 'U10' as age UNION




SELECT 'U11' as search_term, 'U11' as age UNION
SELECT 'Under 11' as search_term, 'U11' as age UNION
SELECT 'under 11' as search_term, 'U11' as age UNION
SELECT 'u11' as search_term, 'U11' as age UNION
SELECT 'U-11' as search_term, 'U11' as age UNION
SELECT 'u-11' as search_term, 'U11' as age UNION
SELECT 'Sub 11' as search_term, 'U11' as age UNION
SELECT 'Sub-11' as search_term, 'U11' as age UNION
SELECT 'sub 11' as search_term, 'U11' as age UNION
SELECT 'sub-11' as search_term, 'U11' as age UNION



SELECT 'U12' as search_term, 'U12' as age UNION
SELECT 'Under 12' as search_term, 'U12' as age UNION
SELECT 'under 12' as search_term, 'U12' as age UNION
SELECT 'u12' as search_term, 'U12' as age UNION
SELECT 'U-12' as search_term, 'U12' as age UNION
SELECT 'u-12' as search_term, 'U12' as age UNION
SELECT 'Sub 12' as search_term, 'U12' as age UNION
SELECT 'Sub-12' as search_term, 'U12' as age UNION
SELECT 'sub 12' as search_term, 'U12' as age UNION
SELECT 'sub-12' as search_term, 'U12' as age UNION



SELECT 'U13' as search_term, 'U13' as age UNION
SELECT 'Under 13' as search_term, 'U13' as age UNION
SELECT 'under 13' as search_term, 'U13' as age UNION
SELECT 'u13' as search_term, 'U13' as age UNION
SELECT 'U-13' as search_term, 'U13' as age UNION
SELECT 'u-13' as search_term, 'U13' as age UNION
SELECT 'Sub 13' as search_term, 'U13' as age UNION
SELECT 'Sub-13' as search_term, 'U13' as age UNION
SELECT 'sub 13' as search_term, 'U13' as age UNION
SELECT 'sub-13' as search_term, 'U13' as age UNION


SELECT 'U14' as search_term, 'U14' as age UNION
SELECT 'Under 14' as search_term, 'U14' as age UNION
SELECT 'under 14' as search_term, 'U14' as age UNION
SELECT 'u14' as search_term, 'U14' as age UNION
SELECT 'U-14' as search_term, 'U14' as age UNION
SELECT 'u-14' as search_term, 'U14' as age UNION
SELECT 'Sub 14' as search_term, 'U14' as age UNION
SELECT 'Sub-14' as search_term, 'U14' as age UNION
SELECT 'sub 14' as search_term, 'U14' as age UNION
SELECT 'sub-14' as search_term, 'U14' as age UNION


SELECT 'U15' as search_term, 'U15' as age UNION
SELECT 'Under 15' as search_term, 'U15' as age UNION
SELECT 'under 15' as search_term, 'U15' as age UNION
SELECT 'u15' as search_term, 'U15' as age UNION
SELECT 'U-15' as search_term, 'U15' as age UNION
SELECT 'u-15' as search_term, 'U15' as age UNION
SELECT 'Sub 15' as search_term, 'U15' as age UNION
SELECT 'Sub-15' as search_term, 'U15' as age UNION
SELECT 'sub 15' as search_term, 'U15' as age UNION
SELECT 'sub-15' as search_term, 'U15' as age UNION



SELECT 'U16' as search_term, 'U16' as age UNION
SELECT 'Under 16' as search_term, 'U16' as age UNION
SELECT 'under 16' as search_term, 'U16' as age UNION
SELECT 'u16' as search_term, 'U16' as age UNION
SELECT 'U-16' as search_term, 'U16' as age UNION
SELECT 'u-16' as search_term, 'U16' as age UNION
SELECT 'Sub 16' as search_term, 'U16' as age UNION
SELECT 'Sub-16' as search_term, 'U16' as age UNION
SELECT 'sub 16' as search_term, 'U16' as age UNION
SELECT 'sub-16' as search_term, 'U16' as age UNION



SELECT 'U17' as search_term, 'U17' as age UNION
SELECT 'Under 17' as search_term, 'U17' as age UNION
SELECT 'under 17' as search_term, 'U17' as age UNION
SELECT 'u17' as search_term, 'U17' as age UNION
SELECT 'U-17' as search_term, 'U17' as age UNION
SELECT 'u-17' as search_term, 'U17' as age UNION
SELECT 'Sub 17' as search_term, 'U17' as age UNION
SELECT 'Sub-17' as search_term, 'U17' as age UNION
SELECT 'sub 17' as search_term, 'U17' as age UNION
SELECT 'sub-17' as search_term, 'U17' as age UNION




SELECT 'U18' as search_term, 'U18' as age UNION
SELECT 'Under 18' as search_term, 'U18' as age UNION
SELECT 'under 18' as search_term, 'U18' as age UNION
SELECT 'u18' as search_term, 'U18' as age UNION
SELECT 'U-18' as search_term, 'U18' as age UNION
SELECT 'u-18' as search_term, 'U18' as age UNION
SELECT 'Sub 18' as search_term, 'U18' as age UNION
SELECT 'Sub-18' as search_term, 'U18' as age UNION
SELECT 'sub 18' as search_term, 'U18' as age UNION
SELECT 'sub-18' as search_term, 'U18' as age UNION




SELECT 'U19' as search_term, 'U19' as age UNION
SELECT 'Under 19' as search_term, 'U19' as age UNION
SELECT 'under 19' as search_term, 'U19' as age UNION
SELECT 'u19' as search_term, 'U19' as age UNION
SELECT 'U-19' as search_term, 'U19' as age UNION
SELECT 'u-19' as search_term, 'U19' as age UNION
SELECT 'Sub 19' as search_term, 'U19' as age UNION
SELECT 'Sub-19' as search_term, 'U19' as age UNION
SELECT 'sub 19' as search_term, 'U19' as age UNION
SELECT 'sub-19' as search_term, 'U19' as age UNION



SELECT 'U20' as search_term, 'U20' as age UNION
SELECT 'Under 20' as search_term, 'U20' as age UNION
SELECT 'under 20' as search_term, 'U20' as age UNION
SELECT 'u20' as search_term, 'U20' as age UNION
SELECT 'U-20' as search_term, 'U20' as age UNION
SELECT 'u-20' as search_term, 'U20' as age UNION
SELECT 'Sub 20' as search_term, 'U20' as age UNION
SELECT 'Sub-20' as search_term, 'U20' as age UNION
SELECT 'sub 20' as search_term, 'U20' as age UNION
SELECT 'sub-20' as search_term, 'U20' as age UNION


SELECT 'U21' as search_term, 'U21' as age UNION
SELECT 'Under 21' as search_term, 'U21' as age UNION
SELECT 'under 21' as search_term, 'U21' as age UNION
SELECT 'u21' as search_term, 'U21' as age UNION
SELECT 'U-21' as search_term, 'U21' as age UNION
SELECT 'u-21' as search_term, 'U21' as age UNION
SELECT 'Sub 21' as search_term, 'U21' as age UNION
SELECT 'Sub-21' as search_term, 'U21' as age UNION
SELECT 'sub 21' as search_term, 'U21' as age UNION
SELECT 'sub-21' as search_term, 'U21' as age UNION



SELECT 'U22' as search_term, 'U22' as age UNION
SELECT 'Under 22' as search_term, 'U22' as age UNION
SELECT 'under 22' as search_term, 'U22' as age UNION
SELECT 'u22' as search_term, 'U22' as age UNION
SELECT 'U-22' as search_term, 'U22' as age UNION
SELECT 'u-22' as search_term, 'U22' as age UNION
SELECT 'Sub 22' as search_term, 'U22' as age UNION
SELECT 'Sub-22' as search_term, 'U22' as age UNION
SELECT 'sub 22' as search_term, 'U22' as age UNION
SELECT 'sub-22' as search_term, 'U22' as age UNION




SELECT 'U23' as search_term, 'U23' as age UNION
SELECT 'Under 23' as search_term, 'U23' as age UNION
SELECT 'under 23' as search_term, 'U23' as age UNION
SELECT 'u23' as search_term, 'U23' as age UNION
SELECT 'U-23' as search_term, 'U23' as age UNION
SELECT 'u-23' as search_term, 'U23' as age UNION
SELECT 'Sub 23' as search_term, 'U23' as age UNION
SELECT 'Sub-23' as search_term, 'U23' as age UNION
SELECT 'sub 23' as search_term, 'U23' as age UNION
SELECT 'sub-23' as search_term, 'U23' as age UNION




SELECT 'U24' as search_term, 'U24' as age UNION
SELECT 'Under 24' as search_term, 'U24' as age UNION
SELECT 'under 24' as search_term, 'U24' as age UNION
SELECT 'u24' as search_term, 'U24' as age UNION
SELECT 'U-24' as search_term, 'U24' as age UNION
SELECT 'u-24' as search_term, 'U24' as age UNION
SELECT 'Sub 24' as search_term, 'U24' as age UNION
SELECT 'Sub-24' as search_term, 'U24' as age UNION
SELECT 'sub 24' as search_term, 'U24' as age UNION
SELECT 'sub-24' as search_term, 'U24' as age UNION




SELECT 'Młodzików' as search_term, 'youth' as age UNION
SELECT 'Młodzieżowy' as search_term, 'youth' as age UNION
SELECT 'mlađe' as search_term, 'youth' as age UNION
SELECT 'Youth' as search_term, 'youth' as age UNION
SELECT 'Kids' as search_term, 'youth' as age UNION
SELECT 'kids' as search_term, 'youth' as age UNION
SELECT 'children' as search_term, 'youth' as age UNION
SELECT 'Children' as search_term, 'youth' as age UNION

SELECT 'senior' as search_term, 'senior' as age UNION
SELECT 'Senior' as search_term, 'senior' as age
);



-- SELECT * FROM fiba_europe_league_age;
-- SELECT * FROM fiba_europe_league_sex;

----------

drop table if exists fiba_europe_competition_xref;
create table fiba_europe_competition_xref (
  metadata_competition_name varchar(500),
  matches_count bigint,
  teams_count bigint,
  search_term_sex varchar(255),
  league_sex varchar(255),
  search_term_age varchar(255),
  league_age varchar(255),
  insert_date timestamp
);

-- truncate table fiba_europe_competition_xref;

INSERT INTO fiba_europe_competition_xref
SELECT DISTINCT metadata_competition_name
FROM fiba_europe_games_master
ORDER BY 1
;

UPDATE fiba_europe_competition_xref  SET search_term_sex = coalesce(B.search_term,search_term_sex), league_sex = coalesce(B.league_sex_update,league_sex),insert_date = now()
FROM (

  SELECT xx.metadata_competition_name
        ,search_term
        ,league_sex as league_sex_update
  FROM
  (
SELECT DISTINCT metadata_competition_name
FROM fiba_europe_games_master
  ) xx
left join (
  SELECT DISTINCT lower(search_term) as search_term
         ,league_sex
  FROM fiba_europe_league_sex
  where league_sex = 'male'
) as yy
  on lower(xx.metadata_competition_name) like '%' || search_term || '%'

  ) as B
WHERE fiba_europe_competition_xref.metadata_competition_name = B.metadata_competition_name;
;



UPDATE fiba_europe_competition_xref  SET search_term_sex = coalesce(B.search_term,search_term_sex), league_sex = coalesce(B.league_sex_update,league_sex),insert_date = now()
FROM (

  SELECT xx.metadata_competition_name
        ,search_term
        ,league_sex as league_sex_update
  FROM
  (
SELECT DISTINCT metadata_competition_name
FROM fiba_europe_games_master
  ) xx
left join (
  SELECT DISTINCT lower(search_term) as search_term
         ,league_sex
  FROM fiba_europe_league_sex
  where league_sex = 'female'
) as yy
  on lower(xx.metadata_competition_name) like '%' || search_term || '%'

  ) as B
WHERE fiba_europe_competition_xref.metadata_competition_name = B.metadata_competition_name;
;



UPDATE fiba_europe_competition_xref  SET search_term_age = B.search_term, league_age = B.league_age,insert_date = now()
FROM (

  SELECT xx.metadata_competition_name
        ,search_term
        ,league_age
  FROM
  (
SELECT DISTINCT metadata_competition_name
FROM fiba_europe_games_master
  ) xx
left join (
  SELECT DISTINCT lower(search_term) as search_term
         ,age as league_age
  FROM fiba_europe_league_age
) as yy
  on lower(xx.metadata_competition_name) like '%' || search_term || '%'

  ) as B
WHERE fiba_europe_competition_xref.metadata_competition_name = B.metadata_competition_name;
;




UPDATE fiba_europe_competition_xref  SET matches_count = B.matches_count, teams_count= B.teams_count,insert_date = now()
FROM
  (

SELECT games.metadata_competition_name
      ,games.matches_count
      ,unique_team_counts.teams_count

FROM
  (
SELECT metadata_competition_name
      ,count(distinct match_id) as matches_count
FROM fiba_europe_games_master
group by 1
    order by 1
  ) as games
inner join (

     SELECT metadata_competition_name
            ,count(distinct team_name) as teams_count
    FROM
    (
    SELECT DISTINCT metadata_competition_name,team_name_hometeam as team_name
    FROM fiba_europe_games_master
    where metadata_competition_name is not null and team_name_hometeam is not null
    UNION
    SELECT DISTINCT metadata_competition_name,team_name_awayteam as team_name
    FROM fiba_europe_games_master
    where metadata_competition_name is not null and team_name_awayteam is not null
    ) team_list
  GROUP BY 1
) as unique_team_counts
ON games.metadata_competition_name = unique_team_counts.metadata_competition_name
order by 1
  ) as B
WHERE fiba_europe_competition_xref.metadata_competition_name = B.metadata_competition_name;
;


-- asdf
--
-- SELECT * FROM fiba_europe_competition_xref;
--
--
--
-- ALTER TABLE fiba_europe_competition_xref add column schedule_date timestamp;
-- ALTER TABLE fiba_europe_competition_xref add column page_header_text text;
-- ALTER TABLE fiba_europe_competition_xref add column match_location text;
-- ALTER TABLE fiba_europe_competition_xref add column boxscore_url text;
-- ALTER TABLE fiba_europe_competition_xref add column schedule_page_id text;
--
--
--
-- UPDATE fiba_europe_competition_xref  SET schedule_date = B.schedule_date
--   , page_header_text= B.page_header_text
--   , match_location= cast(B.match_location as text)
--   , boxscore_url= B.boxscore_url
--   , schedule_page_id= B.schedule_page_id
--   ,insert_date = now()
-- FROM
--   (
--
-- SELECT *
-- FROM (
--   SELECT *
--       ,row_number()
--       OVER (partition by match_id, unique_row_rank_master order by (case when team_name_hometeam = match_hometeam and team_name_awayteam = match_awayteam
--                                                                            then 1
--                                                                          when team_name_hometeam = match_hometeam and
--                                                                               schedules_awayteam_contains_master_awayteam_score > 0
--                                                                            then 100 - schedules_awayteam_contains_master_awayteam_score
--                                                                          when team_name_awayteam = match_awayteam and
--                                                                               schedules_hometeam_contains_master_hometeam_score > 0
--                                                                            then 100 - schedules_hometeam_contains_master_hometeam_score
--                                                                          else 200 -
--                                                                               schedules_hometeam_contains_master_hometeam_score -
--                                                                               schedules_awayteam_contains_master_awayteam_score end) asc) as safe_rank_master
--       ,row_number()
--       OVER (partition by match_id, unique_row_rank_schedules order by (case when team_name_hometeam = match_hometeam and team_name_awayteam = match_awayteam
--                                                                               then 1
--                                                                             when team_name_hometeam = match_hometeam and
--                                                                                  schedules_awayteam_contains_master_awayteam_score > 0
--                                                                               then 100 - schedules_awayteam_contains_master_awayteam_score
--                                                                             when team_name_awayteam = match_awayteam and
--                                                                                  schedules_hometeam_contains_master_hometeam_score > 0
--                                                                               then 100 - schedules_hometeam_contains_master_hometeam_score
--                                                                             else 200 -
--                                                                                  schedules_hometeam_contains_master_hometeam_score -
--                                                                                  schedules_awayteam_contains_master_awayteam_score end) asc) as safe_rank_schedule
--
--   ,(case when team_name_hometeam = match_hometeam and team_name_awayteam = match_awayteam
--                                                                            then 1
--                                                                          when team_name_hometeam = match_hometeam and
--                                                                               schedules_awayteam_contains_master_awayteam_score > 0
--                                                                            then 100 - schedules_awayteam_contains_master_awayteam_score
--                                                                          when team_name_awayteam = match_awayteam and
--                                                                               schedules_hometeam_contains_master_hometeam_score > 0
--                                                                            then 100 - schedules_hometeam_contains_master_hometeam_score
--                                                                          else 200 -
--                                                                               schedules_hometeam_contains_master_hometeam_score -
--                                                                               schedules_awayteam_contains_master_awayteam_score end) as combo_score
--
--   FROM (
--     SELECT xx.match_id
--         ,xx.team_name_hometeam
--         ,xx.team_name_awayteam
--         ,yy.team_name_hometeam as match_hometeam
--         ,yy.team_name_awayteam as match_awayteam
--         ,schedule_date
--         ,page_header_text
--         ,match_location
--         ,boxscore_url
--         ,schedule_page_id
--         ,unique_row_rank_master
--         ,unique_row_rank_schedules
--         ,(case when (length(split_part(xx.team_name_awayteam, ' ', 1)) > 0 and
--                      yy.team_name_awayteam like '%' || split_part(xx.team_name_awayteam, ' ', 1) || '%')
--                  then 1
--                else 0 end)
--       +
--          (case when (length(split_part(xx.team_name_awayteam, ' ', 2)) > 0 and
--                      yy.team_name_awayteam like '%' || split_part(xx.team_name_awayteam, ' ', 2) || '%')
--                  then 1
--                else 0 end)
--       +
--          (case when (length(split_part(xx.team_name_awayteam, ' ', 3)) > 0 and
--                      yy.team_name_awayteam like '%' || split_part(xx.team_name_awayteam, ' ', 3) || '%')
--                  then 1
--                else 0 end)
--       +
--          (case when (length(split_part(xx.team_name_awayteam, ' ', 4)) > 0 and
--                      yy.team_name_awayteam like '%' || split_part(xx.team_name_awayteam, ' ', 4) || '%')
--                  then 1
--                else 0 end) as schedules_awayteam_contains_master_awayteam_score
--         ,(case when (length(split_part(xx.team_name_hometeam, ' ', 1)) > 0 and
--                      yy.team_name_hometeam like '%' || split_part(xx.team_name_hometeam, ' ', 1) || '%')
--                  then 1
--                else 0 end)
--       +
--          (case when (length(split_part(xx.team_name_hometeam, ' ', 2)) > 0 and
--                      yy.team_name_hometeam like '%' || split_part(xx.team_name_hometeam, ' ', 2) || '%')
--                  then 1
--                else 0 end)
--       +
--          (case when (length(split_part(xx.team_name_hometeam, ' ', 3)) > 0 and
--                      yy.team_name_hometeam like '%' || split_part(xx.team_name_hometeam, ' ', 3) || '%')
--                  then 1
--                else 0 end)
--       +
--          (case when (length(split_part(xx.team_name_hometeam, ' ', 4)) > 0 and
--                      yy.team_name_hometeam like '%' || split_part(xx.team_name_hometeam, ' ', 4) || '%')
--                  then 1
--                else 0 end) as schedules_hometeam_contains_master_hometeam_score
--
--
--     FROM (
--       SELECT match_id
--           ,metadata_competition_name
--           ,trim(lower(team_name_hometeam)) as team_name_hometeam
--           ,trim(lower(team_name_awayteam)) as team_name_awayteam
--           ,max(current_score_hometeam) as final_score_hometeam
--           ,max(current_score_awayteam) as final_score_awayteam
--           ,row_number() OVER () as unique_row_rank_master
--       FROM fiba_europe_games_master
--         --     where trim(lower(team_name_hometeam))  like '%red%'--'ossm pzkosz pomerania'
--         --     and   trim(lower(team_name_awayteam)) = 'bc nsa sofia'
--       group by 1,2,3,4
--     ) xx
--            left join (
--       SELECT trim(lower(hometeam_name)) as team_name_hometeam
--           ,trim(lower(awayteam_name)) as team_name_awayteam
--           ,cast(hometeam_score as numeric) as final_score_hometeam
--           ,cast(awayteam_score as numeric) as final_score_awayteam
--           ,cast(current_section_date as timestamp) as schedule_date
--           ,page_header_text
--           ,match_location
--           ,boxscore_url
--           ,page_id as schedule_page_id
--           ,row_number() OVER () as unique_row_rank_schedules
--       FROM fiba_europe_schedules
--       --   WHERE trim(lower(hometeam_name)) like '%' || 'star' || '%'
--       --   WHERE hometeam_score = 62 and awayteam_score = 45
--     ) as yy
--     on (
--         xx.final_score_hometeam = yy.final_score_hometeam
--         and xx.final_score_awayteam = yy.final_score_awayteam
--       )
--   ) as s2
-- ) as s3
-- where safe_rank_master =1 and safe_rank_schedule = 1
-- and combo_score <200
--
--   ) as B
-- WHERE fiba_europe_competition_xref.match_id = B.match_id;
-- ;
--
--

drop table if exists fiba_europe_game_xref;
create table fiba_europe_game_xref (
  match_id varchar(256),
  schedule_date timestamp,
  page_header_text varchar(255),
  match_location varchar(255),
  boxscore_url varchar(255),
  schedule_page_id varchar(255),
  insert_date timestamp
);

INSERT INTO fiba_europe_game_xref
SELECT DISTINCT match_id
FROM fiba_europe_games_master
order by match_id
;



UPDATE fiba_europe_game_xref  SET schedule_date = B.schedule_date
  , page_header_text= B.page_header_text
  , match_location= B.match_location
  , boxscore_url= B.boxscore_url
  , schedule_page_id= B.schedule_page_id
  ,insert_date = now()
FROM
  (

SELECT *
FROM (
  SELECT *
      ,row_number()
      OVER (partition by match_id, unique_row_rank_master order by (case when team_name_hometeam = match_hometeam and team_name_awayteam = match_awayteam
                                                                           then 1
                                                                         when team_name_hometeam = match_hometeam and
                                                                              schedules_awayteam_contains_master_awayteam_score > 0
                                                                           then 100 - schedules_awayteam_contains_master_awayteam_score
                                                                         when team_name_awayteam = match_awayteam and
                                                                              schedules_hometeam_contains_master_hometeam_score > 0
                                                                           then 100 - schedules_hometeam_contains_master_hometeam_score
                                                                         else 200 -
                                                                              schedules_hometeam_contains_master_hometeam_score -
                                                                              schedules_awayteam_contains_master_awayteam_score end) asc) as safe_rank_master
      ,row_number()
      OVER (partition by match_id, unique_row_rank_schedules order by (case when team_name_hometeam = match_hometeam and team_name_awayteam = match_awayteam
                                                                              then 1
                                                                            when team_name_hometeam = match_hometeam and
                                                                                 schedules_awayteam_contains_master_awayteam_score > 0
                                                                              then 100 - schedules_awayteam_contains_master_awayteam_score
                                                                            when team_name_awayteam = match_awayteam and
                                                                                 schedules_hometeam_contains_master_hometeam_score > 0
                                                                              then 100 - schedules_hometeam_contains_master_hometeam_score
                                                                            else 200 -
                                                                                 schedules_hometeam_contains_master_hometeam_score -
                                                                                 schedules_awayteam_contains_master_awayteam_score end) asc) as safe_rank_schedule

  ,(case when team_name_hometeam = match_hometeam and team_name_awayteam = match_awayteam
                                                                           then 1
                                                                         when team_name_hometeam = match_hometeam and
                                                                              schedules_awayteam_contains_master_awayteam_score > 0
                                                                           then 100 - schedules_awayteam_contains_master_awayteam_score
                                                                         when team_name_awayteam = match_awayteam and
                                                                              schedules_hometeam_contains_master_hometeam_score > 0
                                                                           then 100 - schedules_hometeam_contains_master_hometeam_score
                                                                         else 200 -
                                                                              schedules_hometeam_contains_master_hometeam_score -
                                                                              schedules_awayteam_contains_master_awayteam_score end) as combo_score

  FROM (
    SELECT xx.match_id
        ,xx.team_name_hometeam
        ,xx.team_name_awayteam
        ,yy.team_name_hometeam as match_hometeam
        ,yy.team_name_awayteam as match_awayteam
        ,schedule_date
        ,page_header_text
        ,match_location
        ,boxscore_url
        ,schedule_page_id
        ,unique_row_rank_master
        ,unique_row_rank_schedules
        ,(case when (length(split_part(xx.team_name_awayteam, ' ', 1)) > 0 and
                     yy.team_name_awayteam like '%' || split_part(xx.team_name_awayteam, ' ', 1) || '%')
                 then 1
               else 0 end)
      +
         (case when (length(split_part(xx.team_name_awayteam, ' ', 2)) > 0 and
                     yy.team_name_awayteam like '%' || split_part(xx.team_name_awayteam, ' ', 2) || '%')
                 then 1
               else 0 end)
      +
         (case when (length(split_part(xx.team_name_awayteam, ' ', 3)) > 0 and
                     yy.team_name_awayteam like '%' || split_part(xx.team_name_awayteam, ' ', 3) || '%')
                 then 1
               else 0 end)
      +
         (case when (length(split_part(xx.team_name_awayteam, ' ', 4)) > 0 and
                     yy.team_name_awayteam like '%' || split_part(xx.team_name_awayteam, ' ', 4) || '%')
                 then 1
               else 0 end) as schedules_awayteam_contains_master_awayteam_score
        ,(case when (length(split_part(xx.team_name_hometeam, ' ', 1)) > 0 and
                     yy.team_name_hometeam like '%' || split_part(xx.team_name_hometeam, ' ', 1) || '%')
                 then 1
               else 0 end)
      +
         (case when (length(split_part(xx.team_name_hometeam, ' ', 2)) > 0 and
                     yy.team_name_hometeam like '%' || split_part(xx.team_name_hometeam, ' ', 2) || '%')
                 then 1
               else 0 end)
      +
         (case when (length(split_part(xx.team_name_hometeam, ' ', 3)) > 0 and
                     yy.team_name_hometeam like '%' || split_part(xx.team_name_hometeam, ' ', 3) || '%')
                 then 1
               else 0 end)
      +
         (case when (length(split_part(xx.team_name_hometeam, ' ', 4)) > 0 and
                     yy.team_name_hometeam like '%' || split_part(xx.team_name_hometeam, ' ', 4) || '%')
                 then 1
               else 0 end) as schedules_hometeam_contains_master_hometeam_score


    FROM (
      SELECT match_id
          ,metadata_competition_name
          ,trim(lower(team_name_hometeam)) as team_name_hometeam
          ,trim(lower(team_name_awayteam)) as team_name_awayteam
          ,max(current_score_hometeam) as final_score_hometeam
          ,max(current_score_awayteam) as final_score_awayteam
          ,row_number() OVER () as unique_row_rank_master
      FROM fiba_europe_games_master
        --     where trim(lower(team_name_hometeam))  like '%red%'--'ossm pzkosz pomerania'
        --     and   trim(lower(team_name_awayteam)) = 'bc nsa sofia'
      group by 1,2,3,4
    ) xx
           left join (
      SELECT trim(lower(hometeam_name)) as team_name_hometeam
          ,trim(lower(awayteam_name)) as team_name_awayteam
          ,cast(hometeam_score as integer) as final_score_hometeam
          ,cast(awayteam_score as integer) as final_score_awayteam
          ,cast(current_section_date as timestamp) as schedule_date
          ,page_header_text
          ,match_location
          ,boxscore_url
          ,page_id as schedule_page_id
          ,row_number() OVER () as unique_row_rank_schedules
      FROM fiba_europe_schedules
      --   WHERE trim(lower(hometeam_name)) like '%' || 'star' || '%'
      --   WHERE hometeam_score = 62 and awayteam_score = 45
    ) as yy
    on (
        xx.final_score_hometeam = yy.final_score_hometeam
        and xx.final_score_awayteam = yy.final_score_awayteam
      )
  ) as s2
) as s3
where safe_rank_master =1 and safe_rank_schedule = 1
and combo_score <200

  ) as B
WHERE fiba_europe_game_xref.match_id = B.match_id;
;



SELECT count(match_id) as match_ids
      ,count(schedule_date) as match_ids_with_dates
FROM fiba_europe_game_xref;

--
--
--   match_id varchar(256),
--   schedule_date timestamp,
--   page_header_text varchar(255),
--   match_location varchar(255),
--   boxscore_url varchar(255),
--   schedule_page_id varchar(255),
--   insert_date timestamp

-- ALTER TABLE fiba_europe_competition_xref  DROP COLUMN schedule_date;
-- ALTER TABLE fiba_europe_competition_xref  DROP COLUMN page_header_text;
-- ALTER TABLE fiba_europe_competition_xref  DROP COLUMN match_location;
-- ALTER TABLE fiba_europe_competition_xref  DROP COLUMN boxscore_url;
-- ALTER TABLE fiba_europe_competition_xref  DROP COLUMN schedule_page_id;
--
-- SELECT *
-- FROM fiba_europe_competition_xref




create table if not exists fiba_europe_boxscores_master as
(
  SELECT match_id
	,player
	,team
	,"in"
	,points
	,fouls
	,rebounds
	,assists
	,points_p1
	,fouls_p1
	,rebounds_p1
	,assists_p1
	,points_p2
	,fouls_p2
	,rebounds_p2
	,assists_p2
	,points_p3
	,fouls_p3
	,rebounds_p3
	,assists_p3
	,points_p4
	,fouls_p4
	,rebounds_p4
	,assists_p4
	,points_p5
	,fouls_p5
	,rebounds_p5
	,assists_p5
  ,now() as insert_date

  FROM (
  SELECT *
      ,row_number() OVER (partition by match_id,player,team order by points desc) as safe_rank
  FROM fiba_europe_boxscores_import
) as s1
where safe_rank = 1
order by match_id,team,player
);


DELETE FROM fiba_europe_boxscores_master
WHERE match_id in (
  SELECT DISTINCT match_id
  FROM fiba_europe_boxscores_import
);


INSERT INTO fiba_europe_boxscores_master

  SELECT match_id
	,player
	,team
	,"in"
	,points
	,fouls
	,rebounds
	,assists
	,points_p1
	,fouls_p1
	,rebounds_p1
	,assists_p1
	,points_p2
	,fouls_p2
	,rebounds_p2
	,assists_p2
	,points_p3
	,fouls_p3
	,rebounds_p3
	,assists_p3
	,points_p4
	,fouls_p4
	,rebounds_p4
	,assists_p4
	,points_p5
	,fouls_p5
	,rebounds_p5
	,assists_p5
  ,now() as insert_date

  FROM (
  SELECT *
      ,row_number() OVER (partition by match_id,player,team order by points desc) as safe_rank
  FROM fiba_europe_boxscores_import
) as s1
where safe_rank = 1
order by match_id,team,player
;













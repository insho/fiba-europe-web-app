


--- PART 1 - CREATE MASTER GAMES TABLE IF NECESSARY, AND ADD TO IT SHIT FROM IMPORT TABLE
-- SELECT count(*) FROM fiba_europe_already_pickled_games ;
-- truncate table fiba_europe_already_pickled_games;
CREATE TABLE  if not exists  fiba_europe_already_pickled_games (
    match_id varchar(256)
);



-- drop table fiba_europe_games_master;
-- truncate table fiba_europe_games_master;

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




     points_scored_period1_combined integer,
    points_scored_period2_combined integer,
    points_scored_period3_combined integer,
    points_scored_period4_combined integer,



    ending_score_period1_combined integer,
    ending_score_period2_combined integer,
    ending_score_period3_combined integer,
    ending_score_period4_combined integer,



    final_score_hometeam integer,
    final_score_awayteam integer,
    final_score_combined integer,
    winner_hometeam integer,


    ending_lead_period1_hometeam integer,
    ending_lead_period2_hometeam integer,
    ending_lead_period3_hometeam integer,
    ending_lead_final_hometeam integer,


    current_score_combined integer,


    cumulative_possessions_overall_combined integer,
    cumulative_possessions_quarter_combined integer,



    starting_five_in_play_combined double precision,
    top_five_scorers_in_play_combined double precision,
    percent_of_total_points_scored_by_players_in_play_combined double precision,
    top_five_players_in_play_combined double precision,
    percent_of_total_stat_count_by_players_in_play_combined double precision,


------
cumulative_player_personal_fouls_hometeam integer,
cumulative_player_personal_fouls_awayteam integer,



players_with_one_foul_hometeam integer,
players_with_two_fouls_hometeam integer,
players_with_three_fouls_hometeam integer,
players_with_four_fouls_hometeam integer,
players_with_five_fouls_hometeam integer,

players_with_one_foul_awayteam integer,
players_with_two_fouls_awayteam integer,
players_with_three_fouls_awayteam integer,
players_with_four_fouls_awayteam integer,
players_with_five_fouls_awayteam integer,


two_point_shots_made_hometeam integer,
jump_shots_made_hometeam integer,
lay_up_shots_made_hometeam integer,
put_backs_shots_made_hometeam integer,
dunk_shots_made_hometeam integer,
two_point_shots_missed_hometeam integer,
jump_shots_missed_hometeam integer,
lay_up_shots_missed_hometeam integer,
put_backs_shots_missed_hometeam integer,
dunk_shots_missed_hometeam integer,
three_point_shots_made_hometeam integer,
three_point_shots_missed_hometeam integer,
free_throw_shots_made_hometeam integer,
free_throw_shots_missed_hometeam integer,

two_point_shots_made_awayteam integer,
jump_shots_made_awayteam integer,
lay_up_shots_made_awayteam integer,
put_backs_shots_made_awayteam integer,
dunk_shots_made_awayteam integer,
two_point_shots_missed_awayteam integer,
jump_shots_missed_awayteam integer,
lay_up_shots_missed_awayteam integer,
put_backs_shots_missed_awayteam integer,
dunk_shots_missed_awayteam integer,
three_point_shots_made_awayteam integer,
three_point_shots_missed_awayteam integer,
free_throw_shots_made_awayteam integer,
free_throw_shots_missed_awayteam integer,
------


	insert_date timestamp
);

alter table fiba_europe_games_master owner to joe;





ALTER TABLE fiba_europe_games_import add points_scored_period1_combined integer;
ALTER TABLE fiba_europe_games_import add column points_scored_period2_combined integer;
ALTER TABLE fiba_europe_games_import add column points_scored_period3_combined integer;
ALTER TABLE fiba_europe_games_import add column points_scored_period4_combined integer;


update fiba_europe_games_import set points_scored_period1_combined =  coalesce(ending_score_period1_hometeam,0) + coalesce(ending_score_period1_awayteam,0);
update fiba_europe_games_import set points_scored_period2_combined =  coalesce(ending_score_period2_hometeam,0) + coalesce(ending_score_period2_awayteam,0);
update fiba_europe_games_import set points_scored_period3_combined =  coalesce(ending_score_period3_hometeam,0) + coalesce(ending_score_period3_awayteam,0);
update fiba_europe_games_import set points_scored_period4_combined =  coalesce(ending_score_period4_hometeam,0) + coalesce(ending_score_period4_awayteam,0);



ALTER TABLE fiba_europe_games_import add column ending_score_period1_combined integer;
ALTER TABLE fiba_europe_games_import add column ending_score_period2_combined integer;
ALTER TABLE fiba_europe_games_import add column ending_score_period3_combined integer;
ALTER TABLE fiba_europe_games_import add column ending_score_period4_combined integer;


update fiba_europe_games_import set ending_score_period1_combined =  coalesce(ending_score_period1_hometeam,0) + coalesce(ending_score_period1_awayteam,0);
update fiba_europe_games_import set ending_score_period2_combined =  coalesce(ending_score_period1_combined,0) + coalesce(ending_score_period2_hometeam,0) + coalesce(ending_score_period2_awayteam,0);
update fiba_europe_games_import set ending_score_period3_combined =  coalesce(ending_score_period1_combined,0) + coalesce(ending_score_period2_combined,0) + coalesce(ending_score_period3_hometeam,0) + coalesce(ending_score_period3_awayteam,0);
update fiba_europe_games_import set ending_score_period4_combined =  coalesce(ending_score_period1_combined,0) + coalesce(ending_score_period2_combined,0) + coalesce(ending_score_period3_combined,0) + coalesce(ending_score_period4_hometeam,0) + coalesce(ending_score_period4_awayteam,0);


update fiba_europe_games_import set ending_score_period2_hometeam =  coalesce(ending_score_period1_hometeam,0) + coalesce(ending_score_period2_hometeam,0);
update fiba_europe_games_import set ending_score_period3_hometeam =  coalesce(ending_score_period1_hometeam,0) + coalesce(ending_score_period2_hometeam,0)  + coalesce(ending_score_period3_hometeam,0);
update fiba_europe_games_import set ending_score_period4_hometeam =  coalesce(ending_score_period1_hometeam,0) + coalesce(ending_score_period2_hometeam,0)  + coalesce(ending_score_period3_hometeam,0) + coalesce(ending_score_period4_hometeam,0);


update fiba_europe_games_import set ending_score_period2_awayteam =  coalesce(ending_score_period1_awayteam,0) + coalesce(ending_score_period2_awayteam,0);
update fiba_europe_games_import set ending_score_period3_awayteam =  coalesce(ending_score_period1_awayteam,0) + coalesce(ending_score_period2_awayteam,0)  + coalesce(ending_score_period3_awayteam,0);
update fiba_europe_games_import set ending_score_period4_awayteam =  coalesce(ending_score_period1_awayteam,0) + coalesce(ending_score_period2_awayteam,0)  + coalesce(ending_score_period3_awayteam,0) + coalesce(ending_score_period4_awayteam,0);



ALTER TABLE fiba_europe_games_import add column final_score_hometeam integer;
ALTER TABLE fiba_europe_games_import add column final_score_awayteam integer;
ALTER TABLE fiba_europe_games_import add column final_score_combined integer;
ALTER TABLE fiba_europe_games_import add column winner_hometeam integer;

update fiba_europe_games_import set final_score_hometeam =  coalesce(ending_score_period5_hometeam,0) + coalesce(ending_score_period4_hometeam,0);
update fiba_europe_games_import set final_score_awayteam =  coalesce(ending_score_period5_awayteam,0) + coalesce(ending_score_period4_awayteam,0) ;
update fiba_europe_games_import set final_score_combined =  coalesce(final_score_hometeam,0) + coalesce(final_score_awayteam,0) ;
update fiba_europe_games_import set winner_hometeam =  (case when final_score_hometeam > final_score_awayteam then 1 else 0 end);


ALTER TABLE fiba_europe_games_import add column ending_lead_period1_hometeam integer;
ALTER TABLE fiba_europe_games_import add column ending_lead_period2_hometeam integer;
ALTER TABLE fiba_europe_games_import add column ending_lead_period3_hometeam integer;
ALTER TABLE fiba_europe_games_import add column ending_lead_final_hometeam integer;

update fiba_europe_games_import set ending_lead_period1_hometeam =  coalesce(ending_score_period1_hometeam,0) - coalesce(ending_score_period1_awayteam,0);
update fiba_europe_games_import set ending_lead_period2_hometeam =  coalesce(ending_score_period2_hometeam,0) - coalesce(ending_score_period2_awayteam,0);
update fiba_europe_games_import set ending_lead_period3_hometeam =  coalesce(ending_score_period3_hometeam,0) - coalesce(ending_score_period3_awayteam,0);
update fiba_europe_games_import set ending_lead_final_hometeam =  coalesce(final_score_hometeam,0) - coalesce(final_score_awayteam,0);

ALTER TABLE fiba_europe_games_import add column current_score_combined integer;

update fiba_europe_games_import set current_score_combined =  coalesce(current_score_awayteam,0) + coalesce(current_score_hometeam,0);

ALTER TABLE fiba_europe_games_import add column cumulative_possessions_overall_combined integer;
ALTER TABLE fiba_europe_games_import add column cumulative_possessions_quarter_combined integer;

update fiba_europe_games_import set cumulative_possessions_overall_combined =  coalesce(cumulative_possessions_overall_hometeam,0) + coalesce(cumulative_possessions_overall_awayteam,0);
update fiba_europe_games_import set cumulative_possessions_quarter_combined =  coalesce(cumulative_possessions_quarter_hometeam,0) + coalesce(cumulative_possessions_quarter_awayteam,0);



ALTER TABLE fiba_europe_games_import add column starting_five_in_play_combined double precision;
ALTER TABLE fiba_europe_games_import add column top_five_scorers_in_play_combined double precision;
ALTER TABLE fiba_europe_games_import add column percent_of_total_points_scored_by_players_in_play_combined double precision;
ALTER TABLE fiba_europe_games_import add column top_five_players_in_play_combined double precision;
ALTER TABLE fiba_europe_games_import add column percent_of_total_stat_count_by_players_in_play_combined double precision;

update fiba_europe_games_import set starting_five_in_play_combined =  coalesce(starting_five_in_play_hometeam ::double precision,0.0) + coalesce(starting_five_in_play_awayteam::double precision,0.0);
update fiba_europe_games_import set top_five_scorers_in_play_combined =  coalesce(top_five_scorers_in_play_hometeam::double precision,0.0) + coalesce(top_five_scorers_in_play_awayteam::double precision,0.0);
update fiba_europe_games_import set percent_of_total_points_scored_by_players_in_play_combined =  coalesce(percent_of_total_points_scored_by_players_in_play_hometeam::double precision,0.0) + coalesce(percent_of_total_points_scored_by_players_in_play_awayteam::double precision,0.0);
update fiba_europe_games_import set top_five_players_in_play_combined =  coalesce(top_five_players_in_play_hometeam::double precision,0.0) + coalesce(top_five_players_in_play_awayteam::double precision,0.0);
update fiba_europe_games_import set percent_of_total_stat_count_by_players_in_play_combined =  coalesce(percent_of_total_stat_count_by_players_in_play_hometeam::double precision,0.0) + coalesce(percent_of_total_stat_count_by_players_in_play_awayteam::double precision,0.0);

update fiba_europe_games_import set current_score_hometeam =  coalesce(current_score_hometeam,0);
update fiba_europe_games_import set current_score_awayteam =  coalesce(current_score_awayteam,0);





DROP TABLE IF EXISTS fiba_europe_games_export;


create table if not exists fiba_europe_games_export
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




     points_scored_period1_combined integer,
    points_scored_period2_combined integer,
    points_scored_period3_combined integer,
    points_scored_period4_combined integer,



    ending_score_period1_combined integer,
    ending_score_period2_combined integer,
    ending_score_period3_combined integer,
    ending_score_period4_combined integer,



    final_score_hometeam integer,
    final_score_awayteam integer,
    final_score_combined integer,
    winner_hometeam integer,


    ending_lead_period1_hometeam integer,
    ending_lead_period2_hometeam integer,
    ending_lead_period3_hometeam integer,
    ending_lead_final_hometeam integer,


    current_score_combined integer,


    cumulative_possessions_overall_combined integer,
    cumulative_possessions_quarter_combined integer,



    starting_five_in_play_combined double precision,
    top_five_scorers_in_play_combined double precision,
    percent_of_total_points_scored_by_players_in_play_combined double precision,
    top_five_players_in_play_combined double precision,
    percent_of_total_stat_count_by_players_in_play_combined double precision,


------
cumulative_player_personal_fouls_hometeam integer,
cumulative_player_personal_fouls_awayteam integer,



players_with_one_foul_hometeam integer,
players_with_two_fouls_hometeam integer,
players_with_three_fouls_hometeam integer,
players_with_four_fouls_hometeam integer,
players_with_five_fouls_hometeam integer,

players_with_one_foul_awayteam integer,
players_with_two_fouls_awayteam integer,
players_with_three_fouls_awayteam integer,
players_with_four_fouls_awayteam integer,
players_with_five_fouls_awayteam integer,


two_point_shots_made_hometeam integer,
jump_shots_made_hometeam integer,
lay_up_shots_made_hometeam integer,
put_backs_shots_made_hometeam integer,
dunk_shots_made_hometeam integer,
two_point_shots_missed_hometeam integer,
jump_shots_missed_hometeam integer,
lay_up_shots_missed_hometeam integer,
put_backs_shots_missed_hometeam integer,
dunk_shots_missed_hometeam integer,
three_point_shots_made_hometeam integer,
three_point_shots_missed_hometeam integer,
free_throw_shots_made_hometeam integer,
free_throw_shots_missed_hometeam integer,

two_point_shots_made_awayteam integer,
jump_shots_made_awayteam integer,
lay_up_shots_made_awayteam integer,
put_backs_shots_made_awayteam integer,
dunk_shots_made_awayteam integer,
two_point_shots_missed_awayteam integer,
jump_shots_missed_awayteam integer,
lay_up_shots_missed_awayteam integer,
put_backs_shots_missed_awayteam integer,
dunk_shots_missed_awayteam integer,
three_point_shots_made_awayteam integer,
three_point_shots_missed_awayteam integer,
free_throw_shots_made_awayteam integer,
free_throw_shots_missed_awayteam integer,
------
    schedule_date timestamp,
    page_header_text text,

    match_location text,
    league_sex text,
    league_age text,

	insert_date timestamp
);

alter table fiba_europe_games_export owner to joe;



INSERT INTO fiba_europe_games_export



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
	,coalesce(team_fouls_committed_hometeam,0) as team_fouls_committed_hometeam
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
	,coalesce(team_fouls_committed_awayteam,0) as team_fouls_committed_awayteam
	,player_personal_fouls_committed_awayteam
	,turnover_committed_player_awayteam
	,turnover_committed_type_awayteam
	,turnover_committed_by_player_count_awayteam
	,points_scored_subtype_awayteam
	,shot_blocked_hometeam
	,shot_block_detail
	,shot_blocked_awayteam
	,coalesce(avg_time_between_scoring_events_overall_hometeam,0) as avg_time_between_scoring_events_overall_hometeam
	,avg_time_between_scoring_events_quarter_hometeam
	,coalesce(avg_time_between_scoring_events_overall,0) as avg_time_between_scoring_events_overall
	,avg_time_between_scoring_events_quarter
	,coalesce(avg_time_between_scoring_events_overall_awayteam,0) as avg_time_between_scoring_events_overall_awayteam
	,avg_time_between_scoring_events_quarter_awayteam
	,coalesce(current_lead_hometeam,0) as current_lead_hometeam
	,coalesce(cumulative_lead_changes_game,0) as cumulative_lead_changes_game
	,coalesce(cumulative_avg_abs_size_of_lead_game,0) as cumulative_avg_abs_size_of_lead_game
	,coalesce(cumulative_max_abs_size_of_lead_game,0) as cumulative_max_abs_size_of_lead_game
	,coalesce(cumulative_max_size_of_lead_game_hometeam,0) as cumulative_max_size_of_lead_game_hometeam
	,coalesce(cumulative_max_size_of_lead_game_awayteam,0) as cumulative_max_size_of_lead_game_awayteam
	,cumulative_lead_changes_quarter
	,coalesce(avg_abs_size_of_lead_quarter,0) as avg_abs_size_of_lead_quarter
	,cumulative_avg_abs_size_of_lead_quarter
	,cumulative_max_abs_size_of_lead_quarter
	,cumulative_max_size_of_lead_quarter_hometeam
	,cumulative_max_size_of_lead_quarter_awayteam
	,cumulative_possessions_overall_hometeam
	,cumulative_possessions_overall_awayteam
	,cumulative_possessions_quarter_hometeam
	,cumulative_possessions_quarter_awayteam
	,starting_five_in_play_hometeam::double precision
	,top_five_scorers_in_play_hometeam::double precision
	,points_scored_by_players_in_play_hometeam
	,percent_of_total_points_scored_by_players_in_play_hometeam
	,top_five_players_in_play_hometeam::double precision
	,total_stat_count_players_in_play_hometeam
	,percent_of_total_stat_count_by_players_in_play_hometeam
	,starting_five_in_play_awayteam::double precision
	,top_five_scorers_in_play_awayteam::double precision
	,points_scored_by_players_in_play_awayteam
	,percent_of_total_points_scored_by_players_in_play_awayteam
	,top_five_players_in_play_awayteam::double precision
	,total_stat_count_players_in_play_awayteam
	,percent_of_total_stat_count_by_players_in_play_awayteam





     ,points_scored_period1_combined
    ,points_scored_period2_combined
    ,points_scored_period3_combined
    ,points_scored_period4_combined



    ,ending_score_period1_combined
    ,ending_score_period2_combined
    ,ending_score_period3_combined
    ,ending_score_period4_combined



    ,final_score_hometeam
    ,final_score_awayteam
    ,final_score_combined
    ,winner_hometeam


    ,ending_lead_period1_hometeam
    ,ending_lead_period2_hometeam
    ,ending_lead_period3_hometeam
    ,ending_lead_final_hometeam


    ,current_score_combined


    ,cumulative_possessions_overall_combined
    ,cumulative_possessions_quarter_combined



    ,starting_five_in_play_combined::double precision
    ,top_five_scorers_in_play_combined::double precision
    ,percent_of_total_points_scored_by_players_in_play_combined::double precision
    ,top_five_players_in_play_combined::double precision
    ,percent_of_total_stat_count_by_players_in_play_combined::double precision



,cumulative_player_personal_fouls_hometeam
,cumulative_player_personal_fouls_awayteam



,players_with_one_foul_hometeam
,players_with_two_fouls_hometeam
,players_with_three_fouls_hometeam
,players_with_four_fouls_hometeam
,players_with_five_fouls_hometeam

,players_with_one_foul_awayteam
,players_with_two_fouls_awayteam
,players_with_three_fouls_awayteam
,players_with_four_fouls_awayteam
,players_with_five_fouls_awayteam


,two_point_shots_made_hometeam
,jump_shots_made_hometeam
,lay_up_shots_made_hometeam
,put_backs_shots_made_hometeam
,dunk_shots_made_hometeam
,two_point_shots_missed_hometeam
,jump_shots_missed_hometeam
,lay_up_shots_missed_hometeam
,put_backs_shots_missed_hometeam
,dunk_shots_missed_hometeam
,three_point_shots_made_hometeam
,three_point_shots_missed_hometeam
,free_throw_shots_made_hometeam
,free_throw_shots_missed_hometeam

,two_point_shots_made_awayteam
,jump_shots_made_awayteam
,lay_up_shots_made_awayteam
,put_backs_shots_made_awayteam
,dunk_shots_made_awayteam
,two_point_shots_missed_awayteam
,jump_shots_missed_awayteam
,lay_up_shots_missed_awayteam
,put_backs_shots_missed_awayteam
,dunk_shots_missed_awayteam
,three_point_shots_made_awayteam
,three_point_shots_missed_awayteam
,free_throw_shots_made_awayteam
,free_throw_shots_missed_awayteam
------
    ,schedule_date
    ,page_header_text

    ,match_location
    ,league_sex
    ,league_age

	,now() as insert_date
 FROM (
  SELECT x.*

      ,row_number() over (partition by x.match_id,row_number) as safe_rank

 FROM fiba_europe_games_import x
) as s1_base
LEFT JOIN
     (


SELECT match_id as cumulative_match_id
        ,row_number as cumulative_row_number
--         ,stat_action_hometeam
--      ,player_personal_fouls_committed_hometeam
--     ,foul_committed_player_hometeam

     ,player_personal_foul_event

     ,cumulative_player_personal_fouls_hometeam
     ,cumulative_player_personal_fouls_awayteam


     ,players_with_at_least_one_foul_hometeam - players_with_at_least_two_foul_hometeam - players_with_at_least_three_foul_hometeam - players_with_at_least_four_foul_hometeam - players_with_at_least_five_foul_hometeam as players_with_one_foul_hometeam
     ,players_with_at_least_two_foul_hometeam - players_with_at_least_three_foul_hometeam - players_with_at_least_four_foul_hometeam - players_with_at_least_five_foul_hometeam as players_with_two_fouls_hometeam
     ,players_with_at_least_three_foul_hometeam - players_with_at_least_four_foul_hometeam - players_with_at_least_five_foul_hometeam as players_with_three_fouls_hometeam
     ,players_with_at_least_four_foul_hometeam - players_with_at_least_five_foul_hometeam as players_with_four_fouls_hometeam
     ,players_with_at_least_five_foul_hometeam as players_with_five_fouls_hometeam


     ,players_with_at_least_one_foul_awayteam - players_with_at_least_two_foul_awayteam - players_with_at_least_three_foul_awayteam - players_with_at_least_four_foul_awayteam - players_with_at_least_five_foul_awayteam as players_with_one_foul_awayteam
     ,players_with_at_least_two_foul_awayteam - players_with_at_least_three_foul_awayteam - players_with_at_least_four_foul_awayteam - players_with_at_least_five_foul_awayteam as players_with_two_fouls_awayteam
     ,players_with_at_least_three_foul_awayteam - players_with_at_least_four_foul_awayteam - players_with_at_least_five_foul_awayteam as players_with_three_fouls_awayteam
     ,players_with_at_least_four_foul_awayteam - players_with_at_least_five_foul_awayteam as players_with_four_fouls_awayteam
     ,players_with_at_least_five_foul_awayteam as players_with_five_fouls_awayteam



        ,two_point_shots_made_hometeam
        ,jump_shots_made_hometeam
        ,lay_up_shots_made_hometeam
        ,put_backs_shots_made_hometeam
        ,dunk_shots_made_hometeam

        ,two_point_shots_missed_hometeam
        ,jump_shots_missed_hometeam
        ,lay_up_shots_missed_hometeam
        ,put_backs_shots_missed_hometeam
        ,dunk_shots_missed_hometeam


        ,three_point_shots_made_hometeam
        ,three_point_shots_missed_hometeam


        ,free_throw_shots_made_hometeam
        ,free_throw_shots_missed_hometeam


        ,two_point_shots_made_awayteam
        ,jump_shots_made_awayteam
        ,lay_up_shots_made_awayteam
        ,put_backs_shots_made_awayteam
        ,dunk_shots_made_awayteam

        ,two_point_shots_missed_awayteam
        ,jump_shots_missed_awayteam
        ,lay_up_shots_missed_awayteam
        ,put_backs_shots_missed_awayteam
        ,dunk_shots_missed_awayteam


        ,three_point_shots_made_awayteam
        ,three_point_shots_missed_awayteam


        ,free_throw_shots_made_awayteam
        ,free_throw_shots_missed_awayteam



FROM
(

SELECT match_id
        ,row_number
        ,stat_action_hometeam
     ,player_personal_fouls_committed_hometeam
    ,foul_committed_player_hometeam
     , (case when stat_action_hometeam = 'Foul Committed' and player_personal_fouls_committed_hometeam is not null then 1 else null end) as player_personal_foul_event

     , coalesce(sum((case when stat_action_hometeam = 'Foul Committed' and player_personal_fouls_committed_hometeam is not null then 1 else null end)) OVER (partition by match_id order by row_number),0) as cumulative_player_personal_fouls_hometeam
     , coalesce(sum((case when stat_action_awayteam = 'Foul Committed' and player_personal_fouls_committed_awayteam is not null then 1 else null end)) OVER (partition by match_id order by row_number),0) as cumulative_player_personal_fouls_awayteam


     ,coalesce(sum((case when stat_action_hometeam = 'Foul Committed' and player_personal_fouls_committed_hometeam = 1 then 1 else null end))  OVER (partition by match_id order by row_number),0) as players_with_at_least_one_foul_hometeam
     ,coalesce(sum((case when stat_action_hometeam = 'Foul Committed' and player_personal_fouls_committed_hometeam = 2 then 1 else null end))  OVER (partition by match_id order by row_number),0) as players_with_at_least_two_foul_hometeam
     ,coalesce(sum((case when stat_action_hometeam = 'Foul Committed' and player_personal_fouls_committed_hometeam = 3 then 1 else null end))  OVER (partition by match_id order by row_number),0) as players_with_at_least_three_foul_hometeam
    ,coalesce(sum((case when stat_action_hometeam = 'Foul Committed' and player_personal_fouls_committed_hometeam = 4 then 1 else null end))  OVER (partition by match_id order by row_number),0) as players_with_at_least_four_foul_hometeam
    ,coalesce(sum((case when stat_action_hometeam = 'Foul Committed' and player_personal_fouls_committed_hometeam >= 5 then 1 else null end))  OVER (partition by match_id order by row_number),0) as players_with_at_least_five_foul_hometeam

     ,coalesce(sum((case when stat_action_awayteam = 'Foul Committed' and player_personal_fouls_committed_awayteam = 1 then 1 else null end))  OVER (partition by match_id order by row_number),0) as players_with_at_least_one_foul_awayteam
     ,coalesce(sum((case when stat_action_awayteam = 'Foul Committed' and player_personal_fouls_committed_awayteam = 2 then 1 else null end))  OVER (partition by match_id order by row_number),0) as players_with_at_least_two_foul_awayteam
     ,coalesce(sum((case when stat_action_awayteam = 'Foul Committed' and player_personal_fouls_committed_awayteam = 3 then 1 else null end))  OVER (partition by match_id order by row_number),0) as players_with_at_least_three_foul_awayteam
    ,coalesce(sum((case when stat_action_awayteam = 'Foul Committed' and player_personal_fouls_committed_awayteam = 4 then 1 else null end))  OVER (partition by match_id order by row_number),0) as players_with_at_least_four_foul_awayteam
    ,coalesce(sum((case when stat_action_awayteam = 'Foul Committed' and player_personal_fouls_committed_awayteam >= 5 then 1 else null end))  OVER (partition by match_id order by row_number),0) as players_with_at_least_five_foul_awayteam

--
-- SELECT stat_action_hometeam
--         ,points_scored_subtype_hometeam
--         ,scoring_stat_hometeam_full

        ,coalesce(sum((CASE WHEN stat_action_hometeam  = 'Points Scored' and scoring_stat_hometeam_full like '%2pt%' then 1 else null end))  OVER (partition by match_id order by row_number),0) as two_point_shots_made_hometeam
        ,coalesce(sum((CASE WHEN stat_action_hometeam  = 'Points Scored' and scoring_stat_hometeam_full like '%jump shot%' then 1 else null end))  OVER (partition by match_id order by row_number),0) as jump_shots_made_hometeam
        ,coalesce(sum((CASE WHEN stat_action_hometeam  = 'Points Scored' and (scoring_stat_hometeam_full like '%lay-up%' or scoring_stat_hometeam_full like '%lay up%') then 1 else null end))  OVER (partition by match_id order by row_number),0) as lay_up_shots_made_hometeam
        ,coalesce(sum((CASE WHEN stat_action_hometeam  = 'Points Scored' and (scoring_stat_hometeam_full like '%put-back%' or scoring_stat_hometeam_full like '%put back%') then 1 else null end))  OVER (partition by match_id order by row_number),0) as put_backs_shots_made_hometeam
        ,coalesce(sum((CASE WHEN stat_action_hometeam  = 'Points Scored' and (scoring_stat_hometeam_full like '%dunk%') then 1 else null end))  OVER (partition by match_id order by row_number),0) as dunk_shots_made_hometeam

        ,coalesce(sum((CASE WHEN stat_action_hometeam  = 'Shot Missed' and scoring_stat_hometeam_full like '%2pt%' then 1 else null end))  OVER (partition by match_id order by row_number),0) as two_point_shots_missed_hometeam
        ,coalesce(sum((CASE WHEN stat_action_hometeam  = 'Shot Missed' and scoring_stat_hometeam_full like '%jump shot%' then 1 else null end))  OVER (partition by match_id order by row_number),0) as jump_shots_missed_hometeam
        ,coalesce(sum((CASE WHEN stat_action_hometeam  = 'Shot Missed' and (scoring_stat_hometeam_full like '%lay-up%' or scoring_stat_hometeam_full like '%lay up%') then 1 else null end))  OVER (partition by match_id order by row_number),0) as lay_up_shots_missed_hometeam
        ,coalesce(sum((CASE WHEN stat_action_hometeam  = 'Shot Missed' and (scoring_stat_hometeam_full like '%put-back%' or scoring_stat_hometeam_full like '%put back%') then 1 else null end))  OVER (partition by match_id order by row_number),0) as put_backs_shots_missed_hometeam
        ,coalesce(sum((CASE WHEN stat_action_hometeam  = 'Shot Missed' and (scoring_stat_hometeam_full like '%dunk%') then 1 else null end))  OVER (partition by match_id order by row_number),0) as dunk_shots_missed_hometeam


        ,coalesce(sum((CASE WHEN stat_action_hometeam  = 'Points Scored' and scoring_stat_hometeam_full like '%3pt%' then 1 else null end))  OVER (partition by match_id order by row_number),0) as three_point_shots_made_hometeam
        ,coalesce(sum((CASE WHEN stat_action_hometeam  = 'Shot Missed' and scoring_stat_hometeam_full like '%3pt%' then 1 else null end))  OVER (partition by match_id order by row_number),0) as three_point_shots_missed_hometeam


        ,coalesce(sum((CASE WHEN stat_action_hometeam  = 'Points Scored' and scoring_stat_hometeam_full like '%free throw%' then 1 else null end))  OVER (partition by match_id order by row_number),0) as free_throw_shots_made_hometeam
        ,coalesce(sum((CASE WHEN stat_action_hometeam  = 'Shot Missed' and scoring_stat_hometeam_full like '%free throw%' then 1 else null end))  OVER (partition by match_id order by row_number),0) as free_throw_shots_missed_hometeam


        ,coalesce(sum((CASE WHEN stat_action_awayteam  = 'Points Scored' and scoring_stat_awayteam_full like '%2pt%' then 1 else null end))  OVER (partition by match_id order by row_number),0) as two_point_shots_made_awayteam
        ,coalesce(sum((CASE WHEN stat_action_awayteam  = 'Points Scored' and scoring_stat_awayteam_full like '%jump shot%' then 1 else null end))  OVER (partition by match_id order by row_number),0) as jump_shots_made_awayteam
        ,coalesce(sum((CASE WHEN stat_action_awayteam  = 'Points Scored' and (scoring_stat_awayteam_full like '%lay-up%' or scoring_stat_awayteam_full like '%lay up%') then 1 else null end))  OVER (partition by match_id order by row_number),0) as lay_up_shots_made_awayteam
        ,coalesce(sum((CASE WHEN stat_action_awayteam  = 'Points Scored' and (scoring_stat_awayteam_full like '%put-back%' or scoring_stat_awayteam_full like '%put back%') then 1 else null end))  OVER (partition by match_id order by row_number),0) as put_backs_shots_made_awayteam
        ,coalesce(sum((CASE WHEN stat_action_awayteam  = 'Points Scored' and (scoring_stat_awayteam_full like '%dunk%') then 1 else null end))  OVER (partition by match_id order by row_number),0) as dunk_shots_made_awayteam

        ,coalesce(sum((CASE WHEN stat_action_awayteam  = 'Shot Missed' and scoring_stat_awayteam_full like '%2pt%' then 1 else null end))  OVER (partition by match_id order by row_number),0) as two_point_shots_missed_awayteam
        ,coalesce(sum((CASE WHEN stat_action_awayteam  = 'Shot Missed' and scoring_stat_awayteam_full like '%jump shot%' then 1 else null end))  OVER (partition by match_id order by row_number),0) as jump_shots_missed_awayteam
        ,coalesce(sum((CASE WHEN stat_action_awayteam  = 'Shot Missed' and (scoring_stat_awayteam_full like '%lay-up%' or scoring_stat_awayteam_full like '%lay up%') then 1 else null end))  OVER (partition by match_id order by row_number),0) as lay_up_shots_missed_awayteam
        ,coalesce(sum((CASE WHEN stat_action_awayteam  = 'Shot Missed' and (scoring_stat_awayteam_full like '%put-back%' or scoring_stat_awayteam_full like '%put back%') then 1 else null end))  OVER (partition by match_id order by row_number),0) as put_backs_shots_missed_awayteam
        ,coalesce(sum((CASE WHEN stat_action_awayteam  = 'Shot Missed' and (scoring_stat_awayteam_full like '%dunk%') then 1 else null end))  OVER (partition by match_id order by row_number),0) as dunk_shots_missed_awayteam


        ,coalesce(sum((CASE WHEN stat_action_awayteam  = 'Points Scored' and scoring_stat_awayteam_full like '%3pt%' then 1 else null end))  OVER (partition by match_id order by row_number),0) as three_point_shots_made_awayteam
        ,coalesce(sum((CASE WHEN stat_action_awayteam  = 'Shot Missed' and scoring_stat_awayteam_full like '%3pt%' then 1 else null end))  OVER (partition by match_id order by row_number),0) as three_point_shots_missed_awayteam


        ,coalesce(sum((CASE WHEN stat_action_awayteam  = 'Points Scored' and scoring_stat_awayteam_full like '%free throw%' then 1 else null end))  OVER (partition by match_id order by row_number),0) as free_throw_shots_made_awayteam
        ,coalesce(sum((CASE WHEN stat_action_awayteam  = 'Shot Missed' and scoring_stat_awayteam_full like '%free throw%' then 1 else null end))  OVER (partition by match_id order by row_number),0) as free_throw_shots_missed_awayteam


        ,row_number() OVER (partition by match_id,row_number order by 1) as fiba_import_safe_rank
from fiba_europe_games_import

-- where scoring_stat_hometeam_full like '%back%' limit 50
-- AND stat_action_hometeam = 'Points Scored'
-- order by match_id, row_number

-- limit 50
) s1
-- order by match_id, row_number

WHERE fiba_import_safe_rank = 1
) as cumulative_stuff

ON  s1_base.match_id = cumulative_stuff.cumulative_match_id
AND s1_base.row_number = cumulative_stuff.cumulative_row_number

LEFT JOIN
     (

SELECT match_id  as xref_match_id
    ,schedule_date
    ,page_header_text
--     ,metadata_competition_name
    ,match_location
    ,coalesce(match_metadata_competition_name_league_sex,page_header_text_league_sex,'male') as league_sex
    ,coalesce(match_metadata_competition_name_league_age,page_header_text_league_age,'adult') as league_age
    ,row_number() over (partition by match_id order by insert_date desc) as xref_safe_rank
FROm fiba_europe_game_xref

    ) as game_metadata
ON s1_base.match_id = game_metadata.xref_match_id


where safe_rank = 1
order by match_id,row_number
;





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


DROP TABLE IF EXISTS fiba_europe_games_import;



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
	,starting_five_in_play_hometeam::double precision
	,top_five_scorers_in_play_hometeam::double precision
	,points_scored_by_players_in_play_hometeam
	,percent_of_total_points_scored_by_players_in_play_hometeam
	,top_five_players_in_play_hometeam::double precision
	,total_stat_count_players_in_play_hometeam
	,percent_of_total_stat_count_by_players_in_play_hometeam
	,starting_five_in_play_awayteam::double precision
	,top_five_scorers_in_play_awayteam::double precision
	,points_scored_by_players_in_play_awayteam
	,percent_of_total_points_scored_by_players_in_play_awayteam
	,top_five_players_in_play_awayteam::double precision
	,total_stat_count_players_in_play_awayteam
	,percent_of_total_stat_count_by_players_in_play_awayteam





     ,points_scored_period1_combined
    ,points_scored_period2_combined
    ,points_scored_period3_combined
    ,points_scored_period4_combined



    ,ending_score_period1_combined
    ,ending_score_period2_combined
    ,ending_score_period3_combined
    ,ending_score_period4_combined



    ,final_score_hometeam
    ,final_score_awayteam
    ,final_score_combined
    ,winner_hometeam


    ,ending_lead_period1_hometeam
    ,ending_lead_period2_hometeam
    ,ending_lead_period3_hometeam
    ,ending_lead_final_hometeam


    ,current_score_combined


    ,cumulative_possessions_overall_combined
    ,cumulative_possessions_quarter_combined



    ,starting_five_in_play_combined::double precision
    ,top_five_scorers_in_play_combined::double precision
    ,percent_of_total_points_scored_by_players_in_play_combined::double precision
    ,top_five_players_in_play_combined::double precision
    ,percent_of_total_stat_count_by_players_in_play_combined::double precision



,cumulative_player_personal_fouls_hometeam
,cumulative_player_personal_fouls_awayteam



,players_with_one_foul_hometeam
,players_with_two_fouls_hometeam
,players_with_three_fouls_hometeam
,players_with_four_fouls_hometeam
,players_with_five_fouls_hometeam

,players_with_one_foul_awayteam
,players_with_two_fouls_awayteam
,players_with_three_fouls_awayteam
,players_with_four_fouls_awayteam
,players_with_five_fouls_awayteam


,two_point_shots_made_hometeam
,jump_shots_made_hometeam
,lay_up_shots_made_hometeam
,put_backs_shots_made_hometeam
,dunk_shots_made_hometeam
,two_point_shots_missed_hometeam
,jump_shots_missed_hometeam
,lay_up_shots_missed_hometeam
,put_backs_shots_missed_hometeam
,dunk_shots_missed_hometeam
,three_point_shots_made_hometeam
,three_point_shots_missed_hometeam
,free_throw_shots_made_hometeam
,free_throw_shots_missed_hometeam

,two_point_shots_made_awayteam
,jump_shots_made_awayteam
,lay_up_shots_made_awayteam
,put_backs_shots_made_awayteam
,dunk_shots_made_awayteam
,two_point_shots_missed_awayteam
,jump_shots_missed_awayteam
,lay_up_shots_missed_awayteam
,put_backs_shots_missed_awayteam
,dunk_shots_missed_awayteam
,three_point_shots_made_awayteam
,three_point_shots_missed_awayteam
,free_throw_shots_made_awayteam
,free_throw_shots_missed_awayteam
------


	,now() as insert_date



FROM fiba_europe_games_export x inner join (
    select distinct match_id as approved_match_id  from fiba_europe_matchids_to_user_in_dashboard
    ) y on x.match_id = y.approved_match_id
LEFT JOIN (
    SELECT DISTINCT match_id as already_in_there_match_id from fiba_europe_games_master
    ) z on x.match_id = z.already_in_there_match_id
WHERE already_in_there_match_id is null
;





DELETE FROM fiba_europe_games_export where match_id in (SELECT distinct match_id from fiba_europe_already_pickled_games);
SELECT COUNT(DISTINCT match_id) from fiba_europe_games_export;



INSERT INTO fiba_europe_already_pickled_games
SELECT distinct match_id from fiba_europe_games_export
;

alter table fiba_europe_games_export drop column current_team_performing_stat_action;
alter table fiba_europe_games_export drop column scoring_stat_hometeam_full;
alter table fiba_europe_games_export drop column scoring_stat_awayteam_full;
alter table fiba_europe_games_export drop column full_text;
alter table fiba_europe_games_export drop column time_remaining_in_period;
alter table fiba_europe_games_export drop column hometeam_photo_pbp;
alter table fiba_europe_games_export drop column awayteam_photo_pbp;
alter table fiba_europe_games_export drop column stat_action_hometeam;
alter table fiba_europe_games_export drop column substitution_player_in_hometeam;
alter table fiba_europe_games_export drop column stat_action_awayteam;
alter table fiba_europe_games_export drop column substitution_player_in_awayteam;
alter table fiba_europe_games_export drop column substitution_player_out_awayteam;
alter table fiba_europe_games_export drop column substitution_player_out_hometeam;
alter table fiba_europe_games_export drop column metadata_competition_name;
alter table fiba_europe_games_export drop column competition_round;
alter table fiba_europe_games_export drop column team_name_hometeam;
alter table fiba_europe_games_export drop column team_name_awayteam;
alter table fiba_europe_games_export drop column logo_url_competition;
alter table fiba_europe_games_export drop column logo_url_hometeam;
alter table fiba_europe_games_export drop column logo_url_awayteam;
alter table fiba_europe_games_export drop column ending_score_period4_hometeam;
alter table fiba_europe_games_export drop column ending_score_period4_awayteam;
alter table fiba_europe_games_export drop column ending_score_period5_hometeam;
alter table fiba_europe_games_export drop column ending_score_period5_awayteam;
alter table fiba_europe_games_export drop column starting_five_hometeam;
alter table fiba_europe_games_export drop column starting_five_awayteam;
alter table fiba_europe_games_export drop column shot_missed_player_hometeam;
alter table fiba_europe_games_export drop column shot_missed_type_hometeam;
alter table fiba_europe_games_export drop column stat_action_assist_hometeam;
alter table fiba_europe_games_export drop column offensive_rebound_player_hometeam;
alter table fiba_europe_games_export drop column offensive_rebounds_by_player_hometeam;
alter table fiba_europe_games_export drop column points_scored_player_hometeam;
alter table fiba_europe_games_export drop column points_scored_type_hometeam;
alter table fiba_europe_games_export drop column points_scored_by_player_hometeam;
alter table fiba_europe_games_export drop column points_scored_player_awayteam;
alter table fiba_europe_games_export drop column points_scored_type_awayteam;
alter table fiba_europe_games_export drop column points_scored_by_player_awayteam;
alter table fiba_europe_games_export drop column stat_action_assist_awayteam;
alter table fiba_europe_games_export drop column scoring_assist_player_awayteam;
alter table fiba_europe_games_export drop column scoring_assists_by_player_awayteam;
alter table fiba_europe_games_export drop column turnover_committed_player_hometeam;
alter table fiba_europe_games_export drop column turnover_committed_type_hometeam;
alter table fiba_europe_games_export drop column turnover_committed_by_player_count_hometeam;
alter table fiba_europe_games_export drop column shot_missed_player_awayteam;
alter table fiba_europe_games_export drop column shot_missed_type_awayteam;
alter table fiba_europe_games_export drop column foul_committed_player_hometeam;
alter table fiba_europe_games_export drop column player_personal_fouls_committed_hometeam;
alter table fiba_europe_games_export drop column foul_drawn_player_awayteam;
alter table fiba_europe_games_export drop column points_scored_subtype_hometeam;
alter table fiba_europe_games_export drop column scoring_assist_player_hometeam;
alter table fiba_europe_games_export drop column scoring_assists_by_player_hometeam;
alter table fiba_europe_games_export drop column defensive_rebound_player_hometeam;
alter table fiba_europe_games_export drop column defensive_rebounds_by_player_hometeam;
alter table fiba_europe_games_export drop column defensive_rebound_player_awayteam;
alter table fiba_europe_games_export drop column defensive_rebounds_by_player_awayteam;
alter table fiba_europe_games_export drop column offensive_rebound_player_awayteam;
alter table fiba_europe_games_export drop column offensive_rebounds_by_player_awayteam;
alter table fiba_europe_games_export drop column foul_drawn_player_hometeam;
alter table fiba_europe_games_export drop column foul_committed_player_awayteam;
alter table fiba_europe_games_export drop column player_personal_fouls_committed_awayteam;
alter table fiba_europe_games_export drop column turnover_committed_player_awayteam;
alter table fiba_europe_games_export drop column turnover_committed_type_awayteam;
alter table fiba_europe_games_export drop column turnover_committed_by_player_count_awayteam;
alter table fiba_europe_games_export drop column points_scored_subtype_awayteam;
alter table fiba_europe_games_export drop column shot_blocked_hometeam;
alter table fiba_europe_games_export drop column shot_block_detail;
alter table fiba_europe_games_export drop column shot_blocked_awayteam;
alter table fiba_europe_games_export drop column avg_time_between_scoring_events_quarter_hometeam;
alter table fiba_europe_games_export drop column avg_time_between_scoring_events_quarter;
alter table fiba_europe_games_export drop column avg_time_between_scoring_events_quarter_awayteam;
alter table fiba_europe_games_export drop column cumulative_lead_changes_quarter;
alter table fiba_europe_games_export drop column cumulative_avg_abs_size_of_lead_quarter;
alter table fiba_europe_games_export drop column cumulative_max_abs_size_of_lead_quarter;
alter table fiba_europe_games_export drop column cumulative_max_size_of_lead_quarter_hometeam;
alter table fiba_europe_games_export drop column cumulative_max_size_of_lead_quarter_awayteam;
alter table fiba_europe_games_export drop column cumulative_possessions_quarter_hometeam;
alter table fiba_europe_games_export drop column cumulative_possessions_quarter_awayteam;
alter table fiba_europe_games_export drop column page_header_text;
alter table fiba_europe_games_export drop column insert_date;


SELECT 'DONE',(SELECT count(distinct match_id) from fiba_europe_games_export) as matches_to_export,(SELECT count(distinct match_id) from fiba_europe_games_master) as matches_in_master;



---- UPDATE FIBA EUROPE GAMES export




-- DELETE FROM fiba_europe_games_master where match_id in (
--     SELECT distinct x.match_id
--     FROM fiba_europe_games_import x inner join fiba_europe_matchids_to_user_in_dashboard y on x.match_id = y.match_id
-- where x.match_id is not null
--     );



/*
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
	,starting_five_in_play_hometeam::double precision
	,top_five_scorers_in_play_hometeam::double precision
	,points_scored_by_players_in_play_hometeam
	,percent_of_total_points_scored_by_players_in_play_hometeam
	,top_five_players_in_play_hometeam::double precision
	,total_stat_count_players_in_play_hometeam
	,percent_of_total_stat_count_by_players_in_play_hometeam
	,starting_five_in_play_awayteam::double precision
	,top_five_scorers_in_play_awayteam::double precision
	,points_scored_by_players_in_play_awayteam
	,percent_of_total_points_scored_by_players_in_play_awayteam
	,top_five_players_in_play_awayteam::double precision
	,total_stat_count_players_in_play_awayteam
	,percent_of_total_stat_count_by_players_in_play_awayteam





     ,points_scored_period1_combined
    ,points_scored_period2_combined
    ,points_scored_period3_combined
    ,points_scored_period4_combined



    ,ending_score_period1_combined
    ,ending_score_period2_combined
    ,ending_score_period3_combined
    ,ending_score_period4_combined



    ,final_score_hometeam
    ,final_score_awayteam
    ,final_score_combined
    ,winner_hometeam


    ,ending_lead_period1_hometeam
    ,ending_lead_period2_hometeam
    ,ending_lead_period3_hometeam
    ,ending_lead_final_hometeam


    ,current_score_combined


    ,cumulative_possessions_overall_combined
    ,cumulative_possessions_quarter_combined



    ,starting_five_in_play_combined::double precision
    ,top_five_scorers_in_play_combined::double precision
    ,percent_of_total_points_scored_by_players_in_play_combined::double precision
    ,top_five_players_in_play_combined::double precision
    ,percent_of_total_stat_count_by_players_in_play_combined::double precision



,cumulative_player_personal_fouls_hometeam
,cumulative_player_personal_fouls_awayteam



,players_with_one_foul_hometeam
,players_with_two_fouls_hometeam
,players_with_three_fouls_hometeam
,players_with_four_fouls_hometeam
,players_with_five_fouls_hometeam

,players_with_one_foul_awayteam
,players_with_two_fouls_awayteam
,players_with_three_fouls_awayteam
,players_with_four_fouls_awayteam
,players_with_five_fouls_awayteam


,two_point_shots_made_hometeam
,jump_shots_made_hometeam
,lay_up_shots_made_hometeam
,put_backs_shots_made_hometeam
,dunk_shots_made_hometeam
,two_point_shots_missed_hometeam
,jump_shots_missed_hometeam
,lay_up_shots_missed_hometeam
,put_backs_shots_missed_hometeam
,dunk_shots_missed_hometeam
,three_point_shots_made_hometeam
,three_point_shots_missed_hometeam
,free_throw_shots_made_hometeam
,free_throw_shots_missed_hometeam

,two_point_shots_made_awayteam
,jump_shots_made_awayteam
,lay_up_shots_made_awayteam
,put_backs_shots_made_awayteam
,dunk_shots_made_awayteam
,two_point_shots_missed_awayteam
,jump_shots_missed_awayteam
,lay_up_shots_missed_awayteam
,put_backs_shots_missed_awayteam
,dunk_shots_missed_awayteam
,three_point_shots_made_awayteam
,three_point_shots_missed_awayteam
,free_throw_shots_made_awayteam
,free_throw_shots_missed_awayteam
------


	,now() as insert_date
 FROM (
  SELECT x.*
      ,row_number() over (partition by x.match_id,row_number) as safe_rank
 FROM fiba_europe_games_import x inner join fiba_europe_matchids_to_user_in_dashboard y on x.match_id = y.match_id
) as s1_base
LEFT JOIN
     (


SELECT match_id as cumulative_match_id
        ,row_number as cumulative_row_number
--         ,stat_action_hometeam
--      ,player_personal_fouls_committed_hometeam
--     ,foul_committed_player_hometeam

     ,player_personal_foul_event

     ,cumulative_player_personal_fouls_hometeam
     ,cumulative_player_personal_fouls_awayteam


     ,players_with_at_least_one_foul_hometeam - players_with_at_least_two_foul_hometeam - players_with_at_least_three_foul_hometeam - players_with_at_least_four_foul_hometeam - players_with_at_least_five_foul_hometeam as players_with_one_foul_hometeam
     ,players_with_at_least_two_foul_hometeam - players_with_at_least_three_foul_hometeam - players_with_at_least_four_foul_hometeam - players_with_at_least_five_foul_hometeam as players_with_two_fouls_hometeam
     ,players_with_at_least_three_foul_hometeam - players_with_at_least_four_foul_hometeam - players_with_at_least_five_foul_hometeam as players_with_three_fouls_hometeam
     ,players_with_at_least_four_foul_hometeam - players_with_at_least_five_foul_hometeam as players_with_four_fouls_hometeam
     ,players_with_at_least_five_foul_hometeam as players_with_five_fouls_hometeam


     ,players_with_at_least_one_foul_awayteam - players_with_at_least_two_foul_awayteam - players_with_at_least_three_foul_awayteam - players_with_at_least_four_foul_awayteam - players_with_at_least_five_foul_awayteam as players_with_one_foul_awayteam
     ,players_with_at_least_two_foul_awayteam - players_with_at_least_three_foul_awayteam - players_with_at_least_four_foul_awayteam - players_with_at_least_five_foul_awayteam as players_with_two_fouls_awayteam
     ,players_with_at_least_three_foul_awayteam - players_with_at_least_four_foul_awayteam - players_with_at_least_five_foul_awayteam as players_with_three_fouls_awayteam
     ,players_with_at_least_four_foul_awayteam - players_with_at_least_five_foul_awayteam as players_with_four_fouls_awayteam
     ,players_with_at_least_five_foul_awayteam as players_with_five_fouls_awayteam



        ,two_point_shots_made_hometeam
        ,jump_shots_made_hometeam
        ,lay_up_shots_made_hometeam
        ,put_backs_shots_made_hometeam
        ,dunk_shots_made_hometeam

        ,two_point_shots_missed_hometeam
        ,jump_shots_missed_hometeam
        ,lay_up_shots_missed_hometeam
        ,put_backs_shots_missed_hometeam
        ,dunk_shots_missed_hometeam


        ,three_point_shots_made_hometeam
        ,three_point_shots_missed_hometeam


        ,free_throw_shots_made_hometeam
        ,free_throw_shots_missed_hometeam


        ,two_point_shots_made_awayteam
        ,jump_shots_made_awayteam
        ,lay_up_shots_made_awayteam
        ,put_backs_shots_made_awayteam
        ,dunk_shots_made_awayteam

        ,two_point_shots_missed_awayteam
        ,jump_shots_missed_awayteam
        ,lay_up_shots_missed_awayteam
        ,put_backs_shots_missed_awayteam
        ,dunk_shots_missed_awayteam


        ,three_point_shots_made_awayteam
        ,three_point_shots_missed_awayteam


        ,free_throw_shots_made_awayteam
        ,free_throw_shots_missed_awayteam



FROM
(

SELECT match_id
        ,row_number
        ,stat_action_hometeam
     ,player_personal_fouls_committed_hometeam
    ,foul_committed_player_hometeam
     , (case when stat_action_hometeam = 'Foul Committed' and player_personal_fouls_committed_hometeam is not null then 1 else null end) as player_personal_foul_event

     , coalesce(sum((case when stat_action_hometeam = 'Foul Committed' and player_personal_fouls_committed_hometeam is not null then 1 else null end)) OVER (partition by match_id order by row_number),0) as cumulative_player_personal_fouls_hometeam
     , coalesce(sum((case when stat_action_awayteam = 'Foul Committed' and player_personal_fouls_committed_awayteam is not null then 1 else null end)) OVER (partition by match_id order by row_number),0) as cumulative_player_personal_fouls_awayteam


     ,coalesce(sum((case when stat_action_hometeam = 'Foul Committed' and player_personal_fouls_committed_hometeam = 1 then 1 else null end))  OVER (partition by match_id order by row_number),0) as players_with_at_least_one_foul_hometeam
     ,coalesce(sum((case when stat_action_hometeam = 'Foul Committed' and player_personal_fouls_committed_hometeam = 2 then 1 else null end))  OVER (partition by match_id order by row_number),0) as players_with_at_least_two_foul_hometeam
     ,coalesce(sum((case when stat_action_hometeam = 'Foul Committed' and player_personal_fouls_committed_hometeam = 3 then 1 else null end))  OVER (partition by match_id order by row_number),0) as players_with_at_least_three_foul_hometeam
    ,coalesce(sum((case when stat_action_hometeam = 'Foul Committed' and player_personal_fouls_committed_hometeam = 4 then 1 else null end))  OVER (partition by match_id order by row_number),0) as players_with_at_least_four_foul_hometeam
    ,coalesce(sum((case when stat_action_hometeam = 'Foul Committed' and player_personal_fouls_committed_hometeam >= 5 then 1 else null end))  OVER (partition by match_id order by row_number),0) as players_with_at_least_five_foul_hometeam

     ,coalesce(sum((case when stat_action_awayteam = 'Foul Committed' and player_personal_fouls_committed_awayteam = 1 then 1 else null end))  OVER (partition by match_id order by row_number),0) as players_with_at_least_one_foul_awayteam
     ,coalesce(sum((case when stat_action_awayteam = 'Foul Committed' and player_personal_fouls_committed_awayteam = 2 then 1 else null end))  OVER (partition by match_id order by row_number),0) as players_with_at_least_two_foul_awayteam
     ,coalesce(sum((case when stat_action_awayteam = 'Foul Committed' and player_personal_fouls_committed_awayteam = 3 then 1 else null end))  OVER (partition by match_id order by row_number),0) as players_with_at_least_three_foul_awayteam
    ,coalesce(sum((case when stat_action_awayteam = 'Foul Committed' and player_personal_fouls_committed_awayteam = 4 then 1 else null end))  OVER (partition by match_id order by row_number),0) as players_with_at_least_four_foul_awayteam
    ,coalesce(sum((case when stat_action_awayteam = 'Foul Committed' and player_personal_fouls_committed_awayteam >= 5 then 1 else null end))  OVER (partition by match_id order by row_number),0) as players_with_at_least_five_foul_awayteam

--
-- SELECT stat_action_hometeam
--         ,points_scored_subtype_hometeam
--         ,scoring_stat_hometeam_full

        ,coalesce(sum((CASE WHEN stat_action_hometeam  = 'Points Scored' and scoring_stat_hometeam_full like '%2pt%' then 1 else null end))  OVER (partition by match_id order by row_number),0) as two_point_shots_made_hometeam
        ,coalesce(sum((CASE WHEN stat_action_hometeam  = 'Points Scored' and scoring_stat_hometeam_full like '%jump shot%' then 1 else null end))  OVER (partition by match_id order by row_number),0) as jump_shots_made_hometeam
        ,coalesce(sum((CASE WHEN stat_action_hometeam  = 'Points Scored' and (scoring_stat_hometeam_full like '%lay-up%' or scoring_stat_hometeam_full like '%lay up%') then 1 else null end))  OVER (partition by match_id order by row_number),0) as lay_up_shots_made_hometeam
        ,coalesce(sum((CASE WHEN stat_action_hometeam  = 'Points Scored' and (scoring_stat_hometeam_full like '%put-back%' or scoring_stat_hometeam_full like '%put back%') then 1 else null end))  OVER (partition by match_id order by row_number),0) as put_backs_shots_made_hometeam
        ,coalesce(sum((CASE WHEN stat_action_hometeam  = 'Points Scored' and (scoring_stat_hometeam_full like '%dunk%') then 1 else null end))  OVER (partition by match_id order by row_number),0) as dunk_shots_made_hometeam

        ,coalesce(sum((CASE WHEN stat_action_hometeam  = 'Shot Missed' and scoring_stat_hometeam_full like '%2pt%' then 1 else null end))  OVER (partition by match_id order by row_number),0) as two_point_shots_missed_hometeam
        ,coalesce(sum((CASE WHEN stat_action_hometeam  = 'Shot Missed' and scoring_stat_hometeam_full like '%jump shot%' then 1 else null end))  OVER (partition by match_id order by row_number),0) as jump_shots_missed_hometeam
        ,coalesce(sum((CASE WHEN stat_action_hometeam  = 'Shot Missed' and (scoring_stat_hometeam_full like '%lay-up%' or scoring_stat_hometeam_full like '%lay up%') then 1 else null end))  OVER (partition by match_id order by row_number),0) as lay_up_shots_missed_hometeam
        ,coalesce(sum((CASE WHEN stat_action_hometeam  = 'Shot Missed' and (scoring_stat_hometeam_full like '%put-back%' or scoring_stat_hometeam_full like '%put back%') then 1 else null end))  OVER (partition by match_id order by row_number),0) as put_backs_shots_missed_hometeam
        ,coalesce(sum((CASE WHEN stat_action_hometeam  = 'Shot Missed' and (scoring_stat_hometeam_full like '%dunk%') then 1 else null end))  OVER (partition by match_id order by row_number),0) as dunk_shots_missed_hometeam


        ,coalesce(sum((CASE WHEN stat_action_hometeam  = 'Points Scored' and scoring_stat_hometeam_full like '%3pt%' then 1 else null end))  OVER (partition by match_id order by row_number),0) as three_point_shots_made_hometeam
        ,coalesce(sum((CASE WHEN stat_action_hometeam  = 'Shot Missed' and scoring_stat_hometeam_full like '%3pt%' then 1 else null end))  OVER (partition by match_id order by row_number),0) as three_point_shots_missed_hometeam


        ,coalesce(sum((CASE WHEN stat_action_hometeam  = 'Points Scored' and scoring_stat_hometeam_full like '%free throw%' then 1 else null end))  OVER (partition by match_id order by row_number),0) as free_throw_shots_made_hometeam
        ,coalesce(sum((CASE WHEN stat_action_hometeam  = 'Shot Missed' and scoring_stat_hometeam_full like '%free throw%' then 1 else null end))  OVER (partition by match_id order by row_number),0) as free_throw_shots_missed_hometeam


        ,coalesce(sum((CASE WHEN stat_action_awayteam  = 'Points Scored' and scoring_stat_awayteam_full like '%2pt%' then 1 else null end))  OVER (partition by match_id order by row_number),0) as two_point_shots_made_awayteam
        ,coalesce(sum((CASE WHEN stat_action_awayteam  = 'Points Scored' and scoring_stat_awayteam_full like '%jump shot%' then 1 else null end))  OVER (partition by match_id order by row_number),0) as jump_shots_made_awayteam
        ,coalesce(sum((CASE WHEN stat_action_awayteam  = 'Points Scored' and (scoring_stat_awayteam_full like '%lay-up%' or scoring_stat_awayteam_full like '%lay up%') then 1 else null end))  OVER (partition by match_id order by row_number),0) as lay_up_shots_made_awayteam
        ,coalesce(sum((CASE WHEN stat_action_awayteam  = 'Points Scored' and (scoring_stat_awayteam_full like '%put-back%' or scoring_stat_awayteam_full like '%put back%') then 1 else null end))  OVER (partition by match_id order by row_number),0) as put_backs_shots_made_awayteam
        ,coalesce(sum((CASE WHEN stat_action_awayteam  = 'Points Scored' and (scoring_stat_awayteam_full like '%dunk%') then 1 else null end))  OVER (partition by match_id order by row_number),0) as dunk_shots_made_awayteam

        ,coalesce(sum((CASE WHEN stat_action_awayteam  = 'Shot Missed' and scoring_stat_awayteam_full like '%2pt%' then 1 else null end))  OVER (partition by match_id order by row_number),0) as two_point_shots_missed_awayteam
        ,coalesce(sum((CASE WHEN stat_action_awayteam  = 'Shot Missed' and scoring_stat_awayteam_full like '%jump shot%' then 1 else null end))  OVER (partition by match_id order by row_number),0) as jump_shots_missed_awayteam
        ,coalesce(sum((CASE WHEN stat_action_awayteam  = 'Shot Missed' and (scoring_stat_awayteam_full like '%lay-up%' or scoring_stat_awayteam_full like '%lay up%') then 1 else null end))  OVER (partition by match_id order by row_number),0) as lay_up_shots_missed_awayteam
        ,coalesce(sum((CASE WHEN stat_action_awayteam  = 'Shot Missed' and (scoring_stat_awayteam_full like '%put-back%' or scoring_stat_awayteam_full like '%put back%') then 1 else null end))  OVER (partition by match_id order by row_number),0) as put_backs_shots_missed_awayteam
        ,coalesce(sum((CASE WHEN stat_action_awayteam  = 'Shot Missed' and (scoring_stat_awayteam_full like '%dunk%') then 1 else null end))  OVER (partition by match_id order by row_number),0) as dunk_shots_missed_awayteam


        ,coalesce(sum((CASE WHEN stat_action_awayteam  = 'Points Scored' and scoring_stat_awayteam_full like '%3pt%' then 1 else null end))  OVER (partition by match_id order by row_number),0) as three_point_shots_made_awayteam
        ,coalesce(sum((CASE WHEN stat_action_awayteam  = 'Shot Missed' and scoring_stat_awayteam_full like '%3pt%' then 1 else null end))  OVER (partition by match_id order by row_number),0) as three_point_shots_missed_awayteam


        ,coalesce(sum((CASE WHEN stat_action_awayteam  = 'Points Scored' and scoring_stat_awayteam_full like '%free throw%' then 1 else null end))  OVER (partition by match_id order by row_number),0) as free_throw_shots_made_awayteam
        ,coalesce(sum((CASE WHEN stat_action_awayteam  = 'Shot Missed' and scoring_stat_awayteam_full like '%free throw%' then 1 else null end))  OVER (partition by match_id order by row_number),0) as free_throw_shots_missed_awayteam


        ,row_number() OVER (partition by match_id,row_number order by 1) as fiba_import_safe_rank
from fiba_europe_games_import

-- where scoring_stat_hometeam_full like '%back%' limit 50
-- AND stat_action_hometeam = 'Points Scored'
-- order by match_id, row_number

-- limit 50
) s1
-- order by match_id, row_number

WHERE fiba_import_safe_rank = 1
) as cumulative_stuff

ON  s1_base.match_id = cumulative_stuff.cumulative_match_id
AND s1_base.row_number = cumulative_stuff.cumulative_row_number

where safe_rank = 1
order by match_id,row_number
;

*/






/*



-- REMOVE MOST OF THE SHIT BELOW. ALL WE NEED IS TO JOIN METADATA (age and sex) to game, and flag it as "included in master table" or not. Then put it in a "streamlined" table for export to be pickled....

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

  page_header_text_search_term_sex varchar(255),
  page_header_text_league_sex varchar(255),
  page_header_text_search_term_age varchar(255),
  page_header_text_league_age varchar(255),


    metadata_competition_name varchar(255),


  match_metadata_competition_name_search_term_sex varchar(255),
  match_metadata_competition_name_league_sex varchar(255),
  match_metadata_competition_name_search_term_age varchar(255),
  match_metadata_competition_name_league_age varchar(255),

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






UPDATE fiba_europe_game_xref  SET page_header_text_search_term_sex = coalesce(B.search_term,page_header_text_search_term_sex), page_header_text_league_sex = coalesce(B.league_sex_update,page_header_text_league_sex),insert_date = now()
FROM (

  SELECT xx.page_header_text
        ,search_term
        ,league_sex as league_sex_update
  FROM
  (
SELECT DISTINCT page_header_text
FROM fiba_europe_schedules
  ) xx
left join (
  SELECT DISTINCT lower(search_term) as search_term
         ,league_sex
  FROM fiba_europe_league_sex
  where league_sex = 'male'
) as yy
  on lower(xx.page_header_text) like '%' || search_term || '%'

  ) as B
WHERE fiba_europe_game_xref.page_header_text = B.page_header_text;
;



UPDATE fiba_europe_game_xref  SET page_header_text_search_term_sex = coalesce(B.search_term,page_header_text_search_term_sex), page_header_text_league_sex = coalesce(B.league_sex_update,page_header_text_league_sex),insert_date = now()
FROM (

  SELECT xx.page_header_text
        ,search_term
        ,league_sex as league_sex_update
  FROM
  (
SELECT DISTINCT page_header_text
FROM fiba_europe_schedules
  ) xx
left join (
  SELECT DISTINCT lower(search_term) as search_term
         ,league_sex
  FROM fiba_europe_league_sex
  where league_sex = 'female'
) as yy
  on lower(xx.page_header_text) like '%' || search_term || '%'

  ) as B
WHERE fiba_europe_game_xref.page_header_text = B.page_header_text;
;



UPDATE fiba_europe_game_xref  SET page_header_text_search_term_age = coalesce(B.search_term,page_header_text_search_term_age), page_header_text_league_age = coalesce(B.league_age_update,page_header_text_league_age),insert_date = now()
FROM (

  SELECT xx.page_header_text
        ,search_term
        ,league_age as league_age_update
  FROM
  (
SELECT DISTINCT page_header_text
FROM fiba_europe_schedules
  ) xx
left join (
  SELECT DISTINCT lower(search_term) as search_term
         ,age as league_age
  FROM fiba_europe_league_age

) as yy
  on lower(xx.page_header_text) like '%' || search_term || '%'

  ) as B
WHERE fiba_europe_game_xref.page_header_text = B.page_header_text;
;






UPDATE fiba_europe_game_xref  SET metadata_competition_name = B.metadata_competition_name, match_metadata_competition_name_search_term_sex = coalesce(B.search_term,match_metadata_competition_name_search_term_sex), match_metadata_competition_name_league_sex = coalesce(B.league_sex_update,match_metadata_competition_name_league_sex),insert_date = now()
FROM (

  SELECT xx.match_id
        ,xx.metadata_competition_name
        ,search_term
        ,league_sex as league_sex_update
  FROM
  (
SELECT distinct match_id
        ,metadata_competition_name
FROM (
         SELECT match_id
              , metadata_competition_name
              , row_number() OVER (partition by match_id order by count(*) desc) as rankcount
         from fiba_europe_games_master
         group by 1, 2
     ) s2
      where rankcount = 1
  ) xx
left join (
  SELECT DISTINCT lower(search_term) as search_term
         ,league_sex
  FROM fiba_europe_league_sex
  where league_sex = 'male'
) as yy
  on lower(xx.metadata_competition_name) like '%' || search_term || '%'

  ) as B
WHERE fiba_europe_game_xref.match_id = B.match_id;
;



UPDATE fiba_europe_game_xref  SET metadata_competition_name = B.metadata_competition_name, match_metadata_competition_name_search_term_sex = coalesce(B.search_term,match_metadata_competition_name_search_term_sex), match_metadata_competition_name_league_sex = coalesce(B.league_sex_update,match_metadata_competition_name_league_sex),insert_date = now()
FROM (

  SELECT xx.match_id
        ,xx.metadata_competition_name
        ,search_term
        ,league_sex as league_sex_update
  FROM
  (
SELECT distinct match_id
        ,metadata_competition_name
FROM (
         SELECT match_id
              , metadata_competition_name
              , row_number() OVER (partition by match_id order by count(*) desc) as rankcount
         from fiba_europe_games_master
         group by 1, 2
     ) s2
      where rankcount = 1
  ) xx
left join (
  SELECT DISTINCT lower(search_term) as search_term
         ,league_sex
  FROM fiba_europe_league_sex
  where league_sex = 'female'
) as yy
  on lower(xx.metadata_competition_name) like '%' || search_term || '%'

  ) as B
WHERE fiba_europe_game_xref.match_id = B.match_id;
;





UPDATE fiba_europe_game_xref  SET metadata_competition_name = B.metadata_competition_name, match_metadata_competition_name_search_term_sex = coalesce(B.search_term,match_metadata_competition_name_search_term_age), match_metadata_competition_name_league_age = coalesce(B.league_age_update,match_metadata_competition_name_league_age),insert_date = now()
FROM (

  SELECT xx.match_id
        ,xx.metadata_competition_name
        ,search_term
        ,league_age as league_age_update
  FROM
  (
SELECT distinct match_id
        ,metadata_competition_name
FROM (
         SELECT match_id
              , metadata_competition_name
              , row_number() OVER (partition by match_id order by count(*) desc) as rankcount
         from fiba_europe_games_master
         group by 1, 2
     ) s2
      where rankcount = 1
  ) xx
left join (
  SELECT DISTINCT lower(search_term) as search_term
         ,age as league_age
  FROM fiba_europe_league_age
) as yy
  on lower(xx.metadata_competition_name) like '%' || search_term || '%'

  ) as B
WHERE fiba_europe_game_xref.match_id = B.match_id;


SELECT count(match_id) as match_ids
      ,count(schedule_date) as match_ids_with_dates
FROM fiba_europe_game_xref;


*/
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








/*
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

*/



-- SELECT 'DONE';






/*
SELECT points_scored_type_hometeam,count(*)
FROM fiba_europe_games_master
group by 1
 order by 2 desc

-- SELECT stat_action_hometeam,count(*)
------- DO UPDATES OF THE THING
SELECT match_id,row_number,scoring_stat_hometeam_full,scoring_stat_awayteam_full,points_scored_type_hometeam,points_scored_player_hometeam,current_score_hometeam

SELECT

      full_text
        ,scoring_stat_hometeam_full
        ,stat_action_hometeam
        ,points_scored_player_hometeam
        ,points_scored_type_hometeam
        ,foul_drawn_player_hometeam

FROM fiba_europe_games_master
where scoring_stat_hometeam_full is not null
and stat_action_hometeam is null
and (case when lower(scoring_stat_hometeam_full) like '%free throw awarded%' then 'Free Throws Awarded'
    when lower(scoring_stat_hometeam_full) like '%- block%' then 'Shot Blocked'
    when lower(scoring_stat_hometeam_full) like '%turnover%' then 'Turnover Committed'
    when lower(scoring_stat_hometeam_full) like '%technical  foul%' then 'Foul Committed'

    else null end) is not null
-- and foul_drawn_player_hometeam IS NOT NULL
and scoring_stat_hometeam_full= 'One free throw awarded'
    limit 500
--     and scoring_stat_hometeam_full not like '%assist%'
--     and scoring_stat_hometeam_full not like '%rebound%'

-- group by 1
limit 50

update fiba_europe_games_master set stat_action_hometeam = 'Free Throws Awarded', stat_action_awayteam = 'Foul Committed'
where scoring_stat_hometeam_full = 'One free throw awarded'
  and (stat_action_hometeam is null or lower(stat_action_hometeam) = 'nan')
and full_text like '%technical  foul%';

update fiba_europe_games_master set stat_action_awayteam = 'Free Throws Awarded', stat_action_hometeam = 'Foul Committed'
where scoring_stat_awayteam_full = 'One free throw awarded'
  and (stat_action_awayteam is null or lower(stat_action_awayteam) = 'nan')
and full_text like '%technical  foul%';

update fiba_europe_games_master set stat_action_hometeam = 'Turnover Committed'
where scoring_stat_hometeam_full like 'Team turnover%'
  and (stat_action_hometeam is null or lower(stat_action_hometeam) = 'nan')
;

update fiba_europe_games_master set stat_action_awayteam = 'Turnover Committed'
where scoring_stat_awayteam_full like 'Team turnover%'
  and (stat_action_awayteam is null or lower(stat_action_awayteam) = 'nan')
;




update fiba_europe_games_import set stat_action_hometeam = 'Free Throws Awarded', stat_action_awayteam = 'Foul Committed'
where scoring_stat_hometeam_full = 'One free throw awarded'
and full_text like '%technical  foul%';


SELECT full_text
        ,scorei
        ,scoring_stat_awayteam_full

from fiba_europe_games_master
where scoring_stat_hometeam_full like 'Team turnover%'
and (stat_action_hometeam is null or stat_action_hometeam = 'nan')
limit 50

SELECT scoring_stat_hometeam_full
     ,count(*)
from fiba_europe_games_master
where scoring_stat_hometeam_full is not null
  and (stat_action_hometeam is null or stat_action_hometeam = 'nan')

group by 1
order by 2 desc



select stat_action_hometeam,stat_action_awayteam,count(*) from fiba_europe_games_master
where scoring_stat_hometeam_full = 'One free throw awarded'
and full_text like '%technical  foul%'
group by 1,2 order by 3 desc


SELECT *
FROM fiba_europe_games_master
where match_id = '65909'
order by row_number
limit 50
;


SELECT *
FROM fiba_europe_game_xref
where schedule_date is not null
limit 50
;

SELECT count(distinct match_id) as total_matches
    ,count(distinct case when schedule_date is not null then match_id else null end)
from fiba_europe_game_xref
;





 SELECT match_metadata_competition_name_league_age,count(*)
    FROM fiba_europe_game_xref
--     where schedule_date is not null
              group by 1
                           order by 2 desc




SELECT match_id
    ,row_number
,period
,minutes_remaining_in_period
,current_score_hometeam
,current_score_awayteam
,team_fouls_committed_hometeam
,team_fouls_committed_awayteam
,avg_time_between_scoring_events_overall_hometeam
,avg_time_between_scoring_events_quarter_hometeam
,avg_time_between_scoring_events_overall_awayteam
,avg_time_between_scoring_events_quarter_awayteam
,avg_time_between_scoring_events_overall
,avg_time_between_scoring_events_quarter
,current_lead_hometeam
,cumulative_lead_changes_game
,cumulative_lead_changes_quarter
,cumulative_avg_abs_size_of_lead_game
,cumulative_max_abs_size_of_lead_game
,cumulative_max_size_of_lead_game_hometeam
,cumulative_max_size_of_lead_game_awayteam
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
,starting_five_in_play_awayteam
,top_five_scorers_in_play_hometeam
,top_five_scorers_in_play_awayteam
,percent_of_total_points_scored_by_players_in_play_awayteam
,percent_of_total_points_scored_by_players_in_play_hometeam
,points_scored_by_players_in_play_hometeam
,points_scored_by_players_in_play_awayteam
,top_five_players_in_play_hometeam
,top_five_players_in_play_awayteam

,total_stat_count_players_in_play_hometeam
,total_stat_count_players_in_play_awayteam
,percent_of_total_stat_count_by_players_in_play_hometeam
,percent_of_total_stat_count_by_players_in_play_awayteam

select count(*)

FROM fiba_europe_games_master xx inner join (
    SELECT DISTINCT match_id as okay_match_id
    FROM fiba_europe_game_xref
    where match_id is not null
      and (coalesce(match_metadata_competition_name_league_age, page_header_text_league_age) is null)
      and (coalesce(match_metadata_competition_name_league_sex, page_header_text_league_sex) is null
        or coalesce(match_metadata_competition_name_league_sex, page_header_text_league_sex) = 'male')
) yy on xx.match_id = yy.okay_match_id

*/



-- drop table if exists fiba_europe_games_import;
-- drop table if exists fiba_europe_boxscores_import;






/*
CREATE TABLE fiba_europe_matches_to_use_in_dashboard (
	match_metadata_competition_name varchar(256) unique
);

INSERT INTO fiba_europe_matches_to_use_in_dashboard VALUES
('Centrobasket Championship'),
('Centrobasket Women''s Championship'),
('Division C Men'),
('Division C Women'),
('EuroBasket'),
('EuroBasket - DIVISION A'),
('EuroBasket - DIVISION B'),
('EuroBasket - Final Round'),
('EuroBasket 2015'),
('EuroBasket Women'),
('EuroBasket Women - DIV. A'),
('EuroBasket Women - DIV. B'),
('EuroBasket Women - DIVISION A'),
('EuroBasket Women - DIVISION B'),
('EuroBasket Women - Final Round'),
('EuroBasket Women 2015'),
('EuroChallenge'),
('EuroCup Women'),
('EuroLeague Women'),
('European Championship Small Countries Men'),
('European Championship Small Countries Women'),
('FIBA Americas League'),
('FIBA Americas League for Men''s Clubs'),
('FIBA Americas U18 Championship'),
('FIBA Americas Women''s U18 Championship'),
('Small Countries - Men'),
('Small Countries - Women'),
('South American Championship'),
('South American League'),
('U16 Men - DIVISION A'),
('U16 Men - Division A'),
('U16 Men - DIVISION B'),
('U16 Men - Division B'),
('U16 Men - Division C'),
('U16 Men Div. C'),
('U16 Women - DIVISION A'),
('U16 Women - Division A'),
('U16 Women - DIVISION B'),
('U16 Women - Division B'),
('U16 Women - Division C'),
('U16 Women Div. C'),
('U18 Men - DIVISION A'),
('U18 Men - Division A'),
('U18 Men - DIVISION B'),
('U18 Men - Division B'),
('U18 Women - DIVISION A'),
('U18 Women - Division A'),
('U18 Women - DIVISION B'),
('U18 Women - Division B'),
('U18 Women - Division C'),
('U20 Men - DIVISION A'),
('U20 Men - Division A'),
('U20 Men - DIVISION B'),
('U20 Men - Division B'),
('U20 Women - DIVISION A'),
('U20 Women - Division A'),
('U20 Women - DIVISION B'),
('U20 Women - Division B');



CREATE TABLE fiba_europe_matchids_to_user_in_dashboard as (
    SELECT distinct match_id
    from fiba_europe_game_xref x inner join fiba_europe_matches_to_use_in_dashboard y on x.metadata_competition_name = y.match_metadata_competition_name
);

*/










/**

ADDING SHIT TO THE XREF
**/
/*

ALTER TABLE fiba_europe_game_xref ADD COLUMN logo_url_competition TEXT;

ALTER TABLE fiba_europe_game_xref ADD COLUMN  team_name_hometeam TEXT;
ALTER TABLE fiba_europe_game_xref ADD COLUMN logo_url_hometeam TEXT;
ALTER TABLE fiba_europe_game_xref ADD COLUMN hometeam_photo_pbp TEXT;

ALTER TABLE fiba_europe_game_xref ADD COLUMN  team_name_awayteam TEXT;
ALTER TABLE fiba_europe_game_xref ADD COLUMN logo_url_awayteam TEXT;
ALTER TABLE fiba_europe_game_xref ADD COLUMN awayteam_photo_pbp TEXT;

ALTER TABLE fiba_europe_game_xref ADD COLUMN final_score_hometeam INTEGER;
ALTER TABLE fiba_europe_game_xref ADD COLUMN final_score_awayteam INTEGER;
ALTER TABLE fiba_europe_game_xref ADD COLUMN winner_hometeam INTEGER;

ALTER TABLE fiba_europe_game_xref ADD COLUMN ending_score_period1_hometeam INTEGER;
ALTER TABLE fiba_europe_game_xref ADD COLUMN ending_score_period1_awayteam INTEGER;

ALTER TABLE fiba_europe_game_xref ADD COLUMN ending_score_period2_hometeam INTEGER;
ALTER TABLE fiba_europe_game_xref ADD COLUMN ending_score_period2_awayteam INTEGER;

ALTER TABLE fiba_europe_game_xref ADD COLUMN ending_score_period3_hometeam INTEGER;
ALTER TABLE fiba_europe_game_xref ADD COLUMN ending_score_period3_awayteam INTEGER;

ALTER TABLE fiba_europe_game_xref ADD COLUMN ending_score_period4_hometeam INTEGER;
ALTER TABLE fiba_europe_game_xref ADD COLUMN ending_score_period4_awayteam INTEGER;




UPDATE fiba_europe_game_xref SET logo_url_competition = B.logo_url_competition


,  team_name_hometeam = B. team_name_hometeam
, logo_url_hometeam = B.logo_url_hometeam
, hometeam_photo_pbp = B.hometeam_photo_pbp

,  team_name_awayteam = B. team_name_awayteam
, logo_url_awayteam = B.logo_url_awayteam
, awayteam_photo_pbp = B.awayteam_photo_pbp

, final_score_hometeam = B.final_score_hometeam
, final_score_awayteam = B.final_score_awayteam
, winner_hometeam = B.winner_hometeam

, ending_score_period1_hometeam = B.ending_score_period1_hometeam
, ending_score_period1_awayteam = B.ending_score_period1_awayteam

, ending_score_period2_hometeam = B.ending_score_period2_hometeam
, ending_score_period2_awayteam = B.ending_score_period2_awayteam

, ending_score_period3_hometeam = B.ending_score_period3_hometeam
, ending_score_period3_awayteam = B.ending_score_period3_awayteam

, ending_score_period4_hometeam = B.ending_score_period4_hometeam
, ending_score_period4_awayteam = B.ending_score_period4_awayteam

FROM fiba_europe_game_xref A left join (
SELECT  match_id
        , min(case when logo_url_competition = 'nan' then null else logo_url_competition end) as logo_url_competition

        ,min(case when team_name_hometeam = 'nan' then null else team_name_hometeam end) as  team_name_hometeam
        ,min(case when logo_url_hometeam = 'nan' then null else logo_url_hometeam end ) as logo_url_hometeam
        ,min(case when hometeam_photo_pbp  = 'nan' then null else hometeam_photo_pbp end) as hometeam_photo_pbp

        ,min(case when team_name_awayteam = 'nan' then null else team_name_awayteam end) as  team_name_awayteam
        ,min(case when logo_url_awayteam = 'nan' then null else logo_url_awayteam end ) as logo_url_awayteam
        ,min(case when awayteam_photo_pbp  = 'nan' then null else awayteam_photo_pbp end) as awayteam_photo_pbp

        ,min(final_score_hometeam) as final_score_hometeam
        ,min(final_score_awayteam) as final_score_awayteam
        ,min(winner_hometeam) as winner_hometeam

        ,min(ending_score_period1_hometeam) as ending_score_period1_hometeam
        ,min(ending_score_period1_awayteam) as ending_score_period1_awayteam

        ,min(ending_score_period2_hometeam) as ending_score_period2_hometeam
        ,min(ending_score_period2_awayteam) as ending_score_period2_awayteam

        ,min(ending_score_period3_hometeam) as ending_score_period3_hometeam
        ,min(ending_score_period3_awayteam) as ending_score_period3_awayteam

        ,min(ending_score_period4_hometeam) as ending_score_period4_hometeam
        ,min(ending_score_period4_awayteam) as ending_score_period4_awayteam

FROM fiba_europe_games_master
group by 1
    )  B on A.match_id = B.match_id
*/
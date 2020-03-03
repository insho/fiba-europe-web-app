

--- INSERT SHIT FROM IMPORT INTO MASTER
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


truncate table fiba_europe_boxscores_import;

DELETE FROM fiba_europe_games_master
WHERE match_id in (
  SELECT DISTINCT match_id
  FROM fiba_europe_games_import
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


truncate table fiba_europe_games_import;





truncate table fiba_europe_competition_xref;

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



-------


drop table if exists fiba_europe_game_xref;
create table fiba_europe_game_xref (
  match_id varchar(256),
  metadata_competition_name varchar(500),
  schedule_date timestamp,
  page_header_text varchar(255),
  match_location varchar(255),
  boxscore_url varchar(255),
  schedule_page_id varchar(255),
  combo_score integer,
  insert_date timestamp
);

INSERT INTO fiba_europe_game_xref
  SELECT match_id
        ,metadata_competition_name
FROM
  (
SELECT match_id
        ,metadata_competition_name
        ,counT(*)
        ,row_numbeR() OVER (partition by match_id order by count(*) desc) as safe_rank
FROM fiba_europe_games_master
group by 1,2
  )  as s1
where safe_rank = 1
order by match_id
;







UPDATE fiba_europe_game_xref  SET schedule_date = B.schedule_date
  , page_header_text= B.page_header_text
  , match_location= B.match_location
  , boxscore_url= B.boxscore_url
  , schedule_page_id= B.schedule_page_id
  , combo_score = B.combo_score
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
          ,hometeam_score as final_score_hometeam
          ,awayteam_score as final_score_awayteam
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
and combo_score <199

  ) as B
WHERE fiba_europe_game_xref.match_id = B.match_id;
;



-- SELECT page_header_text
--       ,count(match_id) as match_ids
--       ,count(schedule_date) as match_ids_with_dates
-- FROM fiba_europe_game_xref
-- group by 1
-- having count(match_id)>=20 and (case when count(match_id)>0 then count(schedule_date)/cast(count(match_id) as float) else 0 end) >.90
-- order by 1
-- ;

-- SELECT *
-- FROM fiba_europe_competition_xref
-- limit 50
-- ;

drop table if exists fiba_europe_game_xref_final;
create table fiba_europe_game_xref_final (
  match_id varchar(250),
  competition_group varchar(250),
	competition_name varchar(500),
	schedule_date timestamp,
	match_location varchar(250),
	boxscore_url varchar(250),
	schedule_page_id varchar(500),

	competition_group_sex_search_term varchar(250),
	competition_group_sex varchar(50),
	competition_group_age_search_term varchar(250),
	competition_group_age varchar(50),

	competition_name_sex_search_term varchar(250),
	competition_name_sex varchar(50),
	competition_name_age_search_term varchar(250),
	competition_name_age varchar(50),


	insert_date timestamp
);


INSERT INTO fiba_europe_game_xref_final
SELECT match_id
  ,metadata_competition_name as competition_group
	,page_header_text as competition_name
	,schedule_date
	,match_location
	,boxscore_url
	,schedule_page_id

	,null as competition_group_sex_search_term
	,null as competition_group_sex
	,null as competition_group_age_search_term
	,null as competition_group_age

	,null as competition_name_sex_search_term
	,null as competition_name_sex
	,null as competition_name_age_search_term
	,null as competition_name_age

	,now() as insert_date
FROM (
SELECT match_id
			,schedule_date
			,page_header_text
			,match_location
			,boxscore_url
			,schedule_page_id
       ,metadata_competition_name
			,row_number() over (partition by match_id order by insert_date desc) as safe_rank
FROM fiba_europe_game_xref xx inner join (


SELECT page_header_text as page_header_text_limitor
--       ,count(match_id) as match_ids
--       ,count(schedule_date) as match_ids_with_dates

FROM fiba_europe_game_xref
group by 1
having count(match_id)>=20
         and (case when count(match_id)>0 then count(schedule_date)/cast(count(match_id) as float) else 0 end) >.90
order by 1

	) yy  on xx.page_header_text = yy.page_header_text_limitor
) s1
where safe_rank = 1
;




UPDATE fiba_europe_game_xref_final  SET competition_group_sex_search_term = coalesce(B.search_term,competition_group_sex_search_term), competition_group_sex = coalesce(B.league_sex_update,competition_group_sex),insert_date = now()
FROM (

  SELECT xx.metadata_competition_name
        ,search_term
        ,league_sex as league_sex_update
  FROM
  (
SELECT DISTINCT metadata_competition_name
FROM fiba_europe_game_xref
  ) xx
left join (
  SELECT DISTINCT lower(search_term) as search_term
         ,league_sex
  FROM fiba_europe_league_sex
  where league_sex = 'male'
) as yy
  on lower(xx.metadata_competition_name) like '%' || search_term || '%'

  ) as B
WHERE fiba_europe_game_xref_final.competition_group = B.metadata_competition_name;
;



UPDATE fiba_europe_game_xref_final  SET competition_group_sex_search_term = coalesce(B.search_term,competition_group_sex_search_term), competition_group_sex = coalesce(B.league_sex_update,competition_group_sex),insert_date = now()
FROM (

  SELECT xx.metadata_competition_name
        ,search_term
        ,league_sex as league_sex_update
  FROM
  (
SELECT DISTINCT metadata_competition_name
FROM fiba_europe_game_xref
  ) xx
left join (
  SELECT DISTINCT lower(search_term) as search_term
         ,league_sex
  FROM fiba_europe_league_sex
  where league_sex = 'female'
) as yy
  on lower(xx.metadata_competition_name) like '%' || search_term || '%'

  ) as B
WHERE fiba_europe_game_xref_final.competition_group = B.metadata_competition_name;
;



UPDATE fiba_europe_game_xref_final  SET competition_group_age_search_term = B.search_term, competition_group_age = B.league_age,insert_date = now()
FROM (

  SELECT xx.metadata_competition_name
        ,search_term
        ,league_age
  FROM
  (
SELECT DISTINCT metadata_competition_name
FROM fiba_europe_game_xref
  ) xx
left join (
  SELECT DISTINCT lower(search_term) as search_term
         ,age as league_age
  FROM fiba_europe_league_age
) as yy
  on lower(xx.metadata_competition_name) like '%' || search_term || '%'

  ) as B
WHERE fiba_europe_game_xref_final.competition_group = B.metadata_competition_name;
;


------ Now do the competition NAME


UPDATE fiba_europe_game_xref_final  SET competition_name_sex_search_term = coalesce(B.search_term,competition_name_sex_search_term), competition_name_sex = coalesce(B.league_sex_update,competition_name_sex),insert_date = now()
FROM (

  SELECT xx.metadata_competition_name
        ,search_term
        ,league_sex as league_sex_update
  FROM
  (
SELECT DISTINCT page_header_text as metadata_competition_name
FROM fiba_europe_game_xref
  ) xx
left join (
  SELECT DISTINCT lower(search_term) as search_term
         ,league_sex
  FROM fiba_europe_league_sex
  where league_sex = 'male'
) as yy
  on lower(xx.metadata_competition_name) like '%' || search_term || '%'

  ) as B
WHERE fiba_europe_game_xref_final.competition_name = B.metadata_competition_name;
;



UPDATE fiba_europe_game_xref_final  SET competition_name_sex_search_term = coalesce(B.search_term,competition_name_sex_search_term), competition_name_sex = coalesce(B.league_sex_update,competition_name_sex),insert_date = now()
FROM (

  SELECT xx.metadata_competition_name
        ,search_term
        ,league_sex as league_sex_update
  FROM
  (
SELECT DISTINCT page_header_text as metadata_competition_name
FROM fiba_europe_game_xref
  ) xx
left join (
  SELECT DISTINCT lower(search_term) as search_term
         ,league_sex
  FROM fiba_europe_league_sex
  where league_sex = 'female'
) as yy
  on lower(xx.metadata_competition_name) like '%' || search_term || '%'

  ) as B
WHERE fiba_europe_game_xref_final.competition_name = B.metadata_competition_name;
;



UPDATE fiba_europe_game_xref_final  SET competition_name_age_search_term = B.search_term, competition_name_age = B.league_age,insert_date = now()
FROM (

  SELECT xx.metadata_competition_name
        ,search_term
        ,league_age
  FROM
  (
SELECT DISTINCT page_header_text as metadata_competition_name
FROM fiba_europe_game_xref
  ) xx
left join (
  SELECT DISTINCT lower(search_term) as search_term
         ,age as league_age
  FROM fiba_europe_league_age
) as yy
  on lower(xx.metadata_competition_name) like '%' || search_term || '%'

  ) as B
WHERE fiba_europe_game_xref_final.competition_name = B.metadata_competition_name;
;


DELETE FROM fiba_europe_game_xref_final where coalesce(competition_group_sex,'male') <> coalesce(competition_name_sex, 'male');

DELETE FROM fiba_europe_game_xref_final where coalesce(competition_group_age,'Adult') <> coalesce(competition_name_age, 'Adult');

DELETE FROM fiba_europe_game_xref_final where competition_name = '2013 FIBA Africa Championship for Men';


update fiba_europe_game_xref_final set competition_name_sex = coalesce(competition_name_sex,'male');
update fiba_europe_game_xref_final set competition_name_age = coalesce(competition_name_age,'Adult');

update fiba_europe_game_xref_final set competition_group_sex = coalesce(competition_group_sex,'male');
update fiba_europe_game_xref_final set competition_group_age = coalesce(competition_group_age,'Adult');



/*
SELECT xx.match_id
			,xx.competition_group
			,xx.competition_name
			,team_name_hometeam
			,team_name_awayteam

FROM fiba_europe_game_xref_final xx LEFT JOIN (
  SELECT distinct match_id,team_name_hometeam,team_name_awayteam
                  from fiba_europe_games_master
	) yy on xx.match_id = yy.match_id
where coalesce(competition_group_sex,'male') <> coalesce(competition_name_sex, 'male')

------------

SELECT xx.match_id
			,xx.competition_group
			,xx.competition_name
      ,competition_group_age
       ,competition_name_age
			,team_name_hometeam
			,team_name_awayteam

FROM fiba_europe_game_xref_final xx LEFT JOIN (
  SELECT distinct match_id,team_name_hometeam,team_name_awayteam
                  from fiba_europe_games_master
	) yy on xx.match_id = yy.match_id
where coalesce(competition_group_age,'Adult') <> coalesce(competition_name_age, 'Adult')
;


*/





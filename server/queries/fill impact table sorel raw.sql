

drop table if exists joe.tmp_raw_product_metadata_sorel;
create table joe.tmp_raw_product_metadata_sorel (
 product_id character varying(512)
,product_domain character varying(512)
,product_category character varying(1024)
,product_brand character varying(512)

)
DISTSTYLE KEY
DISTKEY ( product_brand )
SORTKEY (  product_domain,product_category,product_brand,product_id);


INSERT INTO joe.tmp_raw_product_metadata_sorel

			SELECT distinct product_id
					,product_domain
				,product_category
				,product_brand
			FROM
			(
				 SELECT  product_id
					,product_domain
				,product_category
				,product_brand
				,ROW_NUMBER() OVER (partition by product_id	ORDER BY count(*) desc ) as cnt
				 FROM atomic.fat_events
				 WHere  partner_key in ('sorel','Sorel')
				 and collector_tstamp >= '2019-06-14'
				 and collector_tstamp >= date_add('month',-1,getdate())
				 and product_domain is not NULL
				 and product_category is not NULL
				 and event_name in ('viewed_product','added_variant_to_cart')

				group by product_id
					,product_domain
				,product_category
				,product_brand
				)  as most_popular_product_info_combos
			WHERE cnt = 1

;




DROP TABLE IF EXISTS "joe"."impact_analysis_enriched_sorel";
CREATE TABLE "joe"."impact_analysis_enriched_sorel" (
	"partner_key" varchar(512),
	"site_id" varchar(512),
	"network_userid" varchar(38),
	"domain_userid" varchar(64),
	"domain_sessionidx" int2,
	"ab_slot" varchar(50),
	"ab_slot2" varchar(50),
	"ab_slot3" varchar(50),
	"ab_slot4" varchar(50),
	"event_name" varchar(255),
	"collector_tstamp" timestamp NOT NULL,
	"product_domain" varchar(255),
	"product_category" varchar(255),
	"product_brand" varchar(255),
	"product_id" varchar(255),
	"variant_id" varchar(255),
	"order_order_id" varchar(255),
	"product_fitpredictor_supported" bool,
	"has_transactional_prediction" bool,
	"prediction_type" varchar(64),
	"prediction_size" varchar(64),
	"prediction_size_label" varchar(64),
	"prediction_size_type" varchar(64),
	"product_size_label" varchar(512),
	"product_size_type" varchar(512),
	"price" numeric(12,4),
	"order_quantity" float8,
	"site_currency" varchar(512),
	"mobile_flag" boolean,
	"geo_country" char(2),
	"product_available_size_labels" character varying(4096),
	"useragent_family" character varying(255),
	"useragent_version" varchar(255),
	"enabled_user_flag" boolean,
  viewed_on_mobile_before_ordering boolean,
	"geo_zipcode" varchar(15),
	"useragent_major" varchar(64),
  "sale_price"  numeric(12,4),
    "site_market" varchar(2),
    "site_language" varchar(24),
    "event_id" char(36)

)
DISTSTYLE KEY
DISTKEY ( domain_userid )
SORTKEY ( partner_key
		,event_name
		,domain_userid
		, collector_tstamp)
;

grant ALL on joe.impact_analysis_enriched_sorel to joe;





INSERT INTO joe.impact_analysis_enriched_sorel

SELECT partner_key
	,site_id
	,network_userid
	,domain_userid
  ,domain_sessionidx


--   ,(CASE WHEN  ab_slot is null and event_name = 'ordered_variant' and ab_slot_for_orphaned_orders_domain_user_level is not null and ab_slot_first_allocated_tstamp_for_orphaned_orders_domain_user_level <= collector_tstamp then lower(ab_slot_for_orphaned_orders_domain_user_level)
--          WHEN  ab_slot is null and event_name = 'ordered_variant' and ab_slot_for_orphaned_orders is not null and ab_slot_first_allocated_tstamp_for_orphaned_orders <= collector_tstamp then lower(ab_slot_for_orphaned_orders)
--             else lower(ab_slot) end) as ab_slot
  ,ab_slot
--    ,(CASE WHEN  ab_slot2 is null and event_name = 'ordered_variant' and ab_slot2_for_orphaned_orders_domain_user_level is not null and ab_slot2_first_allocated_tstamp_for_orphaned_orders_domain_user_level <= collector_tstamp then lower(ab_slot2_for_orphaned_orders_domain_user_level)
--          WHEN  ab_slot2 is null and event_name = 'ordered_variant' and ab_slot2_for_orphaned_orders is not null and ab_slot2_first_allocated_tstamp_for_orphaned_orders <= collector_tstamp then lower(ab_slot2_for_orphaned_orders)
--             else lower(ab_slot2) end) as ab_slot2
,ab_slot2

--    ,(CASE WHEN  ab_slot3 is null and event_name = 'ordered_variant' and ab_slot3_for_orphaned_orders_domain_user_level is not null and ab_slot3_first_allocated_tstamp_for_orphaned_orders_domain_user_level <= collector_tstamp then lower(ab_slot3_for_orphaned_orders_domain_user_level)
--          WHEN  ab_slot3 is null and event_name = 'ordered_variant' and ab_slot3_for_orphaned_orders is not null and ab_slot3_first_allocated_tstamp_for_orphaned_orders <= collector_tstamp then lower(ab_slot3_for_orphaned_orders)
--             else lower(ab_slot3) end) as ab_slot3
,ab_slot3
  ,null as ab_slot4 -- ,(CASE WHEN  ab_slot4 is null and event_name = 'ordered_variant' then ab_slot4_for_orphaned_orders else ab_slot4 end) as ab_slot4
  ,event_name
  ,collector_tstamp
  ,coalesce(shell2.product_domain,product_info.product_domain,product_metadata.product_domain) as product_domain
  ,coalesce(shell2.product_category,product_info.product_category,product_metadata.product_category) as product_category
  ,coalesce(shell2.product_brand,product_info.product_brand,product_metadata.product_brand) as product_brand
  ,shell2.product_id
  ,shell2.variant_id
  ,order_order_id
  ,(CASE WHEN shell2.product_fitpredictor_supported is not null then shell2.product_fitpredictor_supported
         WHEN product_metadata.first_supported_tstamp <= collector_tstamp then TRUE else null end) as product_fitpredictor_supported
  ,(CASE WHEN prediction_type in ('mx','tx') then true else null end)  as has_transactional_prediction
  ,prediction_type

  ,prediction_size
  ,prediction_size_label
  ,prediction_size_type
  ,product_size_label
  ,product_size_type

--   ,price
  ,(CASE WHEN shell2.event_name = 'ordered_variant' then coalesce(shell2.price,median_price_per_variant_day,median_price_per_variant) else shell2.price end) as price
  ,order_quantity

  ,site_currency
  ,mobile_flag
  ,geo_country
  ,product_available_size_labels
  ,useragent_family
  ,useragent_version
,(CASE WHEN enabled_domain_userid is not null then TRUE else null end) as enabled_user_flag
,(CASE WHEN event_name = 'ordered_variant' then coalesce(viewed_on_mobile_before_ordering_domain_userid,viewed_on_mobile_before_ordering_network_userid) else null end) as viewed_on_mobile_before_ordering
,geo_zipcode
,useragent_major



,cast((CASE WHEN regexp_count(sale_price,'[.]')>1 THEN null
                 WHEN cast(nullif(regexp_replace(sale_price, '[^0-9\.]', ''), '') as decimal(32,4)) > 99999999.9999 then null
                 else cast(nullif(regexp_replace(sale_price, '[^0-9\.]', ''), '') as decimal(12,4)) end) as numeric(12,4))	as sale_price




,site_market
,site_language
,event_id

FROM
(
SELECT partner_key
,site_id
,network_userid
,domain_userid
,domain_sessionidx

,ab_slot
,ab_slot2
,ab_slot3

-- ,ab_slot_for_orphaned_orders
-- ,ab_slot2_for_orphaned_orders
-- ,ab_slot3_for_orphaned_orders
-- 
-- 
-- ,ab_slot_first_allocated_tstamp_for_orphaned_orders
-- ,ab_slot2_first_allocated_tstamp_for_orphaned_orders
-- ,ab_slot3_first_allocated_tstamp_for_orphaned_orders
-- 
-- ,ab_slot_for_orphaned_orders_domain_user_level
-- ,ab_slot2_for_orphaned_orders_domain_user_level
-- ,ab_slot3_for_orphaned_orders_domain_user_level
-- 
-- ,ab_slot_first_allocated_tstamp_for_orphaned_orders_domain_user_level
-- ,ab_slot2_first_allocated_tstamp_for_orphaned_orders_domain_user_level
-- ,ab_slot3_first_allocated_tstamp_for_orphaned_orders_domain_user_level

-- ,coalesce(ab_slot3,first_ab_slot3_of_session) as ab_slot3
-- ,ab_slot3_for_orphaned_orders

,event_name
,collector_tstamp

,product_id
,order_order_id
,variant_id
,mobile_flag
,useragent_version
,order_quantity


,(CASE WHEN event_name = 'ordered_variant' then coalesce(price
    ,product_variant_price_last_value_domain_user
    ,product_variant_price_last_value_network_user
    ,product_variant_price_latest
    ,product_price_last_value_domain_user
    ,product_price_last_value_network_user
    ,product_price_latest
      ) else price end) as price


,(CASE WHEN event_name = 'ordered_variant' then coalesce(sale_price,product_variant_sale_price_last_value_domain_user
    ,product_variant_sale_price_last_value_network_user
    ,product_variant_sale_price_latest
    ,product_sale_price_last_value_domain_user
    ,product_sale_price_last_value_network_user
    ,product_sale_price_latest
      ) else sale_price end) as sale_price

,(CASE WHEN event_name = 'ordered_variant' then product_fitpredictor_supported_last_value else product_fitpredictor_supported end) as product_fitpredictor_supported
,(case when event_name = 'ordered_variant' then coalesce(prediction_type_last_value_domain_user,prediction_type_last_value_network_user) else prediction_type end) prediction_type
,(case when event_name = 'ordered_variant' then coalesce(prediction_size_last_value_domain_user,prediction_size_last_value_network_user) else prediction_size end) prediction_size
,(case when event_name = 'ordered_variant' then coalesce(prediction_size_label_last_value_domain_user,prediction_size_label_last_value_network_user) else prediction_size_label  end) prediction_size_label
,(case when event_name = 'ordered_variant' then coalesce(prediction_size_type_last_value_domain_user,prediction_size_type_last_value_network_user) else prediction_size_type   end) prediction_size_type
,(case when event_name = 'ordered_variant' then coalesce(product_size_label_last_value_domain_user,product_size_label_last_value_network_user) else product_size_label   end) product_size_label
,(case when event_name = 'ordered_variant' then coalesce(product_size_type_last_value_domain_user,product_size_type_last_value_network_user) else product_size_type   end) product_size_type

,geo_country
,site_currency
,product_available_size_labels
,useragent_family

,product_domain
,product_category
,product_brand

,last_value((CASE WHEN event_name <> 'ordered_variant' then mobile_flag else null end) ignore nulls) OVER (partition by partner_key,domain_userid,product_id order by collector_tstamp asc rows between unbounded preceding and current row) as viewed_on_mobile_before_ordering_domain_userid
,last_value((CASE WHEN event_name <> 'ordered_variant' then mobile_flag else null end) ignore nulls) OVER (partition by partner_key,network_userid,product_id order by collector_tstamp asc rows between unbounded preceding and current row) as viewed_on_mobile_before_ordering_network_userid
,geo_zipcode
,useragent_major
,site_market
,site_language
,event_id
FROM
(
SELECT 'sorel' as partner_key
,site_id
,network_userid
,domain_userid
,domain_sessionidx
,ab_slot1_variant as ab_slot
,(CASE WHEN ab_slot2_name = 'fitpredictor' then ab_slot2_variant else null end) as ab_slot2
,ab_slot3_variant as ab_slot3
,ab_slot4_variant as ab_slot4
,event_name
,collector_tstamp

,coalesce(product_id,variant_product_id) as product_id

,prediction_type
,last_value(prediction_type ignore nulls) OVER (partition by domain_userid,coalesce(product_id,variant_product_id) order by collector_tstamp asc rows between unbounded preceding and current row) as prediction_type_last_value_domain_user
,last_value(prediction_type ignore nulls) OVER (partition by network_userid,coalesce(product_id,variant_product_id) order by collector_tstamp asc rows between unbounded preceding and current row) as prediction_type_last_value_network_user

,prediction_size
,last_value(prediction_size ignore nulls) OVER (partition by domain_userid,coalesce(product_id,variant_product_id) order by collector_tstamp asc rows between unbounded preceding and current row) as prediction_size_last_value_domain_user
,last_value(prediction_size ignore nulls) OVER (partition by network_userid,coalesce(product_id,variant_product_id) order by collector_tstamp asc rows between unbounded preceding and current row) as prediction_size_last_value_network_user

,prediction_size_label
,last_value(prediction_size_label ignore nulls) OVER (partition by domain_userid,coalesce(product_id,variant_product_id) order by collector_tstamp asc rows between unbounded preceding and current row) as prediction_size_label_last_value_domain_user
,last_value(prediction_size_label ignore nulls) OVER (partition by network_userid,coalesce(product_id,variant_product_id) order by collector_tstamp asc rows between unbounded preceding and current row) as prediction_size_label_last_value_network_user

,prediction_size_type
,last_value(prediction_size_type ignore nulls) OVER (partition by domain_userid,coalesce(product_id,variant_product_id) order by collector_tstamp asc rows between unbounded preceding and current row) as prediction_size_type_last_value_domain_user
,last_value(prediction_size_type ignore nulls) OVER (partition by network_userid,coalesce(product_id,variant_product_id) order by collector_tstamp asc rows between unbounded preceding and current row) as prediction_size_type_last_value_network_user

,product_size_label
,last_value(product_size_label ignore nulls) OVER (partition by domain_userid,coalesce(product_id,variant_product_id) order by collector_tstamp asc rows between unbounded preceding and current row) as product_size_label_last_value_domain_user
,last_value(product_size_label ignore nulls) OVER (partition by network_userid,coalesce(product_id,variant_product_id) order by collector_tstamp asc rows between unbounded preceding and current row) as product_size_label_last_value_network_user

,product_size_type
,last_value(product_size_type ignore nulls) OVER (partition by domain_userid,coalesce(product_id,variant_product_id) order by collector_tstamp asc rows between unbounded preceding and current row) as product_size_type_last_value_domain_user
,last_value(product_size_type ignore nulls) OVER (partition by network_userid,coalesce(product_id,variant_product_id) order by collector_tstamp asc rows between unbounded preceding and current row) as product_size_type_last_value_network_user

,product_fitpredictor_supported
,last_value(product_fitpredictor_supported ignore nulls) OVER (partition by coalesce(product_id,variant_product_id) order by collector_tstamp asc rows between unbounded preceding and current row) as product_fitpredictor_supported_last_value

-- ,first_value(ab_slot1_variant  ignore nulls) OVER (partition by partner_key,domain_userid,domain_sessionidx ) as first_ab_slot_of_session
-- ,first_value(ab_slot2_variant  ignore nulls) OVER (partition by partner_key,domain_userid,domain_sessionidx ) as first_ab_slot2_of_session

-- ,first_value(ab_slot1_variant  ignore nulls) OVER (partition by network_userid,coalesce(product_id,variant_product_id) order by collector_tstamp asc rows between unbounded preceding and current row) as ab_slot_for_orphaned_orders
-- ,first_value(ab_slot2_variant  ignore nulls) OVER (partition by network_userid,coalesce(product_id,variant_product_id) order by collector_tstamp asc rows between unbounded preceding and current row) as ab_slot2_for_orphaned_orders
-- ,first_value(ab_slot3_variant  ignore nulls) OVER (partition by network_userid,coalesce(product_id,variant_product_id) order by collector_tstamp asc rows between unbounded preceding and current row) as ab_slot3_for_orphaned_orders

-- ,min((CASE WHEN ab_slot1_variant in ('Group 1','Group 2') then collector_tstamp else null end)) OVER (partition by network_userid,coalesce(product_id,variant_product_id) order by collector_tstamp asc rows between unbounded preceding and current row) as ab_slot_first_allocated_tstamp_for_orphaned_orders
-- ,min((CASE WHEN ab_slot2_variant in ('test','control') then collector_tstamp else null end)) OVER (partition by network_userid,coalesce(product_id,variant_product_id) order by collector_tstamp asc rows between unbounded preceding and current row) as ab_slot2_first_allocated_tstamp_for_orphaned_orders
-- ,min((CASE WHEN ab_slot3_variant in ('calculator','sud') then collector_tstamp else null end)) OVER (partition by network_userid,coalesce(product_id,variant_product_id) order by collector_tstamp asc rows between unbounded preceding and current row) as ab_slot3_first_allocated_tstamp_for_orphaned_orders
-- 
-- 
-- ,first_value(ab_slot1_variant  ignore nulls) OVER (partition by domain_userid,coalesce(product_id,variant_product_id) order by collector_tstamp asc rows between unbounded preceding and current row) as ab_slot_for_orphaned_orders_domain_user_level
-- ,first_value(ab_slot2_variant  ignore nulls) OVER (partition by domain_userid,coalesce(product_id,variant_product_id) order by collector_tstamp asc rows between unbounded preceding and current row) as ab_slot2_for_orphaned_orders_domain_user_level
-- ,first_value(ab_slot3_variant  ignore nulls) OVER (partition by domain_userid,coalesce(product_id,variant_product_id) order by collector_tstamp asc rows between unbounded preceding and current row) as ab_slot3_for_orphaned_orders_domain_user_level
-- 
-- 
-- ,min((CASE WHEN ab_slot1_variant in ('Group 1','Group 2') then collector_tstamp else null end)) OVER (partition by domain_userid,coalesce(product_id,variant_product_id) order by collector_tstamp asc rows between unbounded preceding and current row) as ab_slot_first_allocated_tstamp_for_orphaned_orders_domain_user_level
-- ,min((CASE WHEN ab_slot2_variant in ('test','control') then collector_tstamp else null end)) OVER (partition by domain_userid,coalesce(product_id,variant_product_id) order by collector_tstamp asc rows between unbounded preceding and current row) as ab_slot2_first_allocated_tstamp_for_orphaned_orders_domain_user_level
-- ,min((CASE WHEN ab_slot3_variant in ('calculator','sud') then collector_tstamp else null end)) OVER (partition by domain_userid,coalesce(product_id,variant_product_id) order by collector_tstamp asc rows between unbounded preceding and current row) as ab_slot3_first_allocated_tstamp_for_orphaned_orders_domain_user_level


-- ,first_value(ab_slot3_variant  ignore nulls) OVER (partition by partner_key,domain_userid,domain_sessionidx ) as first_ab_slot3_of_session
-- ,last_value(ab_slot3_variant  ignore nulls) OVER (partition by partner_key,network_userid,coalesce(product_id,variant_product_id) order by collector_tstamp asc rows between unbounded preceding and current row) as ab_slot3_for_orphaned_orders

,order_order_id
,coalesce(order_variant_id,variant_id) as variant_id


,first_value((CASE WHEN site_channel = 'mobile' then TRUE
       WHEN useragent_family like '%Mobile%' then TRUE
       WHEN dvce_screenwidth!=768 and dvce_screenwidth<1024 then TRUE else FALSE end)ignore nulls) OVER (partition by domain_userid,domain_sessionid) as mobile_flag


,coalesce(order_price,product_price,variant_price) as price
,(CASE WHEN order_price is not null then 1 else order_quantity end) as order_quantity ---- this is because order_price already multiplies by quantity


,last_value(product_price ignore nulls) OVER (partition by coalesce(product_id,variant_product_id) order by collector_tstamp asc rows between unbounded preceding and current row) as product_price_latest
,last_value(product_price ignore nulls) OVER (partition by domain_userid,coalesce(product_id,variant_product_id) order by collector_tstamp asc rows between unbounded preceding and current row) as product_price_last_value_domain_user
,last_value(product_price ignore nulls) OVER (partition by network_userid,coalesce(product_id,variant_product_id) order by collector_tstamp asc rows between unbounded preceding and current row) as product_price_last_value_network_user

,last_value(product_price ignore nulls) OVER (partition by coalesce(product_id,variant_product_id),variant_id order by collector_tstamp asc rows between unbounded preceding and current row) as product_variant_price_latest
,last_value(product_price ignore nulls) OVER (partition by domain_userid,coalesce(product_id,variant_product_id),variant_id order by collector_tstamp asc rows between unbounded preceding and current row) as product_variant_price_last_value_domain_user
,last_value(product_price ignore nulls) OVER (partition by network_userid,coalesce(product_id,variant_product_id),variant_id order by collector_tstamp asc rows between unbounded preceding and current row) as product_variant_price_last_value_network_user


,last_value(coalesce(x.sale_price) ignore nulls) OVER (partition by coalesce(product_id,variant_product_id) order by collector_tstamp asc rows between unbounded preceding and current row) as product_sale_price_latest
,last_value(coalesce(x.sale_price) ignore nulls) OVER (partition by domain_userid,coalesce(product_id,variant_product_id) order by collector_tstamp asc rows between unbounded preceding and current row) as product_sale_price_last_value_domain_user
,last_value(coalesce(x.sale_price) ignore nulls) OVER (partition by network_userid,coalesce(product_id,variant_product_id) order by collector_tstamp asc rows between unbounded preceding and current row) as product_sale_price_last_value_network_user

,last_value(coalesce(x.sale_price) ignore nulls) OVER (partition by coalesce(product_id,variant_product_id),variant_id order by collector_tstamp asc rows between unbounded preceding and current row) as product_variant_sale_price_latest
,last_value(coalesce(x.sale_price) ignore nulls) OVER (partition by domain_userid,coalesce(product_id,variant_product_id),variant_id order by collector_tstamp asc rows between unbounded preceding and current row) as product_variant_sale_price_last_value_domain_user
,last_value(coalesce(x.sale_price) ignore nulls) OVER (partition by network_userid,coalesce(product_id,variant_product_id),variant_id order by collector_tstamp asc rows between unbounded preceding and current row) as product_variant_sale_price_last_value_network_user

,site_currency
,geo_country
,product_available_size_labels
,(CASE WHEN product_category = 'Dresses' then 'Dresses' 
        when product_domain = 'Female Tops' and product_category = 'Outerwear' then 'Female Outerwear'
        when product_domain = 'Male Tops' and product_category = 'Outerwear' then 'Male Outerwear'
        else product_domain end) as product_domain
,product_category
,product_brand
,useragent_family
,useragent_version
,geo_zipcode
,useragent_major
-- ,sale_price
,coalesce(x.sale_price) as sale_price

,(CASE WHEN page_urlhost = 'www.sorel.com' then 'US' 
       WHEN page_urlhost = 'www.sorelfootwear.ca' then 'CA'
       else site_market end) as site_market

,(CASE WHEN site_language = 'fr' then 'fr'
       WHEN page_urlhost = 'www.sorelfootwear.ca' and (page_url || '/') like '%/fr/%' then 'fr'
       else 'en' end) as site_language

,event_id

,row_number() OVER (partition by domain_userid,event_name,order_order_id,coalesce(order_variant_id,variant_id) order by collector_tstamp) as order_duplicate_check
,row_number() OVER (partition by event_id order by 1) as event_id_safe_rank
From atomic.fat_events x

WHERe partner_key in ('sorel','Sorel')
and page_urlhost in ('www.sorel.com','www.sorelfootwear.ca')
and collector_tstamp >= '2019-06-14'
-- and collector_tstamp >= date_add('week',-2,getdate())
and event_name in ('viewed_product','added_variant_to_cart','ordered_variant')
) as shell1
WHERE (event_name = 'ordered_variant' and order_duplicate_check = 1) OR event_name <> 'ordered_variant'
and event_id_safe_rank = 1
) as shell2
LEFT JOIN
(
SELECT *
from
(
select partner_product_id as product_id
    ,(CASE WHEN category_id = 'dresses' then 'Dresses'
    when domain_id = 'female-tops' and category_id = 'outerwear' then 'Female Outerwear'
    when domain_id = 'male-tops' and category_id = 'outerwear' then 'Male Outerwear'
    WHEN domain_id = 'female-bottoms' then 'Female Bottoms'
    WHEN domain_id = 'female-tops' then 'Female Tops'
    WHEN domain_id = 'male-bottoms' then 'Male Bottoms'
    WHEN domain_id = 'male-tops' then 'Male Tops'
    WHEN domain_id = 'female-shoes' then 'Female Shoes'
    WHEN domain_id = 'male-shoes' then 'Male Shoes'
    WHEN domain_id = 'swimwear-bottoms' then 'Swimwear Bottoms'
    WHEN domain_id = 'swimwear-tops' then 'Swimwear Tops'
    WHEN domain_id = 'bras' then 'Bras'
    else domain_id end) as product_domain

    ,category_id as product_category
    ,brand_id as product_brand
    ,supported
   ,row_number() OVER (partition by partner_product_id order by product_updated_at desc) as safe_rank
FROM fitpredictor.variants
where partner_id = 'sorel'
) as pf
where safe_rank = 1
) as product_info
On shell2.product_id = product_info.product_id
LEFT JOIN
(
SELECT products.*
      ,first_supported_tstamp

FROM
(
SELECT   product_id
        ,(CASE WHEN product_category = 'Dresses' then 'Dresses' 
        when product_domain = 'Female Tops' and product_category = 'Outerwear' then 'Female Outerwear'
        when product_domain = 'Male Tops' and product_category = 'Outerwear' then 'Male Outerwear'
        else product_domain end) as product_domain
        ,product_category
        ,product_brand
FROM joe.tmp_raw_product_metadata_sorel
) as products
LEFT JOIN
(

				 SELECT product_id
				        ,MIN(collector_tstamp) as first_supported_tstamp
				 FROM atomic.fat_events
				 WHere  partner_key in ('sorel','Sorel')
				 and collector_tstamp >= '2018-10-01'
				 and event_name in ('viewed_product','added_variant_to_cart','selected_variant')
         and product_fitpredictor_supported is TRUE
         Group by product_id
) as first_supported_tstamps
ON products.product_id = first_supported_tstamps.product_id
) as product_metadata
ON shell2.product_id = product_metadata.product_id
LEFT JOIN
(
         SELECT distinct domain_userid as enabled_domain_userid
				 FROM atomic.fat_events
				 WHere  partner_key in ('sorel','Sorel')
				 and collector_tstamp >= '2018-10-01'
                  and site_environment in ('dev','stg')
) as enabled_users
ON shell2.domain_userid = enabled_users.enabled_domain_userid



  /*
  Attach generic price info per day
  */
LEFT JOIN 
(
SELECT date_trunc('day',ordered_at) as order_day
      ,variant_id
      ,median(price) as median_price_per_variant_day
from fitpredictor.sales
where partner_id = 'sorel'
and ordered_at >= '2019-06-14'
group by 1,2
) as generic_order_prices_daily
on shell2.event_name = 'ordered_variant'
and date_trunc('day',shell2.collector_tstamp) = generic_order_prices_daily.order_day
and shell2.variant_id = generic_order_prices_daily.variant_id


  /*
  Attach generic price
  */
LEFT JOIN 
(
SELECT variant_id
      ,median(price) as median_price_per_variant
from fitpredictor.sales
where partner_id = 'sorel'
and ordered_at >= '2019-06-14'
group by 1
) as generic_order_prices
on shell2.event_name = 'ordered_variant'
and shell2.variant_id = generic_order_prices.variant_id


;


drop table if exists joe.tmp_raw_product_metadata_sorel;



SELECT to_char(date_trunc('day',max(collector_tstamp)),'YYYY-MM-DD') as "Latest Tstamp"
from joe.impact_analysis_enriched_sorel
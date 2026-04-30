-- SET SEARCH_PATH ensures Postgres looks in the correct schema
SET search_path TO public;

-- ======================================================
-- EXERCISE 1: DVD RENTALS
-- ======================================================

-- 1. Rentals which are out (not returned)
-- Logic: return_date is NULL
SELECT * 
FROM public.rental 
WHERE return_date IS NULL;

-- 2. Customers who have not returned their rentals
SELECT 
    c.first_name, 
    c.last_name, 
    COUNT(r.rental_id) AS total_unreturned
FROM public.customer c
JOIN public.rental r ON c.customer_id = r.customer_id
WHERE r.return_date IS NULL
GROUP BY c.customer_id, c.first_name, c.last_name;

-- 3. Action films with Joe Swank
-- Shortcut Note: One could use the 'film_list' view if available.
SELECT f.title, f.description, cat.name AS category
FROM public.film f
JOIN public.film_actor fa ON f.film_id = fa.film_id
JOIN public.actor a ON fa.actor_id = a.actor_id
JOIN public.film_category fc ON f.film_id = fc.film_id
JOIN public.category cat ON fc.category_id = cat.category_id
WHERE a.first_name = 'JOE' 
  AND a.last_name = 'SWANK' 
  AND cat.name = 'Action';


-- ======================================================
-- EXERCISE 2: HAPPY HALLOWEEN (ZOMBIE PLAGUE)
-- ======================================================

-- 1. Store locations (Store ID, City, and Country)
SELECT 
    s.store_id, 
    ci.city, 
    co.country
FROM public.store s
JOIN public.address a ON s.address_id = a.address_id
JOIN public.city ci ON a.city_id = ci.city_id
JOIN public.country co ON ci.country_id = co.country_id;

-- 2. Total viewing time per store (Excluding unreturned items)
SELECT 
    s.store_id, 
    SUM(f.length) AS total_minutes,
    ROUND(SUM(f.length) / 60.0, 2) AS total_hours,
    ROUND(SUM(f.length) / 1440.0, 2) AS total_days
FROM public.inventory i
JOIN public.store s ON i.store_id = s.store_id
JOIN public.film f ON i.film_id = f.film_id
WHERE i.inventory_id NOT IN (
    SELECT inventory_id FROM public.rental WHERE return_date IS NULL
)
GROUP BY s.store_id;

-- 3. Customers in the cities where stores are located
SELECT DISTINCT c.first_name, c.last_name, ci.city
FROM public.customer c
JOIN public.address a ON c.address_id = a.address_id
JOIN public.city ci ON a.city_id = ci.city_id
WHERE ci.city_id IN (
    SELECT city_id FROM public.address a2 JOIN public.store s2 ON a2.address_id = s2.address_id
);

-- 4. Customers in the countries where stores are located
SELECT DISTINCT c.first_name, c.last_name, co.country
FROM public.customer c
JOIN public.address a ON c.address_id = a.address_id
JOIN public.city ci ON a.city_id = ci.city_id
JOIN public.country co ON ci.country_id = co.country_id
WHERE co.country_id IN (
    SELECT co2.country_id 
    FROM public.country co2
    JOIN public.city ci2 ON co2.country_id = ci2.country_id
    JOIN public.address a2 ON ci2.city_id = a2.city_id
    JOIN public.store s2 ON a2.address_id = s2.address_id
);

-- 5. THE SAFE LIST (No Horror, no scary keywords)
-- Calculating time in minutes, hours, and days.
SELECT 
    'Safe List' AS list_type,
    SUM(f.length) AS total_minutes,
    ROUND(SUM(f.length) / 60.0, 2) AS total_hours,
    ROUND(SUM(f.length) / 1440.0, 2) AS total_days
FROM public.film f
JOIN public.film_category fc ON f.film_id = fc.film_id
JOIN public.category cat ON fc.category_id = cat.category_id
WHERE cat.name != 'Horror'
  AND f.title NOT ILIKE ALL (ARRAY['%beast%', '%monster%', '%ghost%', '%dead%', '%zombie%', '%undead%'])
  AND f.description NOT ILIKE ALL (ARRAY['%beast%', '%monster%', '%ghost%', '%dead%', '%zombie%', '%undead%']);

-- 6. GENERAL LIST (For comparison)
SELECT 
    'General List' AS list_type,
    SUM(length) AS total_minutes,
    ROUND(SUM(length) / 60.0, 2) AS total_hours,
    ROUND(SUM(length) / 1440.0, 2) AS total_days
FROM public.film;
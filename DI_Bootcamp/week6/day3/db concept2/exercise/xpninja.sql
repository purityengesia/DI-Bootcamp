--ex1
SELECT DISTINCT f.title, f.rating
FROM public.film f
JOIN public.inventory i ON f.film_id = i.film_id
LEFT JOIN public.rental r ON i.inventory_id = r.inventory_id
WHERE f.rating IN ('G', 'PG')
  AND (
    r.rental_id IS NULL -- Never borrowed
    OR 
    r.return_date IS NOT NULL -- Already returned
  );

--ex2
CREATE TABLE public.children_waiting_list (
    waiting_id SERIAL PRIMARY KEY,
    film_id INTEGER NOT NULL,
    customer_id INTEGER NOT NULL,
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign Key Constraints
    CONSTRAINT fk_film FOREIGN KEY (film_id) REFERENCES public.film(film_id),
    CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES public.customer(customer_id)
);

--ex3
-- Adding test data
-- Assuming film_id 1 is 'Academy Dinosaur' and film_id 2 is 'Ace Goldfinger'
INSERT INTO public.children_waiting_list (film_id, customer_id) 
VALUES 
(1, 10), (1, 15), (1, 22), -- 3 people waiting for film 1
(2, 5), (2, 8);             -- 2 people waiting for film 2

-- Retrieve count of people waiting per film
SELECT 
    f.title, 
    COUNT(w.waiting_id) AS total_waiting
FROM public.film f
JOIN public.children_waiting_list w ON f.film_id = w.film_id
GROUP BY f.film_id, f.title
ORDER BY total_waiting DESC;


--ex1
SELECT first_name, last_name 
FROM customers 
ORDER BY first_name DESC 
LIMIT 2;

--ex2
DELETE FROM purchases 
WHERE customer_id = (SELECT id FROM customers WHERE first_name = 'Scott' AND last_name = 'Scott');

--ex3.Does Scott still exist in the customers table, even though he has been deleted? Try and find him
SELECT * FROM customers 
WHERE id = (SELECT customer_id FROM purchases WHERE customer_id = (SELECT id FROM customers WHERE first_name = 'Scott' AND last_name = 'Scott'));

--ex4.Use SQL to find all purchases. Join purchases with the customers table, so that Scott’s order will appear, although instead of the customer’s first and last name, you should only see empty/blank. (Which kind of join should you use?
SELECT * FROM purchases     
LEFT JOIN customers ON purchases.customer_id = customers.id
WHERE customers.first_name = 'Scott' AND customers.last_name = 'Scott';

--ex5.Use SQL to find all purchases. Join purchases with the customers table, so that Scott’s order will NOT appear. (Which kind of join should you use?)
SELECT * FROM purchases
JOIN customers ON purchases.customer_id = customers.id
WHERE customers.first_name != 'Scott' AND customers.last_name != 'Scott';


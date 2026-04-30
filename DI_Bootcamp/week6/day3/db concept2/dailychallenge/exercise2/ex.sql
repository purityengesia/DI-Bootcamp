-- Bonus: Users Table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE
);

-- Product Orders Table
CREATE TABLE product_orders (
    order_id SERIAL PRIMARY KEY,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_fk_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE
);

-- Items Table
CREATE TABLE items (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    order_fk_id INTEGER REFERENCES product_orders(order_id) ON DELETE CASCADE
);

--ex2
CREATE OR REPLACE FUNCTION get_order_total(target_order_id INT) 
RETURNS DECIMAL AS $$
DECLARE 
    total_price DECIMAL(10, 2);
BEGIN
    SELECT SUM(price) INTO total_price
    FROM items
    WHERE order_fk_id = target_order_id;
    
    RETURN COALESCE(total_price, 0);
END;
$$ LANGUAGE plpgsql;

--bonus
CREATE OR REPLACE FUNCTION get_user_order_total(target_user_id INT, target_order_id INT) 
RETURNS DECIMAL AS $$
DECLARE 
    total_price DECIMAL(10, 2);
BEGIN
    SELECT SUM(i.price) INTO total_price
    FROM items i
    JOIN product_orders o ON i.order_fk_id = o.order_id
    WHERE o.user_fk_id = target_user_id 
      AND o.order_id = target_order_id;
    
    RETURN COALESCE(total_price, 0);
END;
$$ LANGUAGE plpgsql;

--3
-- Insert Data
INSERT INTO users (username) VALUES ('Alice');
INSERT INTO product_orders (user_fk_id) VALUES (1);
INSERT INTO items (item_name, price, order_fk_id) VALUES ('Laptop', 1200.00, 1), ('Mouse', 25.00, 1);

-- Run Function
SELECT get_user_order_total(1, 1); -- Returns 1225.00
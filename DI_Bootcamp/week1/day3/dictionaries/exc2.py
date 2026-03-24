student_grades = {
    "Alice": [88, 92, 100],
    "Bob": [75, 78, 80],
    "Charlie": [92, 90, 85],
    "Dana": [83, 88, 92],
    "Eli": [78, 80, 72]
}

# 1. Initialize empty dictionaries
student_averages = {}
student_letter_grades = {}

# 2. Process each student
for name, grades in student_grades.items():
    # Calculate average
    avg = sum(grades) / len(grades)
    student_averages[name] = avg
    
    # Assign Letter Grade
    if avg >= 90:
        letter = "A"
    elif avg >= 80:
        letter = "B"
    elif avg >= 70:
        letter = "C"
    elif avg >= 60:
        letter = "D"
    else:
        letter = "F"
    
    student_letter_grades[name] = letter

# 3. Calculate Class Average
class_avg = sum(student_averages.values()) / len(student_averages)

# 4. Print Summary Report
print("--- Student Summary Report ---")
for name in student_averages:
    print(f"Student: {name}")
    print(f"  Average Grade: {student_averages[name]:.2f}")
    print(f"  Letter Grade:  {student_letter_grades[name]}")
    print("-" * 25)

print(f"Class Average: {class_avg:.2f}")

#2.data manipulation
sales_data = [
    {"customer_id": 1, "product": "Smartphone", "price": 600, "quantity": 1, "date": "2023-04-03"},
    {"customer_id": 2, "product": "Laptop", "price": 1200, "quantity": 1, "date": "2023-04-04"},
    {"customer_id": 1, "product": "Laptop", "price": 1000, "quantity": 1, "date": "2023-04-05"},
    {"customer_id": 2, "product": "Smartphone", "price": 500, "quantity": 2, "date": "2023-04-06"},
    {"customer_id": 3, "product": "Headphones", "price": 150, "quantity": 4, "date": "2023-04-07"},
    {"customer_id": 3, "product": "Smartphone", "price": 550, "quantity": 1, "date": "2023-04-08"},
    {"customer_id": 1, "product": "Headphones", "price": 100, "quantity": 2, "date": "2023-04-09"},
]

product_sales = {}
customer_spending = {}

for transaction in sales_data:
    # Enhancement: Add total_price field immediately
    t_price = transaction["price"] * transaction["quantity"]
    transaction["total_price"] = t_price
    
    # Task 1: Product Revenue
    prod = transaction["product"]
    product_sales[prod] = product_sales.get(prod, 0) + t_price
    
    # Task 2: Customer Spending
    c_id = transaction["customer_id"]
    customer_spending[c_id] = customer_spending.get(c_id, 0) + t_price

print(f"Product Revenue: {product_sales}")
print(f"Customer Spending: {customer_spending}")

# Task 4: High-Value Transactions (> $500)
high_value = [t for t in sales_data if t["total_price"] > 500]
# Sort descending by total_price
high_value.sort(key=lambda x: x["total_price"], reverse=True)

# Task 5: Customer Loyalty (More than 1 purchase)
purchase_counts = {}
for t in sales_data:
    c_id = t["customer_id"]
    purchase_counts[c_id] = purchase_counts.get(c_id, 0) + 1

loyal_customers = [c_id for c_id, count in purchase_counts.items() if count > 1]
print(f"Loyal Customer IDs: {loyal_customers}")

product_quantities = {}
for t in sales_data:
    prod = t["product"]
    product_quantities[prod] = product_quantities.get(prod, 0) + t["quantity"]

most_popular = max(product_quantities, key=product_quantities.get)

# Average Transaction Value (ATV) per category
avg_transaction = {prod: product_sales[prod] / product_quantities[prod] for prod in product_sales}

print(f"Most Popular Product: {most_popular}")
print(f"Average Value per Unit: {avg_transaction}")
#bank account
class BankAccount:
    def __init__(self, username, password, balance=0):
        self.username = username
        self.password = password
        self.balance = balance
        self.authenticated = False

    def authenticate(self, username, password):
        if username == self.username and password == self.password:
            self.authenticated = True
            return True
        return False

    def deposit(self, amount):
        if not self.authenticated:
            raise Exception("Authentication required to deposit.")
        if amount <= 0:
            raise Exception("Deposit amount must be positive.")
        self.balance += amount
        return self.balance

    def withdraw(self, amount):
        if not self.authenticated:
            raise Exception("Authentication required to withdraw.")
        if amount <= 0:
            raise Exception("Withdrawal amount must be positive.")
        self.balance -= amount
        return self.balance

class MinimumBalanceAccount(BankAccount):
    def __init__(self, username, password, balance=0, minimum_balance=0):
        super().__init__(username, password, balance)
        self.minimum_balance = minimum_balance

    def withdraw(self, amount):
        # First, check authentication via the parent logic (implied by calling super or checking attr)
        if not self.authenticated:
            raise Exception("Authentication required.")
        
        if self.balance - amount < self.minimum_balance:
            raise Exception(f"Withdrawal denied. Must maintain minimum balance of {self.minimum_balance}")
        
        return super().withdraw(amount)
    
    #ATM
    import sys

class ATM:
    def __init__(self, account_list, try_limit):
        # Validation
        if not all(isinstance(acc, BankAccount) for acc in account_list):
            raise Exception("Account list must contain BankAccount instances.")
        
        try:
            if try_limit <= 0:
                raise ValueError
            self.try_limit = try_limit
        except (ValueError, TypeError):
            print("Invalid try limit. Setting default to 2.")
            self.try_limit = 2
            
        self.account_list = account_list
        self.current_tries = 0
        self.show_main_menu()

    def show_main_menu(self):
        while True:
            print("\n--- Main Menu ---")
            print("1. Log In")
            print("2. Exit")
            choice = input("Select an option: ")
            
            if choice == "1":
                user = input("Username: ")
                pw = input("Password: ")
                self.log_in(user, pw)
            elif choice == "2":
                print("Goodbye!")
                break

    def log_in(self, username, password):
        for account in self.account_list:
            if account.authenticate(username, password):
                self.current_tries = 0 # Reset tries on success
                self.show_account_menu(account)
                return

        # If loop finishes without return, no match was found
        self.current_tries += 1
        print(f"Invalid credentials. Attempt {self.current_tries}/{self.try_limit}")
        
        if self.current_tries >= self.try_limit:
            print("Maximum attempts reached. Shutting down.")
            sys.exit()

    def show_account_menu(self, account):
        while True:
            print(f"\nWelcome {account.username}! Balance: {account.balance}")
            print("1. Deposit")
            print("2. Withdraw")
            print("3. Log Out")
            choice = input("Select an option: ")

            try:
                if choice == "1":
                    amt = int(input("Amount to deposit: "))
                    account.deposit(amt)
                elif choice == "2":
                    amt = int(input("Amount to withdraw: "))
                    account.withdraw(amt)
                elif choice == "3":
                    account.authenticated = False
                    print("Logged out.")
                    break
            except Exception as e:
                print(f"Error: {e}")

# Example Usage:
acc1 = BankAccount("alice", "1234", 500)
acc2 = MinimumBalanceAccount("bob", "password", 1000, 100)

# my_atm = ATM([acc1, acc2], 3)

    
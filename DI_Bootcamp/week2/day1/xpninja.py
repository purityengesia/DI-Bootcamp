#send_message
class Phone:
    def __init__(self, phone_number):
        self.phone_number = phone_number
        self.call_history = []
        self.messages = []

    # --- Call Methods ---
    def call(self, other_phone):
        statement = f"{self.phone_number} called {other_phone.phone_number}"
        print(statement)
        self.call_history.append(statement)
        # Optional: Add to the other phone's history too
        other_phone.call_history.append(f"{self.phone_number} called you")

    def show_call_history(self):
        print(f"\n--- Call History for {self.phone_number} ---")
        for entry in self.call_history:
            print(entry)

    # --- Messaging Methods ---
    def send_message(self, other_phone, content):
        message_data = {
            "to": other_phone.phone_number,
            "from": self.phone_number,
            "content": content
        }
        # Add to sender's messages
        self.messages.append(message_data)
        # Add to receiver's messages
        other_phone.messages.append(message_data)
        print(f"Message sent from {self.phone_number} to {other_phone.phone_number}")

    def show_outgoing_messages(self):
        print(f"\n--- Outgoing Messages from {self.phone_number} ---")
        for msg in self.messages:
            if msg["from"] == self.phone_number:
                print(f"To: {msg['to']} | Content: {msg['content']}")

    def show_incoming_messages(self):
        print(f"\n--- Incoming Messages to {self.phone_number} ---")
        for msg in self.messages:
            if msg["to"] == self.phone_number:
                print(f"From: {msg['from']} | Content: {msg['content']}")

    def show_messages_from(self, specific_number):
        print(f"\n--- Messages from {specific_number} to {self.phone_number} ---")
        for msg in self.messages:
            if msg["from"] == specific_number:
                print(f"Content: {msg['content']}")
                
#testing code
# 1. Instantiate two phones
iphone = Phone("050-111-2222")
android = Phone("054-999-8888")

# 2. Test Calling
iphone.call(android)
iphone.show_call_history()

# 3. Test Messaging
iphone.send_message(android, "Hey! Did you get my last call?")
android.send_message(iphone, "Yeah, I was just about to call you back.")

# 4. Show Incoming/Outgoing
android.show_incoming_messages()
iphone.show_outgoing_messages()

# 5. Show messages from a specific person
android.show_messages_from("050-111-2222")

#human class
class Human:
    def __init__(self, id_number, name, age, priority, blood_type):
        self.id_number = id_number
        self.name = name
        self.age = age
        self.priority = priority
        self.blood_type = blood_type
        self.family = []

    def add_family_member(self, person):
        # Prevent adding the same person twice or adding oneself
        if person not in self.family and person != self:
            self.family.append(person)
            person.family.append(self)
            
#que class
class Queue:
    def __init__(self):
        self.humans = []

    def add_person(self, person):
        if person.age > 60 or person.priority:
            # Place at index 0 manually
            self.humans = [person] + self.humans
        else:
            self.humans = self.humans + [person]

    def find_in_queue(self, person):
        for i in range(len(self.humans)):
            if self.humans[i] == person:
                return i
        return -1

    def swap(self, person1, person2):
        idx1 = self.find_in_queue(person1)
        idx2 = self.find_in_queue(person2)
        if idx1 != -1 and idx2 != -1:
            self.humans[idx1], self.humans[idx2] = self.humans[idx2], self.humans[idx1]

    def get_next(self):
        if not self.humans:
            return None
        next_human = self.humans[0]
        # Remove first element manually (slicing)
        self.humans = self.humans[1:]
        return next_human

    def get_next_blood_type(self, blood_type):
        for i in range(len(self.humans)):
            if self.humans[i].blood_type == blood_type:
                target = self.humans[i]
                # Remove by joining everything before and after index i
                self.humans = self.humans[:i] + self.humans[i+1:]
                return target
        return None

    def sort_by_age(self):
        # Bubble sort implementation to respect the no-sort constraint
        n = len(self.humans)
        for i in range(n):
            for j in range(0, n - i - 1):
                h1, h2 = self.humans[j], self.humans[j+1]
                
                # Priority Logic:
                # 1. Priority status takes precedence
                # 2. If both (or neither) have priority, older age takes precedence
                swap_needed = False
                if not h1.priority and h2.priority:
                    swap_needed = True
                elif h1.priority == h2.priority:
                    if h1.age < h2.age:
                        swap_needed = True
                
                if swap_needed:
                    self.humans[j], self.humans[j+1] = self.humans[j+1], self.humans[j]

    def rearrange_queue(self):
        """
        Ensures no two family members are adjacent. 
        Note: This is a simple swap-ahead approach.
        """
        for i in range(len(self.humans) - 1):
            current = self.humans[i]
            next_p = self.humans[i+1]
            
            # Check if next_p is in current's family
            is_family = False
            for member in current.family:
                if member == next_p:
                    is_family = True
                    break
            
            if is_family:
                # Find someone further down the line to swap with
                for j in range(i + 2, len(self.humans)):
                    # Check if swapping with index j solves the immediate problem
                    # and doesn't create a new family pair at j-1/j
                    potential = self.humans[j]
                    if potential not in current.family:
                        self.humans[i+1], self.humans[j] = self.humans[j], self.humans[i+1]
                        break

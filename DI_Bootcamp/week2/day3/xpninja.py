#temperature
from abc import ABC, abstractmethod

class Temperature(ABC):
    def __init__(self, value):
        self.value = value

    @abstractmethod
    def to_celsius(self):
        pass

    def convert_to(self, target_class):
        """Generic converter using Celsius as the bridge."""
        celsius_val = self.to_celsius()
        return target_class.from_celsius(celsius_val)

    @classmethod
    @abstractmethod
    def from_celsius(cls, value):
        pass

class Celsius(Temperature):
    def to_celsius(self):
        return self.value
    
    @classmethod
    def from_celsius(cls, value):
        return cls(value)
    
    def __repr__(self):
        return f"{self.value}°C"

class Fahrenheit(Temperature):
    def to_celsius(self):
        return (self.value - 32) * 5/9
    
    @classmethod
    def from_celsius(cls, value):
        return cls(value * 9/5 + 32)
    
    def __repr__(self):
        return f"{self.value}°F"

class Kelvin(Temperature):
    def to_celsius(self):
        return self.value - 273.15
    
    @classmethod
    def from_celsius(cls, value):
        return cls(value + 273.15)
    
    def __repr__(self):
        return f"{self.value}K"

# Usage
c = Celsius(25)
f = c.convert_to(Fahrenheit)
print(f) # 77.0°F

#ex2import random

class QuantumParticle:
    def __init__(self, x=0, y=0.0, p=0.5):
        self.x = x  # position
        self.y = y  # momentum
        self.p = p  # spin
        self.entangled_with = None

    def _disturb(self):
        """Internal method to simulate measurement interference."""
        self.x = random.randint(1, 10000)
        self.y = random.uniform(0, 1)
        print("Quantum Interferences!!")

    def measure_position(self):
        self._disturb()
        return self.x

    def measure_momentum(self):
        self._disturb()
        return self.y

    def measure_spin(self):
        """Measuring spin triggers the entanglement logic."""
        self.p = random.choice([0.5, -0.5])
        
        if self.entangled_with:
            # The entangled partner immediately collapses to the opposite spin
            self.entangled_with.p = -self.p
            print("Spooky Action at a Distance !!")
            
        return self.p

    def entangle(self, other):
        if not isinstance(other, QuantumParticle):
            raise TypeError("Can only entangle with another QuantumParticle!")
        
        if other is self:
            raise ValueError("A particle cannot entangle with itself.")

        self.entangled_with = other
        other.entangled_with = self
        print(f"Particle {id(self)} is now in quantum entanglement with Particle {id(other)}")

    def __repr__(self):
        ent_status = "Yes" if self.entangled_with else "No"
        return f"QuantumParticle(pos={self.x}, mom={self.y:.2f}, spin={self.p}, Entangled={ent_status})"

# Execution Example
p1 = QuantumParticle()
p2 = QuantumParticle()

p1.entangle(p2)
print(f"P1 Spin before measurement: {p1.p}")
print(f"P2 Spin before measurement: {p2.p}")

# Measuring P1 affects P2
p1.measure_spin()
print(f"P1 Spin after: {p1.p}")
print(f"P2 Spin after (should be opposite): {p2.p}")



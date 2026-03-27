# Circle Class
import math

class Circle:
    def __init__(self, radius=None, diameter=None):
        if radius is not None:
            self.radius = radius
        elif diameter is not None:
            self.radius = diameter / 2
        else:
            raise ValueError("You must specify either a radius or a diameter.")

    @property
    def diameter(self):
        return self.radius * 2

    @diameter.setter
    def diameter(self, value):
        self.radius = value / 2

    @property
    def area(self):
        # Formula: πr²
        return math.pi * (self.radius ** 2)

    def __str__(self):
        return f"Circle(radius={self.radius:.2f}, diameter={self.diameter:.2f})"

    def __repr__(self):
        return f"Circle({self.radius})"

    def __add__(self, other):
        if isinstance(other, Circle):
            return Circle(radius=self.radius + other.radius)
        raise TypeError("Can only add another Circle instance.")

    # Comparison methods for sorting and logic
    def __gt__(self, other):
        if not isinstance(other, Circle):
            return NotImplemented
        return self.radius > other.radius

    def __lt__(self, other):
        if not isinstance(other, Circle):
            return NotImplemented
        return self.radius < other.radius

    def __eq__(self, other):
        if not isinstance(other, Circle):
            return NotImplemented
        return self.radius == other.radius


# testing
c1 = Circle(radius=3)
c2 = Circle(diameter=10)

print(f"C1: {c1}")
print(f"C2 Area: {c2.area:.2f}")

# Addition
c3 = c1 + c2
print(f"C3 (C1 + C2): {c3}")

# Comparison
print(f"Is C2 bigger than C1? {c2 > c1}")

# Sorting
circle_list = [Circle(10), Circle(1), Circle(5)]
circle_list.sort()
print(f"Sorted circles: {circle_list}")

#drawing with turtle
import turtle

def draw_circles(circles):
    screen = turtle.Screen()
    t = turtle.Turtle()
    t.speed(0)
    
    x_offset = -200
    for c in circles:
        t.penup()
        t.goto(x_offset, -c.radius) # Position so bottom of circle is on a line
        t.pendown()
        t.circle(c.radius * 10)     # Scaled by 10 so it's visible
        x_offset += (c.diameter * 10) + 20
        
    screen.exitonclick()

# draw_circles(circle_list)
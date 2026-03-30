#airplane
from datetime import date

class Airline:
    def __init__(self, airline_id, name):
        self.id = airline_id # 2-letter code
        self.name = name
        self.planes = []

class Airplane:
    def __init__(self, airplane_id, airport, company):
        self.id = airplane_id
        self.current_location = airport
        self.company = company
        self.next_flights = []
        # Add this plane to the airline's fleet and the airport's ground list
        company.planes.append(self)
        airport.planes.append(self)

    def fly(self, destination):
        """Executes the next flight if the destination matches the schedule."""
        if not self.next_flights:
            return False
        
        flight = self.next_flights[0]
        if flight.destination == destination:
            flight.take_off()
            flight.land()
            # Remove the completed flight from the schedule
            self.next_flights = self.next_flights[1:]
            return True
        return False

    def location_on_date(self, target_date):
        """Predicts where the plane will be based on its scheduled flights."""
        current_loc = self.current_location
        # Since next_flights is sorted, we find the last flight on or before target_date
        for flight in self.next_flights:
            if flight.date <= target_date:
                current_loc = flight.destination
            else:
                break
        return current_loc

    def available_on_date(self, target_date, location):
        """Checks if the plane is at the location and has no flight that day."""
        # 1. Is it already booked on this date?
        for flight in self.next_flights:
            if flight.date == target_date:
                return False
        
        # 2. Will it be at the required location by that date?
        return self.location_on_date(target_date) == location

#airport
class Flight:
    def __init__(self, flight_date, origin, destination, plane):
        self.date = flight_date
        self.origin = origin
        self.destination = destination
        self.plane = plane
        # ID: DestinationCity-AirlineID-Date
        self.id = f"{destination.city}-{plane.company.id}-{flight_date}"

    def take_off(self):
        print(f"Flight {self.id} is taking off from {self.origin.city}...")
        if self.plane in self.origin.planes:
            self.origin.planes.remove(self.plane)

    def land(self):
        print(f"Flight {self.id} has landed at {self.destination.city}.")
        self.plane.current_location = self.destination
        self.destination.planes.append(self.plane)

class Airport:
    def __init__(self, city):
        self.city = city
        self.planes = []
        self.scheduled_departures = []
        self.scheduled_arrivals = []

    def schedule_flight(self, destination, flight_date, airline):
        """Finds an available plane from the given airline and books a flight."""
        selected_plane = None
        for plane in airline.planes:
            if plane.available_on_date(flight_date, self):
                selected_plane = plane
                break
        
        if not selected_plane:
            print(f"No available planes for {airline.name} at {self.city} on {flight_date}")
            return None

        new_flight = Flight(flight_date, self, destination, selected_plane)
        
        # Update Airplane schedule
        selected_plane.next_flights.append(new_flight)
        selected_plane.next_flights.sort(key=lambda x: x.date)
        
        # Update Airport schedules
        self.scheduled_departures.append(new_flight)
        self.scheduled_departures.sort(key=lambda x: x.date)
        destination.scheduled_arrivals.append(new_flight)
        destination.scheduled_arrivals.sort(key=lambda x: x.date)
        
        return new_flight

    def info(self, start_date, end_date):
        print(f"\n--- Schedule for {self.city} from {start_date} to {end_date} ---")
        for f in self.scheduled_departures:
            if start_date <= f.date <= end_date:
                print(f"Departure: {f.id} to {f.destination.city} on {f.date}")
                
                #testing
                # Setup Airports and Airlines
atl = Airport("ATL")
cdg = Airport("CDG")
lhr = Airport("LHR")

delta = Airline("DL", "Delta Airlines")

# Add a plane to Delta, currently at ATL
plane1 = Airplane(101, atl, delta)

# Schedule Flights
print("Scheduling flights...")
f1 = atl.schedule_flight(cdg, date(2026, 4, 1), delta)
f2 = cdg.schedule_flight(lhr, date(2026, 4, 2), delta)

# Check Airport Info
atl.info(date(2026, 4, 1), date(2026, 4, 5))

# Execute Flight
print("\n--- Day of Flight ---")
plane1.fly(cdg) # Take off from ATL, land in CDG

print(f"Current location of Plane 101: {plane1.current_location.city}")
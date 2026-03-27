#gene
import random

class Gene:
    def __init__(self):
        # Initial value is a random 0 or 1
        self.value = random.randint(0, 1)

    def mutate(self):
        # Flip the bit: 0 becomes 1, 1 becomes 0
        self.value = 1 if self.value == 0 else 0

    def __repr__(self):
        return str(self.value)

class Chromosome:
    def __init__(self):
        # A Chromosome is a series of 10 Genes
        self.genes = [Gene() for _ in range(10)]

    def mutate(self):
        # A random number of genes can randomly flip (1/2 chance)
        for gene in self.genes:
            if random.random() < 0.5:
                gene.mutate()

    def __repr__(self):
        return "".join([str(g) for g in self.genes])

class DNA:
    def __init__(self):
        # A DNA is a series of 10 Chromosomes
        self.chromosomes = [Chromosome() for _ in range(10)]

    def mutate(self):
        # DNA mutates the same way (1/2 chance for each chromosome)
        for chromosome in self.chromosomes:
            if random.random() < 0.5:
                chromosome.mutate()

    def is_all_ones(self):
        # Check if every single gene in every chromosome is 1
        for chromosome in self.chromosomes:
            for gene in chromosome.genes:
                if gene.value == 0:
                    return False
        return True

    def __repr__(self):
        return " | ".join([str(c) for c in self.chromosomes])

if __name__ == "__main__":
    dna = DNA()
    print("Initial DNA:")
    print(dna)
    generations = 0
    max_generations = 100000  # To prevent infinite loop
    while not dna.is_all_ones() and generations < max_generations:
        dna.mutate()
        generations += 1
    if dna.is_all_ones():
        print(f"Success after {generations} generations.")
    else:
        print("Failed to reach all ones within max generations.")
    print("Final DNA:")
    print(dna)
    
#organism
class Organism:
    def __init__(self, dna, environment_prob):
        self.dna = dna
        self.environment_prob = environment_prob # Probability that the DNA will trigger a mutation

    def evolve(self):
        # If the environment triggers it, the DNA mutates
        if random.random() < self.environment_prob:
            self.dna.mutate()

def run_simulation(env_probability):
    my_dna = DNA()
    subject = Organism(my_dna, env_probability)
    generations = 0

    print("Starting evolution toward a Perfect DNA (All 1s)...")
    
    while not subject.dna.is_all_ones():
        subject.evolve()
        generations += 1
        
        # Optional: print progress every 1000 generations so it doesn't slow down the loop
        if generations % 1000 == 0:
            # Count how many 1s we currently have
            total_ones = sum(g.value for c in subject.dna.chromosomes for g in c.genes)
            print(f"Gen {generations}: {total_ones}/100 genes are 1s", end="\r")

    print(f"\nSuccess! Target reached in {generations} generations.")
    return generations

# Execute the simulation
# Warning: With a 1/2 flip chance, reaching exactly 100 'ones' via random flipping
# is statistically quite rare. High environment probabilities make it faster.
run_simulation(env_probability=0.8)

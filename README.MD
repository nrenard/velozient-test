# Drone Delivery Service Test
A squad of drones is tasked with delivering packages for a major online reseller in a world
where time and distance do not matter. Each drone can carry a specific weight and can make
multiple deliveries before returning to home base to pick up additional loads; however, the goal
is to make the fewest number of trips as each time the drone returns to home base, it is
extremely costly to refuel and reload the drone.

The purpose of the written software is to accept input which will include the name of each
drone and the maximum weight it can carry, along with a series of locations and the total weight
needed to be delivered to that specific location. The software should highlight the most efficient
deliveries for each drone to make on each trip.

Assume that time and distance to each drop off location do not matter, and that the size of
each package is also irrelevant. It is also assumed that the cost to refuel and restock each
drone is a constant and does not vary between drones. The maximum number of drones in a
squad is 100, and there is no maximum number of deliveries which are required.
<br>
<br>
# My View Point
My solution take in mind that we don't need to be careful with the drones that are not delivering, since we have one drone that can carry more then another drones we will use this drone to do ever deliveries because we don't need to care about the time of this deliveries and how most fuel this "BIG" drone will use for each delivery, we can use this drone for every delivery, to reduce the number of trips.
Think about that i made two possible solutions `main` and `main-different`. 
The `main-different` thinks of a rotation of drones.
<br>
<br>
# Walk Through Main Solution
So i split these solution in three main steps:
 1. Process Input: This step thinks about taking the input data using the `fs` module and analyzing it to a point where we can easily use it.
 2. Found Better Trips: This step considers filling the weight of the drone before each trip. Making sure the drone makes the minimum number of trips necessary.
 3. Process Output: This step just creates a new `txt` file, using the data of drones with his trips. 
<br>
<br>
# What would I improve for the future
In next steps we can consider process the packages data over demand, so we can use the `Streams` to process data while we don't need to maintain this data in memory.
<br>
<br>
# How to run?
To run the scripts you need to go the folder using a command line and run this scripts:

- To run the main script:
`npm run main`, the output will be in `output/Output.txt`

- To run the main-different script:
`npm run main`, the output will be in `output/Output-Different.txt`
<br>
<br>
# Prerequisites
 - `Node v20.11.1`
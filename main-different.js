const fs = require('fs/promises');
const path = require('path');

const normalizeValue = (data) => data.split('').splice(1, data.length - 2).join('');

const parserDrones = (dronesData) => {
  const dronesSplited = dronesData.split(', ');

  const drones = [];

  for (let i = 0; i < dronesSplited.length; i += 2) {
    const name = normalizeValue(dronesSplited[i]);
    const maximumWeight = Number(normalizeValue(dronesSplited[i + 1].replace('\r', '')));

    drones.push({ name, maximumWeight, trips: [] });
  }

  drones.sort((a, b) => b.maximumWeight - a.maximumWeight);

  return drones;
};

const parserPackages = (packagesData) => {
  const packages = [];

  for (let i = 0; i < packagesData.length; i += 1) {
    const packageLine = packagesData[i];

    const [key, value] = packageLine.split(', ');
    const package = { name: normalizeValue(key), weight: Number(normalizeValue(value.replace('\r', ''))) };

    packages.push(package);
  }

  packages.sort((a, b) => b.weight - a.weight);

  return packages;
};

const processInput = async () => {
  const input = await fs.readFile(path.resolve(__dirname, 'input.txt'), { encoding: 'utf-8' });

  const [dronesData, ...packagesData] = input.split('\n');

  const drones = parserDrones(dronesData);
  const packages = parserPackages(packagesData);

  return { drones, packages };
};

const processOutput = async (drones) => {
  let outPutData = "";

  drones.forEach((drone, index) => {
    outPutData += `[${drone.name}]\n`;

    drone.trips.forEach((trip, index) => {
      outPutData += `[Trip #${index + 1}]\n`
      outPutData += `[${trip.join('], [')}]\n`
    });

    if (index !== drones.length - 1) outPutData += '\n';
  });

  await fs.writeFile(path.resolve(__dirname, 'output', 'Output-Different.txt'), outPutData);
}

const foundBetterTrips = ({ drones, packages }) => {
  let nextDroneToTripIndex = 0;
  
  while(packages.length) {
    const { maximumWeight, trips } = drones[nextDroneToTripIndex];

    let tripWeight = 0;
    const trip = [];

    for (const package of packages) {
      if (tripWeight + package.weight <= maximumWeight) {
        tripWeight += package.weight;
        
        trip.push(package.name);
      };

      if (tripWeight === maximumWeight) break;
    }

    trips.push(trip);
  
    trip.forEach((packageName) => {
      const index = packages.findIndex(({ name }) => name === packageName);
      packages.splice(index, 1);
    });

    nextDroneToTripIndex++;
    if (nextDroneToTripIndex > drones.length - 1) nextDroneToTripIndex = 0;
  }
};

// O(n)
const main = async () => {
  const input = await processInput();

  foundBetterTrips(input);

  await processOutput(input.drones);
}

main();
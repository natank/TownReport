class Age {
  constructor(year) {
    this.year = year;
  }
  get() {
    const now = new Date().getFullYear();
    return now - this.year;
  }
}

class Tree {
  constructor(year) {
    this.age = new Age(year);
  }
  getAge() {
    return this.age.get();
  }
}

class Street {
  constructor(...properties) {
    [this.name, this.year, this.length] = properties;
  }
  getAge() {
    return this.age.get();
  }
}

class Park {
  constructor(...properties) {
    [this.trees, this.area, this.name] = properties;
  }
  getAvgAge() {
    return (
      this.trees.reduce(function(acc, curr) {
        return (acc += curr.getAge());
      }, 0) / this.trees.length
    );
  }
  getDensity() {
    return this.trees.length / this.area;
  }
}

class Town {
  constructor(...properties) {
    [this.parks, this.streets] = properties;
    this.townReport = new TownReport();
    this.townReport.parksReport = this.townReport.parksReport.bind(this);
    this.townReport.streetsReport = this.townReport.streetsReport.bind(this);
  }
  getAvgParkAge() {
    return (
      this.parks.reduce(function(acc, curr) {
        return acc + curr.getAvgAge();
      }, 0) / this.parks.length
    );
  }
  getPark1000() {
    return this.parks.reduce(function(acc, curr) {
      if (curr.trees.length > 1000) {
        acc = curr.name;
      }
      return acc;
    }, 'none');
  }
  getAvgStreetsLen() {
    return (
      this.streets.reduce(function(acc, curr) {
        return acc + curr.length;
      }, 0) / this.streets.length
    );
  }
  getTotalStreetsLen() {
    return this.streets.reduce(function(acc, curr) {
      return acc + curr.length;
    }, 0);
  }
  getStreetsClassification() {
    this.streets.forEach(street => {
      var classification = 'normal';
      if (street.length > 0 && street.length <= 1) classification = 'tiny';
      else if (street.length > 1 && street.length <= 2)
        classification = 'small';
      else if (street.length > 2 && street.length <= 3)
        classification = 'normal';
      else if (street.length > 3 && street.length <= 4) classification = 'big';
      else if (street.length > 4) classification = 'huge';
      console.log(
        `${street.name} Street, built in ${
          street.year
        }, is a ${classification} street`
      );
    });
  }
}

class TownReport {
  constructor() {}
  parksReport() {
    console.log(`----PARKS REPORT----`);
    console.log(
      `Our ${
        this.parks.length
      } parks have an average age of ${this.getAvgParkAge()} years`
    );
    this.parks.forEach(park =>
      console.log(
        `${
          park.name
        } park has a tree densiy of ${park.getDensity()} trees per square km`
      )
    );
    console.log(`${this.getPark1000()} park has more than 1000 trees`);
  }
  streetsReport() {
    console.log(`----STREETS REPORT----`);
    console.log(
      `Our ${
        this.streets.length
      } streets have a total length of ${this.getTotalStreetsLen()} km, with an average of ${this.getAvgStreetsLen()} km`
    );
    this.getStreetsClassification();
  }
}

var trees1 = [new Tree(1979), new Tree(1989)]; //35
for (var i = 0; i < 2000; i++) {
  let year = Math.floor(Math.random() * (2019 - 1900)) + 1900;
  trees1.push(new Tree(year));
}
var trees2 = [new Tree(1969), new Tree(1959)]; //45
var trees3 = [new Tree(1924), new Tree(1876), new Tree(1990)];

var streets1 = [
  new Street('Alenby', 1915, 8),
  new Street('Arlozorov', 1937, 8),
  new Street('Iben Gvirol', 1930, 3),
  new Street('Emanual Haromi', 1946, 1)
];

var parks1 = [
  new Park(trees1, 10, 'Blue'),
  new Park(trees2, 20, 'Green'),
  new Park(trees3, 18, 'Avenu')
];
var town = new Town(parks1, streets1);

town.townReport.parksReport();
town.townReport.streetsReport();

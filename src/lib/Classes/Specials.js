class Specials {
  constructor(path, specialsID, name, price, description, day, startTime, endTime) {
      this.setPath(path);
      this.setSpecialsID(specialsID);
      this.setName(name);
      this.setPrice(price);
      this.setDescription(description);
      this.setDay(day);
      this.setStartTime(startTime);
      this.setEndTime(endTime);
  }

  // Getters
  getPath() {
      return this.path;
  }

  getSpecialsID() {
      return this.specialsID;
  }

  getName() {
      return this.name;
  }

  getPrice() {
      return this.price;
  }

  getDescription() {
      return this.description;
  }

  getDay() {
      return this.day;
  }

  getStartTime() {
      return this.startTime;
  }

  getEndTime() {
      return this.endTime;
  }

  // Setters with validation
  setPath(value) {
      if (typeof value === 'string' && value.trim().length > 0) {
          this.path = value;
      } else {
          throw new Error("Path must be a non-empty string.");
      }
  }

  setSpecialsID(value) {
      if (typeof value === 'number' && value > 0) {
          this.specialsID = value;
      } else {
          throw new Error("Specials ID must be a positive number.");
      }
  }

  setName(value) {
      if (typeof value === 'string' && value.trim().length > 0) {
          this.name = value;
      } else {
          throw new Error("Name must be a non-empty string.");
      }
  }

  setPrice(value) {
      if (typeof value === 'number' && value >= 0) {
          this.price = value;
      } else {
          throw new Error("Price must be a non-negative number.");
      }
  }

  setDescription(value) {
      if (typeof value === 'string') {
          this.description = value.trim();
      } else {
          throw new Error("Description must be a string.");
      }
  }

  setDay(value) {
    if (typeof value === 'number' && value >= 1 && value <= 7) {
        this.day = value;
    } else {
        throw new Error("Day must be a number between 1 and 7.");
    }
  }

  setStartTime(value) {
      if (typeof value === 'string' && /^[0-2]?[0-9]:[0-5][0-9]$/.test(value)) {
          this.startTime = value;
      } else {
          throw new Error("Start time must be a valid time string (HH:MM).");
      }
  }

  setEndTime(value) {
      if (typeof value === 'string' && /^[0-2]?[0-9]:[0-5][0-9]$/.test(value)) {
          this.endTime = value;
      } else {
          throw new Error("End time must be a valid time string (HH:MM).");
      }
  }
}

export default Specials;

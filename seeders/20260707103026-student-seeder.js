"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const students = [];

    const firstNames = [
      "John", "Sara", "Rahul", "Priya", "David", "Aisha", "Rohan", "Neha",
      "Arjun", "Meera", "Vikram", "Anjali", "Kiran", "Sneha", "Amit",
      "Pooja", "Raj", "Divya", "Nikhil", "Kavya"
    ];

    const lastNames = [
      "Doe", "Khan", "Sharma", "Reddy", "Smith", "Ali", "Patel",
      "Singh", "Verma", "Nair", "Kumar", "Gupta", "Joshi",
      "Yadav", "Rao", "Mishra", "Das", "Roy", "Iyer", "Chopra"
    ];

    const courses = [
      "B.Tech",
      "MBA",
      "BCA",
      "MCA",
      "BBA",
      "B.Com",
      "B.Sc",
      "M.Sc",
      "LLB",
      "BA"
    ];

    const cities = [
      "Hyderabad",
      "Mumbai",
      "Delhi",
      "Chennai",
      "Bangalore",
      "Pune",
      "Ahmedabad",
      "Lucknow",
      "Jaipur",
      "Kochi"
    ];

    for (let i = 1; i <= 300; i++) {
      students.push({
        firstName: firstNames[i % firstNames.length],
        lastName: lastNames[i % lastNames.length],
        email: `student${i}@example.com`,
        phone: `98${String(10000000 + i).slice(-8)}`,
        age: 18 + (i % 8), // 18-25
        gender: i % 2 === 0 ? "Male" : "Female",
        course: courses[i % courses.length],
        address: cities[i % cities.length],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("Students", students, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Students", null, {});
  },
};

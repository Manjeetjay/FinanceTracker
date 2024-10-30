# Finance Tracker

A robust financial management system built with Spring Boot and MySQL that helps users track their income, expenses, and manage their financial goals effectively.

![Screenshot 2024-10-30 231502](https://github.com/user-attachments/assets/770a03b0-f32b-4b94-b98f-c8f63c1f4ba6)


## Features


- 💰 Track income and expenses
- 📊 Categorize transactions
- 📅 Date-wise transaction history -> to be added
- 📈 Financial analytics and reporting -> to be added
- 🎯 Budget planning and monitoring
- 📱 Responsive design for desktop

## Tech Stack

- **Backend:** Spring Boot 3.x
- **Database:** MySQL
- **Security:** Spring Security
- **API Documentation:** Swagger/OpenAPI
- **Build Tool:** Maven

## Getting Started

### Prerequisites

- JDK 17 or higher
- MySQL 8.0+
- Maven 3.x

### Installation

1. Clone the repository
  git clone https://github.com/Manjeetjay/Finance-Tracker.git

2. Navigate to the project directory
  cd Finance-Tracker

3. Configure database
   - Create a MySQL database
   - Copy `src/main/resources/application.properties.template` to `application.properties`
   - Update database credentials in `application.properties`

4. Build the project
   mvn clean install
   
5. Run the application


The application will start running at `http://localhost:8080`

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - User login

### Transactions
- GET `/api/transactions` - Get all transactions
- POST `/api/transactions` - Create new transaction
- PUT `/api/transactions/{id}` - Update transaction
- DELETE `/api/transactions/{id}` - Delete transaction

### Categories
- GET `/api/categories` - Get all categories
- POST `/api/categories` - Create new category

## Screenshots

### Transaction List
[Screenshot will be added here]

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Contact

Manjeet - [@Leetcode](https://leetcode.com/u/clowncoder/) [@LinkedIn](https://www.linkedin.com/in/manjeetjay/)

Project Link: [https://github.com/Manjeetjay/Finance-Tracker](https://github.com/Manjeetjay/Finance-Tracker)

## Acknowledgments

* Spring Boot Documentation
* MySQL Documentation

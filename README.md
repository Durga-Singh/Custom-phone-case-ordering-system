# Case Cobra — Custom Phone Case Ordering System

A PHP and MySQL web application for creating and ordering personalized phone cases. Customers can upload a photo, position it on a case preview, choose their preferences, review the design, and proceed to checkout.

## Features

- **User accounts:** Registration, login, profile management, and order history.
- **Case designer:** Upload an image, preview it on a phone case, and adjust its size and position.
- **Product choices:** Select a supported phone model, case material, and finish.
- **Order flow:** Review customization details, see pricing, and proceed to checkout.
- **Payments:** Razorpay Checkout integration for the payment flow.
- **Reviews:** Customers can submit ratings and feedback for orders.
- **Admin dashboard:** Manage users, products, and orders, including delivery dates.

## Tech Stack

| Area | Technologies |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | PHP |
| Database | MySQL / MariaDB (MySQLi) |
| Image Editing | Fabric.js, html2canvas |
| Payments | Razorpay Checkout |
| Icons | Font Awesome |
| Local Development | XAMPP (Apache + MySQL) |

## Installation and Setup

**Prerequisites:** XAMPP (or an equivalent PHP, Apache, and MySQL environment) and Git.

**1. Clone the repository**

Open PowerShell and run:

    cd C:\xampp\htdocs
    git clone https://github.com/Durga-Singh/Custom-phone-case-ordering-system.git

**2. Start the local server**

Open XAMPP Control Panel and start Apache and MySQL.

**3. Configure the database**

- Open `http://localhost/phpmyadmin/`.
- Create a database named `tutorial`.
- Import the included `tutorial (13).sql` file.
- Check the database connection settings in `config.php`.

**4. Run the application**

Open:

`http://localhost/Custom-phone-case-ordering-system/`

The application starts at `index.php`, where users can register or sign in.

Razorpay checkout requires a correctly configured test environment before payment testing.

## Project Structure

| File | Description |
|---|---|
| `index.php` / `register.php` | Authentication and registration |
| `home.php` | Homepage |
| `create_case.php` | Design image upload |
| `customize.php` | Case customization |
| `summary.php` | Design and pricing summary |
| `checkout.php` | Checkout interface |
| `my_orders.php` | Customer order history |
| `admin_dashboard.php` | Administrative dashboard |
| `products.json` | Available case options |
| `config.php` | Database connection |

## Project Status

This is a learning and portfolio project intended for local development.

It is not production-ready. Authentication, database queries, and payment verification need a security review before deployment with real customers or payments. Replace the demo credentials in the included database export before deployment.

## Author

**Durga Singh**

GitHub: [Durga-Singh](https://github.com/Durga-Singh)

Thanks!
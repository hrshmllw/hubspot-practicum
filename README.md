# HubSpot Practicum - Custom Object Integration

A Node.js/Express application that integrates with HubSpot's Custom Objects API to display and create custom object records.

## Prerequisites

- Node.js (v14 or higher)
- npm
- HubSpot account with API access

## Setup Steps

1. **Clone the repository**

   ```bash
   cd hubspot-practicum
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env`

   ```bash
   cp .env.example .env
   ```

4. **Add your HubSpot credentials to `.env`**

   ```
   PORT=3000
   HUBSPOT_ACCESS_TOKEN=your-private-app-token-here
   CUSTOM_OBJECT_NAME=your-custom-object-id-here
   ```

   - **Where to get your token**: Create a private app in HubSpot (Settings → Integrations → Private Apps) and copy the access token
   - **Where to get custom object name**: Find your custom object ID from the custom object settings page in HubSpot

5. **Custom Object Setup**
   - Your custom object should have the following properties:
     - `name` (text)
     - `price` (text/number)
     - `description` (text)
   - Custom object list link: `[Add your custom object URL here]`

## How to Run the App

1. **Start the server**

   ```bash
   node index.js
   ```

2. **Access the application**
   - Open your browser and navigate to: `http://localhost:3000`

3. **Using the application**
   - The homepage displays all custom object records in a table
   - Click "Add/Update Custom Object" to create new records
   - Fill in the form with name, price, and description
   - Submit to create a new custom object in HubSpot

## Features

- ✅ View all custom objects in a table format
- ✅ Create new custom object records
- ✅ Responsive design with HubSpot-inspired styling
- ✅ Error handling for API calls

## Technologies Used

- Express.js
- Pug (template engine)
- Axios (HTTP client)
- dotenv (environment variables)

## Project Structure

```
hubspot-practicum/
├── views/
│   ├── homepage.pug       # Main page displaying custom objects
│   └── updates.pug        # Form to create new custom objects
├── public/
│   └── css/
│       └── style.css      # Application styles
├── index.js               # Express server and routes
├── .env                   # Environment variables (not tracked)
├── .env.example           # Environment template
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## Troubleshooting

- **404 Error**: Make sure the server is running and you've restarted it after code changes
- **API Errors**: Verify your access token has the correct scopes for custom objects (read/write)
- **Empty Table**: Check that your custom object has records and the property names match


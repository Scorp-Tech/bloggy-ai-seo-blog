# Blog Application

A full-stack blog application with a React/Next.js frontend and Node.js/Express/TypeORM backend.

## Project Structure

- `backend/`: Contains the Node.js/Express backend.
- `frontend/`: Contains the React/Next.js frontend.
- `docker-compose.yml`: Defines the Docker Compose setup for the project.


```bash
├── backend/ # Express + TypeORM API
└── frontend/ # Next.js frontend
```

## Backend Setup

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL
- npm or yarn

### Installation & Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   yarn
   ```

3. Create a PostgreSQL database named `blog_db`

4. Configure environment variables:
   - Copy `.env.example` to `.env` (or create new `.env` file)
   - Update the values according to your setup:
        ```bash
            PORT=3001
            NODE_ENV=development
            DB_HOST=localhost
            DB_PORT=5432
            DB_USERNAME=postgres
            DB_PASSWORD=postgres
            DB_DATABASE=blog_db
        ```

5. Start the development server:
    ```bash
        yarn dev
    ```

The backend server will start on `http://localhost:3001`

### Testing Backend Installation

To verify the backend is running correctly:

1. Visit `http://localhost:3001/api/v1/info/hello`
   - Should return: `{"message": "Hello, World!"}`

2. Visit `http://localhost:3001/api/v1/info/version`
   - Should return:
   ```json
   {
     "version": "1.0.0",
     "details": {
       "name": "Blog API",
       "environment": "development",
       "nodeVersion": "<your-node-version>"
     }
   }
   ```

## Frontend Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation & Setup

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2. Install dependencies:
    ```bash
    yarn install
    ```

3. Install Tailwind CSS dependencies:
    ```bash
    yarn add -D tailwindcss@latest postcss@latest autoprefixer@latest
    ```

4. Initialize Tailwind CSS:
    ```bash
    npx tailwindcss init -p
    ```

5. Update `tailwind.config.js`:
    ```javascript
    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }
    ```

6. Update `postcss.config.js`:
    ```javascript
    module.exports = {
      plugins: [
        'tailwindcss',
        'autoprefixer',
      ],
    }
    ```

7. Make sure your `globals.css` has the proper Tailwind directives:
    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

8. Start the development server:
    ```bash
    yarn dev
    ```

The frontend application will be available at `http://localhost:3000`
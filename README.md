## Installation

- `cd <project_path>`

- open two terminals 

- terminal n°1
  - `cd backend`
  - `composer install`
  - `php bin/console lexik:jwt:generate-keypair`
  - `php -S 0.0.0.0:8080 -t public`

- terminal n°2
  - `cd front`
  - `npm install`
  - `npm run dev`
## Installation

- open two terminals 

- terminal n°1
  - `cd <project_path>`
  - `composer install`
  - `php bin/console lexik:jwt:generate-keypair`
  - `php -S 0.0.0.0:8080 -t public`

- terminal n°2
  - `cd react`
  - `npm install`
  - `npm run dev`
## Installation

- `cd <project_path>`

- `make install`
- `make fixture`

## production

- add .env.local for ***front project*** & ***backend project***
- backend
  - `make deploy-back`
- fronend 
  - `make deploy-front` 
  - or
  - `make deploy-front BASE=<alias set apache .conf>`
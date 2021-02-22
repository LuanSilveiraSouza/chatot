 #!/bin/bash

if [ "$NODE_ENV" = "production" ];
then
    yarn build
    yarn prod
else if [ "$NODE_ENV" = "test" ];
    yarn test
else
    yarn dev
fi
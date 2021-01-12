 #!/bin/bash

if [ "$NODE_ENV" = "production" ];
then
    yarn build
    yarn prod
else
    yarn dev
fi
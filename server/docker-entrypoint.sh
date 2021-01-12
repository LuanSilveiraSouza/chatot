 #!/bin/bash

if [ "$NODE_ENV" = "production" ];
then
    SCRIPT=prod
else
    SCRIPT=dev
fi

yarn $SCRIPT
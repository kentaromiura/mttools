#!/bin/bash
yarn workspace @kentaromiura/relax make
yarn workspace @kentaromiura/relax types
yarn workspace @kentaromiura/relax-react make
# rome still converts to its internal id
sed -i 's/___R$$priv$relax$react$src$index_ts$React/require("react")/' ./relax-react/dist/index.js
yarn workspace @kentaromiura/relax-react types

#disk size is the same, so for now I skip uglify...
#yarn terser ./relax/dist/index.js -c toplevel,passes=2 -m -o ./relax/dist/mangled.js
#yarn terser ./relax-react/dist/index.js -c toplevel,passes=2 -m -o ./relax-react/dist/mangled.js

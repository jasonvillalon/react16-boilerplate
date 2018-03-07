
> from-scratch@1.0.0 prebuild /Users/jasonvillalon/Documents/fun-projects/from-scratch
> npm run clean


> from-scratch@1.0.0 clean /Users/jasonvillalon/Documents/fun-projects/from-scratch
> rimraf build


> from-scratch@1.0.0 build /Users/jasonvillalon/Documents/fun-projects/from-scratch
> webpack-dev-server --config config/webpack/index.js

ℹ ｢wds｣: Project is running at [1m[34mhttp://localhost:8080/[39m[22m
ℹ ｢wds｣: webpack output is served from [1m[34m/[39m[22m
Warning: postcss-cssnext found a duplicate plugin ('autoprefixer') in your postcss plugins. This might be inefficient. You should remove 'autoprefixer' from your postcss plugin list since it's already included by postcss-cssnext.
Note: If, for a really specific reason, postcss-cssnext warnings are irrelevant for your use case, and you really know what you are doing, you can disable this warnings by setting  'warnForDuplicates' option of postcss-cssnext to 'false'.
ℹ ｢wdm｣: Failed to compile.

> from-scratch@1.0.0 postbuild /Users/jasonvillalon/Documents/fun-projects/from-scratch
> webpack --config config/webpack/server.js

Hash: 8e1a7cfadb599f3c0b16
Version: webpack 4.1.0
Time: 2418ms
Built at: 2018-3-7 19:16:38
       Asset     Size  Chunks                    Chunk Names
../server.js  287 KiB    main  [emitted]  [big]  main
Entrypoint main [big] = ../server.js
[./config/main.js] 718 bytes {main} [built]
[./node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 521 bytes {main} [built]
[./src/app/containers/index.js] 497 bytes {main} [built]
[./src/app/log.js] 689 bytes {main} [built]
[./src/app/redux/store.js] 3.59 KiB {main} [built]
[./src/server.jsx] 4.83 KiB {main} [built]
[compression] external "compression" 42 bytes {main} [built]
[express] external "express" 42 bytes {main} [built]
[history] external "history" 42 bytes {main} [built]
[path] external "path" 42 bytes {main} [built]
[react] external "react" 42 bytes {main} [built]
[react-hot-loader] external "react-hot-loader" 42 bytes {main} [built]
[react-redux] external "react-redux" 42 bytes {main} [built]
[react-router] external "react-router" 42 bytes {main} [built]
[serve-favicon] external "serve-favicon" 42 bytes {main} [built]
    + 92 hidden modules

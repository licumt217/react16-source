import express from 'express';

import { createApp } from './app.js';

import { renderToString } from 'vue/server-renderer';

const server = express();

server.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

server.use(express.static("."))
server.get('/', (req, res) => {
    const app = createApp()

    renderToString(app).then(html => {

        res.send("export default 'liqiang'")
        // res.send(`
        //     <!DOCTYPE html>
        //     <html lang="en">
        //         <head>
        //             <meta charset="UTF-8">
        //             <meta http-equiv="X-UA-Compatible" content="IE=edge">
        //             <meta name="viewport" content="width=device-width, initial-scale=1.0">
        //             <title>Document</title>
        //         </head>
        //         <body>
        //             <div id="app">${html}</div>
        //             <script type="importmap">
        //             {
        //                 "imports": {
        //                     "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
        //                 }
        //             }
        //             </script>
        //             <script type="module" src="/client.js"></script>
        //         </body>
        //     </html>
        // `)
    })
})

server.listen(3000, () => {
    console.log("ready!")
})

// export default function applyMiddleware(...middlewares) {
//     return function (store) {
//         debugger;
//         return function execMiddleware(action) {
//             middlewares.reduce((middleware, nextMiddleware) => {
//                 nextMiddleware ? middleware(store)(nextMiddleware)(action) : middleware(store)(action)
//             })
//             // debugger;
//             // store.dispatch(action)
//             // return
//         };
//         //return middleware.map(cb => cb(store));
//     }
// }

export default function applyMiddleware(...middlewares) {
    return function (store) {
        return function execMiddleware(action) {
            const currentMiddleware = middlewares[0];
            const nextMiddleware = middlewares[1];

            if(!nextMiddleware) {
                return currentMiddleware(store)(store.dispatch)(action)
            } else {
                middlewares.shift();
                currentMiddleware(store)(execMiddleware)(action)
            }

        };
    }
}



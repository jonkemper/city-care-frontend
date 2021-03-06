const PROXY_CONFIG = [
          {
                    context: [
                              "/authApi",
                              "/usersApi",
                              "/requestsApi",
                              "/listingsApi"
                    ],
                    target: "http://localhost:4000",
                    secure: false
          }
]
module.exports = PROXY_CONFIG;
// {
//           "/usersApi": {
//                     "target": "http://localhost:4000/users",
//                     "secure": false
//           },
//           "/requestsApi": {
//                     "target": "http://localhost:4000/requests",
//                     "secure": false
//           },
//           "/listingsApi": {
//                     "target": "http://locahost:4000/listings",
//                     "secure": false
//           }
// }
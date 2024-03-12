// const bodyParser = require("body-parser");
// const express = require("express");
// const request = require("request");
// const Blockchain = require("./blockchain");
// const PubSub = require("./publishsubscribe");
// const path = require("path");

// const app = express();
// const blockchain = new Blockchain();
// const pubsub = new PubSub({ blockchain });

// const DEFAULT_PORT = 3000;
// const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;
// setTimeout(() => pubsub.broadcastChain(), 1000);

// app.use(bodyParser.json());

// // Serve static files from the "public" folder
// app.use(express.static(path.join(__dirname, 'public')));

// // Serve index.html when accessing the root URL
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'mine.html'));
// });

// // Endpoint to get the current blockchain
// app.get("/api/blocks", (req, res) => {
//   res.json(blockchain.chain);
// });

// //Endpoint to mine a new block with data


// // app.post("/api/mine", (req, res) => {
// //   const { data } = req.body;

// //   blockchain.addBlock({ data });
// //   pubsub.broadcastChain();
// //   res.redirect("/api/blocks");
// // });

// // app.post("/api/mine", (req, res) => {
// //   const { data, nodeType, port } = req.body;

// //   if (nodeType === 'peer') {
// //     // Mining process for peer nodes (broadcasting to other peers)
// //     blockchain.addBlock({ data });
// //     pubsub.broadcastChain();
// //   } else if (nodeType === 'host') {
// //     // Mining process for host nodes (only adding to local blockchain)
// //     blockchain.addBlock({ data });
// //   } else {
// //     return res.status(400).json({ error: 'Invalid node type' });
// //   }

// //   res.redirect(`http://localhost:${port}/api/blocks`);
// // });

// // Endpoint to mine a new block with data
// app.post("/api/mine", (req, res) => {
//   const { data, nodeType } = req.body;

//   // Check if the node is a host
//   if (nodeType === 'host') {
//     blockchain.addBlock({ data }); // Mine the block
//     pubsub.broadcastChain(); // Broadcast the updated chain to all peers
//     res.redirect("/api/blocks"); // Redirect to get the current blockchain
//   } else {
//     // If the node is not a host, return an error
//     res.status(403).json({ error: 'Only the host node can mine blocks' });
//   }
// });



// // Endpoint to register a new peer and sync chains
// app.post("/api/register-and-sync", (req, res) => {
//   const { peer } = req.body;
//   const { url } = peer;

//   // Sync with the new peer's chain
//   request({ url: `${url}/api/blocks` }, (error, response, body) => {
//     if (!error && response.statusCode === 200) {
//       const newChain = JSON.parse(body);
//       // Replace the current chain with the new chain from the peer
//       blockchain.replaceChain(newChain);
//       console.log(`Synced with ${url}`);
//     } else {
//       console.error(`Failed to sync with ${url}`);
//     }
//   });

//   res.send("Sync request sent");
// });

// // Function to broadcast the local chain to all peers
// const broadcastChainToPeers = () => {
//   pubsub.broadcastChain();
// };

// // Start the server
// const server = app.listen(DEFAULT_PORT, () => {
//   console.log(`Listening on port ${DEFAULT_PORT}`);
//   // Sync with the root node
//   request({ url: `${ROOT_NODE_ADDRESS}/api/blocks` }, (error, response, body) => {
//     if (!error && response.statusCode === 200) {
//       const rootChain = JSON.parse(body);
//       blockchain.replaceChain(rootChain);
//       console.log("Synced with root node");
//     } else {
//       console.error("Failed to sync with root node");
//     }
//   });
// });

// // Handle graceful shutdown
// process.on('SIGINT', () => {
//   server.close(() => {
//     console.log('Server closed');
//     process.exit(0);
//   });
// });


// // Endpoint to get the current blockchain
// app.get("/api/blocks", (req, res) => {
//   const formattedChain = blockchain.chain.map(block => ({
//     ...block,
//     // If data is an array, join its elements into a single string
//     data: Array.isArray(block.data) ? block.data.join('') : block.data
//   }));
//   res.json(formattedChain);
// });


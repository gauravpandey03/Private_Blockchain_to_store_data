

document.getElementById("data-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get the entered data
    var jsonData = document.getElementById("data").value;

    // Send data to backend for mining
    fetch(`http://localhost:3000/api/mine`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data: jsonData,
            nodeType: 'host' // Assuming this is always a host node
        })
    })
    .then(response => response.json())
    .then(block => {
        // Display mined block on frontend
        console.log("Mined Block:", block);
        // Append mined block data to the DOM if it exists
        var minedBlocksDiv = document.getElementById("mined-blocks");
        if (block.timestamp !== undefined) {
            minedBlocksDiv.innerHTML += `<p>Timestamp: ${block.timestamp}</p>`;
        }
        if (block.prevHash !== undefined) {
            minedBlocksDiv.innerHTML += `<p>Previous Hash: ${block.prevHash}</p>`;
        }
        if (block.hash !== undefined) {
            minedBlocksDiv.innerHTML += `<p>Hash: ${block.hash}</p>`;
        }
        if (block.nonce !== undefined) {
            minedBlocksDiv.innerHTML += `<p>Nonce: ${block.nonce}</p>`;
        }
        if (block.difficulty !== undefined) {
            minedBlocksDiv.innerHTML += `<p>Difficulty: ${block.difficulty}</p>`;
        }
        if (block.data !== undefined) {
            minedBlocksDiv.innerHTML += `<p>Data: ${block.data}</p>`;
        }
    })
    .catch(error => {
        console.error("Error:", error);
        // Handle error
    });
});

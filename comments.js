// Create web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const comments = require('./comments.json');

// Create server
const server = http.createServer((req, res) => {
    // Parse request URL
    const parsedUrl = url.parse(req.url, true);
    // Get the path
    const path = parsedUrl.pathname;
    // Get the query string as an object
    const query = parsedUrl.query;
    // Get the method
    const method = req.method;

    // If the path is /comments
    if (path === '/comments') {
        // If the method is GET
        if (method === 'GET') {
            // Set the response header
            res.setHeader('Content-Type', 'application/json');
            // Set the response status code
            res.statusCode = 200;
            // Send the comments as a JSON string
            res.end(JSON.stringify(comments));
        }
        // If the method is POST
        if (method === 'POST') {
            // Create a variable to hold the request body
            let body = '';
            // Set the encoding of the request
            req.setEncoding('utf-8');
            // On the data event
            req.on('data', (chunk) => {
                // Add the chunk to the body
                body += chunk;
            });
            // On the end event
            req.on('end', () => {
                // Create a new comment object
                const newComment = {
                    id: Date.now(),
                    text: query.text
                };
                // Add the new comment to the comments array
                comments.push(newComment);
                // Set the response header
                res.setHeader('Content-Type', 'application/json');
                // Set the response status code
                res.statusCode = 201;
                // Send the new comment as a JSON string
                res.end(JSON.stringify(newComment));
            });
        }
    } else {
        // Set the response status code
        res.statusCode = 404;
        // Send the response
        res.end();
    }
});

// Listen on port 3000
server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
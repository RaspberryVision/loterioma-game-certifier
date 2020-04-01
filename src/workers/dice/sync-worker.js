const http = require('http');

class DiceSyncWorker {

    constructor() {
        this.numberOfTests = 30;
        this.url = '';
        this.currentTest = -1;
        this.options = {
            hostname: 'loterioma_engine',
            port: 80,
            path: '/index.php/dice/play',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        }
    }

    loop() {
        for (let i = 0; i < this.numberOfTests; i++) {
            console.log(`* TEST NUMBER ${i}`);
            this.makeRequest();
            this.currentTest = i;
        }
    }

    makeRequest() {

        const data = JSON.stringify({ gameHash: "", client: "", userHash: "", mode: "0", engine: "0", params: "" });

        const req = http.request(this.options, res => {
            console.log(`statusCode: ${res.statusCode}`)

            res.on('data', d => {
                process.stdout.write(d)
            })
        })

        req.on('error', error => {
            console.error(error)
        })

        req.write(data)
        req.end()
    }

    getCurrentTest() {
        return this.CURRENT_TEST;
    }
}

module.exports = DiceSyncWorker;
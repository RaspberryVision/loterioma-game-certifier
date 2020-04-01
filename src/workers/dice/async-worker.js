const http = require('http');

class DiceAsyncWorker {

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

    async loop() {
        for (let i = 0; i < this.numberOfTests; i++) {
            console.log(`* TEST NUMBER ${i}`);
            await this.makeRequest();
            this.currentTest = i;
        }
    }

    async makeRequest() {

        const data = JSON.stringify({ gameHash: "", client: "", userHash: "", mode: "0", engine: "0", params: "" });

        const req = await http.request(this.options, res => {
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

module.exports = DiceAsyncWorker;
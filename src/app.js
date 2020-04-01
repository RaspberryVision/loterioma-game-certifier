'use strict';

const DiceAsyncWorker = require('./workers/dice/async-worker');
const DiceSyncWorker = require('./workers/dice/sync-worker');

const asyncWorker = new DiceAsyncWorker();
const syncWorker = new DiceSyncWorker();

asyncWorker.loop();
syncWorker.loop();
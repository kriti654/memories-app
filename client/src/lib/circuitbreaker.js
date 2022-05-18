const axios = require('axios');

class CircuitBreaker {
    constructor(){
        this.states = {};
        this.failureThreshold = 5;
        this.coolDownPeriod = 10;
        this.requestTimeout = 1;
    }

    async callService(reqOptions){
        const endpoint = `${reqOptions.method}:${reqOptions.url}`;

        if(!this.canRequest(endpoint)) return false;

        reqOptions.timeout = this.requestTimeout * 1000;

        try{
            const res = await axios(reqOptions)
            this.onSuccess(endpoint);
            console.log(res.data)
            return res.data;
        }catch(err){
            this.onFailure(endpoint);
            console.log(err)
            return false;
        }
      }

    onSuccess(endpoint) {
        this.initState(endpoint);
    }

    onFailure(endpoint){
        const state = this.states[endpoint];
        state.failures++;
        console.log(state.failures)
        if(state.failures >= this.failureThreshold){
            state.circuit = "OPEN";
            state.nextTry = new Date() / 1000 + this.coolDownPeriod;
            console.log(`Alert! Circuit for ${endpoint} is in state 'OPEN'`);
        }
    }

    canRequest(endpoint){
        if(!this.states[endpoint]) {
            console.log(endpoint)
            this.initState(endpoint)
        };
        const state = this.states[endpoint];
        if(state.circuit === 'CLOSED') {
          console.log("Circuit closed")
          return true;
        }
        const now = new Date() / 1000;
        if(state.nextTry <= now){
            state.circuit = "HALF";
            console.log(state.circuit)
            return true;
        }

        return false;
    }

    initState(endpoint){
        this.states[endpoint] = {
            failures: 0,
            coolDownPeriod: this.coolDownPeriod,
            circuit: "CLOSED",
            nextTry: 0
        }
    }
}

module.exports = CircuitBreaker; 
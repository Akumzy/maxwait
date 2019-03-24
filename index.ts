export default class MaxWait {
    timer!: NodeJS.Timeout
    handlers: Map<number, Function> = new Map()
    constructor(
        /** 
         * `max` is the amount of milliseconds to wait before timimg out
         */
        private max: number = 1000) {

    }
    /**
     * Start the count down.
     */
    public start() {
        this.timer = setTimeout(() => {
            clearTimeout(this.timer)
            for (let f of this.handlers.values()) f()
            this.handlers.clear()
        }, this.max)
    }
    /**
     * onTimeout callback function will be called once the
     * timeout reaches.
     */
    public onTimeout(cb: (...data: any) => void) {
        if (typeof cb === 'function') {
            let id = this.handlers.size + 1
            this.handlers.set(id, cb)
        }
    }
    /**
     * done is being called if you want to cancel
     * the count down and free up memory.
     */
    public done() {
        if (this.timer) clearTimeout(this.timer)
        this.handlers.clear()
    }
}
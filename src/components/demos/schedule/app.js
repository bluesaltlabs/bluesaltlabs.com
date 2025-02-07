
// Schedule App
// This demo app uses the browser's Event API to register events and observers.
// This page is an experiment in using native brower APIs instead of external libraries
// for reactivity.
//
// 1. Set this.time to a new Date() object (so it's not null);
// 2. Register Event Listeners
//   - EVENT_TYPE__BUILD: fires once after constructor() completes
//   - EVENT_TYPE__INIT: fires once after init() completes
// 3. Register Intervals
//   - INTERVAL_TICK

const debug = true;
const EVENT_TYPE__BUILD       = "build"; // constructor() complete
const EVENT_TYPE__INIT        = "init";  // init() complete
const EVENT_TYPE__TEST        = "test";  // test
const EVENT_TYPE__TIMER_TICK  = "timer_tick";  // timer tick
const INTERVAL_TICK           = "tick";
const TICK_LENGTH             = 1000; // 1000 ms i.e. 1 second

const EVENT_TYPE__UPDATE_CONTAINER  = "update_container";  // timer tick (temp)


class ScheduleApp extends EventTarget {
  constructor() {
    super();

    if(debug === true) {
      console.time(EVENT_TYPE__BUILD);
      console.time(EVENT_TYPE__INIT);
    }

    // init time values
    //this.now = new Date();
    this.seconds = 0;

    // app container (temp?)
    this.app_container = null;

    this._registerEventListeners();
    this._registerIntervals();
    this.dispatchEvent(this.events.build); // EVENT_TYPE__BUILD
  }

  handleEvent(e) {
    if(debug === true) {
      console.debug("ScheduleApp event handler:", { e: e ?? undefined });
    }
  }

  _registerEventListeners() {
    this.events = {
      build: new Event(EVENT_TYPE__BUILD),
      init: new Event(EVENT_TYPE__INIT),
      test: new Event(EVENT_TYPE__TEST),
      timer_tick: new Event(EVENT_TYPE__TIMER_TICK),
      update_container: new Event(EVENT_TYPE__UPDATE_CONTAINER),
    }

    // build
    this.addEventListener(EVENT_TYPE__BUILD, (e) => {
      if(debug === true) {
        console.debug("ScheduleApp 'build' complete.", { e: e ?? undefined });
        console.timeEnd(EVENT_TYPE__BUILD);
      }
    }, { once: true });

    // init
    this.addEventListener(EVENT_TYPE__INIT, (e) => {
      if(debug === true) {
        console.debug("ScheduleApp 'init' complete. awaiting input.", { e: e ?? undefined });
        console.timeEnd(EVENT_TYPE__INIT);
      }
    }, { once: true });

    // test
    this.addEventListener(EVENT_TYPE__TEST, (e) => {

      if(debug === true) {
        console.debug("handling 'test' event", { e: e ?? undefined });
      }
    });

    this.addEventListener(EVENT_TYPE__UPDATE_CONTAINER, (e) => {
      // todo: This is temporary!! use observer / subscribers instead!

      //this.app_container.innerHTML = `Hello from the ScheduleApp class! ${this.now.toString()}`;
      this.app_container.innerHTML = `Hello from the ScheduleApp class! (${this.seconds} seconds elapsed).`;
    });

    // timer_tick
    this.addEventListener(EVENT_TYPE__TIMER_TICK, (e) => {
      // Update value of now and seconds
      //this.now = new Date();
      this.seconds = this.seconds + 1;

      if(debug === true) {
        //console.debug(`'tick': ${this.seconds} (${this.now.toString()})`);
        //console.debug(`'tick': ${this.seconds}`);
      }

      app.dispatchEvent(app.events.update_container); // EVENT_TYPE__UPDATE_CONTAINER
    });
  }

  _unregisterEventListeners() {
    // todo
  }

  _registerIntervals() {
    this.intervals = {
      tick: setInterval(() => { this.dispatchEvent(this.events.timer_tick) }, TICK_LENGTH),
    }
  }

  _unregisterIntervals() {
    // todo
  }

  init() {
    document.addEventListener("DOMContentLoaded", (event) => {
      //
      this.app_container = document.getElementById('schedule-app');

      app.dispatchEvent(app.events.test);
      this.dispatchEvent(this.events.init); // EVENT_TYPE__INIT
    });
  }
};

// Load Page App
let app = new ScheduleApp();
app.init();


//app.dispatchEvent(app.events.timer_tick);

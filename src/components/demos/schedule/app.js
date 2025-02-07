import ScheduleTimeInterval from "./time-interval";

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
// 4. ...
// ???
// ... needs more documentation.

const debug = true;
const EVENT_TYPE__BUILD       = "build"; // constructor() complete
const EVENT_TYPE__INIT        = "init";  // init() complete
const EVENT_TYPE__TEST        = "test";  // test

const EVENT_TYPE__TIMER_TICK  = "timer_tick";  // timer tick
const EVENT_TYPE__UPDATE_TEXTAREA  = "update_textarea";  // timer tick (temp)

const EVENT_TYPE__TIME_INTERVAL_ADD    = "time_interval_add";
const EVENT_TYPE__TIME_INTERVAL_REMOVE = "time_interval_remove";

/** Class: ScheduleApp **/
class ScheduleApp extends EventTarget {
  constructor() {
    super();

    if(debug === true) {
      console.time(EVENT_TYPE__BUILD);
      console.time(EVENT_TYPE__INIT);
    }

    // init time values
    this.seconds = 0;
    this.now = new Date();

    // app container (temp?)
    this.app_container = null;
    this.test_button = null;
    this.debug_textarea = null;

    this.time_intervals = [];

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
      update_textarea: new Event(EVENT_TYPE__UPDATE_TEXTAREA),
      time_interval_add: new Event(EVENT_TYPE__TIME_INTERVAL_ADD),
      time_interval_remove: new Event(EVENT_TYPE__TIME_INTERVAL_REMOVE),
    };

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

      // debug
      this.test_button.addEventListener('click', (e) => {
        //console.debug(e, { this: this });
        this.dispatchEvent(this.events.time_interval_add);
      });

      if(debug === true) {
        console.debug("handling 'test' event", { e: e ?? undefined });
      }
    });

    // timer_tick
    this.addEventListener(EVENT_TYPE__TIMER_TICK, (e) => {
      // Update value of now and seconds
      // update this.now every minute()
      if(this.seconds % 60 === 0) {
        this.now = new Date();
        if(debug === true) {
          console.debug(`'tick': ${this.seconds / 60}m (${this.now.toString()})`);

          // debug
          this.app_container.innerHTML = `Hello from the ScheduleApp class! ${this.now.toString()}`;
        }
      }

      // Tick seconds
      this.seconds = this.seconds + 1;

      if(debug === true) {
        //console.debug(`'tick': ${this.seconds} (${this.now.toString()})`);
        //console.debug(`'tick': ${this.seconds}`);
      }

      app.dispatchEvent(app.events.update_textarea); // EVENT_TYPE__UPDATE_TEXTAREA
    });

    // update_textarea
    this.addEventListener(EVENT_TYPE__UPDATE_TEXTAREA, (e) => {
      // todo: show debug values
      const ti = JSON.stringify(
        // todo: not sure if this index is accurate, but this works for now.
        this.time_intervals.map((ti, index) => ({ index, state: ti.state } )),
      null, 2);

      this.debug_textarea.value = `Hello from the ScheduleApp class! (${this.seconds} seconds elapsed).\n${ti}`;
    });

    // time_interval_add
    this.addEventListener(EVENT_TYPE__TIME_INTERVAL_ADD, (e) => {
      console.debug("fired EVENT_TYPE__TIME_INTERVAL_ADD");
      this.time_intervals.push(new ScheduleTimeInterval({ created: new Date() })); // todo: probably need to accomplish this differently.
      console.debug("time_intervals: ", { time_intervals: this.time_intervals })
    });

    // time_interval_remove
    this.addEventListener(EVENT_TYPE__TIME_INTERVAL_REMOVE, (e) => {
      console.debug("fired EVENT_TYPE__TIME_INTERVAL_REMOVE");
    });
  }

  _unregisterEventListeners() {
    // todo
  }

  _registerIntervals() {
    this.intervals = {
      tick: setInterval(() => { this.dispatchEvent(this.events.timer_tick) }, 1000),
    }
  }

  _unregisterIntervals() {
    // todo
  }

  init() {
    document.addEventListener("DOMContentLoaded", (event) => {
      //
      this.app_container = document.getElementById('schedule-app');
      this.test_button = document.getElementById('test-button');
      this.debug_textarea = document.getElementById('debug_values_0');

      app.dispatchEvent(app.events.test);
      this.dispatchEvent(this.events.init); // EVENT_TYPE__INIT

      // temp

      //testButton.addEventListener('click', (e) => this.dispatchEvent(e))
    });
  }
};

// Load Page App
let app = new ScheduleApp();
app.init();


//app.dispatchEvent(app.events.timer_tick);

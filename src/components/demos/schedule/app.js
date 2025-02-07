
const debug = true;
const EVENT_TYPE__BUILD      = "build"; // constructor() complete
const EVENT_TYPE__INIT       = "init";  // init() complete
const EVENT_TYPE__TEST       = "test";  // test
const EVENT_TYPE__TIMER_TICK = "timer_tick";  // timer tick

class ScheduleApp extends EventTarget {
  constructor() {
    super();

    if(debug === true) {
      console.time(EVENT_TYPE__BUILD);
      console.time(EVENT_TYPE__INIT);
    }

    this._registerEventListeners();
    this.dispatchEvent(this.events.build);
  }

  handleEvent(e) {
    if(debug === true) {
      console.debug("ScheduleApp event handler:", { e: e ?? undefined });
    }
  }

  _registerIntervals() {

  }

  _unregisterIntervals() {
    // todo
  }

  _registerEventListeners() {
    this.events = {
      build: new Event(EVENT_TYPE__BUILD),
      init: new Event(EVENT_TYPE__INIT),
      test: new Event(EVENT_TYPE__TEST),
      timer_tick: new CustomEvent(EVENT_TYPE__TIMER_TICK, { tick: "foobar" }),
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

    // timer_tick
    this.addEventListener(EVENT_TYPE__TIMER_TICK, (e) => {
      if(debug === true) {
        console.debug("handling 'timer_tick' event", { e: e ?? undefined, tick: e?.tick ?? undefined });
      }
    });
  }

  _unregisterEventListeners() {
    // todo
  }

  init() {
    document.addEventListener("DOMContentLoaded", (event) => {
      const appContainer = document.getElementById('schedule-app');

      // todo
      appContainer.innerHTML = "Hello from the ScheduleApp class!";

      this.dispatchEvent(this.events.init);
    });
  }
};

// Load Page App
let app = new ScheduleApp();
app.init();

app.dispatchEvent(app.events.test);
//app.dispatchEvent(app.events.timer_tick);

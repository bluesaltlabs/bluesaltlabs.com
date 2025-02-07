
const EVENT_TYPE__BUILD = "build"; // constructor() complete
const EVENT_TYPE__INIT  = "init";  // init() complete
const EVENT_TYPE__TEST  = "test";  // test

class ScheduleApp extends EventTarget {
  constructor() {
    super();
    this._registerEventListeners();
    this.dispatchEvent(this.events.build);
  }

  handleEvent(e) {
    console.debug("ScheduleApp event handler:", { e: e ?? undefined });
  }

  _registerEventListeners() {
    this.events = {
      build: new Event(EVENT_TYPE__BUILD),
      init: new Event(EVENT_TYPE__INIT),
      test: new Event(EVENT_TYPE__TEST)
    }

    // build
    this.addEventListener(EVENT_TYPE__BUILD, (e) => {
      console.debug("handling 'build' event", { e: e ?? undefined });
    }, { once: true });

    // init
    this.addEventListener(EVENT_TYPE__INIT, (e) => {
      console.debug("handling 'init' event", { e: e ?? undefined });
    }, { once: true });

    // test
    this.addEventListener(EVENT_TYPE__TEST, (e) => {
      console.debug("handling 'test' event", { e: e ?? undefined });
    });
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

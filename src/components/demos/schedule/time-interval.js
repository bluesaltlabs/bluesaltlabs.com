
const debug = true;
const EVENT_TYPE__BUILD       = "build"; // constructor() complete
const EVENT_TYPE__INIT        = "init";  // init() complete
const EVENT_TYPE__TIME_INTERVAL_ADDED   = "time_interval__added";
const EVENT_TYPE__TIME_INTERVAL_REMOVED = "time_interval__removed";

class ScheduleTimeInterval extends EventTarget {
  // todo: subscribes to the ScheduleApp instance.
  constructor(state = {}) {
    super();
    this.state = state;

    if(debug === true) {
      console.time(EVENT_TYPE__BUILD);
      console.time(EVENT_TYPE__INIT);
    }

    this._registerEventListeners();
    this.dispatchEvent(this.events.build); // EVENT_TYPE__BUILD
  }

  _registerEventListeners() {
    this.events = {
      build: new Event(EVENT_TYPE__BUILD),
      init: new Event(EVENT_TYPE__INIT),
      time_interval_added: new Event(EVENT_TYPE__TIME_INTERVAL_ADDED),
      time_interval_removed: new Event(EVENT_TYPE__TIME_INTERVAL_REMOVED),
    };

    // build
    this.addEventListener(EVENT_TYPE__BUILD, (e) => {
      if(debug === true) {
        console.debug("ScheduleTimeInterval 'build' complete.", { e: e ?? undefined });
        console.timeEnd(EVENT_TYPE__BUILD);
      }
    }, { once: true });

    // init
    this.addEventListener(EVENT_TYPE__INIT, (e) => {
      if(debug === true) {
        console.debug("ScheduleTimeInterval 'init' complete. awaiting input.", { e: e ?? undefined });
        console.timeEnd(EVENT_TYPE__INIT);
      }
    }, { once: true });

    // time_interval_remove
    this.addEventListener(EVENT_TYPE__TIME_INTERVAL_ADDED, (e) => {
      console.debug("fired EVENT_TYPE__TIME_INTERVAL_ADDED");
    });

    // time_interval_remove
    this.addEventListener(EVENT_TYPE__TIME_INTERVAL_REMOVED, (e) => {
      console.debug("fired EVENT_TYPE__TIME_INTERVAL_REMOVED");
    });
  }

  addTimeInterval() {
    this.dispatchEvent(new CustomEvent(EVENT_TYPE__TIME_INTERVAL_ADDED, {
      detail: { ...this.state }
    }));
    EVENT_TYPE__TIME_INTERVAL_REMOVED
  }

  removeTimeInterval() {
    this.dispatchEvent(new CustomEvent(EVENT_TYPE__TIME_INTERVAL_REMOVED, {
      detail: { ...this.state }
    }));

  }
}

export default ScheduleTimeInterval;

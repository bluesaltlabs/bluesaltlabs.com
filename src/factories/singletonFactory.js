// attempting to implement this:https://www.freecodecamp.org/news/singleton-design-pattern-with-javascript/
// todo: why doesn't this work?

//
export function makeSingleton(Class) {
  let instance;
  return new Proxy(Class, {
    construct(target, args) {
      if (!instance) {
        instance = new target(...args);
        // Hide the constructor so the returned object can't be new'd...
        instance.constructor = null;
      }
      return instance;
    },
  });
}

export default makeSingleton



// see: https://stackoverflow.com/a/4842961/5121100
const SingletonFactory = (() => {
  function SingletonClass() {
      //do stuff
  }
  var instance;
  return {
      getInstance: function(){
          if (instance == null) {
              instance = new SingletonClass();
              // Hide the constructor so the returned object can't be new'd...
              instance.constructor = null;
          }
          return instance;
      }
  }
})()

// todo: at some point look into the code block from the Canopy project to figure out how to make a better text box.
// https://github.com/hoch/canopy
//
// todo: read and understand this before implementing codemirror: http://codemirror.net/docs/guide/
//       also see: https://github.com/codemirror/basic-setup
//
//

const appMountPointID = 'test-app'

let toneApp = (() => {
  // Initiate app variables and methods
  let self = {};

  self.blocks = [] // todo: use this

  // todo: add block?
  // todo: remove block?
  // todo: use events


  // todo
  //
  self.addBlock = (e) => {
    // test-synth-block
    console.debug("fired addBlock", { event: e })

    // todo: get test block
    // todo: add some HTML in it programatically. textarea, button
    // todo: bind event listeners from the classes below to the button
    // todo: mount the new block elements to the page.
  }

  self.removeBlock = (e) => {
    console.debug("fired removeBlock", { event: e })
    // todo: get block id
    //
    //       remove it from self.blocks
    //       remove it from the page
    //
  }

  self.initAddBtn = () => {
    const addBtn = document.getElementById('add-btn') // temp
    addBtn.addEventListener('click', self.addBlock) // temp
  }


  self.onLoad = () => {
    console.debug("simpleToneApp ran onLoad", self);
    self.initAddBtn()



    // testing this
    //const newBlock = new ToneSynthBlock();



  }

  console.debug("simpleToneApp initiated", self);
  return self;
})();

// Load the toneApp instance
document.addEventListener("DOMContentLoaded", toneApp.onLoad);



/* -------------------------------------------------------------------------- */



// Base Script block instance
class ToneScriptBlock {
  constructor() {
    console.debug("Instanciated ToneScriptBlock")

    // Instanciate Variables
    this.foo = "bar"

    //
  }

  methodName() {
    //
  }


  // todo: create a textarea element, bind it to the block.

}



class ToneSynthBlock extends ToneScriptBlock {
  constructor() {
    super()
    console.debug("Instanciated ToneSynthBlock")
  }
  // todo
}

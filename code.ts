// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage =  (msg: {type: string, count: number}) => {

  // To save the current viewport location
function saveViewportLocation() {
  const savedViewport = {
    center: figma.viewport.center, // Save center coordinates
    zoom: figma.viewport.zoom,    // Save zoom level
  };
  console.log("Viewport saved:", savedViewport);
  return savedViewport;
}

// To navigate back to the saved viewport location
function navigateToViewport(savedViewport:any) {
  if (savedViewport) {
    figma.viewport.center = savedViewport.center; // Restore center coordinates
    figma.viewport.zoom = savedViewport.zoom;     // Restore zoom level
    console.log("Navigated back to saved viewport:", savedViewport);
  } else {
    console.log("No saved viewport location to navigate to.");
  }
}

 let savedViewport 

  if (msg.type === 'create-shapes') {


  let savedViewport = saveViewportLocation();
    // Step 1: Create a frame
    const frame = figma.createFrame();

    frame.resize(300, 300); // Set the size of the frame
    frame.x = figma.viewport.center.x - 150; // Center the frame
    frame.y = figma.viewport.center.y - 150;
    frame.fills = [{ type: "SOLID", color: { r: 0.7, g: 0.8, b: 0.9 } }];

  

  }

  if (msg.type === 'nav') {
    
    navigateToViewport(savedViewport);
};


  

  // Session Marker start 
   
  // - Client storrage



  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};

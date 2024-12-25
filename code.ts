// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 150, height: 200 });

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage =  (msg: {type: string, count: number}) => {

let savedViewport 
  // To save the current viewport location
function saveViewportLocation() {
   savedViewport = {
    center: figma.viewport.center, // Save center coordinates
    zoom: figma.viewport.zoom,    // Save zoom level
    page: figma.currentPage,      // Save current page
  };

  console.log("Viewport saved:", savedViewport);
  figma.clientStorage.setAsync('a1sessionmarker', savedViewport);

}
// To navigate back to the saved viewport location
async function navigateToViewport() {

    const pages = figma.root.children;


      (async () => {
      const keys = await figma.clientStorage.keysAsync();
        for (const key of keys) {
          if(key === 'a1sessionmarker') {
              const value = await figma.clientStorage.getAsync(key);
              console.log('session --');
              console.log(value.center);
              console.log(value.page);
              console.log(value.zoom);
             
              let  pg = value.page;
              let center = value.center;
              let  z = value.zoom;

              console.log(center);
              console.log(pg);
              console.log(z);

              navValues(center, pg, z )
          }
        }
    })();



  async function navValues(center:any,  pg:any, z:any) {
      const pages = figma.root.children;
                let navigateablePage;

      pages.forEach((page) => {
          if (page.id === pg.id) {
               navigateablePage = page;
          }
          });

          await figma.setCurrentPageAsync(navigateablePage as any  )
              .then(() => {
                        figma.viewport.center = center;
                        figma.viewport.zoom = z;
          })
  };
  }



  if (msg.type === 'create-shapes') {

    savedViewport = saveViewportLocation();

    // Step 1: Create a frame
    const frame = figma.createFrame();
    frame.resize(100, 100); // Set the size of the frame
    frame.name = '1';
    frame.cornerRadius = 100;
    frame.x = figma.viewport.center.x - 50; // Center the frame
    frame.y = figma.viewport.center.y - 50;
    frame.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.9 }, opacity:0.3 }];
    // test

    const frame2 = figma.createFrame();
    frame2.resize(70, 70); // Set the size of the frame
    frame2.name = '2';
    frame2.cornerRadius = 100;
    frame2.x = 10; // Center the frame
    frame2.y = 10;
    frame2.fills = [{ type: "SOLID", color: { r: 0.4, g: 0.1, b: 0.9 }, opacity:0.3 }];
    // test

    const frame3 = figma.createFrame();
    frame2.resize( 40 , 40); // Set the size of the frame
    frame2.name = '3';
    frame2.cornerRadius = 100;
    frame2.x = 10; // Center the frame
    frame2.y = 10;
    frame2.fills = [{ type: "SOLID", color: { r: 0, g: 1, b: 0 }, opacity:0.3 }];
    // test

    frame.appendChild(frame2)
    frame2.appendChild(frame3)
    


   

  }

  if (msg.type === 'nav') {
    navigateToViewport();
};


  

  // Session Marker start 
   
  // - Client storrage



  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  // figma.closePlugin();
};
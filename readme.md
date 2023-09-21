# Installation

## From release

1. Go to the [releases page](https://github.com/Pascal-Flores/Chrome-extension-Makecode-Blocks-SVG-Extractor/releases) and download the latest version as zip (not source code).
2. You have now a .zip file. Extract it in an empty directory.
3. Open google chrome and go to the [extensions page](chrome://extensions/). 
4. Enable the "Developer mode" and click on "Load unpacked".
5. Select the extension directory.
6. Done !

## From source

Tools needed : 

- [Node.js](https://nodejs.org/en/) + [npm](https://www.npmjs.com/)

1. Clone the repository and install the dependencies :

```bash
npm install
```

2. Build the extension :

```bash
npm run build
```

3. You have now a dist folder in your repository folder. Open google chrome and go to the [extensions page](chrome://extensions/). 
4. Enable the "Developer mode" and click on "Load unpacked". 
5. Select the repository folder.
6. Done !


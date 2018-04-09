Create Editor App
=====================

## Dev setup

### To set up the environment dependencies ( node version 5++ )

```
$ npm install
```

### To run the node server

```
$ npm run start-server
```

Server is listening to port `8000`

### To run the react app (frontend)

```
$ npm run start
```
Client app is served on port `3000`

## Deployment steps

### Set server URL

Edit the `src/Helpers/urls.ts` file to set server url like this :

`export const serverURL = '<SERVER_URL_HERE>';`

### To run the node server

```
$ npm run start-server
```

Server is listening to port `8000`

### To run the react app (frontend)

```
$ npm run build
```
Serve the `build` folder using any static server.


## Project Instructions

You are required to implement a single page application that allows user to add text and image into canvas.

## Features

Below are the basic features for the application:

- user can see the existing images from folder `images` to the images list
- user can *upload image* to folder `images` and directly added to images list
- user can *add image / text* from the menu to the canvas
- user can *move and delete the image / text* inside the canvas
- the created objects on canvas can be saved and repopulated on refresh browser

You may refer to Piktochart Editor page of how this test should look like.

## Resources

You will be given a HTML and CSS file with simple structure, and a server that allows you to upload and retrieve image. Instruction on how to run the server is included below.

## Requirements

Here are the expected requirements:

- App should have the features listed [above](#features)

- App should work on modern browsers (Chrome / Firefox)

- App logic and data flow are written in a functional and reactive programming concept

    Separate the logic between application data state and template view / user interactions (unidirectional data flow). 

- Use libraries as less as possible,

    If you need to use libraries, we recommend vueJS (or any virtual DOM library), RxJS (or any streams library), Ramda (or any FP library).
    Other than that, feel free to use other libraries that you're confident of.
    For moving item inside the canvas, try your best to do it natively.

    _note: use native HTML element `<div>` for editor canvas, not `<canvas>`_

- Code and flow should be properly documented

    Help us understand your flow easier by code comments or a readme file.

- Build automated test for the app

### API

#### get uploaded images

```
GET /images
```

#### upload image to server

```
POST /uploads
```

### Note

_- The name of the file input has to be `upload` as this is what the server will be reading from_
_- The server only accepts `png` and `jpeg` file format_
_- You are allowed to edit the server.js file_

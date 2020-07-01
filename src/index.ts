import "index.css";
import * as PIXI from 'pixi.js'

const app = new PIXI.Application({
    width: 860,
    height: 640
});
document.body.appendChild(app.view);
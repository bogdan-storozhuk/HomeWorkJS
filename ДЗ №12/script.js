window.addEventListener('DOMContentLoaded', () => {
    "use strict";
    class Options {
        constructor(height, width, bg, fontSize, textAlign) {
            this.height = height;
            this.width = width;
            this.bg = bg;
            this.fontSize = fontSize;
            this.textAlign = textAlign;
        }
        createNewDiv(text){
            let newElem=document.createElement("div");
            newElem.textContent=text;
            newElem.style.cssText =`height: ${this.height}px; width: ${this.width}px;background-color:${this.bg};
            font-size:${this.fontSize}px; text-align:${this.textAlign}`;
            document.documentElement.appendChild(newElem);

        }
    }
    let options = new Options(600,600,"yellow",24,"center");
    options.createNewDiv("New Element xDDDDD");
});
import * as SVG from 'svg.js';

export class SvgBase {

    constructor(){}

    /**
     * method to draw a rectangle
     **/
    public drawRect( width : number,  height : number,  x : number, y : number, 
                     color : string, c : any) : svgjs.Container {
        
            return c.rect(width, height).move(x, y).fill(color);
    }

    /**
     * Method to draw a line
     */     
    public drawLine(x1 : number, y1 : number, x2 : number, y2 : number,
                    swidth : number, scolor : string, container : any) : svgjs.Container {
        return container.line(x1, y1, x2, y2).stroke({ color: scolor, width: swidth, linecap: 'round' })
    }

    /**
     * Method to mouseover
     */
    public mouseOver(element : svgjs.Container, color : string) : svgjs.Container {
        return element.mouseover(function() {
            this.fill({ color: color })
          })
    }
    

    /**
     *  Method to mousout
     */
    public mouseOut(element : svgjs.Container, color : string) : svgjs.Container {
        return element.mouseout(function() {
            this.fill({ color: color })
          })
    }
}

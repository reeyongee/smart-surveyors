import { gsap } from "gsap";
import {
  map,
  lerp,
  getMousePos,
  calcWinsize,
  getRandomNumber,
} from "../../utils";

// Initialize only on client-side
let winsize = { width: 1920, height: 1080 }; // Default values
let mousepos = { x: 960, y: 540 }; // Default center position
let mouseMoveHandler = null;

// Client-side initialization
if (typeof window !== "undefined") {
  winsize = calcWinsize();
  mousepos = { x: winsize.width / 2, y: winsize.height / 2 };

  window.addEventListener("resize", () => (winsize = calcWinsize()));

  // Ensure we only have one mouse move listener
  if (!mouseMoveHandler) {
    mouseMoveHandler = (ev) => (mousepos = getMousePos(ev));
    window.addEventListener("mousemove", mouseMoveHandler);
  }
}

class GridItem {
  constructor(el) {
    // Only initialize on client-side
    if (typeof window === "undefined") {
      return;
    }

    this.DOM = { el: el };
    this.DOM.inner = this.DOM.el.querySelector(".image-grid__item-img");
    this.invertMovement = !getRandomNumber(0, 3);
    this.move();
  }

  move() {
    const xstart = this.invertMovement
      ? getRandomNumber(20, 70)
      : getRandomNumber(40, 80);
    const ystart = this.invertMovement
      ? getRandomNumber(10, 60)
      : getRandomNumber(40, 80);

    // also moving inner image (max 50px on each side - to change this limit change it also in the CSS)
    const xstartInner = this.invertMovement
      ? getRandomNumber(0, 25)
      : getRandomNumber(0, 50);
    const ystartInner = this.invertMovement
      ? getRandomNumber(0, 25)
      : getRandomNumber(0, 50);

    // Calculate initial positions based on current mouse position
    const initialTx = map(
      mousepos.x,
      0,
      winsize.width,
      this.invertMovement ? xstart : -xstart,
      this.invertMovement ? -xstart : xstart
    );
    const initialTy = map(
      mousepos.y,
      0,
      winsize.height,
      this.invertMovement ? ystart : -ystart,
      this.invertMovement ? -ystart : ystart
    );
    const initialInnerTx = map(
      mousepos.x,
      0,
      winsize.width,
      this.invertMovement ? -xstartInner : xstartInner,
      this.invertMovement ? xstartInner : -xstartInner
    );
    const initialInnerTy = map(
      mousepos.y,
      0,
      winsize.height,
      this.invertMovement ? -ystartInner : ystartInner,
      this.invertMovement ? ystartInner : -ystartInner
    );

    // Start with current mouse-relative positions
    let translationVals = { tx: initialTx, ty: initialTy };
    let translationInnerVals = { tx: initialInnerTx, ty: initialInnerTy };

    const render = () => {
      const targetTx = map(
        mousepos.x,
        0,
        winsize.width,
        this.invertMovement ? xstart : -xstart,
        this.invertMovement ? -xstart : xstart
      );
      const targetTy = map(
        mousepos.y,
        0,
        winsize.height,
        this.invertMovement ? ystart : -ystart,
        this.invertMovement ? -ystart : ystart
      );

      translationVals.tx = lerp(translationVals.tx, targetTx, 0.07);
      translationVals.ty = lerp(translationVals.ty, targetTy, 0.07);
      gsap.set(this.DOM.el, { x: translationVals.tx, y: translationVals.ty });

      const targetInnerTx = map(
        mousepos.x,
        0,
        winsize.width,
        this.invertMovement ? -xstartInner : xstartInner,
        this.invertMovement ? xstartInner : -xstartInner
      );
      const targetInnerTy = map(
        mousepos.y,
        0,
        winsize.height,
        this.invertMovement ? -ystartInner : ystartInner,
        this.invertMovement ? ystartInner : -ystartInner
      );

      translationInnerVals.tx = lerp(
        translationInnerVals.tx,
        targetInnerTx,
        0.07
      );
      translationInnerVals.ty = lerp(
        translationInnerVals.ty,
        targetInnerTy,
        0.07
      );
      gsap.set(this.DOM.inner, {
        x: translationInnerVals.tx,
        y: translationInnerVals.ty,
      });

      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  }
}

export default class Grid {
  constructor(el) {
    // Only initialize on client-side
    if (typeof window === "undefined") {
      return;
    }

    this.DOM = { el: el };
    this.gridItems = [];
    this.items = [...this.DOM.el.querySelectorAll(".image-grid__item")];
    this.items.forEach((item) => this.gridItems.push(new GridItem(item)));

    this.showItems();
  }

  // Initial animation to scale up and fade in the items
  showItems() {
    // Set initial positions based on current mouse position before animating
    this.items.forEach((item, pos) => {
      const gridItem = this.gridItems[pos];
      const initialScale = gridItem.invertMovement ? 0.2 : 0.6;

      // Calculate initial mouse-relative position
      const xstart = gridItem.invertMovement
        ? getRandomNumber(20, 70)
        : getRandomNumber(40, 80);
      const ystart = gridItem.invertMovement
        ? getRandomNumber(10, 60)
        : getRandomNumber(40, 80);
      const initialTx = map(
        mousepos.x,
        0,
        winsize.width,
        gridItem.invertMovement ? xstart : -xstart,
        gridItem.invertMovement ? -xstart : xstart
      );
      const initialTy = map(
        mousepos.y,
        0,
        winsize.height,
        gridItem.invertMovement ? ystart : -ystart,
        gridItem.invertMovement ? -ystart : ystart
      );

      // Set initial state with mouse-relative position
      gsap.set(item, {
        scale: initialScale,
        opacity: 0,
        x: initialTx,
        y: initialTy,
      });
    });

    // Animate to final state
    gsap
      .timeline()
      .to(
        this.items,
        {
          duration: 1.5,
          ease: "Expo.easeOut",
          scale: (pos) => (this.gridItems[pos].invertMovement ? 0.5 : 1),
          stagger: { amount: 0.4, grid: "auto", from: "center" },
        },
        0
      )
      .to(
        this.items,
        {
          duration: 1.5,
          ease: "Power1.easeOut",
          opacity: (pos) => (this.gridItems[pos].invertMovement ? 0.8 : 0.9),
          stagger: { amount: 0.4, grid: "auto", from: "center" },
        },
        0
      );
  }
}

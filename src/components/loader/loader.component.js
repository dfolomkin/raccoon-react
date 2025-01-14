/* eslint class-methods-use-this: "off" */

const LoaderComponent = {
  template: `
    <div id="loader">
      <canvas width="60px" height="30px"></canvas>
      <canvas width="60px" height="30px"></canvas>
    </div>
  `,
  controller: class LoaderComponent {
    $onInit() {
      this.loader = document.getElementById('loader');
      this.drawLoader(this.loader);
    }

    clearCircle(context, x, y, radius) {
      context.save();
      context.beginPath();
      context.arc(x, y, radius, 0, 2 * Math.PI, true);
      context.clip();
      context.clearRect(x - radius, y - radius, radius * 2, radius * 2);
      context.restore();
    }

    drawLoader(loader) {
      const canvases = loader.children;
      canvases[1].style.transform = 'rotate(180deg)';
      const cans = Object.values(canvases);
      cans.forEach((elem) => {
        elem.style.display = 'block';
        const context = elem.getContext('2d');
        const gradient = context.createLinearGradient(0, 0, 60, 30);
        gradient.addColorStop(0, 'rgba(102, 149, 186, 1)');
        gradient.addColorStop(1, 'rgba(102, 149, 186, 0)');
        context.arc(30, 30, 30, 0, Math.PI, true);
        context.fillStyle = gradient;
        context.fill();
        this.clearCircle(context, 30, 30, 26);
      });
    }
  }
};

export default LoaderComponent;

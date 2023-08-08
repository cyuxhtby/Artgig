import React, { Component } from "react";

class ParticleAnimation extends Component {
  private canvasRef = React.createRef<HTMLCanvasElement>();
  private animationFrameId: number | null = null;
  private circleRadius = 50;
  private direction = 1;

  componentDidMount() {
    const canvas = this.canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      this.animationLoop();
    }
  }

  componentWillUnmount() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  render() {
    return <canvas ref={this.canvasRef}></canvas>;
  }

  animationLoop = () => {
    const canvas = this.canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Create a radial gradient background
    const gradient = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      0,
      canvas.width / 2,
      canvas.height / 2,
      canvas.width / 2
    );

    // Calculate gradient colors based on time
    const timeFactor = Math.sin(Date.now() * 0.0001);
    const red = Math.floor(255 - 50 * timeFactor);
    const green = Math.floor(224 - 50 * timeFactor);
    const blue = Math.floor(189 - 50 * timeFactor);

    gradient.addColorStop(0, `rgba(${red}, ${green}, ${blue}, 1)`);
    gradient.addColorStop(1, "rgba(182, 156, 135, 1)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Pulsating circle effect
    this.circleRadius += this.direction;
    if (this.circleRadius > 60 || this.circleRadius < 40) {
      this.direction = -this.direction;
    }

    // Draw the circle
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, this.circleRadius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();

    // Draw the text
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.textAlign = "center";
    ctx.fillText("A New Art Phenomenon", canvas.width / 2, canvas.height / 2 + 100);

    this.animationFrameId = requestAnimationFrame(this.animationLoop);
  };
}

export default ParticleAnimation;

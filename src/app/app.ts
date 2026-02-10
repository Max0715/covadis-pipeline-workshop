import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  planets = [
    { name: 'Mercury', size: 8, distance: 60, speed: 0.04, color: '#8c7853' },
    { name: 'Venus', size: 14, distance: 100, speed: 0.015, color: '#ffc649' },
    { name: 'Earth', size: 15, distance: 150, speed: 0.01, color: '#4a90ff' },
    { name: 'Mars', size: 10, distance: 200, speed: 0.008, color: '#ff6b61' },
    { name: 'Jupiter', size: 28, distance: 280, speed: 0.002, color: '#c88c45' },
    { name: 'Saturn', size: 24, distance: 350, speed: 0.0009, color: '#fad5a5' },
  ];

  ngOnInit() {
    this.animatePlanets();
  }

  private animatePlanets() {
    let angle: any = {};
    const animate = () => {
      this.planets.forEach((planet) => {
        if (!angle[planet.name]) angle[planet.name] = 0;
        angle[planet.name] += planet.speed;

        const element = document.querySelector(
          `[data-planet="${planet.name}"]`
        ) as HTMLElement;
        if (element) {
          const x = Math.cos((angle[planet.name] * Math.PI) / 180) * planet.distance;
          const y = Math.sin((angle[planet.name] * Math.PI) / 180) * planet.distance;
          element.style.transform = `translate(${x}px, ${y}px)`;
        }
      });
      requestAnimationFrame(animate);
    };
    animate();
  }
}

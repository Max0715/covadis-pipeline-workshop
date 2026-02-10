import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  // Real planet data with accurate sizes, distances, and orbital periods
  // Sizes and distances are scaled for visual representation but maintain ratios
  planets = [
    {
      name: 'Mercury',
      size: 6,
      distance: 70,
      speed: 0.04,
      color: '#8c7853',
      description: 'Closest to Sun. Smallest planet.',
      diameter: '3,832 km',
      orbitPeriod: '87.97 days',
      type: 'Terrestrial'
    },
    {
      name: 'Venus',
      size: 11,
      distance: 110,
      speed: 0.015,
      color: '#ffc649',
      description: 'Hottest planet. Brightest object after Moon.',
      diameter: '12,104 km',
      orbitPeriod: '224.7 days',
      type: 'Terrestrial'
    },
    {
      name: 'Earth',
      size: 12,
      distance: 160,
      speed: 0.01,
      color: '#4a90ff',
      description: 'Our home. Only planet with life.',
      diameter: '12,742 km',
      orbitPeriod: '365.25 days',
      type: 'Terrestrial'
    },
    {
      name: 'Mars',
      size: 8,
      distance: 220,
      speed: 0.0053,
      color: '#ff6b61',
      description: 'The Red Planet. Target for colonization.',
      diameter: '6,779 km',
      orbitPeriod: '687 days',
      type: 'Terrestrial'
    },
    {
      name: 'Jupiter',
      size: 28,
      distance: 320,
      speed: 0.0009,
      color: '#c88c45',
      description: 'Largest planet. Gas giant with Great Red Spot.',
      diameter: '139,820 km',
      orbitPeriod: '11.86 years',
      type: 'Gas Giant',
      hasRings: false
    },
    {
      name: 'Saturn',
      size: 24,
      distance: 420,
      speed: 0.00035,
      color: '#fad5a5',
      description: 'Famous for its rings. Second largest planet.',
      diameter: '116,460 km',
      orbitPeriod: '29.46 years',
      type: 'Gas Giant',
      hasRings: true
    },
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

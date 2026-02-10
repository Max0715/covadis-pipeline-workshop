import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Planet {
  name: string;
  size: number;
  distance: number;
  speed: number;
  color: string;
  description: string;
  diameter: string;
  orbitPeriod: string;
  type: string;
  hasRings?: boolean;
  currentPosition?: number; // Actual position in orbit (0-360 degrees)
}

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  planets: Planet[] = [
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
    this.calculateRealPositions();
    this.animatePlanets();
  }

  private calculateRealPositions() {
    // Reference epoch: J2000.0 (January 1, 2000, 12:00 TT)
    // Calculate positions for February 10, 2026
    const referenceDate = new Date(2000, 0, 1, 12, 0, 0); // J2000.0
    const currentDate = new Date(2026, 1, 10, 0, 0, 0); // Feb 10, 2026
    const daysSinceEpoch = (currentDate.getTime() - referenceDate.getTime()) / (1000 * 60 * 60 * 24);

    // Orbital elements at J2000.0 (longitude of perihelion at epoch)
    const perihelionLongitudes: { [key: string]: number } = {
      'Mercury': 77.46,
      'Venus': 131.53,
      'Earth': 102.94,
      'Mars': 336.04,
      'Jupiter': 14.75,
      'Saturn': 93.05
    };

    // Mean motion (degrees per day)
    const meanMotions: { [key: string]: number } = {
      'Mercury': 4.0923,
      'Venus': 1.6021,
      'Earth': 0.9856,
      'Mars': 0.5240,
      'Jupiter': 0.0830,
      'Saturn': 0.0339
    };

    this.planets.forEach(planet => {
      const meanLongitude = perihelionLongitudes[planet.name] + (meanMotions[planet.name] * daysSinceEpoch);
      const normalizedLongitude = ((meanLongitude % 360) + 360) % 360;
      planet.currentPosition = normalizedLongitude;
    });
  }

  private animatePlanets() {
    const animate = () => {
      this.planets.forEach((planet) => {
        const element = document.querySelector(
          `[data-planet="${planet.name}"]`
        ) as HTMLElement;
        if (element && planet.currentPosition !== undefined) {
          const angleRad = (planet.currentPosition * Math.PI) / 180;
          const x = Math.cos(angleRad) * planet.distance;
          const y = Math.sin(angleRad) * planet.distance;
          element.style.transform = `translate(${x}px, ${y}px)`;
        }
      });
      requestAnimationFrame(animate);
    };
    animate();
  }
}

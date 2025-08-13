import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `

  `,
  styles: `
    .home-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }

    .hero-section {
      margin-bottom: 3rem;
    }

    .hero-section h1 {
      font-size: 3.5rem;
      font-weight: 700;
      color: #2c3e50;
      margin: 0 0 1rem 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .title {
      font-size: 1.5rem;
      color: #666;
      margin: 0 0 0.5rem 0;
      font-weight: 600;
    }

    .subtitle {
      font-size: 1.125rem;
      color: #888;
      margin: 0;
    }

    .intro-section {
      margin-bottom: 3rem;
      padding: 2rem;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border-radius: 12px;
    }

    .intro-section p {
      font-size: 1.25rem;
      color: #555;
      margin: 0;
      line-height: 1.6;
    }

    .quick-links {
      margin-bottom: 3rem;
    }

    .quick-links h2 {
      font-size: 2rem;
      color: #2c3e50;
      margin: 0 0 2rem 0;
    }

    .links-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .quick-link {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem;
      background: white;
      border: 2px solid #e0e0e0;
      border-radius: 12px;
      text-decoration: none;
      color: #333;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .quick-link:hover {
      transform: translateY(-4px);
      border-color: #007bff;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    .link-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .link-text {
      font-size: 1.125rem;
      font-weight: 600;
      color: #2c3e50;
    }

    @media (max-width: 768px) {
      .home-container {
        padding: 1rem;
      }

      .hero-section h1 {
        font-size: 2.5rem;
      }

      .links-grid {
        grid-template-columns: 1fr;
      }
    }
  `
})
export class HomeComponent {}

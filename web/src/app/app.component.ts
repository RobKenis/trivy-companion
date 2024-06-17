import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {HttpClient} from '@angular/common/http';

interface Origin {
  container: string;
  namespace: string;
}

interface Artifact {
  repository: string;
  tag: string;
  digest: string;
  registry: string;
}

interface ScanMetadata {
  origin: Origin;
  artifact: Artifact;
}

export interface VulnerabilityReport {
  name: string;
  scanMetadata: ScanMetadata;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatTableModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'trivy-companion';
  displayedColumns: string[] = ['name', 'image'];

  reports: VulnerabilityReport[] = [];
  
  loadReports = () => {
    this.http.get('http://localhost:8080/vulnerability-reports')
      .subscribe((data: any) => {
        this.reports = data;
      });
  }

  constructor(private http: HttpClient) {
    this.loadReports();
  }
}

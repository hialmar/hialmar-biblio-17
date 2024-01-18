import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Livre } from './livre';
import { Observable } from 'rxjs';

@Injectable()
export class BiblioService {
  biblio: Livre[] = [];

  // Fly.io
  url = 'https://hialmar.fly.dev/biblio/';
  // GCP
  //url = 'https://gcloud.torguet.net:3000/biblio/';

  constructor(private httpClient: HttpClient) {
    this.getListFromServer();
  }

  addUsualSuspects() {
    let l = new Livre();
    l.titre = 'The Lord of the Rings';
    l.auteur = 'JRR Tolkien';
    l.annee = 1955;
    this.addToServer(l);
    l = new Livre();
    l.titre = 'The Hobbit';
    l.auteur = 'JRR Tolkien';
    l.annee = 1937;
    this.addToServer(l);
    l = new Livre();
    l.titre = 'Nine Princes in Amber';
    l.auteur = 'Roger Zelazny';
    l.annee = 1970;
    this.addToServer(l);
  }

  getListFromServer() {
    this.httpClient.get<Livre[]>(this.url).subscribe({
      next: (response) => {
        if (response == null || response.length == 0) {
          this.addUsualSuspects();
        }
        this.biblio = response;
      },
      error: (error) => {
        console.log('Erreur chargement');
        console.log(error);
      },
    });
  }

  addToServer(l: Livre) {
    this.httpClient.post(this.url, l).subscribe({
      next: (response) => {
        console.log('Sauve ');
        this.getListFromServer();
      },
      error: (error) => {
        console.log('Erreur ajout');
        console.log(error);
      },
    });
  }

  removeFromServer(titre: string) {
    this.httpClient.delete(this.url + titre).subscribe({
      next: (response) => {
        console.log('Efface ');
        this.getListFromServer();
      },
      error: (error) => {
        console.log('Erreur effacement');
        console.log(error);
      },
    });
  }

  updateOnServer(titre: string, l: Livre) {
    this.httpClient.put(this.url + titre, l).subscribe({
      next: (response) => {
        console.log('Sauve ');
        this.getListFromServer();
      },
      error: (error) => {
        console.log('Erreur mise à jour');
        console.log(error);
      },
    });
  }

  getSinglePerson(titre: string): Observable<any> {
    return this.httpClient.get(this.url + titre);
  }
}

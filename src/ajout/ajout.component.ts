import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BiblioService } from '../biblio.service';
import { Livre } from '../livre';

@Component({
  selector: 'app-ajout',
  standalone: true,
  templateUrl: './ajout.component.html',
  styleUrls: ['./ajout.component.css'],
  imports: [FormsModule]
})
export class AjoutComponent implements OnInit {
  edit = false;

  l: Livre;

  constructor(
    public biblio: BiblioService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.l = new Livre();
  }

  ngOnInit(): void {
    this.edit = false;
    // const id = this.route.snapshot.params.id;
    this.route.paramMap.subscribe(params => {
      const id = params.get('titre');
      if (id !== null) {
        console.log(id);
        this.edit = true;
        this.biblio.getSinglePerson(id).subscribe({
          next: (response) => {
            this.l = response;
          },
          error: (error) => {
            console.log('Erreur récupération');
            console.log(error);
          },
        });
      }
    });
  }

  onSubmit(): void {
    // Vérifions qu'il y a au moins un titre.
    if (this.l.titre === '') {
      alert('Il faut au moins un titre');
      return;
    }
    if (this.edit) {
      console.log('edit livre ' + this.l.titre);
      this.biblio.updateOnServer(this.l.titre, this.l);
    } else {
      console.log('add livre ' + this.l.titre);
      this.biblio.addToServer(this.l);
    }
    this.router.navigate(['/list']);
  }
}

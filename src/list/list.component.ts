import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { BiblioService } from "../biblio.service";

import { FormsModule } from '@angular/forms';
import { SearchPipe } from "./search.pipe";

@Component({
  selector: "app-list",
  standalone: true,
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
  imports: [FormsModule, SearchPipe]
})
export class ListComponent implements OnInit {
  searchText = "";

  constructor(public biblio: BiblioService, private router: Router) {}

  ngOnInit(): void {}

  ajoutLivre(): void {
    this.router.navigate(["/list", "add"]);
  }

  editLivre(titre: string): void {
    this.router.navigate(["/list", "view", titre]);
  }

  removeLivre(titre: string): void {
    this.biblio.removeFromServer(titre);
  }
}
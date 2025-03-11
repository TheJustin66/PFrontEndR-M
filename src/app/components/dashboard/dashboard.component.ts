import { Component,OnInit } from '@angular/core';
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../../navbar/navbar.component";

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  characters: any[] = [];
  currentPage:number = 1;
  totalPages:number = 1;
  selectedCharacter:any;
  searchQuery: string = '';
  episodes: any[] = [];
  selectedEpisode: number | null = null;

  constructor(private rickAndMortyService: RickAndMortyService){}

  ngOnInit(): void {
    this.getCharacters(this.currentPage);
    this.getEpisodes();
  }


  getCharacters(page:number)
  {
    this.rickAndMortyService.getCharacters(page).subscribe((data) => {
      console.log('Datos recibidos:',data);
      this.characters = data.results;
      this.totalPages = data.info.pages;
    },
  (error) => {
    console.error('Error al obtener personajes:', error)
  });
  }

  // previousPage(){
  //   if(this.currentPage > 1){
  //     this.currentPage--;
  //     this,this.getCharacters(this.currentPage);
  //   }
  // }
  // nextPage(){
  //   if(this.currentPage < this.totalPages){
  //     this.currentPage++;
  //     this,this.getCharacters(this.currentPage);
  //   }
  // }

  searchCharacters(){
    if (this.searchQuery.trim()!== ''){
      this.rickAndMortyService.searchCharacter(this.searchQuery).subscribe((data) => {
        this.characters = data.results;
      },
    (error) => {
      console.log('Personaje no encontrado');
      this.characters = [];
    }
  );
    } else{
      this.getCharacters(this.currentPage);
    }
  }

  getEpisodes() {
    this.rickAndMortyService.getAllEpisodes().subscribe((data) => {
      console.log('Episodios',data)
      this.episodes = data;
    },
  (error) => {
    console.error('Error al obtener episodios:', error)
  }
  );
  }

  selectEpisode(){
    if (this.selectedEpisode){
      this.rickAndMortyService.getEpisodeById(this.selectedEpisode).subscribe((data) => {
        const characterUrls = data.characters;

        Promise.all(
          characterUrls.map((url:string) =>
          fetch(url).then((res) =>res.json())
        )
      ).then((characters) => {
        this.characters = characters;
      });
    });
    }
  }

  changePage(page:number){
    if (page >= 0 && page <= this.totalPages){
      this.currentPage = page;
      this.getCharacters(page)
    }
  }
  showCharacterDetails(character:any){
    this.selectedCharacter = character;
  }

  closePopup(){
    this.selectedCharacter = null;
  }
}

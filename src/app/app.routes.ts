import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { MovieComponent } from './pages/movie/movie.component';
import { GenresComponent } from './pages/genres/genres.component';
import { FavouriteComponent } from './pages/favourite/favourite.component';
import { SeasonsComponent } from './pages/seasons/seasons.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PersonComponent } from './pages/person/person.component';
import { CollectionsComponent } from './pages/collections/collections.component';
import { CollectionDetailComponent } from './pages/collections/components/collection-detail/collection-detail.component';
import { AdventCalendarComponent } from './pages/advent-calendar/advent-calendar.component';


export const routes: Routes = [
    { path: '', component: MainComponent },
    {
        path: 'movie/:id', component: MovieComponent,
    },
    {        path: 'seasons', component: SeasonsComponent     },
    { path: 'genres', component: GenresComponent },
    { path: 'favourite', component: FavouriteComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'person/:id', component: PersonComponent },
    {path: 'collections', children: [
            {path: '', component: CollectionsComponent},
            {path: ':slug',component: CollectionDetailComponent }
        ]
    },
    {path: 'advent', component: AdventCalendarComponent,}
];

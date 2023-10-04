import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInterfaceService {

  showAgGrid: boolean = false;
  showMySavedJobs: boolean = false;
  showMySavedSearches: boolean = false;
  formPanelOpenstate: boolean = false;
  themeName: string = '';

  private behaviorThemeNameSelected$ = new BehaviorSubject<string>('');
  public themeNameSelected$ = this.behaviorThemeNameSelected$.asObservable();

  constructor(public loggerService: LoggerService) {this.themeChange('light'); }


  themeChange(theme: string){
    this.behaviorThemeNameSelected$.next(theme);
    this.loggerService.logInfo(this.loggerService.THEME_UPDATED);
  }

}

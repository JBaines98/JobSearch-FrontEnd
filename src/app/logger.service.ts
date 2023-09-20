import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  public readonly SUCCESS_MESSAGE = "Success.";
  public readonly RATED_SUCCESS_MESSAGE = "Job successfully rated.";
  public readonly LIKED_SUCCESS_MESSAGE = "Job successfully liked/disliked.";
  public readonly DELETED_SUCCESS_MESSAGE = "Successfully deleted.";
  public readonly CLEAR_SUCCESS_MESSAGE = "Successfully cleared.";
  public readonly ERROR_MESSAGE = "Error.";
  public readonly DATA_ERROR_MESSAGE = "Error: No data returned.";
  public readonly SAVED_MESSAGE = "All saved.";
  public readonly ALREADY_SAVED_MESSAGE = "Already been saved.";
  public readonly REMOVED_MESSAGE = "Job successfully removed.";
  public readonly SUBMITTED_MESSAGE = "Successfully submitted.";


  logError(message: string, err: any){
    console.error(message, err);
  }

  // logDataError(){
  //   console.log("Error: No data returned.");
  // }

  // logJobRated(){
  //   console.log("")
  // }

  // logJobLiked(){
  //   console.log("Job successfully liked/disliked.");
  // }

  // logDeleteSuccess(){
  //   console.log("Successfully deleted.");
  // }

  // logClearSuccess(){
  //   console.log("Successfully cleared.")
  // }

  logInfo(message:string, payload?: any){
    console.log(message, payload);
  }
}

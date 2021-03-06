import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivationEnd } from '@angular/router';
import { EMPTY, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { Asset } from 'src/app/shared/shared.market-data';
import { MarketDataService } from '../../../services/market-data.service'


@Component({
  selector: 'app-data-viewer-menu',
  templateUrl: './data-viewer-menu.component.html',
  styleUrls: ['./data-viewer-menu.component.css']
})
export class DataViewerMenuComponent implements OnInit, OnDestroy {

  rootForm: FormGroup;
  assetSelectFormControl = new FormControl("");
  showReturnsCheckoxControl = new FormControl("");
 @Output() settingsChanged = new EventEmitter();
  private _settings: LineChartSettings;
  allAssets: Asset[]
  
  private unsubscribe$ = new Subject<ActivationEnd>();

  availableAssets$ = this.marketDataService.allAssets$.pipe(
    takeUntil(this.unsubscribe$),
    catchError(err => {
      console.log(`Error in available assets: ${err}`)
      return EMPTY;
    })
  )

  constructor(private marketDataService: MarketDataService) { }

  ngOnInit(): void {

    this.rootForm = new FormGroup({
      assetSelect: this.assetSelectFormControl,
      showReturns: this.showReturnsCheckoxControl
    });

    this.availableAssets$.subscribe(assets => {this.allAssets = assets
    this.assetSelectFormControl.setValue(assets[0])
    this.onSettingsChangedEvent()})
  }

  ngOnDestroy(): void{
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private getSettingsFromControls(): LineChartSettings{
    let selectedAsset = this.assetSelectFormControl.value;
    if(selectedAsset === ""){
      selectedAsset = new Asset(-1, "", "");  // bit of a hack, would like it to return null from value
    }
    let showReturns = this.showReturnsCheckoxControl.value as boolean;
    return new LineChartSettings(selectedAsset as Asset, showReturns);
  }

  getSettings(): LineChartSettings{
    return this._settings;
  }

  onSettingsChangedEvent(){
    let newSettings = this.getSettingsFromControls();
    if(this._settings == null || !newSettings.isEqualTo(this._settings)){
      this._settings = newSettings
      console.log("Settings changed event")
      this.settingsChanged.emit();
    }
  }
}

export class LineChartSettings{

  selectedAsset: Asset;
  showReturns: boolean;

  constructor(selectedAsset: Asset, showReturns: boolean){
    this.selectedAsset = selectedAsset;
    this.showReturns = showReturns;
  };

  isEqualTo(other: LineChartSettings){

    if(!this.selectedAsset.isEqualTo(other.selectedAsset)){
      return false;
    }
    if(this.showReturns != other.showReturns){
      return false;
    }
    return true;
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { JingleService } from '../core';
import { TabService } from 'ngx-prx-styleguide';

import { CampaignModel } from '../shared';

@Component({
  providers: [TabService],
  selector: 'adflow-campaign',
  styleUrls: ['campaign.component.css'],
  templateUrl: 'campaign.component.html'
})

export class CampaignComponent implements OnInit {

  id: number;
  base: string;
  campaign: CampaignModel;
  isLoaded = false;

  constructor(
    private jingle: JingleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoaded = false;
    this.route.params.forEach(params => {
     this.id = +params['id'];
     this.base = '/campaign/' + this.id;
     this.loadCampaign();
   });
  }

  loadCampaign() {
    if (this.id) {
      this.jingle.follow('prx:campaign', {id: this.id}).subscribe(
        (cDoc) => {
          this.isLoaded = true;
          this.setCampaign(null, cDoc);
        },
        err => {
          if (err.status === 404 && err.name === 'HalHttpError') {
            // this.toastr.error('No campaign found. Redirecting to home');
            console.error(`Campaign with id ${this.id} not found`);
            setTimeout(() => this.router.navigate(['/']), 3000);
          } else {
            throw(err);
          }
        }
      );
    }
  }

  setCampaign(parent: any, campaign: any) {
    this.campaign = new CampaignModel(parent, campaign);
  }

  save() {
    this.campaign.save();
  }

  discard() {
    this.campaign.discard();
  }

  // canDeactivate(next: any, prev: any): boolean | Observable<boolean> {
  //   if (this.campaign && this.campaign.changed() && !this.campaign.isDestroy) {
  //     let thatsOkay = new Subject<boolean>();
  //     // this.modal.confirm(
  //     //   'Unsaved changes',
  //     //   `This campaign has unsaved changes. You may discard the changes and
  //     //     continue or click 'Cancel' to complete and save the campaign.`,
  //     //   (confirm: boolean) => {
  //     //     if (confirm) {
  //     //       this.discard();
  //     //     }
  //     //     thatsOkay.next(confirm);
  //     //     thatsOkay.complete();
  //     //   },
  //     //   'Discard'
  //     // );
  //     return thatsOkay;
  //   } else {
  //     return true;
  //   }
  // }

}

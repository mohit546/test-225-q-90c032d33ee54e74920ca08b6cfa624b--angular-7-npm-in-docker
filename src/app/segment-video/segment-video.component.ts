import { Component, OnInit } from '@angular/core';
import { ApiService } from "../_services/api.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utils } from "../_helpers/utils";

@Component({
  selector: 'app-segment-video',
  templateUrl: './segment-video.component.html',
  styleUrls: ['./segment-video.component.css']
})
export class SegmentVideoComponent implements OnInit {
  segmentVideoForm: FormGroup;
  segmentedVideos = {
    interval_videos: []
  };
  submitted = false; // flag to show errors after pristine
  loading = false; // flag for api delay

  constructor(private api: ApiService, private formBuilder: FormBuilder, private utils: Utils) { }

  ngOnInit() {
    this.segmentVideoForm = this.formBuilder.group({
      video_link: ['', [
        Validators.compose([
          Validators.required,
          Validators.pattern('^(.*)+(.mp4)$') // add valid video format e.g. ^(.*)+(.mp4|.ogg|.wmv)$
        ])
      ]],
      segment_settings: [''],
      interval_duration: [1, [Validators.required, this.utils.min(1)]] // Validators.min() is available above angular 4
    });
  }

  segmentVideo() {
    this.submitted = true;

    if(this.segmentVideoForm.invalid) {
      return;
    }

    this.loading = true;

    const formCopy = Object.assign({}, this.segmentVideoForm.getRawValue()); // deep copy to manipulate data before sending to server

    this.api.segmentVideoRequest(formCopy).subscribe((response: any) => {
      console.log(response);
      if(response) {
        try {
          this.segmentedVideos = JSON.parse(response._body);
          console.log(this.segmentedVideos);
        } catch (error) {
          console.log('error occured during response parsing !!!');
          this.segmentedVideos = {
            interval_videos: []
          };
        }
      }
      this.loading = false;
    }, error => {
      console.log(error, ` reason => ${JSON.parse(error._body).reason}`);
      this.loading = false;
    });
  }


}

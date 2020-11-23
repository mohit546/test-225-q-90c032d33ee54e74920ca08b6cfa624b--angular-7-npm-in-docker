import { Component, OnInit } from '@angular/core';
import { ApiService } from "../_services/api.service";
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Utils } from "../_helpers/utils";
@Component({
  selector: 'app-video-compilation',
  templateUrl: './video-compilation.component.html',
  styleUrls: ['./video-compilation.component.css']
})
export class VideoCompilationComponent implements OnInit {
  videoCompilationForm: FormGroup;
  submitted = false; // flag to show errors after pristine
  loading = false; // flag for api delay
  compiledVideo = {
    video_url: ''
  };

  constructor(private formBuilder: FormBuilder, private api: ApiService, private utils: Utils) {
    this.videoCompilationForm = this.formBuilder.group({
      segments: this.formBuilder.array([], this.utils.minLengthArray(1)),
      width : [1, [Validators.required, this.utils.min(1)]],
      height : [1, [Validators.required, this.utils.min(1)]]
    });
  }

  ngOnInit() {}

  get f() { return this.videoCompilationForm.controls; }

  get segments(): FormArray{
    return this.videoCompilationForm.get('segments') as FormArray;
  }

  addVideo(){
    let fg = this.formBuilder.group({
      video_url: ['', [
        Validators.compose([
          Validators.required,
          Validators.pattern('^(.*)+(.mp4)$') // add valid video format e.g. ^(.*)+(.mp4|.ogg|.wmv)$
        ])
      ]],
      start: [0, Validators.required],
      end: [0, Validators.required]
    });
    this.segments.push(fg);
  }

  deleteVideo(index: number, val) {
    console.log(val,index);
    this.segments.removeAt(index);
  }

  isRangeValid(segments) {
    // api returns error only when start > end
    // start == end api doesn't respond with error but that 1 sec does not reflect in output video
    // so keeping validation for equalto
    for(let i = 0, l = segments.length; i < l; i ++) {
      if(segments[i].start >= segments[i].end) {
        return {status: false, index: i};
      }
    }
    return {status: true, index: null};
  }

  videoCompilation() {
    this.compiledVideo = {
      video_url: ''
    };
    this.submitted = true;

    if(this.videoCompilationForm.invalid) {
      return;
    }

    let isRangeValidResponse = this.isRangeValid(this.videoCompilationForm.getRawValue().segments);
    if(!isRangeValidResponse.status) {
      alert(`Please correct range for ${isRangeValidResponse.index + 1} record`);
      return;
    }

    this.loading = true;

    const formCopy = Object.assign({}, this.videoCompilationForm.getRawValue()); // deep copy to manipulate data before sending to server

    this.api.videoCompilationRequest(formCopy).subscribe((response: any) => {
      console.log(response);
      if(response) {
        try {
          this.compiledVideo = JSON.parse(response._body);
          console.log(this.compiledVideo);
        } catch (error) {
          console.log('error occured during response parsing !!!');
          this.compiledVideo = {
            video_url: ''
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BreakpointService } from '../services/breakpoint.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css'],
})
export class UploaderComponent implements OnInit {
  uploadedImg: string | null;
  img: string;
  uploadForm!: FormGroup;

  isSmall$: Observable<boolean> = this.breakpoint.isViewportMedium();

  constructor(
    private builder: FormBuilder,
    private breakpoint: BreakpointService
  ) {
    this.uploadedImg = '';
    this.img = '';
  }

  ngOnInit(): void {
    this.uploadForm = this.builder.group(
      {
        uploadedImg: new FormControl(''),
      },
      {
        updateOn: 'submit',
      }
    );
  }

  async decode() {
    // Read the blobs
    const blob = this.uploadForm.value['uploadedImg'];

    this.img = `../../assets/avatars/${blob.name}`;
    console.log(this.img);
    // const tableBlob: File = this.uploadForm.value['decodingTable'];
    // if (!tableBlob || !tableBlob) {
    //   return;
    // }
    // // Read the data from the uploaded files
    // this.encodedText = await getFileData(textBlob);
    // this.decodingTable = await getFileData(tableBlob);
    // // Decoding the text using the frequencies table and encoding text
    // const frequencies: Entry[] | null = deserializeFrequencies(
    //   this.decodingTable
    // );
    // const decoder: HuffmanDecoder = new HuffmanDecoder(
    //   this.encodedText,
    //   frequencies
    // );
    // this.decodedText = decoder.getDecodedText();
  }
}

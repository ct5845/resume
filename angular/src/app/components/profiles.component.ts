import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as resumeJSON from '../../assets/resume.json';
import { NgIcon, provideIcons } from "@ng-icons/core";
import { bootstrapGithub, bootstrapLinkedin } from "@ng-icons/bootstrap-icons";
import { matEmail, matLink } from "@ng-icons/material-icons/baseline";

const resume = resumeJSON;

@Component({
  selector: 'app-profiles',
  standalone: true,
  imports: [CommonModule, NgIcon],
  template: `
    <li class="hidden text-info print:mb-1 print:list-item">
      <ng-icon name="matEmail" class="print:mr-1 inline" />
      <span>ct5845&#64;gmail.com</span>
    </li>
    <li class="hidden text-info print:mb-1 print:list-item">
      <ng-icon name="matLink" class="inline" />
      <span>{{basics.url.replace('https://', '')}}</span>
    </li>

    <li *ngFor="let profile of basics.profiles" class="text-info print:mb-1">
      <a [attr.href]="profile.url">
        <ng-icon [name]="profile.icon['angular']" class="print:mr-1 inline" />
        <span class="print:hidden">{{profile.network}}</span>
        <span class="hidden print:inline">{{profile.url.replace('https://', '')}}</span>
      </a>
    </li>
  `,
  styles: [
  ],
  viewProviders:[
    provideIcons({
      bootstrapLinkedin,
      bootstrapGithub,
      matEmail,
      matLink
    })
  ]
})
export class ProfilesComponent {
  basics = resume.basics;
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IssueService, Issue } from '../../services/issue.service';

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.css']
})
export class IssueFormComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  submitting: boolean = false;
  isEditMode: boolean = false;
  issueId: string | null = null;
  error: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private issueService: IssueService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      status: ['open', Validators.required],
      priority: ['medium', Validators.required],
      assignee: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.issueId = id;
      this.loadIssue(id);
    }
  }

  loadIssue(id: string): void {
    this.loading = true;
    this.issueService.getIssue(id).subscribe(
      (issue: Issue) => {
        this.form.patchValue({
          title: issue.title,
          status: issue.status,
          priority: issue.priority,
          assignee: issue.assignee || ''
        });
        this.loading = false;
      },
      error => {
        this.error = 'Failed to load issue';
        this.loading = false;
        console.error('Error loading issue:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.submitting = true;
    const formValue = this.form.value;
    const issueData = {
      title: formValue.title,
      status: formValue.status,
      priority: formValue.priority,
      assignee: formValue.assignee || undefined
    };

    if (this.isEditMode && this.issueId) {
      this.issueService.updateIssue(this.issueId, issueData).subscribe(
        () => {
          this.router.navigate(['/issues', this.issueId]);
          this.submitting = false;
        },
        error => {
          this.error = 'Failed to update issue';
          this.submitting = false;
          console.error('Error updating issue:', error);
        }
      );
    } else {
      this.issueService.createIssue(issueData).subscribe(
        (issue: Issue) => {
          this.router.navigate(['/issues', issue.id]);
          this.submitting = false;
        },
        error => {
          this.error = 'Failed to create issue';
          this.submitting = false;
          console.error('Error creating issue:', error);
        }
      );
    }
  }

  goBack(): void {
    this.router.navigate(['/issues']);
  }

  get title() {
    return this.form.get('title');
  }

  get status() {
    return this.form.get('status');
  }

  get priority() {
    return this.form.get('priority');
  }

  get assignee() {
    return this.form.get('assignee');
  }
}

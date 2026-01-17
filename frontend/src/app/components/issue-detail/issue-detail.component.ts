import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueService, Issue } from '../../services/issue.service';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.css']
})
export class IssueDetailComponent implements OnInit {
  issue: Issue | null = null;
  loading: boolean = false;
  error: string = '';

  constructor(
    private issueService: IssueService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadIssue(id);
    }
  }

  loadIssue(id: string): void {
    this.loading = true;
    this.issueService.getIssue(id).subscribe(
      (issue: Issue) => {
        this.issue = issue;
        this.loading = false;
      },
      error => {
        this.error = 'Issue not found';
        this.loading = false;
        console.error('Error loading issue:', error);
      }
    );
  }

  editIssue(): void {
    if (this.issue) {
      this.router.navigate(['/issues', this.issue.id, 'edit']);
    }
  }

  deleteIssue(): void {
    if (this.issue && confirm('Are you sure you want to delete this issue?')) {
      this.issueService.deleteIssue(this.issue.id).subscribe(
        () => {
          this.router.navigate(['/issues']);
        },
        error => console.error('Error deleting issue:', error)
      );
    }
  }

  goBack(): void {
    this.router.navigate(['/issues']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IssueService, Issue, IssuesResponse } from '../../services/issue.service';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {
  issues: Issue[] = [];
  total: number = 0;
  page: number = 1;
  pageSize: number = 10;
  search: string = '';
  status: string = '';
  priority: string = '';
  assignee: string = '';
  loading: boolean = false;
  Math = Math;

  constructor(private issueService: IssueService, private router: Router) {}

  ngOnInit(): void {
    this.loadIssues();
  }

  loadIssues(): void {
    this.loading = true;
    this.issueService.listIssues({
      search: this.search || undefined,
      status: this.status || undefined,
      priority: this.priority || undefined,
      assignee: this.assignee || undefined,
      page: this.page,
      pageSize: this.pageSize
    }).subscribe(
      (response: IssuesResponse) => {
        this.issues = response.items;
        this.total = response.total;
        this.loading = false;
      },
      error => {
        console.error('Error loading issues:', error);
        this.loading = false;
      }
    );
  }

  viewIssue(id: string): void {
    this.router.navigate(['/issues', id]);
  }

  editIssue(id: string): void {
    this.router.navigate(['/issues', id, 'edit']);
  }

  deleteIssue(id: string): void {
    if (confirm('Are you sure you want to delete this issue?')) {
      this.issueService.deleteIssue(id).subscribe(
        () => {
          this.loadIssues();
        },
        error => console.error('Error deleting issue:', error)
      );
    }
  }

  createNewIssue(): void {
    this.router.navigate(['/issues/new']);
  }

  onSearchChange(): void {
    this.page = 1;
    this.loadIssues();
  }

  onFilterChange(): void {
    this.page = 1;
    this.loadIssues();
  }

  nextPage(): void {
    if (this.page * this.pageSize < this.total) {
      this.page++;
      this.loadIssues();
    }
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadIssues();
    }
  }
}

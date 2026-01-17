# User-Specific Issue Management Implementation

## Overview
Implemented user-specific issue management where each user can only see and manage their own issues. All issues are now associated with their respective users in the database.

## Changes Made

### 1. Database Schema Updates (database.py)
- Added `ForeignKey` import to support user-issue relationships
- Modified `IssueModel` to include a `userId` field:
  ```python
  userId = Column(String, ForeignKey("users.id"), index=True, nullable=False)
  ```
- This creates a foreign key relationship linking each issue to its creator/owner

### 2. Backend API Endpoint Updates (main.py)

#### GET /issues (List Issues)
- Added `current_user: dict = Depends(get_current_user)` parameter
- Issues are now filtered to show only the authenticated user's issues:
  ```python
  query = db.query(IssueModel).filter(IssueModel.userId == current_user["id"])
  ```

#### GET /issues/{issue_id} (Get Single Issue)
- Added `current_user: dict = Depends(get_current_user)` parameter
- Added ownership verification before returning issue:
  ```python
  if issue.userId != current_user["id"]:
      raise HTTPException(status_code=403, detail="You don't have permission to access this issue")
  ```

#### POST /issues (Create Issue)
- Added `current_user: dict = Depends(get_current_user)` parameter
- Automatically associates new issues with the authenticated user:
  ```python
  userId=current_user["id"]
  ```

#### PUT /issues/{issue_id} (Update Issue)
- Added `current_user: dict = Depends(get_current_user)` parameter
- Added ownership verification before allowing updates:
  ```python
  if db_issue.userId != current_user["id"]:
      raise HTTPException(status_code=403, detail="You don't have permission to update this issue")
  ```

#### DELETE /issues/{issue_id} (Delete Issue)
- Added `current_user: dict = Depends(get_current_user)` parameter
- Added ownership verification before allowing deletion:
  ```python
  if db_issue.userId != current_user["id"]:
      raise HTTPException(status_code=403, detail="You don't have permission to delete this issue")
  ```

## Security Features

### User Isolation
- **List Operations**: Users only see their own issues via database query filtering
- **Read Operations**: Attempting to access another user's issue returns 403 Forbidden
- **Create Operations**: Issues are automatically assigned to the authenticated user
- **Update Operations**: Users can only modify their own issues
- **Delete Operations**: Users can only delete their own issues

### Permission Errors
All endpoints return **HTTP 403 Forbidden** when a user attempts to access/modify another user's issue with message: "You don't have permission to [action] this issue"

## User Flow

### User Registration & Login
1. User registers with email, username, password, and full name
2. User logs in with username/email and password
3. JWT token is issued and stored in frontend
4. Token is automatically included in all API requests via JWT interceptor

### Issue Management
1. **Creating Issues**: User creates issue → System automatically associates with userId
2. **Viewing Issues**: User requests `/issues` → Only their issues are returned
3. **Reading Details**: User requests `/issues/{id}` → System verifies ownership
4. **Updating Issues**: User updates issue → System verifies ownership before applying changes
5. **Deleting Issues**: User deletes issue → System verifies ownership before deletion

## Testing the Feature

### Test Scenario: Multi-user Access Control
```bash
# User 1: Alice registers and creates an issue
POST /register
{
  "email": "alice@example.com",
  "username": "alice",
  "password": "password123",
  "fullName": "Alice Smith"
}

POST /login (get token)

POST /issues
{
  "title": "Bug in login",
  "status": "open",
  "priority": "high"
}
# Issue created with userId = alice's_id

# User 2: Bob registers
POST /register
{
  "email": "bob@example.com", 
  "username": "bob",
  "password": "password456",
  "fullName": "Bob Jones"
}

POST /login (get different token)

# Bob tries to access Alice's issue
GET /issues/{alice_issue_id}
# Returns: 403 Forbidden "You don't have permission to access this issue"

# Bob can only see his own issues
GET /issues
# Returns: [] (empty, no issues created by Bob yet)
```

## Frontend Impact

### No Changes Required
The frontend services (`issue.service.ts`, `auth.service.ts`) work transparently:
- JWT interceptor automatically includes authentication token
- Backend now filters responses to user-specific issues
- Frontend receives only the user's issues from the API

### Behavior Changes
- **Issue List Component**: Now displays only the authenticated user's issues
- **Issue Detail Component**: Only accessible for issues owned by the current user
- **Issue Form Component**: Created issues automatically belong to the current user
- **Delete/Update Operations**: Only work on user's own issues

## Database Initialization

The database is automatically created with:
- `users` table: Stores user account information
- `issues` table: Stores issues with userId foreign key to users table

When the backend starts:
```python
Base.metadata.create_all(bind=engine)
```

This ensures all tables exist with proper schema including the userId foreign key.

## Future Enhancements

Potential improvements not yet implemented:
1. **Issue Sharing**: Allow users to share issues with specific users
2. **Collaborative Issues**: Support multiple users assigned to same issue
3. **Issue Permissions**: Granular permissions (view-only, edit, delete)
4. **Audit Logging**: Track who accessed/modified each issue and when
5. **Bulk Operations**: Delete/update multiple user issues at once

## API Response Examples

### Successful Operations
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "title": "Fix login bug",
  "status": "open",
  "priority": "high",
  "assignee": "alice",
  "createdAt": "2024-01-16T12:00:00",
  "updatedAt": "2024-01-16T12:00:00"
}
```

### Permission Denied
```json
{
  "detail": "You don't have permission to access this issue"
}
```

### Not Found (Issue doesn't exist or belongs to different user)
```json
{
  "detail": "Issue with ID 123 not found"
}
```

## Verification Checklist

- ✅ Database schema updated with userId foreign key
- ✅ All 5 issue endpoints filter/verify user ownership
- ✅ Authentication dependency properly injected in all endpoints
- ✅ Permission errors return 403 status code
- ✅ No syntax errors in Python code
- ✅ Frontend services work transparently with new backend
- ✅ User isolation is complete and enforced

## Summary

User-specific issue management is now fully implemented. Each authenticated user can only see, create, update, and delete their own issues. The system enforces strict ownership checks on all operations while maintaining backward compatibility with the existing frontend.

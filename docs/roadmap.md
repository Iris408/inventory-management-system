# PartsPilot Roadmap

## Overview

PartsPilot is being developed incrementally from an inventory CRUD application into a production-style automotive inventory management and analytics platform.

The core full-stack application is complete and deployed.

Current development is focused on final analytics, testing, documentation, and product polish before PartsPilot transitions primarily into maintenance.

---

## Current Platform

### Core Full-Stack Application

**Status: Complete** ✅

Current capabilities include:

- React and TypeScript frontend
- FastAPI REST API
- PostgreSQL persistence
- SQLAlchemy integration
- JWT authentication
- Inventory CRUD operations
- Product search
- Category filtering
- Sorting
- Pagination
- Stock status tracking
- Inventory value calculations
- Category analytics
- Dashboard summary metrics
- Recent inventory tracking
- Swagger/OpenAPI documentation
- Docker Compose environment
- Backend CI
- Frontend CI
- Docker CI
- Live frontend deployment
- Live backend deployment

The core PartsPilot application is portfolio-ready.

---

# Current Development Phase

## Power BI Analytics

**Status: Complete** ✅

The current priority is completing PartsPilot's dedicated business intelligence layer.

The PartsPilot Power BI inventory analytics dashboard is complete.

The report currently includes:

- Total products
- Total stock quantity
- Low-stock product count
- Total inventory value
- Inventory value by category
- Product distribution by stock status
- Stock quantity by category
- Average unit price by category
- Category filtering
- Stock-status filtering

The dashboard uses the current automotive inventory dataset exported from PartsPilot's PostgreSQL database.

---

## Automated Testing

**Status: In Progress** 🚧

Initial backend automated testing has been introduced with `pytest`.

Current validation also includes:

- Backend CI
- Frontend production build validation
- Docker build validation
- Docker Compose configuration validation

Testing will continue to expand around important application behaviour.

Priority areas include:

- Authentication
- Inventory CRUD
- Validation
- Search and filtering
- Sorting and pagination
- Analytics endpoints
- Error handling

See [Testing](./testing.md) for the current testing strategy.

---

## Documentation Refresh

**Status: In Progress** 🚧

PartsPilot documentation is being reorganised so the root README remains concise while detailed engineering information is maintained separately.

Documentation covers:

- Architecture
- API
- Setup
- Testing
- Troubleshooting
- Project details
- Power BI
- Development roadmap

---

# Maintenance Readiness

PartsPilot will move primarily into maintenance once the current completion phase is finished.

The maintenance checkpoint is:

```text
Core application
      ✅
      │
      ▼
Docker / CI
      ✅
      │
      ▼
Documentation
      ↓
Power BI
      ↓
Essential testing
      ↓
Final UI / UX polish
      │
      ▼
Maintenance
```

PartsPilot does not need every possible inventory-management feature before reaching this stage.

---

# Maintenance Phase

Once the completion checkpoint is reached, normal PartsPilot development should focus on:

- Bug fixes
- Dependency updates
- Security updates
- Regression tests
- Documentation corrections
- Deployment maintenance
- Small accessibility improvements
- Small UI/UX improvements
- Power BI report maintenance
- Data corrections

Large new features should not automatically be added during maintenance.

They should only be introduced when they provide a clear engineering, portfolio, or product benefit.

---

# Future Development

The following capabilities remain possible future extensions rather than requirements for PartsPilot to be considered complete.

## Supplier Management

Potential capabilities:

- Supplier records
- Supplier contact information
- Inventory-to-supplier relationships
- Supplier filtering
- Supplier performance information

---

## Reporting and Export

Potential capabilities:

- Inventory reports
- CSV export
- PDF reports
- Stock reports
- Inventory valuation reports

Power BI should remain the primary business intelligence layer where appropriate.

---

## Role-Based Access Control

Potential roles could include:

- Administrator
- Inventory Manager
- Standard User

Permissions could restrict sensitive inventory and administrative operations.

This should only be introduced when the application's user model requires it.

---

## Authentication Improvements

Potential improvements include:

- Refresh tokens
- Improved session handling
- Token expiry handling
- Stronger logout behaviour
- More complete production authentication configuration

---

## Frontend Improvements

Potential improvements include:

- Loading skeletons
- Toast notifications
- Improved mobile navigation
- Dark mode
- Additional accessibility improvements
- Expanded Reports page
- Expanded Suppliers page
- Expanded Settings page

These are enhancements rather than blockers for the current portfolio version.

---

## Observability

Potential production-style improvements include:

- Structured application logging
- Health monitoring
- Error tracking
- Application metrics
- Uptime monitoring

PartsPilot does not need to reproduce the dedicated infrastructure-monitoring capabilities already demonstrated by Pulse.

---

## Internationalisation

Longer-term product improvements could include:

- Localisation
- Multiple currencies
- Regional formatting

These features are currently deferred.

---

## Cloud Infrastructure

AWS remains a possible future infrastructure exercise.

Potential areas include:

- Backend deployment
- Managed PostgreSQL
- Container deployment
- Environment configuration
- Logging and monitoring

Cloud migration is not required for PartsPilot's current completion milestone.

---

# Deliberately Deferred

The following areas should not delay PartsPilot's move into maintenance:

- Complex enterprise RBAC
- Large supplier-management workflows
- Advanced purchasing systems
- Order management
- Warehouse management
- Microservices
- Kubernetes
- Complex cloud architecture
- Real-time event processing
- AI features

Adding these would substantially increase project scope without being necessary to demonstrate PartsPilot's current engineering goals.

---

# Definition of Portfolio Complete

PartsPilot can be considered fully complete for its current portfolio purpose when:

- Core inventory workflows remain stable
- Backend tests pass
- Frontend production build passes
- Docker environment runs correctly
- GitHub Actions workflows pass
- Live deployment remains usable
- Documentation reflects the current architecture
- Power BI dashboard is polished and documented
- Major UI issues are resolved
- Recruiter/demo screenshots are current

At that point:

```text
Active Development
       │
       ▼
Portfolio Complete
       │
       ▼
Maintenance
```

Future development should then be intentional rather than continuous.

---

# Development Principles

Future PartsPilot work should prioritise:

1. Reliability
2. Maintainability
3. Testability
4. Clear documentation
5. Useful analytics
6. Accessibility
7. Incremental development

New technologies or features should solve a genuine problem rather than being introduced solely to increase the project's technical scope.

---

## Related Documentation

- [Project Details](./project-details.md)
- [Architecture](./architecture.md)
- [API Reference](./api-reference.md)
- [Setup Guide](./setup.md)
- [Testing](./testing.md)
- [Troubleshooting](./troubleshooting.md)
- [Power BI Documentation](../powerbi/README.md)
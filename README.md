# NestJS Request-Scoped Context Demo

This repository provides a complete example of how to create a custom request-scoped module for managing request context throughout your NestJS application. It serves as a modern alternative to `express-http-context` by leveraging NestJS's built-in features like dependency injection and request-scoped services.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Understanding the Implementation](#understanding-the-implementation)
  - [RequestContextService](#requestcontextservice)
  - [RequestContextModule](#requestcontextmodule)
  - [Using RequestContextService](#using-requestcontextservice)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

Follow these instructions to set up and run the example project on your local machine.

### Prerequisites

Ensure you have the following installed on your system:

- Node.js v18.x or newer
- npm v9.x or newer

### Installation

1. Clone the repository:

```sh
git clone https://github.com/VinceChow/nestjs-request-scoped-context-demo.git
```

2. Change the working directory to the project root:

```sh
cd nestjs-request-scoped-context-demo
```

3. Install the dependencies:

```sh
npm install
```

4. Run the application:

```sh
npm run start
```

The application will start and listen on `http://localhost:3000`.

## Understanding the Implementation

This section explains the key components of the request-scoped module and how they interact with the rest of the application.

### RequestContextService

`RequestContextService` is a request-scoped service responsible for storing and retrieving data for the current request. It maintains a private `contextMap` and provides `set` and `get` methods to interact with the data.

```typescript
// src/request-context/request-context.service.ts
import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class RequestContextService {
  private readonly contextMap: Map<string, any> = new Map();

  constructor(@Inject(REQUEST) private readonly request: Request) {}

  set<T>(key: string, value: T): void {
    this.contextMap.set(key, value);
  }

  get<T>(key: string): T | undefined {
    return this.contextMap.get(key) as T;
  }

  getRequest(): Request {
    return this.request;
  }
}
```

### RequestContextModule

`RequestContextModule` is a standard NestJS module that exports the `RequestContextService` so that it can be injected into other parts of the application.

```typescript
// src/request-context/request-context.module.ts
import { Module } from '@nestjs/common';
import { RequestContextService } from './request-context.service';

@Module({
  providers: [RequestContextService],
  exports: [RequestContextService],
})
export class RequestContextModule {}
```

### Using RequestContextService

You can inject the `RequestContextService` into any controller, service, or guard to store and retrieve data for the current request.

For example, in a guard:

```typescript
// src/user.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RequestContextService } from './request-context/request-context.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private requestContextService: RequestContextService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    // Extract the user token from the request headers
    const userToken = request.headers['authorization'];

    // Store the user token in RequestContextService
    this.requestContextService.set('userToken', userToken);

    // Add your authentication logic here
    const isAuthenticated = this.authenticate(userToken);

    return isAuthenticated;
  }

  private authenticate(userToken: string): boolean {
    // Implement your token validation logic here
    return true; // Assume the user is authenticated for demo purposes
  }
}
```

In a service:

```typescript
// src/user.service.ts
import { Injectable } from '@nestjs/common';
import { RequestContextService } from './request-context/request-context.service';

@Injectable()
export class UserService {
  constructor(private requestContextService: RequestContextService) {}

  getUserToken(): string {
    return this.requestContextService.get('userToken');
  }

  // Add other service methods that require request data
}
```

## Contributing

Contributions to this repository are welcome! Please feel free to submit issues or pull requests to improve the project.

## License

This project is licensed under the [MIT License](LICENSE).

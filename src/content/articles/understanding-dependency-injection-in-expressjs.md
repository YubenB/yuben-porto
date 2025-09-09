---
slug: understanding-dependency-injection-in-expressjs
title: Understanding Dependency Injection in Express.js
date: 2025-09-05
excerpt: Dependency Injection (DI) is a powerful design pattern that helps you create more flexible, testable, and maintainable applications.
readingTime: 15 min read
thumbnail: https://miro.medium.com/v2/1*kmvLcyhGLS3eeV9Ecm0bFw.png
---

Dependency Injection (DI) is a powerful design pattern that helps you create more flexible, testable, and maintainable applications. At its core, DI is a form of **Inversion of Control (IoC)**, where the control of creating and managing object dependencies is shifted from the object itself to an external entity, often called a container or injector.

Instead of a component creating its own dependencies, like this:

```javascript
class UserService {
  constructor() {
    this.db = new DatabaseConnection(); // UserService creates its own dependency
  }

  getUser(id) {
    return this.db.query(`SELECT * FROM users WHERE id = ${id}`);
  }
}
```

The dependencies are "injected" from the outside, like this:

```javascript
class UserService {
  constructor(db) {
    this.db = db; // The dependency is passed in
  }

  getUser(id) {
    return this.db.query(`SELECT * FROM users WHERE id = ${id}`);
  }
}

const db = new DatabaseConnection();
const userService = new UserService(db); // Dependency is injected here
```

This simple change has profound benefits for your application's architecture.

---

## The Advantages of Dependency Injection

Using DI offers several key advantages, especially in a framework like Express.js where you deal with many services, models, and controllers.

- **Improved Testability**: This is one of the biggest wins. When dependencies are injected, you can easily substitute them with mocks or stubs during testing. You can test your business logic (e.g., a controller) in isolation without needing a real database connection.
- **Decoupling and Modularity**: Components are no longer tightly coupled to their dependencies. Your **UserService** doesn't need to know _how_ to create a **DatabaseConnection**, only that it needs one. This makes your modules more independent and reusable.
- **Easier Maintenance and Refactoring**: If you need to change the database from, say, PostgreSQL to MongoDB, you only need to change the implementation of the **DatabaseConnection** and inject the new one. The **UserService** and any other component using it remain completely unchanged.
- **Centralized Configuration**: Dependencies are typically managed and configured in a single place (the "container" or composition root), making the application easier to configure and manage.

---

## DI in Practice: An Express.js Example

Let's look at a common scenario in an Express.js application and see how DI can improve it.

### Without Dependency Injection

Here's a typical setup where a user controller directly creates its own service, which in turn creates its own database model.

**user.model.js**

```javascript
// This model is tightly coupled to a specific database implementation.
class UserModel {
  find(id) {
    console.log(`Fetching user ${id} from the database...`);
    return { id, name: "John Doe" };
  }
}

export default UserModel;
```

**user.service.js**

```javascript
import UserModel from "./user.model.js";

class UserService {
  constructor() {
    // The service creates its own dependency. Hard to test!
    this.userModel = new UserModel();
  }

  getUserById(id) {
    return this.userModel.find(id);
  }
}

export default UserService;
```

**user.controller.js**

```javascript
import UserService from "./user.service.js";

class UserController {
  constructor() {
    // The controller creates its own dependency.
    this.userService = new UserService();
  }

  get(req, res) {
    const { id } = req.params;
    const user = this.userService.getUserById(id);
    if (user) {
      return res.json(user);
    }
    return res.status(404).send("User not found");
  }
}

export default UserController;
```

The problem here is that everything is **tightly coupled**. Testing **UserController** requires **UserService**, which in turn requires **UserModel**. You can't test the controller's logic without instantiating the entire chain.

### With Dependency Injection

Now, let's refactor the same application to use DI. We will create and "inject" our dependencies at the top level of our application (e.g., in **app.js**).

**user.model.js** (No changes needed)

```javascript
class UserModel {
  find(id) {
    console.log(`Fetching user ${id} from the database...`);
    return { id, name: "John Doe" };
  }
}

export default UserModel;
```

**user.service.js** (Refactored)

```javascript
class UserService {
  // The dependency is now injected via the constructor.
  constructor(userModel) {
    this.userModel = userModel;
  }

  getUserById(id) {
    return this.userModel.find(id);
  }
}

export default UserService;
```

**user.controller.js** (Refactored)

```javascript
class UserController {
  // The service is injected via the constructor.
  constructor(userService) {
    this.userService = userService;
  }

  // We need to bind `this` or use an arrow function for Express routes.
  get = (req, res) => {
    const { id } = req.params;
    const user = this.userService.getUserById(id);
    if (user) {
      return res.json(user);
    }
    return res.status(404).send("User not found");
  };
}

export default UserController;
```

**app.js (Composition Root)**

This is where the magic happens. We create our instances and wire them together.

```javascript
import express from "express";
import UserModel from "./user.model.js";
import UserService from "./user.service.js";
import UserController from "./user.controller.js";

const app = express();
const port = 3000;

// 1. Create instances (our dependencies)
const userModel = new UserModel();
const userService = new UserService(userModel); // Inject model into service
const userController = new UserController(userService); // Inject service into controller

// 2. Set up routes with the wired-up controller
app.get("/users/:id", userController.get);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

### Testing the DI Version

Now, testing the **UserController** is trivial. We can create a mock **UserService** and inject it without ever touching the real service or model.

**user.controller.test.js**

```javascript
import UserController from "./user.controller.js";

test("UserController.get should return a user", () => {
  // 1. Create a mock service
  const mockUserService = {
    getUserById: (id) => ({ id, name: "Mock User" }),
  };

  // 2. Mock Express's req and res objects
  const req = { params: { id: "123" } };
  const res = {
    json: jest.fn(), // Using Jest's mock function
    status: jest.fn(() => res),
    send: jest.fn(),
  };

  // 3. Inject the mock service into the controller
  const userController = new UserController(mockUserService);

  // 4. Run the test
  userController.get(req, res);

  // 5. Assert the results
  expect(res.json).toHaveBeenCalledWith({ id: "123", name: "Mock User" });
});
```

As you can see, our test is clean, fast, and focuses only on the controller's logic because we could easily **inject a fake dependency**. This is the true power of the DI pattern in action.

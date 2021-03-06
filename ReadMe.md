# Lesson 7 Hands-On 45 points

# Directions

Now that you have learned about Authorization, it's time to put that knowledge to work. In this Hands-On exercise, you will be practicing many of the new concepts you have learned in this lesson. This Hands-On will be graded, so be sure you complete all requirements.

# Caution!

Do not submit your project until you have completed all requirements! You will not be able to resubmit.

# Setup

Open up your terminal/command prompt.

Navigate to your desktop in your terminal:

cd Desktop
Then, navigate to the Express-Course directory in your terminal:

cd Express-Course
Requirements

# Step 1

To begin, generate a new project (within the Express-Course directory) using the Express/Handlebar generator.

Call this app L07HandsOn
Don't forget all of the installations needed!

# Step 2

Create a new model and table, users, by running a migration that includes the following columns:

UserId, FirstName, LastName, Email, Username, Password, Admin

Tip!
The Admin column should be a boolean with a default value of false. To update users to be an admin, update them within MySQL Workbench itself. You need at least one user in your users table that is an Admin.

Don't forget to create the users model
The createdAt and updatedAt columns will be created automatically

# Step 3

Add the routes of the following:

User signup: /users/signup
User login: /users/login
Show user profile: /users/profile
Show a list of users: /users
Show a specific user: /users/:id
Delete user: /users/:id

# Step 4

Use passport's local strategy so only the user sees their profile in the /users/profile route and can see other users profiles when they use the /users/:id route.

Don't forget the installations needed when working with Passport

# Step 5

Allow the Admin users to be able to view a list of all users

You will need to update your database to include at least one Admin user
Use the route of / to see the list of users by their name
Hint! Remember the / route in the users.js file will be localhost:3000/users as was set up in app.js

If an unauthorized user tries to access this route, send them a message that they are not authorized to access the page.
Use the Admin property on your logged in user to determine if they should be allowed access to all users.

# Step 6

Allow the Admin users to be able to click on and view a specific user.

Use the route of /users/:id

# Step 7

Allow the Admin users to be able to delete users from the database. If a user is not an admin, they should not be able to delete users.

Remember to only update the users to have a column of Deleted set to true when "deleted"
You will need to run another migration to add the column of Deleted to the database.

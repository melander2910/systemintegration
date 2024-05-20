2. Documentation that goes through step by step on how you set it up. 
This next.js app integrates with Auth0 as allows for user sign in and signup.

I basically just followed Auth0 next.js beginners guide, which is very detailed.
They also provide guides for many others frameworks.
Auth0 seems to be very beginner friendly, atleast if you are starting from scratch.
Link to official guide: https://auth0.com/docs/quickstart/webapp/nextjs/01-login

STEP 1:
Create a new next.js application. I used the following command.

npx create-next-app

This command comes with a few user specified choices to which i decided to go with:
What is your project named? : "auth-integration"
Would you like to use TypeScript?  Yes
Would you like to use ESLint? Yes
Would you like to use Tailwind CSS? Yes
Would you like to use `src/` directory?  No
Would you like to use App Router? (recommended)  No 
Would you like to customize the default import alias (@/*)? No

In the create-next-app, app router is recommended, but i decided against it, since i haven't had great success with
the naming of everything to "page"

and install Auth0

npm install @auth0/nextjs-auth0

STEP 2:

Sign up at Auth0 for free and create an application in Auth0

STEP 3: 

I created a .env file containing variables required for auth0.

STEP 4:

Wrap the next.js app in auth0's UserProvider. This makes the User state available on all future pages.
Create a api/auth/[auth0] path containing:
handleAuth() method from auth0
we will automatically get the required endpoints for login logout etc.

STEP 5: 

A possible step 5 could be allowing for accessing backend resources.
In Auth0 you can add API's describing resources becoming available for authentication
users through auth0
will have to set up backend to allow jwt token from specific authorizer and for specific audience
(The .NET example looks a lot like the configuration for DLS project with Identity Framework)

Why Auth0 and not providers such as Google Cloud Authentication, AWS, Azure, Okta .. You name it.

+ Auth0 provides many different and detailed setup examples.
+ It seems very easy to use.
+ was totally free of charge and good development experience
+ It has sso, mfa, biometrics
- From what i can see it is quickly expensive as user base grows? Perhabs not good for b2c?

Google Cloud Identity Platform
+ Easy peasy setup
+ Scaleability on google cloud infrastructure
+ pay as you go
- Limitied customization
- using big companies often 'vendor lock-in'. Using more google products becomes easier and deciding to change provider might be a struggle

AWS
+ Huge fortune 500 company with good and trustable infrastructure
+ good if using other aws services?
+ pay as you go (said to have generous free tier?)
- seems like a big thing for a small project.
- also limited customization
- vendor lock in?

Okta
- never heard of it before
- complex
- high pay for advanced features - not user based?

Azure
+ Alot of companies in the microsoft environment, easier to integrate security for third parties if they use Azure AD? supports on-premises AD?
- cost?
- complexity?
- locked in on azure resources?
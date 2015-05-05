# blog-code-challenge
This project shows how I'd implement a minimalistic blog using Rails, Angular and REST.  The server and client side are completely decoupled. There is a [write up here](http://blog.guyroberts.co.uk/?p=3230).

##Ruby version
Built and tested so far with ruby 2.1.1
Rails 4.2.1


##Database creation
rake db:create
rake db:migrate

##Database initialization
The hard coded user needs to be set up using

rake db:seed 

##How to run the test suite
cd rails
rspec

##Angular Development environment
To change the angular code, 
cd client
Assuming npm and bower are installed
bower update
grunt serve 
This will serve the angular app at localhost:3000. Run the Rails app in another terminal.
To build for deployment
grunt build


##Deployment instructions
Deployment will be to heroku,  but these environment variables for SMTP will be needed so that emails can be sent.  These will be 

* BLOG_SMTP_DOMAIN=xxx@xxxxx
* BLOG_SMTP_PASSWORD=xxxxxxxxxx
* BLOG_SMTP_ADDRESS=smtp.gmail.com

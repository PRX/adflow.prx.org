# Adflow.Prx.Org

### Use defaults
To set-up environment custom values, start with these defaults in your `.env` file:
``` sh
cp env-example .env
vim .env
```
Adflow will connect to id.staging.prx.org and jingle.staging.prx.tech.

### AUTH_CLIENT_ID for environment
Next, you will need to create a client application set up, this is easiest to do from the ID console:
``` ruby
ssh to an instance running ID
# connect to ID's docker container
docker exec -it <container_id> /bin/ash
# start a console for ID
./bin/application console

# in the console, save a new client application
client = Client.create(
  :url => "http://adflow.prx.dev",
  :callback_url => "http://adflow.prx.dev/assets/callback.html",
  :support_url => "http://adflow.prx.dev",
  :image_url => "http://s3.amazonaws.com/production.mediajoint.prx.org/public/comatose_files/4625/prx-logo_large.png",
  :description => "adflow.prx.dev",
  :template_name => "prx_beta",
  :user_id =>8,
  :name => "adflow.prx.dev",
  :auto_grant =>true
)
client.key = SecureRandom.hex(40)[0..39]
client.secret = SecureRandom.hex(40)[0..39]
client.save

# get the client.key and set it as AUTH_CLIENT_ID
puts "Add this to .env"
puts "AUTH_CLIENT_ID=#{client.key}"
```

Enter in the client id in `.env`, setting `AUTH_CLIENT_ID` to the value from above.


## Local Install

``` sh
# install dependencies (https://yarnpkg.com/en/docs/install)
yarn install

# setup pow proxy (see http://pow.cx/)
echo 4205 > ~/.pow/adflow.prx

# dev server
npm start
open http://adflow.prx.dev

# run tests in Chrome
npm test
```
